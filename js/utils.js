// ============================================
// UTILITY FUNCTIONS
// ============================================
// Shared utility functions used across the app
// ============================================

/**
 * Set or update meta tag
 * @param {string} name - Meta tag name
 * @param {string} content - Meta tag content
 * @param {string} attribute - Attribute type ('name' or 'property')
 */
function setMetaTag(name, content, attribute = 'name') {
    let meta = document.querySelector(`meta[${attribute}="${name}"]`);
    if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
}

/**
 * Format time string
 * @returns {string} Formatted time string
 */
function formatTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${displayHours}:${displayMinutes} ${ampm} — GMT+7`;
}

/**
 * Smooth scroll to element
 * @param {string} selector - CSS selector
 */
function smoothScrollTo(selector) {
    const target = document.querySelector(selector);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in ms
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

