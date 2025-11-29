// ============================================
// GIT SYNC MODULE
// ============================================
// Sync projects with GitHub/GitLab repositories
// ============================================

const GitSync = {
    githubToken: null,
    gitlabToken: null,
    githubUsername: null,
    gitlabUsername: null,

    /**
     * Initialize Git Sync
     */
    init() {
        this.loadCredentials();
    },

    /**
     * Load saved credentials
     */
    loadCredentials() {
        const storageKey = typeof Constants !== 'undefined' 
            ? Constants.STORAGE_KEYS.GIT_CREDENTIALS 
            : 'portfolio_git_credentials';
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            try {
                const creds = JSON.parse(saved);
                this.githubToken = creds.githubToken || null;
                this.gitlabToken = creds.gitlabToken || null;
                this.githubUsername = creds.githubUsername || null;
                this.gitlabUsername = creds.gitlabUsername || null;
            } catch (e) {
                console.error('Error loading git credentials:', e);
            }
        }
    },

    /**
     * Save credentials
     */
    saveCredentials() {
        const creds = {
            githubToken: this.githubToken,
            gitlabToken: this.gitlabToken,
            githubUsername: this.githubUsername,
            gitlabUsername: this.gitlabUsername
        };
        const storageKey = typeof Constants !== 'undefined' 
            ? Constants.STORAGE_KEYS.GIT_CREDENTIALS 
            : 'portfolio_git_credentials';
        localStorage.setItem(storageKey, JSON.stringify(creds));
    },

    /**
     * Fetch repositories from GitHub
     */
    async fetchGitHubRepos(username, token = null) {
        try {
            const headers = {
                'Accept': 'application/vnd.github.v3+json'
            };
            
            if (token) {
                headers['Authorization'] = `token ${token}`;
            }

            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
                headers: headers
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('User not found');
                } else if (response.status === 403) {
                    throw new Error('Rate limit exceeded. Please use a token.');
                }
                throw new Error(`GitHub API error: ${response.status}`);
            }

            const repos = await response.json();
            return repos.map(repo => ({
                id: repo.id,
                name: repo.name,
                fullName: repo.full_name,
                description: repo.description || '',
                url: repo.html_url,
                homepage: repo.homepage,
                language: repo.language,
                topics: repo.topics || [],
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                updated: repo.updated_at,
                source: 'github'
            }));
        } catch (error) {
            console.error('Error fetching GitHub repos:', error);
            throw error;
        }
    },

    /**
     * Fetch repositories from GitLab
     */
    async fetchGitLabRepos(username, token = null) {
        try {
            const headers = {
                'Content-Type': 'application/json'
            };
            
            if (token) {
                headers['PRIVATE-TOKEN'] = token;
            }

            // First, get user ID from username
            let userId = null;
            if (token) {
                const userResponse = await fetch(`https://gitlab.com/api/v4/users?username=${username}`, {
                    headers: headers
                });
                if (userResponse.ok) {
                    const users = await userResponse.json();
                    if (users.length > 0) {
                        userId = users[0].id;
                    }
                }
            }

            // Fetch projects
            const url = userId 
                ? `https://gitlab.com/api/v4/users/${userId}/projects?per_page=100&order_by=updated_at&sort=desc`
                : `https://gitlab.com/api/v4/users/${username}/projects?per_page=100&order_by=updated_at&sort=desc`;
            
            const response = await fetch(url, {
                headers: headers
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('User not found');
                }
                throw new Error(`GitLab API error: ${response.status}`);
            }

            const repos = await response.json();
            return repos.map(repo => ({
                id: repo.id,
                name: repo.name,
                fullName: repo.path_with_namespace,
                description: repo.description || '',
                url: repo.web_url,
                homepage: repo.homepage || null,
                language: repo.default_branch, // GitLab doesn't provide language easily
                topics: repo.tag_list || [],
                stars: repo.star_count || 0,
                forks: repo.forks_count || 0,
                updated: repo.last_activity_at,
                source: 'gitlab'
            }));
        } catch (error) {
            console.error('Error fetching GitLab repos:', error);
            throw error;
        }
    },

    /**
     * Convert repository to project format
     */
    repoToProject(repo, projectNumber = null) {
        // Auto-detect technologies from topics and language
        const technologies = [];
        if (repo.language) {
            technologies.push(repo.language);
        }
        if (repo.topics && repo.topics.length > 0) {
            technologies.push(...repo.topics.filter(topic => {
                // Filter out generic topics
                const genericTopics = ['portfolio', 'project', 'website', 'web', 'app', 'application'];
                return !genericTopics.includes(topic.toLowerCase());
            }));
        }

        // Generate project number if not provided
        const number = projectNumber || String(Dashboard.projects.length + 1).padStart(2, '0');

        return {
            number: number,
            title: repo.name,
            description: repo.description || `${repo.name} - ${repo.source === 'github' ? 'GitHub' : 'GitLab'} repository`,
            tags: technologies.length > 0 ? technologies : ['Git'],
            link: repo.homepage || repo.url,
            image: null,
            repoUrl: repo.url,
            source: repo.source,
            stars: repo.stars,
            forks: repo.forks
        };
    },

    /**
     * Import repository as project
     */
    importRepo(repo, projectNumber = null) {
        const project = this.repoToProject(repo, projectNumber);
        
        // Check if project already exists
        const exists = Dashboard.projects.find(p => p.repoUrl === project.repoUrl);
        if (exists) {
            // Update existing project
            const index = Dashboard.projects.indexOf(exists);
            Dashboard.projects[index] = project;
        } else {
            // Add new project
            Dashboard.projects.push(project);
        }
        
        // Save to database
        Dashboard.saveToConfig();
        Dashboard.renderProjectsList();
        
        return project;
    },

    /**
     * Sync all repositories (update existing projects)
     */
    async syncAllRepos() {
        const repos = [];
        
        // Fetch from GitHub
        if (this.githubUsername) {
            try {
                const githubRepos = await this.fetchGitHubRepos(this.githubUsername, this.githubToken);
                repos.push(...githubRepos);
            } catch (error) {
                console.error('Error syncing GitHub:', error);
            }
        }
        
        // Fetch from GitLab
        if (this.gitlabUsername) {
            try {
                const gitlabRepos = await this.fetchGitLabRepos(this.gitlabUsername, this.gitlabToken);
                repos.push(...gitlabRepos);
            } catch (error) {
                console.error('Error syncing GitLab:', error);
            }
        }
        
        // Update existing projects that have repoUrl
        let updated = 0;
        Dashboard.projects.forEach((project, index) => {
            if (project.repoUrl) {
                const repo = repos.find(r => r.url === project.repoUrl);
                if (repo) {
                    const updatedProject = this.repoToProject(repo, project.number);
                    Dashboard.projects[index] = { ...project, ...updatedProject };
                    updated++;
                }
            }
        });
        
        if (updated > 0) {
            Dashboard.saveToConfig();
            Dashboard.renderProjectsList();
        }
        
        return { updated, total: repos.length };
    }
};

