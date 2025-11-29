# 📁 Project Structure

Dokumentasi struktur folder dan file project portfolio.

## 📂 Folder Structure

```
portfolio/
│
├── index.html                 # Entry point - HTML utama
├── login.html                 # Admin login page
│
├── css/                       # Stylesheets
│   ├── style.css              # Main stylesheet dengan semua styling
│   ├── dashboard.css         # Dashboard panel styles
│   └── login.css             # Login page styles
│
├── js/                        # JavaScript modules
│   ├── config.js              # ⭐ CONFIGURATION - Edit ini untuk customize
│   ├── constants.js           # Application constants
│   ├── icons.js               # Technology icons mapping & functions
│   ├── utils.js               # Utility functions (meta tags, time, scroll, etc)
│   ├── renderer.js            # Content rendering (hero, about, projects, contact)
│   ├── navigation.js          # Navigation handler (smooth scroll, mobile menu)
│   ├── animations.js          # Animations handler (scroll, parallax, cursor)
│   ├── time.js                # Time display handler
│   ├── auth.js                # Authentication system
│   ├── login.js               # Login page logic
│   ├── dashboard.js           # Dashboard panel logic
│   ├── gitSync.js             # GitHub/GitLab sync module
│   └── app.js                 # Main application - Initialize semua modules
│
├── assets/                    # Static assets
│   └── images/                # Project images
│       └── project1.jpg      # Contoh: simpan gambar project di sini
│
├── docs/                      # Dokumentasi
│   ├── README.md              # Dokumentasi lengkap
│   ├── DEPLOYMENT.md          # Panduan deployment
│   ├── CUSTOMIZATION_GUIDE.md # Panduan customization
│   ├── DASHBOARD_GUIDE.md     # Panduan dashboard panel
│   ├── ADMIN_GUIDE.md         # Panduan admin & login
│   ├── GIT_SYNC_GUIDE.md      # Panduan Git Sync
│   └── ICONS_GUIDE.md         # Panduan technology icons
│
├── LICENSE                    # MIT License
├── .gitignore                 # Git ignore rules
├── package.json               # NPM package config
├── vercel.json                # Vercel deployment config
└── netlify.toml               # Netlify deployment config
```

## 📄 File Descriptions

### Root Files

#### `index.html`
- Entry point website
- Struktur HTML dasar
- Load semua CSS dan JS files

#### `README.md`
- Quick start guide
- Overview project
- Links ke dokumentasi lengkap

### CSS Files

#### `css/style.css`
- Semua styling website
- CSS variables untuk theming
- Responsive breakpoints
- Animations & transitions

### JavaScript Files

#### `js/config.js` ⭐
**File utama untuk customization!**
- Personal information
- Services & technologies
- Projects data
- Social links
- Meta information
- Theme colors

#### `js/icons.js`
- Technology icons mapping
- `getTechIcon()` function
- `createTechIcon()` function
- 50+ supported technologies

#### `js/utils.js`
- `setMetaTag()` - Set meta tags
- `formatTime()` - Format time string
- `smoothScrollTo()` - Smooth scroll
- `isInViewport()` - Viewport check
- `debounce()` - Debounce function
- `throttle()` - Throttle function

#### `js/renderer.js`
- `Renderer.renderAll()` - Render semua content
- `Renderer.updateMetaTags()` - Update SEO meta tags
- `Renderer.updateHero()` - Render hero section
- `Renderer.updateAbout()` - Render about section
- `Renderer.updateProjects()` - Render projects dengan icons
- `Renderer.updateContact()` - Render contact section

#### `js/navigation.js`
- `Navigation.init()` - Initialize navigation
- `Navigation.setupSmoothScroll()` - Smooth scroll setup
- `Navigation.setupMobileMenu()` - Mobile menu toggle
- `Navigation.setupNavBackground()` - Nav background on scroll
- `Navigation.setupActiveLinks()` - Active link highlighting

#### `js/animations.js`
- `Animations.init()` - Initialize semua animations
- `Animations.setupScrollAnimations()` - Scroll-triggered animations
- `Animations.setupProjectHover()` - Project hover effects
- `Animations.setupParallax()` - Parallax effect
- `Animations.setupCursor()` - Custom cursor
- `Animations.setupPageLoad()` - Page load animation

#### `js/time.js`
- `TimeDisplay.init()` - Initialize time display
- `TimeDisplay.update()` - Update time
- `TimeDisplay.destroy()` - Cleanup

#### `js/constants.js`
- Application-wide constants
- Storage keys
- API endpoints
- Default values
- Error messages

