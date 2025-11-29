const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

// Configuration untuk obfuscation
const obfuscationOptions = {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: false, // Set true untuk production (akan membuat debugger crash)
    debugProtectionInterval: 0,
    disableConsoleOutput: false, // Set true untuk hide console.log
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: true,
    renameGlobals: false,
    selfDefending: true, // Mencegah code di-format ulang
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 10,
    stringArray: true,
    stringArrayCallsTransform: true,
    stringArrayEncoding: ['base64'],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 2,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 4,
    stringArrayWrappersType: 'function',
    stringArrayThreshold: 0.75,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
};

// Load environment variables from .env file
function loadEnvFile() {
    const envPath = path.join(__dirname, '..', '.env');
    const env = {};
    
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        envContent.split('\n').forEach(line => {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
                const [key, ...valueParts] = trimmed.split('=');
                if (key && valueParts.length > 0) {
                    env[key.trim()] = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
                }
            }
        });
    }
    
    return env;
}

// Generate env.js from .env file or use existing env.js
function generateEnvFile(distJsDir) {
    const env = loadEnvFile();
    const envJsPath = path.join(__dirname, '..', 'js', 'env.js');
    const distEnvJsPath = path.join(distJsDir, 'env.js');
    
    let envCode = `// ============================================
// ENVIRONMENT VARIABLES (Generated from .env)
// ============================================
// ⚠️ This file contains sensitive credentials
// ============================================

const Env = {
    ADMIN_USERNAME: '${env.ADMIN_USERNAME || 'admin'}',
    ADMIN_PASSWORD: '${env.ADMIN_PASSWORD || 'admin123'}',
    GITHUB_TOKEN: '${env.GITHUB_TOKEN || ''}',
    GITLAB_TOKEN: '${env.GITLAB_TOKEN || ''}'
};`;

    // If env.js exists, use it (for development)
    if (fs.existsSync(envJsPath)) {
        const existingEnv = fs.readFileSync(envJsPath, 'utf8');
        // Extract values from existing env.js if .env doesn't have them
        if (!env.ADMIN_USERNAME || !env.ADMIN_PASSWORD) {
            const usernameMatch = existingEnv.match(/ADMIN_USERNAME:\s*['"]([^'"]+)['"]/);
            const passwordMatch = existingEnv.match(/ADMIN_PASSWORD:\s*['"]([^'"]+)['"]/);
            if (usernameMatch) env.ADMIN_USERNAME = usernameMatch[1];
            if (passwordMatch) env.ADMIN_PASSWORD = passwordMatch[1];
            
            envCode = `// ============================================
// ENVIRONMENT VARIABLES (Generated from .env)
// ============================================
// ⚠️ This file contains sensitive credentials
// ============================================

const Env = {
    ADMIN_USERNAME: '${env.ADMIN_USERNAME || 'admin'}',
    ADMIN_PASSWORD: '${env.ADMIN_PASSWORD || 'admin123'}',
    GITHUB_TOKEN: '${env.GITHUB_TOKEN || ''}',
    GITLAB_TOKEN: '${env.GITLAB_TOKEN || ''}'
};`;
        }
    }
    
    fs.writeFileSync(distEnvJsPath, envCode, 'utf8');
    console.log('✅ js/env.js (generated from .env)');
}

// Daftar file JavaScript yang akan di-obfuscate
const jsFiles = [
    'js/config.js',
    'js/constants.js',
    'js/icons.js',
    'js/utils.js',
    'js/renderer.js',
    'js/navigation.js',
    'js/animations.js',
    'js/time.js',
    'js/auth.js',
    'js/login.js',
    'js/dashboard.js',
    'js/gitSync.js',
    'js/app.js'
];

// Buat folder dist jika belum ada
const distDir = path.join(__dirname, '..', 'dist');
const distJsDir = path.join(distDir, 'js');

if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}
if (!fs.existsSync(distJsDir)) {
    fs.mkdirSync(distJsDir, { recursive: true });
}

