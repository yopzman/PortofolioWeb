/**
 * ============================================
 * ANIMATIONS HANDLER
 * ============================================
 * Handles all animation-related functionality
 * ============================================
 * 
 * @namespace Animations
 */
const Animations = {
    /** @type {IntersectionObserver|null} */
    observer: null,

    /**
     * Initialize all animations
     * @returns {boolean} True if initialization was successful
     */
    init() {
        try {
            this.setupScrollAnimations();
            this.setupProjectHover();
            this.setupParallax();
            this.setupCursor();
            this.setupPageLoad();
            return true;
        } catch (error) {
            console.error('Error initializing animations:', error);
            return false;
        }
    },

    /**
     * Setup scroll-triggered animations using Intersection Observer
     */
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Observe project items
        this.observeProjects();
    },

    /**
     * Observe project items for scroll animations
     * @returns {number} Number of items being observed
     */
    observeProjects() {
        try {
            const items = document.querySelectorAll('.project-item');
            if (!this.observer || items.length === 0) {
                return 0;
            }
            
            items.forEach(item => {
                this.observer.observe(item);
            });
            
            return items.length;
        } catch (error) {
            console.error('Error observing projects:', error);
            return 0;
        }
    },
    
    /**
     * Cleanup observer
     */
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
    },

    /**
     * Setup project hover animations
     */
    setupProjectHover() {
        document.querySelectorAll('.project-item').forEach(item => {
            const image = item.querySelector('.project-image img, .project-placeholder');
            
            if (image) {
                item.addEventListener('mouseenter', () => {
                    image.style.transform = 'scale(1.05)';
                });
                
                item.addEventListener('mouseleave', () => {
                    image.style.transform = 'scale(1)';
                });
            }
        });
    },

    /**
     * Setup parallax effect for hero section
     */
    setupParallax() {
        const handleScroll = throttle(() => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                hero.style.opacity = Math.max(0, 1 - scrolled / 500);
            }
        }, 10);
        
        window.addEventListener('scroll', handleScroll);
    },

    /**
     * Setup custom cursor (desktop only)
     */
    setupCursor() {
        if (window.innerWidth <= 768) return;
        
        const cursor = this.createCursor();
        const cursorFollower = this.createCursorFollower();
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX - 10}px`;
            cursor.style.top = `${e.clientY - 10}px`;
            
            setTimeout(() => {
                cursorFollower.style.left = `${e.clientX - 4}px`;
                cursorFollower.style.top = `${e.clientY - 4}px`;
            }, 50);
        });
        
        this.setupCursorHover(cursor);
    },

    /**
     * Create cursor element
     */
    createCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            width: 20px;
            height: 20px;
            border: 1px solid rgba(245, 245, 245, 0.5);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(cursor);
        return cursor;
    },

    /**
     * Create cursor follower element
     */
    createCursorFollower() {
        const follower = document.createElement('div');
        follower.className = 'cursor-follower';
        follower.style.cssText = `
            width: 8px;
            height: 8px;
            background-color: rgba(245, 245, 245, 0.8);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.15s ease;
        `;
        document.body.appendChild(follower);
        return follower;
    },

    /**
     * Setup cursor hover effects
     */
    setupCursorHover(cursor) {
        document.querySelectorAll('a, button, .project-item').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.borderColor = 'rgba(245, 245, 245, 1)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = 'rgba(245, 245, 245, 0.5)';
            });
        });
    },

    /**
     * Setup page load animation
     */
    setupPageLoad() {
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '1';
            }, 100);
        });
    }
};

