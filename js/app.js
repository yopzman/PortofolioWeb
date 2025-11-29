/**
 * ============================================
 * MAIN APPLICATION
 * ============================================
 * Initializes and coordinates all modules
 * ============================================
 */

/**
 * Initialize application
 * @returns {boolean} True if initialization was successful
 */
function initializeApp() {
    // Check if config is loaded
    if (typeof CONFIG === 'undefined') {
        const errorMsg = typeof Constants !== 'undefined' 
            ? Constants.ERRORS.CONFIG_NOT_FOUND 
            : 'CONFIG not found! Make sure config.js is loaded before app.js';
        console.error(errorMsg);
        return false;
    }

    try {
        // Initialize all modules
        const results = {
            renderer: typeof Renderer !== 'undefined' ? Renderer.renderAll() : false,
            navigation: typeof Navigation !== 'undefined' ? Navigation.init() : false,
            animations: typeof Animations !== 'undefined' ? Animations.init() : false,
            timeDisplay: typeof TimeDisplay !== 'undefined' ? TimeDisplay.init() : false
        };
        
        // Re-observe projects after render (in case projects are rendered dynamically)
        if (results.renderer && typeof Animations !== 'undefined') {
            setTimeout(() => {
                Animations.observeProjects();
                Animations.setupProjectHover();
            }, typeof Constants !== 'undefined' 
                ? Constants.DEFAULTS.ANIMATION_DELAY 
                : 100);
        }
        
        const allSuccess = Object.values(results).every(result => result === true);
        if (!allSuccess) {
            console.warn('Some modules failed to initialize:', results);
        }
        
        return allSuccess;
    } catch (error) {
        console.error('Error initializing application:', error);
        return false;
    }
}

// Wait for DOM to load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

