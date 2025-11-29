// ============================================
// DASHBOARD PANEL
// ============================================
// Admin panel untuk manage projects
// ============================================

const Dashboard = {
    isOpen: false,
    projects: [],
    fetchedRepos: [], // Store fetched repositories

    /**
     * Initialize dashboard
     */
    init() {
        // Check authentication first
        if (!this.checkAuth()) {
            return; // Don't initialize if not authenticated
        }
        
        // Initialize GitSync
        if (typeof GitSync !== 'undefined') {
            GitSync.init();
        }
        
        this.loadProjects();
        this.createDashboard();
        this.setupEventListeners();
        this.loadGitCredentials();
    },

    /**
     * Load Git credentials into forms
     */
    loadGitCredentials() {
        if (typeof GitSync === 'undefined') return;
        
        if (GitSync.githubUsername) {
            document.getElementById('githubUsername').value = GitSync.githubUsername;
        }
        if (GitSync.githubToken) {
            document.getElementById('githubToken').value = GitSync.githubToken;
        }
        if (GitSync.gitlabUsername) {
            document.getElementById('gitlabUsername').value = GitSync.gitlabUsername;
        }
        if (GitSync.gitlabToken) {
            document.getElementById('gitlabToken').value = GitSync.gitlabToken;
        }
    },

    /**
     * Check authentication
     */
    checkAuth() {
        if (typeof Auth === 'undefined') {
            console.warn('Auth system not loaded');
            return false;
        }
        
        if (!Auth.isAuthenticated()) {
            // Redirect to login if not authenticated
            if (window.location.pathname !== '/login.html' && !window.location.pathname.includes('login.html')) {
                window.location.href = 'login.html';
            }
            return false;
        }
        return true;
    },

    /**
     * Load projects from local database (localStorage) or CONFIG
     */
    loadProjects() {
        // First, try to load from localStorage (local database)
        const storageKey = typeof Constants !== 'undefined' 
            ? Constants.STORAGE_KEYS.PROJECTS_DB 
            : 'portfolio_projects_db';
        const savedProjects = localStorage.getItem(storageKey);
        if (savedProjects) {
            try {
                this.projects = JSON.parse(savedProjects);
                return;
            } catch (e) {
                console.error('Error loading projects from localStorage:', e);
            }
        }
        
        // Fallback to CONFIG if no local database
        if (typeof CONFIG !== 'undefined' && CONFIG.projects) {
            this.projects = JSON.parse(JSON.stringify(CONFIG.projects));
            // Save to local database for future use
            this.saveProjectsToDB();
        } else {
            this.projects = [];
        }
    },

    /**
     * Save projects to local database (localStorage)
     */
    saveProjectsToDB() {
        const storageKey = typeof Constants !== 'undefined' 
            ? Constants.STORAGE_KEYS.PROJECTS_DB 
            : 'portfolio_projects_db';
        localStorage.setItem(storageKey, JSON.stringify(this.projects));
    },

    /**
     * Create dashboard UI
     */
    createDashboard() {
        // Create dashboard container
        const dashboard = document.createElement('div');
        dashboard.id = 'dashboard';
        dashboard.className = 'dashboard';
        dashboard.innerHTML = `
            <div class="dashboard-overlay"></div>
            <div class="dashboard-panel">
                <div class="dashboard-header">
                    <div>
                        <h2>Project Manager</h2>
                        <p class="dashboard-user">Logged in as: <span id="dashboardUsername">Admin</span></p>
                    </div>
                    <div class="dashboard-header-actions">
                        <button class="btn-download-manual" id="downloadConfigManual" title="Download config.js (optional)">📥</button>
                        <button class="btn-logout" id="dashboardLogout" title="Logout">Logout</button>
                        <button class="dashboard-close" id="dashboardClose">×</button>
                    </div>
                </div>
                <div class="dashboard-content">
                    <div class="dashboard-tabs">
                        <button class="tab-btn active" data-tab="list">Projects List</button>
                        <button class="tab-btn" data-tab="add">Add Project</button>
                        <button class="tab-btn" data-tab="sync">Sync Repos</button>
                    </div>
                    
                    <div class="tab-content active" id="tabList">
                        <div class="projects-list" id="projectsList">
                            <!-- Projects will be rendered here -->
                        </div>
                    </div>
                    
                    <div class="tab-content" id="tabAdd">
                        <form class="project-form" id="projectForm">
                            <div class="form-group">
                                <label>Project Number</label>
                                <input type="text" name="number" placeholder="01" required>
                            </div>
                            <div class="form-group">
                                <label>Project Title</label>
                                <input type="text" name="title" placeholder="Project Name" required>
                            </div>
                            <div class="form-group">
                                <label>Description</label>
                                <textarea name="description" rows="3" placeholder="Project description..." required></textarea>
                            </div>
                            <div class="form-group">
                                <label>Tags (comma separated)</label>
                                <input type="text" name="tags" placeholder="React, Next.js, GSAP" required>
                                <small>Icons will automatically appear for supported technologies</small>
                            </div>
                            <div class="form-group">
                                <label>Project Link</label>
                                <input type="url" name="link" placeholder="https://project-url.com">
                            </div>
                            <div class="form-group">
                                <label>Project Image (optional)</label>
                                <div class="image-upload-container">
                                    <input type="file" id="imageUpload" accept="image/*" style="display: none;">
                                    <div class="image-upload-area" id="imageUploadArea">
                                        <div class="image-upload-placeholder" id="imagePlaceholder">
                                            <span class="upload-icon">📷</span>
                                            <span class="upload-text">Click to upload or drag & drop</span>
                                            <span class="upload-hint">PNG, JPG, GIF up to 5MB</span>
                                        </div>
                                        <img id="imagePreview" class="image-preview" style="display: none;" alt="Preview">
                                    </div>
                                    <div class="image-upload-actions">
                                        <button type="button" class="btn btn-small btn-secondary" id="selectImageBtn">Select Image</button>
                                        <button type="button" class="btn btn-small btn-secondary" id="removeImageBtn" style="display: none;">Remove</button>
                                        <input type="text" name="image" id="imagePathInput" placeholder="Or enter image path (assets/images/project1.jpg)" style="margin-top: 10px;">
                                    </div>
                                    <small>Upload image or enter image path. Leave empty for placeholder.</small>
                                </div>
                            </div>
                            <div class="form-actions">
                                <button type="submit" class="btn btn-primary">Save Project</button>
                                <button type="button" class="btn btn-secondary" id="cancelEdit">Cancel</button>
                            </div>
                        </form>
                    </div>
                    
                    <div class="tab-content" id="tabSync">
                        <div class="sync-section">
                            <h3>GitHub Sync</h3>
                            <form class="sync-form" id="githubSyncForm">
                                <div class="form-group">
                                    <label>GitHub Username</label>
                                    <input type="text" id="githubUsername" placeholder="your-username" value="">
                                </div>
                                <div class="form-group">
                                    <label>GitHub Token (Optional)</label>
                                    <input type="password" id="githubToken" placeholder="ghp_xxxxxxxxxxxx">
                                    <small>Required for private repos. <a href="https://github.com/settings/tokens" target="_blank">Create token</a></small>
                                </div>
                                <button type="submit" class="btn btn-primary">Fetch Repositories</button>
                            </form>
                        </div>
                        
                        <div class="sync-section">
                            <h3>GitLab Sync</h3>
                            <form class="sync-form" id="gitlabSyncForm">
                                <div class="form-group">
                                    <label>GitLab Username</label>
                                    <input type="text" id="gitlabUsername" placeholder="your-username" value="">
                                </div>
                                <div class="form-group">
                                    <label>GitLab Token (Optional)</label>
                                    <input type="password" id="gitlabToken" placeholder="glpat-xxxxxxxxxxxx">
                                    <small>Required for private repos. <a href="https://gitlab.com/-/user_settings/personal_access_tokens" target="_blank">Create token</a></small>
                                </div>
                                <button type="submit" class="btn btn-primary">Fetch Repositories</button>
                            </form>
                        </div>
                        
                        <div class="sync-section">
                            <button class="btn btn-secondary" id="syncAllBtn">Sync All Repositories</button>
                            <small>Update existing projects from GitHub/GitLab</small>
                        </div>
                        
                        <div id="reposList" class="repos-list">
                            <!-- Repositories will be rendered here -->
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(dashboard);
        this.renderProjectsList();
    },

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Toggle button (create if doesn't exist)
        this.createToggleButton();
        
        // Close button
        document.getElementById('dashboardClose').addEventListener('click', () => this.close());
        
        // Manual download button (optional, for backup)
        document.getElementById('downloadConfigManual').addEventListener('click', () => {
            const configCode = this.generateConfigCode();
            const blob = new Blob([configCode], { type: 'text/javascript' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'config.js';
            a.click();
            URL.revokeObjectURL(url);
            this.showNotification('Config file downloaded!');
        });
        
        // Logout button
        document.getElementById('dashboardLogout').addEventListener('click', () => {
            if (confirm('Are you sure you want to logout?')) {
                if (typeof Auth !== 'undefined') {
                    Auth.logout();
                }
                window.location.href = 'login.html';
            }
        });
        
        // Update username display
        if (typeof Auth !== 'undefined') {
            const username = Auth.getCurrentUser();
            if (username) {
                const usernameEl = document.getElementById('dashboardUsername');
                if (usernameEl) {
                    usernameEl.textContent = username;
                }
            }
        }
        
        // Overlay click to close
        document.querySelector('.dashboard-overlay').addEventListener('click', () => this.close());
        
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                this.switchTab(tab);
            });
        });
        
        // Form submit
        document.getElementById('projectForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProject();
        });
        
        // Cancel edit
        document.getElementById('cancelEdit').addEventListener('click', () => {
            this.switchTab('list');
            this.resetForm();
        });
        
        // Image upload handlers
        this.setupImageUpload();
        
        // GitHub sync form
        document.getElementById('githubSyncForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleGitHubSync();
        });
        
        // GitLab sync form
        document.getElementById('gitlabSyncForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleGitLabSync();
        });
        
        // Sync all button
        document.getElementById('syncAllBtn').addEventListener('click', async () => {
            await this.handleSyncAll();
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                if (this.checkAuth()) {
                    this.toggle();
                } else {
                    window.location.href = 'login.html';
                }
            }
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    },

    /**
     * Create toggle button (only if authenticated)
     */
    createToggleButton() {
        // Only show button if authenticated
        if (!this.checkAuth()) {
            return;
        }
        
        // Check if button already exists
        if (document.getElementById('dashboardToggle')) {
            return;
        }
        
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'dashboardToggle';
        toggleBtn.className = 'dashboard-toggle';
        toggleBtn.innerHTML = '⚙️';
        toggleBtn.title = 'Open Dashboard (Ctrl+Shift+D)';
        toggleBtn.addEventListener('click', () => {
            if (this.checkAuth()) {
                this.toggle();
            } else {
                window.location.href = 'login.html';
            }
        });
        document.body.appendChild(toggleBtn);
    },

    /**
     * Toggle dashboard
     */
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    },

    /**
     * Open dashboard
     */
    open() {
        if (!this.checkAuth()) {
            window.location.href = 'login.html';
            return;
        }
        
        const dashboard = document.getElementById('dashboard');
        dashboard.classList.add('active');
        this.isOpen = true;
        this.loadProjects();
        this.renderProjectsList();
    },

    /**
     * Close dashboard
     */
    close() {
        const dashboard = document.getElementById('dashboard');
        dashboard.classList.remove('active');
        this.isOpen = false;
        this.resetForm();
        this.switchTab('list');
    },

    /**
     * Switch tab
     */
    switchTab(tab) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tab) {
                btn.classList.add('active');
            }
        });
        
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
            if (content.id === `tab${tab.charAt(0).toUpperCase() + tab.slice(1)}`) {
                content.classList.add('active');
            }
        });
    },

    /**
     * Render projects list
     */
    renderProjectsList() {
        const list = document.getElementById('projectsList');
        
        if (this.projects.length === 0) {
            list.innerHTML = '<p class="empty-state">No projects yet. Click "Add Project" to get started!</p>';
            return;
        }
        
        list.innerHTML = this.projects.map((project, index) => `
            <div class="project-card" data-index="${index}">
                <div class="project-card-header">
                    <span class="project-number">${project.number}</span>
                    <h3 class="project-title">${project.title}</h3>
                </div>
                <p class="project-description">${project.description}</p>
                <div class="project-tags-preview">
                    ${project.tags.map(tag => {
                        const iconUrl = typeof getTechIcon !== 'undefined' ? getTechIcon(tag) : null;
                        if (iconUrl) {
                            return `<span class="tag-preview"><img src="${iconUrl}" alt="${tag}" class="tag-icon">${tag}</span>`;
                        }
                        return `<span class="tag-preview">${tag}</span>`;
                    }).join('')}
                </div>
                <div class="project-card-actions">
                    <button class="btn btn-small btn-edit" onclick="Dashboard.editProject(${index})">Edit</button>
                    <button class="btn btn-small btn-delete" onclick="Dashboard.deleteProject(${index})">Delete</button>
                </div>
            </div>
        `).join('');
    },

    /**
     * Save project (add or update)
     */
    saveProject() {
        const form = document.getElementById('projectForm');
        const formData = new FormData(form);
        
        // Get image from path input (could be data URL or file path)
        const imagePathInput = document.getElementById('imagePathInput');
        let imageValue = imagePathInput.value.trim();
        
        // If empty, set to null
        if (!imageValue || imageValue === '') {
            imageValue = null;
        }
        
        const project = {
            number: formData.get('number'),
            title: formData.get('title'),
            description: formData.get('description'),
            tags: formData.get('tags').split(',').map(tag => tag.trim()).filter(tag => tag),
            link: formData.get('link') || '#',
            image: imageValue
        };
        
        const editIndex = form.dataset.editIndex;
        
        if (editIndex !== undefined) {
            // Update existing
            this.projects[parseInt(editIndex)] = project;
        } else {
            // Add new
            this.projects.push(project);
        }
        
        this.saveToConfig();
        this.renderProjectsList();
        this.resetForm();
        this.switchTab('list');
        this.showNotification('Project saved successfully!');
        
        // Auto reload after short delay
        setTimeout(() => {
            location.reload();
        }, 1000);
    },

    /**
     * Edit project
     */
    editProject(index) {
        const project = this.projects[index];
        const form = document.getElementById('projectForm');
        
        form.number.value = project.number;
        form.title.value = project.title;
        form.description.value = project.description;
        form.tags.value = project.tags.join(', ');
        form.link.value = project.link === '#' ? '' : project.link;
        
        // Handle image (could be data URL or path)
        const imagePathInput = document.getElementById('imagePathInput');
        if (project.image) {
            imagePathInput.value = project.image;
            // If it's a data URL, show preview
            if (project.image.startsWith('data:image/')) {
                this.displayImagePreview(project.image);
            } else {
                // If it's a path, clear preview
                this.clearImagePreview();
                imagePathInput.value = project.image;
            }
        } else {
            this.clearImagePreview();
        }
        
        form.dataset.editIndex = index;
        this.switchTab('add');
    },

    /**
     * Delete project
     */
    deleteProject(index) {
        if (confirm(`Delete project "${this.projects[index].title}"?`)) {
            this.projects.splice(index, 1);
            this.saveToConfig();
            this.renderProjectsList();
            this.showNotification('Project deleted!');
            
            // Auto reload after short delay
            setTimeout(() => {
                location.reload();
            }, 1000);
        }
    },

    /**
     * Setup image upload handlers
     */
    setupImageUpload() {
        const imageUpload = document.getElementById('imageUpload');
        const imageUploadArea = document.getElementById('imageUploadArea');
        const imagePreview = document.getElementById('imagePreview');
        const imagePlaceholder = document.getElementById('imagePlaceholder');
        const selectImageBtn = document.getElementById('selectImageBtn');
        const removeImageBtn = document.getElementById('removeImageBtn');
        const imagePathInput = document.getElementById('imagePathInput');
        
        // Click to select image
        selectImageBtn.addEventListener('click', () => {
            imageUpload.click();
        });
        
        // Click on upload area
        imageUploadArea.addEventListener('click', () => {
            imageUpload.click();
        });
        
        // File selected
        imageUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.handleImageFile(file);
            }
        });
        
        // Drag and drop
        imageUploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            imageUploadArea.classList.add('drag-over');
        });
        
        imageUploadArea.addEventListener('dragleave', () => {
            imageUploadArea.classList.remove('drag-over');
        });
        
        imageUploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            imageUploadArea.classList.remove('drag-over');
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                this.handleImageFile(file);
            } else {
                this.showNotification('Please select an image file');
            }
        });
        
        // Remove image
        removeImageBtn.addEventListener('click', () => {
            this.clearImagePreview();
        });
        
        // Image path input change
        imagePathInput.addEventListener('input', (e) => {
            if (e.target.value && !e.target.value.startsWith('data:')) {
                // If path is entered, clear uploaded image
                this.clearImagePreview();
            }
        });
    },

    /**
     * Handle image file upload
     */
    handleImageFile(file) {
        // Check file size (5MB max)
        const maxSize = typeof Constants !== 'undefined' 
            ? Constants.DEFAULTS.MAX_IMAGE_SIZE || 5 * 1024 * 1024
            : 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            this.showNotification('Image size must be less than 5MB');
            return;
        }
        
        // Check file type
        if (!file.type.startsWith('image/')) {
            this.showNotification('Please select an image file');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageDataUrl = e.target.result;
            this.displayImagePreview(imageDataUrl);
            // Set image path input to data URL
            document.getElementById('imagePathInput').value = imageDataUrl;
        };
        reader.onerror = () => {
            this.showNotification('Error reading image file');
        };
        reader.readAsDataURL(file);
    },

    /**
     * Display image preview
     */
    displayImagePreview(imageSrc) {
        const imagePreview = document.getElementById('imagePreview');
        const imagePlaceholder = document.getElementById('imagePlaceholder');
        const removeImageBtn = document.getElementById('removeImageBtn');
        
        imagePreview.src = imageSrc;
        imagePreview.style.display = 'block';
        imagePlaceholder.style.display = 'none';
        removeImageBtn.style.display = 'inline-block';
    },

    /**
     * Clear image preview
     */
    clearImagePreview() {
        const imageUpload = document.getElementById('imageUpload');
        const imagePreview = document.getElementById('imagePreview');
        const imagePlaceholder = document.getElementById('imagePlaceholder');
        const removeImageBtn = document.getElementById('removeImageBtn');
        const imagePathInput = document.getElementById('imagePathInput');
        
        imageUpload.value = '';
        imagePreview.style.display = 'none';
        imagePlaceholder.style.display = 'flex';
        removeImageBtn.style.display = 'none';
        imagePathInput.value = '';
    },

    /**
     * Reset form
     */
    resetForm() {
        const form = document.getElementById('projectForm');
        form.reset();
        delete form.dataset.editIndex;
        this.clearImagePreview();
    },

    /**
     * Save projects to local database and update CONFIG
     */
    saveToConfig() {
        // Save to local database (primary storage)
        this.saveProjectsToDB();
        
        // Update CONFIG if available
        if (typeof CONFIG !== 'undefined') {
            CONFIG.projects = this.projects;
        }
        
        // Trigger page reload to show changes
        this.updatePageProjects();
    },

    /**
     * Update projects on the page without full reload
     */
    updatePageProjects() {
        // Dispatch custom event to update projects on page
        const event = new CustomEvent('projectsUpdated', { 
            detail: { projects: this.projects } 
        });
        window.dispatchEvent(event);
    },


    /**
     * Generate config code (for manual download)
     */
    generateConfigCode() {
        const projectsCode = this.projects.map(project => {
            const tagsStr = project.tags.map(tag => `"${tag}"`).join(', ');
            const imageStr = project.image ? `"${project.image}"` : 'null';
            const linkStr = project.link !== '#' ? `"${project.link}"` : '"#"';
            
            return `        {
            number: "${project.number}",
            title: "${project.title.replace(/"/g, '\\"')}",
            description: "${project.description.replace(/"/g, '\\"')}",
            tags: [${tagsStr}],
            link: ${linkStr},
            image: ${imageStr}
        }`;
        }).join(',\n');
        
        // Get CONFIG data or use defaults
        const configData = typeof CONFIG !== 'undefined' ? CONFIG : {
            personal: { name: 'Your Name', role: 'Developer', bio: 'Your bio' },
            services: ['Web Development'],
            technologies: ['JavaScript'],
            social: {},
            meta: { title: 'Portfolio', description: 'My portfolio' },
            theme: { primary: '#ffffff', secondary: '#000000' }
        };
        
        return `// ============================================
