# 🚀 Deployment Guide

Panduan lengkap untuk deploy portfolio website ke berbagai platform.

## 📋 Prerequisites

- File portfolio sudah di-customize di `js/config.js`
- Git repository (opsional, untuk beberapa platform)
- (Optional) Ganti default admin credentials di `js/auth.js` untuk keamanan

---

## 🌐 Vercel (Recommended)

### Method 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Method 2: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign up / Login
3. Click "New Project"
4. Import your Git repository OR drag & drop folder
5. Click "Deploy"
6. Done! Your site will be live at `your-project.vercel.app`

### Method 3: GitHub Integration

1. Push code to GitHub
2. Go to Vercel Dashboard
3. Click "New Project"
4. Import from GitHub
5. Select repository
6. Deploy automatically on every push!

**Configuration:** `vercel.json` sudah disediakan

---

## 🟢 Netlify

### Method 1: Netlify CLI

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

### Method 2: Netlify Drop (Drag & Drop)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag & drop your project folder
3. Done! Your site is live

### Method 3: GitHub Integration

1. Push code to GitHub
2. Go to [app.netlify.com](https://app.netlify.com)
3. Click "New site from Git"
4. Connect GitHub and select repository
5. Build settings:
   - Build command: (leave empty)
   - Publish directory: `.`
6. Deploy!

**Configuration:** `netlify.toml` sudah disediakan

---

## 📦 GitHub Pages

### Method 1: GitHub Actions (Recommended)

1. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .
```

2. Push to GitHub
3. Go to Settings > Pages
4. Select source: "GitHub Actions"
5. Done!

### Method 2: Manual GitHub Pages

1. Push code to GitHub repository
2. Go to repository Settings > Pages
3. Source: "Deploy from a branch"
4. Branch: `main` or `master`
5. Folder: `/ (root)`
6. Save
7. Your site will be at `username.github.io/repository-name`

---

## 🔵 Cloudflare Pages

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Go to Pages > Create a project
3. Connect Git repository OR upload files
4. Build settings:
   - Framework preset: None
   - Build command: (leave empty)
   - Build output directory: `.`
5. Deploy!

---

## 🟣 Render

1. Go to [render.com](https://render.com)
2. Sign up / Login
3. Click "New +" > "Static Site"
4. Connect Git repository
5. Settings:
   - Name: your-portfolio
   - Branch: main
   - Build command: (leave empty)
   - Publish directory: `.`
6. Deploy!

---

## 🟠 Firebase Hosting

```bash
# Install Firebase CLI
npm i -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Deploy
firebase deploy
```

Create `firebase.json`:

```json
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

---

## 🟡 Surge.sh

```bash
# Install Surge
npm i -g surge

# Deploy
surge

# Follow prompts:
# - Project path: .
# - Domain: your-portfolio.surge.sh
```

---

## 📝 Custom Domain Setup

### Vercel
1. Go to project settings
2. Domains > Add domain
3. Follow DNS configuration instructions

### Netlify
1. Go to site settings
2. Domain management > Add custom domain
3. Configure DNS records

### GitHub Pages
1. Go to repository Settings > Pages
2. Custom domain > Add your domain
3. Configure DNS:
   - Type: CNAME
   - Value: `username.github.io`

---

## 🔧 Environment Variables

Jika perlu environment variables:

### Vercel
- Project Settings > Environment Variables

### Netlify
- Site Settings > Environment Variables

---

## ✅ Post-Deployment Checklist

- [ ] Test all links
- [ ] Check mobile responsiveness
- [ ] Verify images load correctly
- [ ] Test contact form (if any)
- [ ] Check SEO meta tags
- [ ] Test social media previews
- [ ] Verify analytics (if added)
- [ ] Check page speed
- [ ] Test on different browsers

---

## 🐛 Troubleshooting

### 404 Errors
- Check `vercel.json` or `netlify.toml` redirects
- Ensure `index.html` is in root directory

### Assets Not Loading
- Check file paths (use relative paths)
- Verify all files are committed to Git

### Build Errors
- Check console for errors
- Verify all dependencies are correct

---

## 📚 Resources

- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [GitHub Pages Docs](https://docs.github.com/pages)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages)

---

**Need help?** Check the main README.md for customization guide.

