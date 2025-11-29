/**
 * ============================================
 * TIME DISPLAY HANDLER
 * ============================================
 * Handles time display in footer
 * ============================================
 * 
 * @namespace TimeDisplay
 */
const TimeDisplay = {
    /** @type {number|null} */
    intervalId: null,

    /**
     * Initialize time display
     * @param {number} [interval=60000] - Update interval in milliseconds (default: 1 minute)
     * @returns {boolean} True if initialization was successful
     */
    init(interval = 60000) {
        try {
            this.update();
            if (interval > 0) {
                this.intervalId = setInterval(() => this.update(), interval);
            }
            return true;
        } catch (error) {
            console.error('Error initializing time display:', error);
            return false;
        }
    },

    /**
     * Update time display
     * @returns {boolean} True if update was successful
     */
    update() {
        try {
            const timeElement = document.getElementById('currentTime');
            if (!timeElement) {
                return false;
            }
            
            timeElement.textContent = typeof formatTime === 'function' 
                ? formatTime() 
                : new Date().toLocaleTimeString();
            return true;
        } catch (error) {
            console.error('Error updating time display:', error);
            return false;
        }
    },

    /**
     * Cleanup interval
     */
    destroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
};