// PORTFOLIO CONFIGURATION
// ============================================
// Auto-generated by Dashboard
// ============================================

const CONFIG = {
    // Personal Information
    personal: ${JSON.stringify(configData.personal, null, 4).replace(/^/gm, '    ')},
    
    // Services
    services: ${JSON.stringify(configData.services, null, 4).replace(/^/gm, '    ')},
    
    // Technologies
    technologies: ${JSON.stringify(configData.technologies, null, 4).replace(/^/gm, '    ')},
    
    // Projects
    projects: [
${projectsCode}
    ],
    
    // Social Links
    social: ${JSON.stringify(configData.social, null, 4).replace(/^/gm, '    ')},
    
    // Meta Information
    meta: ${JSON.stringify(configData.meta, null, 4).replace(/^/gm, '    ')},
    
    // Theme Colors
    theme: ${JSON.stringify(configData.theme, null, 4).replace(/^/gm, '    ')}
};`;
    },

    /**
     * Show notification
     */
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },

    /**
     * Handle GitHub sync
     */
    async handleGitHubSync() {
        const username = document.getElementById('githubUsername').value.trim();
        const token = document.getElementById('githubToken').value.trim();
        
        if (!username) {
            this.showNotification('Please enter GitHub username');
            return;
        }
        
        try {
            this.showNotification('Fetching repositories...');
            const repos = await GitSync.fetchGitHubRepos(username, token || null);
            
            // Save credentials
            GitSync.githubUsername = username;
            GitSync.githubToken = token || null;
            GitSync.saveCredentials();
            
            // Update form values
            document.getElementById('githubUsername').value = username;
            if (token) {
                document.getElementById('githubToken').value = token;
            }
            
            this.fetchedRepos = repos;
            this.renderReposList(repos);
            this.showNotification(`Found ${repos.length} repositories`);
        } catch (error) {
            this.showNotification(`Error: ${error.message}`);
            console.error('GitHub sync error:', error);
        }
    },

    /**
     * Handle GitLab sync
     */
    async handleGitLabSync() {
        const username = document.getElementById('gitlabUsername').value.trim();
        const token = document.getElementById('gitlabToken').value.trim();
        
        if (!username) {
            this.showNotification('Please enter GitLab username');
            return;
        }
        
        try {
            this.showNotification('Fetching repositories...');
            const repos = await GitSync.fetchGitLabRepos(username, token || null);
            
            // Save credentials
            GitSync.gitlabUsername = username;
            GitSync.gitlabToken = token || null;
            GitSync.saveCredentials();
            
            // Update form values
            document.getElementById('gitlabUsername').value = username;
            if (token) {
                document.getElementById('gitlabToken').value = token;
            }
            
            this.fetchedRepos = repos;
            this.renderReposList(repos);
            this.showNotification(`Found ${repos.length} repositories`);
        } catch (error) {
            this.showNotification(`Error: ${error.message}`);
            console.error('GitLab sync error:', error);
        }
    },

    /**
     * Handle sync all
     */
    async handleSyncAll() {
        if (!GitSync.githubUsername && !GitSync.gitlabUsername) {
            this.showNotification('Please configure GitHub or GitLab first');
            return;
        }
        
        try {
            this.showNotification('Syncing all repositories...');
            const result = await GitSync.syncAllRepos();
            this.showNotification(`Updated ${result.updated} projects from ${result.total} repositories`);
            
            // Reload page to show changes
            setTimeout(() => {
                location.reload();
            }, 1500);
        } catch (error) {
            this.showNotification(`Error: ${error.message}`);
            console.error('Sync all error:', error);
        }
    },

    /**
     * Render repositories list
     */
    renderReposList(repos) {
        const list = document.getElementById('reposList');
        
        if (repos.length === 0) {
            list.innerHTML = '<p class="empty-state">No repositories found</p>';
            return;
        }
        
        list.innerHTML = repos.map(repo => {
            const isImported = this.projects.some(p => p.repoUrl === repo.url);
            const technologies = [];
            if (repo.language) technologies.push(repo.language);
            if (repo.topics && repo.topics.length > 0) {
                technologies.push(...repo.topics.slice(0, 5));
            }
            
            return `
                <div class="repo-card ${isImported ? 'imported' : ''}">
                    <div class="repo-header">
                        <div class="repo-title">
                            <span class="repo-source">${repo.source === 'github' ? '🐙' : '🦊'}</span>
                            <h4>${repo.name}</h4>
                            ${isImported ? '<span class="repo-badge">Imported</span>' : ''}
                        </div>
                        <div class="repo-stats">
                            <span>⭐ ${repo.stars}</span>
                            <span>🍴 ${repo.forks}</span>
                        </div>
                    </div>
                    <p class="repo-description">${repo.description || 'No description'}</p>
                    <div class="repo-tech">
                        ${technologies.map(tech => {
                            const iconUrl = typeof getTechIcon !== 'undefined' ? getTechIcon(tech) : null;
                            if (iconUrl) {
                                return `<span class="tech-tag"><img src="${iconUrl}" alt="${tech}" class="tech-icon-small">${tech}</span>`;
                            }
                            return `<span class="tech-tag">${tech}</span>`;
                        }).join('')}
                    </div>
                    <div class="repo-actions">
                        <a href="${repo.url}" target="_blank" class="btn btn-small btn-secondary">View Repo</a>
                        <button class="btn btn-small btn-primary" onclick="Dashboard.importRepoFromList('${repo.url}')">
                            ${isImported ? 'Update' : 'Import'}
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    },

    /**
     * Import repository from list
     */
    importRepoFromList(repoUrl) {
        // Find repo in fetched repos
        const repo = this.fetchedRepos.find(r => r.url === repoUrl);
        
        if (!repo) {
            this.showNotification('Repository not found');
            return;
        }
        
        // Check if already exists
        const existing = this.projects.find(p => p.repoUrl === repoUrl);
        if (existing) {
            // Update existing
            const index = this.projects.indexOf(existing);
            const updated = GitSync.repoToProject(repo, existing.number);
            this.projects[index] = { ...existing, ...updated };
            this.showNotification('Repository updated successfully!');
        } else {
            // Import new
            const project = GitSync.repoToProject(repo);
            this.projects.push(project);
            this.showNotification('Repository imported successfully!');
        }
        
        this.saveToConfig();
        this.renderProjectsList();
        this.renderReposList(this.fetchedRepos); // Re-render to update badges
        
        setTimeout(() => {
            location.reload();
        }, 1000);
    }
};

// Auto-initialize dashboard after DOM and CONFIG are ready
// Only initialize if authenticated
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Wait for Auth to be available
        if (typeof Auth !== 'undefined' && Auth.isAuthenticated()) {
            if (typeof CONFIG !== 'undefined') {
                Dashboard.init();
            } else {
                setTimeout(() => {
                    if (typeof CONFIG !== 'undefined') {
                        Dashboard.init();
                    }
                }, 100);
            }
        }
    });
} else {
    // Wait for Auth to be available
    if (typeof Auth !== 'undefined' && Auth.isAuthenticated()) {
        if (typeof CONFIG !== 'undefined') {
            Dashboard.init();
        } else {
            setTimeout(() => {
                if (typeof CONFIG !== 'undefined') {
                    Dashboard.init();
                }
            }, 100);
        }
    }
}