console.log('🔒 Starting JavaScript obfuscation...\n');

// Generate env.js from .env file
generateEnvFile(distJsDir);

// Obfuscate env.js (but keep it readable for debugging, or fully obfuscate)
const envJsPath = path.join(distJsDir, 'env.js');
if (fs.existsSync(envJsPath)) {
    const envCode = fs.readFileSync(envJsPath, 'utf8');
    // Obfuscate env.js with high security
    const obfuscationResult = JavaScriptObfuscator.obfuscate(envCode, {
        ...obfuscationOptions,
        stringArrayEncoding: ['base64'],
        selfDefending: true
    });
    fs.writeFileSync(envJsPath, obfuscationResult.getObfuscatedCode(), 'utf8');
    console.log('✅ js/env.js (obfuscated)');
}

// Obfuscate setiap file
jsFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  File not found: ${file}`);
        return;
    }

    const code = fs.readFileSync(filePath, 'utf8');
    const obfuscationResult = JavaScriptObfuscator.obfuscate(code, obfuscationOptions);
    const obfuscatedCode = obfuscationResult.getObfuscatedCode();

    // Simpan file obfuscated
    const outputPath = path.join(distJsDir, path.basename(file));
    fs.writeFileSync(outputPath, obfuscatedCode, 'utf8');

    const originalSize = (code.length / 1024).toFixed(2);
    const obfuscatedSize = (obfuscatedCode.length / 1024).toFixed(2);
    
    console.log(`✅ ${file}`);
    console.log(`   Original: ${originalSize} KB → Obfuscated: ${obfuscatedSize} KB`);
});

// Copy file HTML dan CSS ke dist
console.log('\n📋 Copying HTML and CSS files...');

const filesToCopy = [
    { src: 'index.html', dest: 'index.html' },
    { src: 'login.html', dest: 'login.html' },
    { src: 'css/style.css', dest: 'css/style.css' },
    { src: 'css/dashboard.css', dest: 'css/dashboard.css' }
];

filesToCopy.forEach(({ src, dest }) => {
    const srcPath = path.join(__dirname, '..', src);
    const destPath = path.join(distDir, dest);
    const destDirPath = path.dirname(destPath);

    if (!fs.existsSync(srcPath)) {
        console.log(`⚠️  File not found: ${src}`);
        return;
    }

    if (!fs.existsSync(destDirPath)) {
        fs.mkdirSync(destDirPath, { recursive: true });
    }

    let content = fs.readFileSync(srcPath, 'utf8');
    
    // Update path JavaScript di HTML untuk menggunakan dist/js
    if (src.endsWith('.html')) {
        // Add env.js first
        if (content.includes('js/config.js')) {
            content = content.replace(
                /<script src="js\/config\.js"><\/script>/,
                '<script src="js/env.js"></script>\n    <script src="js/config.js"></script>'
            );
        }
        // Update other JS paths
        jsFiles.forEach(jsFile => {
            const jsFileName = path.basename(jsFile);
            const originalPath = jsFile.replace(/\\/g, '/');
            const newPath = `js/${jsFileName}`;
            content = content.replace(new RegExp(originalPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPath);
        });
    }

    fs.writeFileSync(destPath, content, 'utf8');
    console.log(`✅ ${dest}`);
});

// Copy assets folder jika ada
const assetsSrc = path.join(__dirname, '..', 'assets');
const assetsDest = path.join(distDir, 'assets');

if (fs.existsSync(assetsSrc)) {
    console.log('\n📁 Copying assets folder...');
    copyRecursiveSync(assetsSrc, assetsDest);
    console.log('✅ assets/');
}

function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();

    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach(childItemName => {
            copyRecursiveSync(
                path.join(src, childItemName),
                path.join(dest, childItemName)
            );
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

console.log('\n✨ Obfuscation complete!');
console.log('📦 Production files are in the "dist" folder');
console.log('🚀 Deploy the "dist" folder to your hosting service\n');

