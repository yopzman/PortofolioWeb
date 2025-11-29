/**
 * ============================================
 * CONTENT RENDERER
 * ============================================
 * Handles rendering of all dynamic content sections
 * ============================================
 * 
 * @namespace Renderer
 */
const Renderer = {
    /**
     * Render all content sections
     * @returns {boolean} True if rendering was successful
     */
    renderAll() {
        try {
            this.updateMetaTags();
            this.updateHero();
            this.updateAbout();
            this.updateProjects();
            this.updateContact();
            
            // Listen for projects updates from dashboard
            window.addEventListener('projectsUpdated', () => {
                this.updateProjects();
            });
            
            return true;
        } catch (error) {
            console.error('Error rendering content:', error);
            return false;
        }
    },

    /**
     * Update meta tags for SEO
     * @returns {boolean} True if meta tags were updated
     */
    updateMetaTags() {
        if (typeof CONFIG === 'undefined' || !CONFIG.meta) {
            console.warn('Renderer.updateMetaTags: CONFIG.meta not found');
            return false;
        }
        
        try {
            const { meta } = CONFIG;
            
            if (meta.title) {
                document.title = meta.title;
            }
            
            if (meta.description) {
                setMetaTag('description', meta.description);
                setMetaTag('og:description', meta.description, 'property');
            }
            
            if (meta.keywords) {
                setMetaTag('keywords', meta.keywords);
            }
            
            if (meta.author) {
                setMetaTag('author', meta.author);
            }
            
            if (meta.title) {
                setMetaTag('og:title', meta.title, 'property');
            }
            
            if (meta.ogImage) {
                setMetaTag('og:image', meta.ogImage, 'property');
            }
            
            return true;
        } catch (error) {
            console.error('Error updating meta tags:', error);
            return false;
        }
    },

    /**
     * Update hero section
     */
    updateHero() {
        if (typeof CONFIG === 'undefined' || !CONFIG.personal) return;
        
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.innerHTML = `
                <span class="line">hello I'm</span>
                <span class="line highlight">${CONFIG.personal.name}</span>
                <span class="line">— ${CONFIG.personal.title}</span>
                <span class="line">based in <span class="location">${CONFIG.personal.location}</span></span>
            `;
        }
    },

    /**
     * Update about section
     */
    updateAbout() {
        if (typeof CONFIG === 'undefined') return;
        
        // Update bio
        const aboutText = document.querySelector('.about-text');
        if (aboutText && CONFIG.personal?.bio) {
            aboutText.innerHTML = CONFIG.personal.bio.map(bio => 
                `<p class="about-bio">${bio}</p>`
            ).join('');
        }
        
        // Update services
        const servicesValue = document.querySelector('.detail-item:first-child .detail-value');
        if (servicesValue && CONFIG.services?.items) {
            servicesValue.innerHTML = CONFIG.services.items.join(',<br>');
        }
        
        // Update technologies with icons
        const techValue = document.querySelector('.detail-item:last-child .detail-value');
        if (techValue && CONFIG.technologies?.items) {
            techValue.innerHTML = CONFIG.technologies.items.map(tech => {
                const iconUrl = typeof getTechIcon !== 'undefined' ? getTechIcon(tech) : null;
                if (iconUrl) {
                    return `<span class="tech-item">
                        <img src="${iconUrl}" alt="${tech}" class="tech-icon-small" loading="lazy" onerror="this.style.display='none';">
                        <span>${tech}</span>
                    </span>`;
                }
                return `<span class="tech-item">${tech}</span>`;
            }).join('<br>');
        }
    },

    /**
     * Update projects section
     * Loads from local database (localStorage) first, then falls back to CONFIG
     * @returns {boolean} True if projects were rendered
     */
    updateProjects() {
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid) {
            console.warn('Renderer.updateProjects: .projects-grid not found');
            return false;
        }
        
        try {
            // Try to load from local database first
            let projects = [];
            const storageKey = typeof Constants !== 'undefined' 
                ? Constants.STORAGE_KEYS.PROJECTS_DB 
                : 'portfolio_projects_db';
            const savedProjects = localStorage.getItem(storageKey);
            
            if (savedProjects) {
                try {
                    projects = JSON.parse(savedProjects);
                    if (!Array.isArray(projects)) {
                        throw new Error('Projects data is not an array');
                    }
                } catch (e) {
                    console.error('Error loading projects from localStorage:', e);
                    projects = [];
                }
            }
            
            // Fallback to CONFIG if no local database
            if (projects.length === 0 && typeof CONFIG !== 'undefined' && CONFIG.projects) {
                projects = Array.isArray(CONFIG.projects) ? CONFIG.projects : [];
            }
            
            if (projects.length === 0) {
                projectsGrid.innerHTML = '<p class="no-projects">No projects available</p>';
                return false;
            }
            
            projectsGrid.innerHTML = projects.map(project => this.renderProjectItem(project)).join('');
            return true;
        } catch (error) {
            console.error('Error updating projects:', error);
            projectsGrid.innerHTML = '<p class="error">Error loading projects</p>';
            return false;
        }
    },

    /**
     * Render a single project item
     * @param {Object} project - Project object
     * @returns {string} HTML string for project item
     */
    renderProjectItem(project) {
        if (!project || typeof project !== 'object') {
            return '';
        }
        
        const {
            number = '',
            title = 'Untitled Project',
            description = '',
            tags = [],
            link = '#',
            image = null
        } = project;
        
        const imageHtml = image 
            ? `<img src="${this.escapeHtml(image)}" alt="${this.escapeHtml(title)}" loading="lazy" />`
            : '<div class="project-placeholder"></div>';
        
        const tagsHtml = Array.isArray(tags) ? tags.map(tag => {
            const iconUrl = typeof getTechIcon !== 'undefined' ? getTechIcon(tag) : null;
            if (iconUrl) {
                return `<span class="tag tag-with-icon">
                    <img src="${this.escapeHtml(iconUrl)}" alt="${this.escapeHtml(tag)}" class="tech-icon" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';">
                    <span class="tech-icon-fallback" style="display:none;">${this.escapeHtml(tag)}</span>
                </span>`;
            }
            return `<span class="tag">${this.escapeHtml(tag)}</span>`;
        }).join('') : '';
        
        const linkAttrs = link === '#' 
            ? 'onclick="return false;"'
            : `target="_blank" rel="noopener noreferrer"`;
        
        return `
            <div class="project-item" data-project="${this.escapeHtml(number)}">
                <div class="project-image">
                    ${imageHtml}
                </div>
                <div class="project-info">
                    <div class="project-number">${this.escapeHtml(number)}</div>
                    <h3 class="project-title">${this.escapeHtml(title)}</h3>
                    <p class="project-description">${this.escapeHtml(description)}</p>
                    <div class="project-tags">
                        ${tagsHtml}
                    </div>
                    <a href="${this.escapeHtml(link)}" class="project-link" ${linkAttrs}>view project →</a>
                </div>
            </div>
        `;
    },

    /**
     * Escape HTML to prevent XSS attacks
     * @param {string} text - Text to escape
     * @returns {string} Escaped HTML string
     */
    escapeHtml(text) {
        if (typeof text !== 'string') {
            return String(text || '');
        }
        
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * Update contact section
     */
    updateContact() {
        if (typeof CONFIG === 'undefined' || !CONFIG.personal || !CONFIG.social) return;
        
        // Update email
        const contactEmail = document.querySelector('.contact-email');
        if (contactEmail && CONFIG.personal.email) {
            contactEmail.href = `mailto:${CONFIG.personal.email}`;
            contactEmail.textContent = CONFIG.personal.email;
        }
        
        // Update social links
        const socialLinks = document.querySelector('.contact-social');
        if (socialLinks) {
            const links = [];
            const socialPlatforms = ['instagram', 'linkedin', 'github', 'twitter', 'behance', 'dribbble'];
            
            socialPlatforms.forEach(platform => {
                if (CONFIG.social[platform]) {
                    links.push(`<a href="${CONFIG.social[platform]}" class="social-link" target="_blank" rel="noopener">${platform}</a>`);
                }
            });
            
            socialLinks.innerHTML = links.join('');
        }
    }
};

