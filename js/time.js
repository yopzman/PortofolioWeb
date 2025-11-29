// ============================================
// TIME DISPLAY HANDLER
// ============================================
// Handles time display in footer
// ============================================

const TimeDisplay = {
    intervalId: null,

    /**
     * Initialize time display
     */
    init() {
        this.update();
        this.intervalId = setInterval(() => this.update(), 60000);
    },

    /**
     * Update time display
     */
    update() {
        const timeElement = document.getElementById('currentTime');
        if (timeElement) {
            timeElement.textContent = formatTime();
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

