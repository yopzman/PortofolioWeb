// ============================================
// NAVIGATION HANDLER
// ============================================
// Handles all navigation-related functionality
// ============================================

const Navigation = {
    /**
     * Initialize navigation
     */
    init() {
        this.setupSmoothScroll();
        this.setupMobileMenu();
        this.setupNavBackground();
        this.setupActiveLinks();
    },

    /**
     * Setup smooth scroll for anchor links
     */
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    smoothScrollTo(anchor.getAttribute('href'));
                    const navMenu = document.getElementById('navMenu');
                    if (navMenu) {
                        navMenu.classList.remove('active');
                    }
                }
            });
        });
    },

    /**
     * Setup mobile menu toggle
     */
    setupMobileMenu() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }
    },

    /**
     * Setup navigation background on scroll
     */
    setupNavBackground() {
        const nav = document.getElementById('nav');
        if (!nav) return;
        
        const handleScroll = throttle(() => {
            if (window.pageYOffset > 100) {
                nav.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
            } else {
                nav.style.backgroundColor = 'rgba(10, 10, 10, 0.8)';
            }
        }, 10);
        
        window.addEventListener('scroll', handleScroll);
    },

    /**
     * Setup active navigation link highlighting
     */
    setupActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (sections.length === 0 || navLinks.length === 0) return;
        
        const handleScroll = throttle(() => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }, 100);
        
        window.addEventListener('scroll', handleScroll);
    }
};

