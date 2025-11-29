// ============================================
// CONSTANTS
// ============================================
// Application-wide constants
// ============================================

const Constants = {
    // Storage Keys
    STORAGE_KEYS: {
        PROJECTS_DB: 'portfolio_projects_db',
        ADMIN_AUTH: 'portfolio_admin_auth',
        GIT_CREDENTIALS: 'portfolio_git_credentials',
        ADMIN_CREDENTIALS: 'portfolio_admin_credentials'
    },
    
    // Session
    SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    
    // API Endpoints
    API: {
        GITHUB_BASE: 'https://api.github.com',
        GITLAB_BASE: 'https://gitlab.com/api/v4'
    },
    
    // Default Values
    DEFAULTS: {
        PROJECT_NUMBER_PADDING: 2,
        REPOS_PER_PAGE: 100,
        NOTIFICATION_DURATION: 3000,
        RELOAD_DELAY: 1000,
        MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
        ANIMATION_DELAY: 100
    },
    
    // Error Messages
    ERRORS: {
        CONFIG_NOT_FOUND: 'CONFIG not found! Make sure config.js is loaded before app.js',
        AUTH_NOT_LOADED: 'Auth system not loaded',
        USER_NOT_FOUND: 'User not found',
        RATE_LIMIT_EXCEEDED: 'Rate limit exceeded. Please use a token.',
        INVALID_CREDENTIALS: 'Invalid username or password'
    }
};