#### `js/auth.js`
- `Auth.isAuthenticated()` - Check authentication
- `Auth.login()` - Login user
- `Auth.logout()` - Logout user
- `Auth.getCurrentUser()` - Get current user
- Session management (24 hours)

#### `js/login.js`
- Login form handling
- Error display
- Redirect after login

#### `js/dashboard.js`
- `Dashboard.init()` - Initialize dashboard
- `Dashboard.loadProjects()` - Load from localStorage
- `Dashboard.saveProject()` - Save project
- `Dashboard.uploadImage()` - Handle image upload
- `Dashboard.handleGitHubSync()` - GitHub sync
- `Dashboard.handleGitLabSync()` - GitLab sync
- Project CRUD operations

#### `js/gitSync.js`
- `GitSync.fetchGitHubRepos()` - Fetch GitHub repositories
- `GitSync.fetchGitLabRepos()` - Fetch GitLab repositories
- `GitSync.repoToProject()` - Convert repo to project
- `GitSync.importRepo()` - Import repository
- `GitSync.syncAllRepos()` - Sync all repositories

#### `js/app.js`
- `initializeApp()` - Main initialization function
- Coordinate semua modules
- Load order management

### Documentation Files

#### `docs/README.md`
- Dokumentasi lengkap
- Tech stack details
- Features explanation

#### `docs/DEPLOYMENT.md`
- Panduan deployment ke berbagai platform
- Step-by-step instructions
- Troubleshooting

#### `docs/CUSTOMIZATION_GUIDE.md`
- Panduan lengkap customization
- Contoh-contoh
- Tips & tricks

#### `docs/ICONS_GUIDE.md`
- Daftar teknologi yang didukung
- Cara menambah icon baru
- Troubleshooting icons

### Config Files

#### `vercel.json`
- Vercel deployment configuration
- Routing rules

#### `netlify.toml`
- Netlify deployment configuration
- Redirect rules

#### `package.json`
- NPM package configuration
- Scripts untuk development

#### `.gitignore`
- Git ignore rules
- Exclude node_modules, build files, dll

## 🔄 File Dependencies

### Load Order (di index.html)

1. `js/config.js` - Configuration (harus pertama)
2. `js/constants.js` - Application constants
3. `js/icons.js` - Icons mapping
4. `js/utils.js` - Utility functions
5. `js/auth.js` - Authentication system
6. `js/gitSync.js` - Git sync module
7. `js/renderer.js` - Content renderer
8. `js/navigation.js` - Navigation handler
9. `js/animations.js` - Animations handler
10. `js/time.js` - Time display
11. `js/app.js` - Main app (harus terakhir)
12. `js/dashboard.js` - Dashboard panel (hanya jika authenticated)

### Module Dependencies

```
app.js
  ├── config.js (CONFIG)
  ├── constants.js (Constants)
  ├── icons.js (getTechIcon)
  ├── utils.js (setMetaTag, formatTime, smoothScrollTo, throttle)
  ├── renderer.js (Renderer)
  ├── navigation.js (Navigation)
  ├── animations.js (Animations)
  └── time.js (TimeDisplay)

dashboard.js
  ├── auth.js (Auth)
  ├── gitSync.js (GitSync)
  ├── constants.js (Constants)
  ├── config.js (CONFIG)
  └── icons.js (getTechIcon)

gitSync.js
  └── constants.js (Constants)

auth.js
  └── constants.js (Constants)
```

## 📝 Customization Workflow

1. **Edit `js/config.js`**
   - Update personal info
   - Add/edit projects
   - Update technologies
   - Update social links

2. **Add Images** (optional)
   - Save images ke `assets/images/`
   - Update path di `config.js` → `projects[].image`

3. **Test Locally**
   - Run `npx serve .`
   - Check di browser

4. **Deploy**
   - Follow [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)

## 🎯 Key Files to Edit

| File | Purpose | When to Edit |
|------|---------|--------------|
| `js/config.js` | All content | Always edit this for customization |
| `css/style.css` | Styling | Only if you want to change design |
| `js/icons.js` | Add new tech icons | Only if adding unsupported technology |

## 💡 Best Practices

1. **Keep `js/config.js` organized** - Use comments
2. **Don't edit other JS files** unless you know what you're doing
3. **Use `assets/images/`** for all images
4. **Test after changes** before deploying
5. **Keep file structure** as is for easier maintenance

---

**Struktur ini dirancang untuk mudah di-maintain dan di-customize!** 🎨

