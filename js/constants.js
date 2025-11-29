/**
 * ============================================
 * CONSTANTS
 * ============================================
 * Application-wide constants and configuration
 * ============================================
 * 
 * @namespace Constants
 */
const Constants = {
    /**
     * LocalStorage keys for data persistence
     * @type {Object<string, string>}
     */
    STORAGE_KEYS: {
        PROJECTS_DB: 'portfolio_projects_db',
        ADMIN_AUTH: 'portfolio_admin_auth',
        GIT_CREDENTIALS: 'portfolio_git_credentials',
        ADMIN_CREDENTIALS: 'portfolio_admin_credentials'
    },
    
    /**
     * Session duration in milliseconds (24 hours)
     * @type {number}
     */
    SESSION_DURATION: 24 * 60 * 60 * 1000,
    
    /**
     * API endpoints for external services
     * @type {Object<string, string>}
     */
    API: {
        GITHUB_BASE: 'https://api.github.com',
        GITLAB_BASE: 'https://gitlab.com/api/v4'
    },
    
    /**
     * Default values used throughout the application
     * @type {Object<string, number>}
     */
    DEFAULTS: {
        PROJECT_NUMBER_PADDING: 2,
        REPOS_PER_PAGE: 100,
        NOTIFICATION_DURATION: 3000,
        RELOAD_DELAY: 1000,
        MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
        ANIMATION_DELAY: 100
    },
    
    /**
     * Error messages for user-facing errors
     * @type {Object<string, string>}
     */
    ERRORS: {
        CONFIG_NOT_FOUND: 'CONFIG not found! Make sure config.js is loaded before app.js',
        AUTH_NOT_LOADED: 'Auth system not loaded',
        USER_NOT_FOUND: 'User not found',
        RATE_LIMIT_EXCEEDED: 'Rate limit exceeded. Please use a token.',
        INVALID_CREDENTIALS: 'Invalid username or password',
        NETWORK_ERROR: 'Network error. Please check your connection.',
        INVALID_DATA: 'Invalid data format',
        STORAGE_ERROR: 'Failed to save data to storage'
    }
};

