// ============================================
// LOGIN PAGE LOGIC
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('loginError');

    // Check if already logged in
    if (Auth.isAuthenticated()) {
        // Redirect to main page
        window.location.href = 'index.html';
        return;
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        // Clear previous error
        errorMessage.classList.remove('show');
        errorMessage.textContent = '';

        // Attempt login
        if (Auth.login(username, password)) {
            // Success - redirect to main page
            window.location.href = 'index.html';
        } else {
            // Show error
            errorMessage.textContent = 'Invalid username or password';
            errorMessage.classList.add('show');
            
            // Clear password field
            document.getElementById('password').value = '';
        }
    });

    // Focus on username field
    document.getElementById('username').focus();
});

