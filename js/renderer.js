// ============================================
// CONTENT RENDERER
// ============================================
// Handles rendering of all dynamic content
// ============================================

const Renderer = {
    /**
     * Render all content sections
     */
    renderAll() {
        this.updateMetaTags();
        this.updateHero();
        this.updateAbout();
        this.updateProjects();
        this.updateContact();
        
        // Listen for projects updates from dashboard
        window.addEventListener('projectsUpdated', (e) => {
            this.updateProjects();
        });
    },

    /**
     * Update meta tags for SEO
     */
    updateMetaTags() {
        if (typeof CONFIG === 'undefined' || !CONFIG.meta) return;
        
        document.title = CONFIG.meta.title;
        setMetaTag('description', CONFIG.meta.description);
        setMetaTag('keywords', CONFIG.meta.keywords);
        setMetaTag('author', CONFIG.meta.author);
        setMetaTag('og:title', CONFIG.meta.title, 'property');
        setMetaTag('og:description', CONFIG.meta.description, 'property');
        
        if (CONFIG.meta.ogImage) {
            setMetaTag('og:image', CONFIG.meta.ogImage, 'property');
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
     */
    updateProjects() {
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid) return;
        
        // Try to load from local database first
        let projects = [];
        const savedProjects = localStorage.getItem('portfolio_projects_db');
        if (savedProjects) {
            try {
                projects = JSON.parse(savedProjects);
            } catch (e) {
                console.error('Error loading projects from localStorage:', e);
            }
        }
        
        // Fallback to CONFIG if no local database
        if (projects.length === 0 && typeof CONFIG !== 'undefined' && CONFIG.projects) {
            projects = CONFIG.projects;
        }
        
        if (projects.length === 0) return;
        
        projectsGrid.innerHTML = projects.map(project => `
            <div class="project-item" data-project="${project.number}">
                <div class="project-image">
                    ${project.image 
                        ? `<img src="${project.image}" alt="${project.title}" loading="lazy" />`
                        : '<div class="project-placeholder"></div>'
                    }
                </div>
                <div class="project-info">
                    <div class="project-number">${project.number}</div>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => {
                            const iconUrl = typeof getTechIcon !== 'undefined' ? getTechIcon(tag) : null;
                            if (iconUrl) {
                                return `<span class="tag tag-with-icon">
                                    <img src="${iconUrl}" alt="${tag}" class="tech-icon" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';">
                                    <span class="tech-icon-fallback" style="display:none;">${tag}</span>
                                </span>`;
                            }
                            return `<span class="tag">${tag}</span>`;
                        }).join('')}
                    </div>
                    <a href="${project.link}" class="project-link" ${project.link === '#' ? 'onclick="return false;"' : ''} target="${project.link !== '#' ? '_blank' : '_self'}" rel="noopener">view project →</a>
                </div>
            </div>
        `).join('');
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

