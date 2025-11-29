/**
 * ============================================
 * AUTHENTICATION SYSTEM
 * ============================================
 * Simple authentication using localStorage
 * ============================================
 * 
 * @namespace Auth
 */
const Auth = {
    // Credentials from environment variables
    // Loaded from js/env.js (git-ignored for security)
    credentials: {
        username: typeof Env !== 'undefined' ? Env.ADMIN_USERNAME : 'admin',
        password: typeof Env !== 'undefined' ? Env.ADMIN_PASSWORD : 'admin123'
    },
    
    // Session duration (24 hours)
    SESSION_DURATION: typeof Constants !== 'undefined' 
        ? Constants.SESSION_DURATION 
        : 24 * 60 * 60 * 1000,

    /**
     * Check if user is authenticated
     * @returns {boolean} True if user is authenticated and session is valid
     */
    isAuthenticated() {
        try {
            const storageKey = typeof Constants !== 'undefined' 
                ? Constants.STORAGE_KEYS.ADMIN_AUTH 
                : 'portfolio_admin_auth';
            const authData = localStorage.getItem(storageKey);
            
            if (!authData) {
                return false;
            }
            
            const data = JSON.parse(authData);
            
            // Validate data structure
            if (typeof data !== 'object' || data === null) {
                return false;
            }
            
            // Check if session is still valid
            const now = Date.now();
            if (typeof data.timestamp !== 'number' || now - data.timestamp > this.SESSION_DURATION) {
                this.logout();
                return false;
            }
            
            return data.authenticated === true;
        } catch (error) {
            console.error('Error checking authentication:', error);
            return false;
        }
    },

    /**
     * Login user
     * @param {string} username - Username
     * @param {string} password - Password
     * @returns {boolean} True if login was successful
     */
    login(username, password) {
        if (typeof username !== 'string' || typeof password !== 'string') {
            return false;
        }
        
        try {
            // Simple credential check (in production, use proper authentication)
            if (username === this.credentials.username && password === this.credentials.password) {
                const authData = {
                    authenticated: true,
                    username: username,
                    timestamp: Date.now()
                };
                const storageKey = typeof Constants !== 'undefined' 
                    ? Constants.STORAGE_KEYS.ADMIN_AUTH 
                    : 'portfolio_admin_auth';
                localStorage.setItem(storageKey, JSON.stringify(authData));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error during login:', error);
            return false;
        }
    },

    /**
     * Logout user
     */
    logout() {
        const storageKey = typeof Constants !== 'undefined' 
            ? Constants.STORAGE_KEYS.ADMIN_AUTH 
            : 'portfolio_admin_auth';
        localStorage.removeItem(storageKey);
    },

    /**
     * Get current user
     */
    getCurrentUser() {
        const storageKey = typeof Constants !== 'undefined' 
            ? Constants.STORAGE_KEYS.ADMIN_AUTH 
            : 'portfolio_admin_auth';
        const authData = localStorage.getItem(storageKey);
        if (!authData) return null;
        
        try {
            const data = JSON.parse(authData);
            return data.username || null;
        } catch (e) {
            return null;
        }
    },

    /**
     * Update credentials (for admin to change password)
     */
    updateCredentials(newUsername, newPassword) {
        this.credentials.username = newUsername;
        this.credentials.password = newPassword;
        // Note: In a real app, this should be stored securely on the server
        // For now, we'll store it in localStorage (not secure, but works for local use)
        const storageKey = typeof Constants !== 'undefined' 
            ? Constants.STORAGE_KEYS.ADMIN_CREDENTIALS 
            : 'portfolio_admin_credentials';
        localStorage.setItem(storageKey, JSON.stringify({
            username: newUsername,
            password: newPassword
        }));
    },

    /**
     * Load saved credentials
     */
    loadCredentials() {
        const storageKey = typeof Constants !== 'undefined' 
            ? Constants.STORAGE_KEYS.ADMIN_CREDENTIALS 
            : 'portfolio_admin_credentials';
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            try {
                const creds = JSON.parse(saved);
                this.credentials.username = creds.username;
                this.credentials.password = creds.password;
            } catch (e) {
                // Use defaults
            }
        }
    }
};

// Load saved credentials on init
Auth.loadCredentials();

