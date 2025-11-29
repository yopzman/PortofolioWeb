# 🔐 Environment Variables Guide

Panduan untuk menggunakan environment variables untuk menyimpan credentials secara aman.

## ⚠️ Security Note

**Credentials sekarang disimpan di `.env` file yang tidak di-commit ke Git**, sehingga lebih aman daripada hardcode di JavaScript files.

## 🚀 Quick Start

### 1. Setup Environment Variables

**Option A: Menggunakan .env file (Recommended)**

1. Copy file example:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` file:
   ```env
   ADMIN_USERNAME=your_username
   ADMIN_PASSWORD=your_strong_password
   GITHUB_TOKEN=your_github_token  # Optional
   GITLAB_TOKEN=your_gitlab_token  # Optional
   ```

**Option B: Menggunakan js/env.js (Development)**

1. Copy file example:
   ```bash
   cp js/env.example.js js/env.js
   ```

2. Edit `js/env.js`:
   ```javascript
   const Env = {
       ADMIN_USERNAME: 'your_username',
       ADMIN_PASSWORD: 'your_strong_password',
       GITHUB_TOKEN: 'your_github_token',
       GITLAB_TOKEN: 'your_gitlab_token'
   };
   ```

### 2. Build Production

Saat build production, credentials dari `.env` akan di-inject ke `dist/js/env.js`:

```bash
npm run build
```

File `dist/js/env.js` akan berisi credentials dari `.env` dan akan di-obfuscate untuk keamanan.

## 📁 File Structure

```
portfolio-website/
├── .env                    # ⚠️ Git-ignored (your actual credentials)
├── .env.example            # ✅ Template (committed to Git)
├── js/
│   ├── env.js             # ⚠️ Git-ignored (development credentials)
│   ├── env.example.js      # ✅ Template (committed to Git)
│   └── auth.js             # Uses Env.ADMIN_USERNAME & Env.ADMIN_PASSWORD
└── dist/
    └── js/
        └── env.js          # Generated from .env (obfuscated)
```

## 🔑 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `ADMIN_USERNAME` | Admin login username | `admin` |
| `ADMIN_PASSWORD` | Admin login password | `your_strong_password_123!` |

### Optional Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `GITHUB_TOKEN` | GitHub Personal Access Token (for higher API rate limits) | `ghp_xxxxxxxxxxxx` |
| `GITLAB_TOKEN` | GitLab Personal Access Token (for higher API rate limits) | `glpat-xxxxxxxxxxxx` |

## 🔧 How It Works

### Development Mode

1. **Load Order:**
   - Browser loads `js/env.js` first
   - `js/auth.js` reads credentials from `Env.ADMIN_USERNAME` and `Env.ADMIN_PASSWORD`
   - If `env.js` doesn't exist, uses default values

2. **Using .env file:**
   - Edit `.env` file with your credentials
   - Run `npm run build` to generate `dist/js/env.js` from `.env`
   - For development, you can also use `js/env.js` directly

### Production Build

1. **Build Process:**
   ```bash
   npm run build
   ```
   
   This will:
   - Read `.env` file
   - Generate `dist/js/env.js` with credentials
   - Obfuscate `env.js` for security
   - Copy and update HTML files

2. **Deploy:**
   - Deploy folder `dist/` to hosting
   - Credentials are already embedded (obfuscated) in `dist/js/env.js`

## 🔒 Security Best Practices

### ✅ DO:

1. **Never commit `.env` or `js/env.js`**
   - Both files are already in `.gitignore`
   - Always use `.env.example` and `js/env.example.js` as templates

2. **Use strong passwords**
   ```env
   ADMIN_PASSWORD=MyStr0ng!P@ssw0rd2024
   ```

3. **Rotate credentials regularly**
   - Change password periodically
   - Update `.env` file

4. **Use different credentials for production**
   - Development: Use `js/env.js`
   - Production: Use `.env` file (injected during build)

5. **Keep `.env` file secure**
   - Don't share `.env` file
   - Don't upload to public repositories
   - Use environment variables in hosting platforms

### ❌ DON'T:

1. **Don't hardcode credentials in JavaScript**
   - ❌ `username: 'admin'` in `auth.js`
   - ✅ Use `Env.ADMIN_USERNAME` instead

2. **Don't commit credentials**
   - Always check `.gitignore` includes `.env` and `js/env.js`

3. **Don't use default credentials in production**
   - Always change from `admin/admin123`

## 🌐 Hosting Platform Setup

### Vercel

1. Go to Project Settings → Environment Variables
2. Add variables:
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `GITHUB_TOKEN` (optional)
   - `GITLAB_TOKEN` (optional)
3. Update build script to read from Vercel env vars

### Netlify

1. Go to Site Settings → Environment Variables
2. Add variables (same as Vercel)
3. Update build script accordingly

### GitHub Actions / CI/CD

```yaml
env:
  ADMIN_USERNAME: ${{ secrets.ADMIN_USERNAME }}
  ADMIN_PASSWORD: ${{ secrets.ADMIN_PASSWORD }}
```

## 🐛 Troubleshooting

### Credentials not working

1. **Check if `env.js` is loaded:**
   ```javascript
   // In browser console
   console.log(typeof Env); // Should be 'object'
   console.log(Env.ADMIN_USERNAME); // Should show your username
   ```

2. **Check file order in HTML:**
   ```html
   <script src="js/env.js"></script>  <!-- Must be first -->
   <script src="js/auth.js"></script>
   ```

3. **Verify `.env` file format:**
   ```env
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   ```
   - No spaces around `=`
   - No quotes needed (unless value has spaces)

### Build not reading .env

1. **Check if `.env` exists:**
   ```bash
   ls -la .env
   ```

2. **Check file format:**
   - Must be in root directory
   - Format: `KEY=value`
   - No spaces around `=`

3. **Run build with verbose output:**
   ```bash
   npm run build
   ```
   Check console for "✅ js/env.js (generated from .env)"

### Git Sync tokens not working

1. **Check if tokens are loaded:**
   ```javascript
   // In browser console
   console.log(Env.GITHUB_TOKEN); // Should show token or empty
   ```

2. **Tokens can be set in:**
   - `.env` file (injected during build)
   - `js/env.js` (for development)
   - Dashboard UI (stored in localStorage, overrides env)

## 📚 Related Documentation

- [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) - Admin login system
- [GIT_SYNC_GUIDE.md](./GIT_SYNC_GUIDE.md) - Git Sync with tokens
- [OBFUSCATION_GUIDE.md](./OBFUSCATION_GUIDE.md) - Code obfuscation

## 🔗 Resources

- [GitHub Personal Access Tokens](https://github.com/settings/tokens)
- [GitLab Personal Access Tokens](https://gitlab.com/-/profile/personal_access_tokens)
- [.env File Best Practices](https://www.twilio.com/blog/environment-variables-node-js)

---

**Need help?** Check [README.md](../README.md) atau buat issue di GitHub.

