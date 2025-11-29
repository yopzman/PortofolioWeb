/**
 * ============================================
 * NAVIGATION HANDLER
 * ============================================
 * Handles all navigation-related functionality
 * ============================================
 * 
 * @namespace Navigation
 */
const Navigation = {
    /**
     * Initialize navigation
     * @returns {boolean} True if initialization was successful
     */
    init() {
        try {
            this.setupSmoothScroll();
            this.setupMobileMenu();
            this.setupNavBackground();
            this.setupActiveLinks();
            return true;
        } catch (error) {
            console.error('Error initializing navigation:', error);
            return false;
        }
    },

    /**
     * Setup smooth scroll for anchor links
     * @returns {boolean} True if setup was successful
     */
    setupSmoothScroll() {
        try {
            const anchors = document.querySelectorAll('a[href^="#"]');
            if (anchors.length === 0) {
                return false;
            }
            
            anchors.forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    e.preventDefault();
                    const href = anchor.getAttribute('href');
                    if (href && smoothScrollTo(href)) {
                        // Close mobile menu if open
                        const navMenu = document.getElementById('navMenu');
                        if (navMenu && navMenu.classList.contains('active')) {
                            navMenu.classList.remove('active');
                        }
                    }
                });
            });
            return true;
        } catch (error) {
            console.error('Error setting up smooth scroll:', error);
            return false;
        }
    },

    /**
     * Setup mobile menu toggle
     * @returns {boolean} True if setup was successful
     */
    setupMobileMenu() {
        try {
            const navToggle = document.getElementById('navToggle');
            const navMenu = document.getElementById('navMenu');
            
            if (!navToggle || !navMenu) {
                return false;
            }
            
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
            return true;
        } catch (error) {
            console.error('Error setting up mobile menu:', error);
            return false;
        }
    },

    /**
     * Setup navigation background on scroll
     * @returns {boolean} True if setup was successful
     */
    setupNavBackground() {
        try {
            const nav = document.getElementById('nav');
            if (!nav) {
                return false;
            }
            
            const handleScroll = throttle(() => {
                const scrollY = window.pageYOffset || window.scrollY || 0;
                nav.style.backgroundColor = scrollY > 100 
                    ? 'rgba(10, 10, 10, 0.95)' 
                    : 'rgba(10, 10, 10, 0.8)';
            }, 10);
            
            window.addEventListener('scroll', handleScroll, { passive: true });
            return true;
        } catch (error) {
            console.error('Error setting up nav background:', error);
            return false;
        }
    },

    /**
     * Setup active navigation link highlighting
     * @returns {boolean} True if setup was successful
     */
    setupActiveLinks() {
        try {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            
            if (sections.length === 0 || navLinks.length === 0) {
                return false;
            }
            
            const handleScroll = throttle(() => {
                const scrollY = window.pageYOffset || window.scrollY || 0;
                let current = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionId = section.getAttribute('id');
                    if (scrollY >= sectionTop - 200 && sectionId) {
                        current = sectionId;
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    if (href === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            }, 100);
            
            window.addEventListener('scroll', handleScroll, { passive: true });
            return true;
        } catch (error) {
            console.error('Error setting up active links:', error);
            return false;
        }
    }
};

