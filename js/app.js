// ============================================
// MAIN APPLICATION
// ============================================
// Initializes and coordinates all modules
// ============================================

/**
 * Initialize application
 * @throws {Error} If CONFIG is not defined
 */
function initializeApp() {
    // Check if config is loaded
    if (typeof CONFIG === 'undefined') {
        const errorMsg = typeof Constants !== 'undefined' 
            ? Constants.ERRORS.CONFIG_NOT_FOUND 
            : 'CONFIG not found! Make sure config.js is loaded before app.js';
        console.error(errorMsg);
        return;
    }

    try {
        // Initialize all modules
        Renderer.renderAll();
        Navigation.init();
        Animations.init();
        TimeDisplay.init();
        
        // Re-observe projects after render (in case projects are rendered dynamically)
        setTimeout(() => {
            Animations.observeProjects();
            Animations.setupProjectHover();
        }, 100);
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}

// Wait for DOM to load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

