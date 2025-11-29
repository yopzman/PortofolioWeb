/**
 * ============================================
 * UTILITY FUNCTIONS
 * ============================================
 * Shared utility functions used across the app
 * ============================================
 */

/**
 * Set or update meta tag in document head
 * @param {string} name - Meta tag name or property
 * @param {string} content - Meta tag content
 * @param {string} [attribute='name'] - Attribute type ('name' or 'property')
 * @returns {HTMLElement|null} The meta element or null if failed
 */
function setMetaTag(name, content, attribute = 'name') {
    if (!name || !content) {
        console.warn('setMetaTag: name and content are required');
        return null;
    }
    
    try {
        let meta = document.querySelector(`meta[${attribute}="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute(attribute, name);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
        return meta;
    } catch (error) {
        console.error('Error setting meta tag:', error);
        return null;
    }
}

/**
 * Format current time as string with timezone
 * @param {Date} [date] - Optional date object (defaults to current time)
 * @param {string} [timezone='GMT+7'] - Timezone string
 * @returns {string} Formatted time string (e.g., "12:35 PM — GMT+7")
 */
function formatTime(date = new Date(), timezone = 'GMT+7') {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        date = new Date();
    }
    
    try {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${displayHours}:${displayMinutes} ${ampm} — ${timezone}`;
    } catch (error) {
        console.error('Error formatting time:', error);
        return '—';
    }
}

/**
 * Smooth scroll to element by selector
 * @param {string} selector - CSS selector or element ID (with or without #)
 * @param {ScrollIntoViewOptions} [options] - Scroll options
 * @returns {boolean} True if scroll was successful
 */
function smoothScrollTo(selector, options = {}) {
    if (!selector) {
        console.warn('smoothScrollTo: selector is required');
        return false;
    }
    
    try {
        // Normalize selector (add # if missing for ID)
        const normalizedSelector = selector.startsWith('#') ? selector : `#${selector}`;
        const target = document.querySelector(normalizedSelector);
        
        if (!target) {
            console.warn(`smoothScrollTo: element not found: ${selector}`);
            return false;
        }
        
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            ...options
        });
        return true;
    } catch (error) {
        console.error('Error scrolling to element:', error);
        return false;
    }
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @param {number} [threshold=0] - Threshold offset in pixels
 * @returns {boolean} True if element is in viewport
 */
function isInViewport(element, threshold = 0) {
    if (!element || !(element instanceof HTMLElement)) {
        return false;
    }
    
    try {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        
        return (
            rect.top >= -threshold &&
            rect.left >= -threshold &&
            rect.bottom <= windowHeight + threshold &&
            rect.right <= windowWidth + threshold
        );
    } catch (error) {
        console.error('Error checking viewport:', error);
        return false;
    }
}

/**
 * Debounce function - delays execution until after wait time
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} [immediate=false] - If true, execute immediately on first call
 * @returns {Function} Debounced function
 */
function debounce(func, wait, immediate = false) {
    if (typeof func !== 'function') {
        throw new TypeError('debounce: first argument must be a function');
    }
    if (typeof wait !== 'number' || wait < 0) {
        throw new TypeError('debounce: wait must be a non-negative number');
    }
    
    let timeout;
    return function executedFunction(...args) {
        const context = this;
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        
        if (callNow) func.apply(context, args);
    };
}

/**
 * Throttle function - limits execution to once per time period
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    if (typeof func !== 'function') {
        throw new TypeError('throttle: first argument must be a function');
    }
    if (typeof limit !== 'number' || limit < 0) {
        throw new TypeError('throttle: limit must be a non-negative number');
    }
    
    let inThrottle;
    let lastResult;
    
    return function(...args) {
        const context = this;
        
        if (!inThrottle) {
            lastResult = func.apply(context, args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
        
        return lastResult;
    };
}

