// ============================================
// TECHNOLOGY ICONS MAPPING
// ============================================
// Maps technology names to their icon URLs
// Uses Simple Icons (https://simpleicons.org/)
// ============================================

const TECH_ICONS = {
    // JavaScript & TypeScript
    'javascript': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/javascript.svg',
    'js': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/javascript.svg',
    'typescript': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/typescript.svg',
    'ts': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/typescript.svg',
    
    // Frontend Frameworks
    'react': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg',
    'vue': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/vuedotjs.svg',
    'vue.js': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/vuedotjs.svg',
    'angular': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/angular.svg',
    'svelte': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/svelte.svg',
    
    // Meta Frameworks
    'next.js': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nextdotjs.svg',
    'nextjs': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nextdotjs.svg',
    'nuxt': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nuxtdotjs.svg',
    'nuxt.js': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nuxtdotjs.svg',
    'astro': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/astro.svg',
    'remix': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/remix.svg',
    'gatsby': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/gatsby.svg',
    
    // CSS Frameworks
    'tailwind': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tailwindcss.svg',
    'tailwindcss': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tailwindcss.svg',
    'bootstrap': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/bootstrap.svg',
    'sass': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/sass.svg',
    'scss': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/sass.svg',
    'css3': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/css3.svg',
    'css': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/css3.svg',
    'html5': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/html5.svg',
    'html': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/html5.svg',
    
    // Animation Libraries
    'gsap': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/greensock.svg',
    'framer': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/framer.svg',
    'framer-motion': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/framer.svg',
    'lenis': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/lenis.svg',
    
    // 3D & Graphics
    'three.js': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/threedotjs.svg',
    'threejs': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/threedotjs.svg',
    'blender': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/blender.svg',
    
    // Backend & Databases
    'node.js': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nodedotjs.svg',
    'nodejs': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nodedotjs.svg',
    'node': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nodedotjs.svg',
    'express': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/express.svg',
    'python': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/python.svg',
    'php': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/php.svg',
    'postgresql': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/postgresql.svg',
    'mysql': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/mysql.svg',
    'mongodb': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/mongodb.svg',
    'firebase': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/firebase.svg',
    'supabase': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/supabase.svg',
    
    // Cloud & Hosting
    'vercel': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/vercel.svg',
    'netlify': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/netlify.svg',
    'aws': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/amazonaws.svg',
    'docker': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/docker.svg',
    
    // Tools & Others
    'git': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/git.svg',
    'github': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg',
    'gitlab': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/gitlab.svg',
    'figma': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/figma.svg',
    'adobe': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/adobe.svg',
    'photoshop': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/adobephotoshop.svg',
    'illustrator': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/adobeillustrator.svg',
    'xd': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/adobexd.svg',
    
    // Additional popular tech
    'webpack': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/webpack.svg',
    'vite': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/vite.svg',
    'npm': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/npm.svg',
    'yarn': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/yarn.svg',
    'redux': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/redux.svg',
    'zustand': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/zustand.svg',
    'prisma': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/prisma.svg',
    'graphql': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/graphql.svg',
    'rest': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/rest.svg',
    'jest': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/jest.svg',
    'cypress': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/cypress.svg',
};

/**
 * Get icon URL for a technology
 * @param {string} techName - Technology name
 * @returns {string|null} Icon URL or null if not found
 */
function getTechIcon(techName) {
    if (!techName) return null;
    
    const normalized = techName.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
    
    // Try exact match first
    if (TECH_ICONS[techName.toLowerCase()]) {
        return TECH_ICONS[techName.toLowerCase()];
    }
    
    // Try normalized match
    if (TECH_ICONS[normalized]) {
        return TECH_ICONS[normalized];
    }
    
    // Try partial match
    for (const [key, value] of Object.entries(TECH_ICONS)) {
        if (key.includes(normalized) || normalized.includes(key)) {
            return value;
        }
    }
    
    return null;
}

/**
 * Create icon element for a technology
 * @param {string} techName - Technology name
 * @returns {HTMLElement} Icon element or fallback text
 */
function createTechIcon(techName) {
    const iconUrl = getTechIcon(techName);
    
    if (iconUrl) {
        const icon = document.createElement('img');
        icon.src = iconUrl;
        icon.alt = techName;
        icon.className = 'tech-icon';
        icon.loading = 'lazy';
        icon.onerror = function() {
            this.style.display = 'none';
            const fallback = document.createElement('span');
            fallback.textContent = techName;
            fallback.className = 'tech-icon-fallback';
            this.parentNode.appendChild(fallback);
        };
        return icon;
    }
    
    const fallback = document.createElement('span');
    fallback.textContent = techName;
    fallback.className = 'tech-icon-fallback';
    return fallback;
}

