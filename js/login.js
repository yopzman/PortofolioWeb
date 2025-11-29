/**
 * ============================================
 * LOGIN PAGE LOGIC
 * ============================================
 */

document.addEventListener('DOMContentLoaded', () => {
    try {
        const loginForm = document.getElementById('loginForm');
        const errorMessage = document.getElementById('loginError');
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');

        if (!loginForm || !errorMessage || !usernameInput || !passwordInput) {
            console.error('Login page: Required elements not found');
            return;
        }

        // Check if already logged in
        if (typeof Auth !== 'undefined' && Auth.isAuthenticated()) {
            window.location.href = 'index.html';
            return;
        }

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = usernameInput.value.trim();
            const password = passwordInput.value;

            // Validate input
            if (!username || !password) {
                showError('Please enter both username and password');
                return;
            }

            // Clear previous error
            hideError();

            // Attempt login
            if (typeof Auth !== 'undefined' && Auth.login(username, password)) {
                // Success - redirect to main page
                window.location.href = 'index.html';
            } else {
                // Show error
                const errorMsg = typeof Constants !== 'undefined' 
                    ? Constants.ERRORS.INVALID_CREDENTIALS 
                    : 'Invalid username or password';
                showError(errorMsg);
                
                // Clear password field
                passwordInput.value = '';
                passwordInput.focus();
            }
        });

        // Focus on username field
        usernameInput.focus();
    } catch (error) {
        console.error('Error initializing login page:', error);
    }
});

/**
 * Show error message
 * @param {string} message - Error message
 */
function showError(message) {
    const errorMessage = document.getElementById('loginError');
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
    }
}

/**
 * Hide error message
 */
function hideError() {
    const errorMessage = document.getElementById('loginError');
    if (errorMessage) {
        errorMessage.classList.remove('show');
        errorMessage.textContent = '';
    }
}

