# Portfolio Website - Single Page Minimalis

Website portfolio single page yang minimalis dan menarik, terinspirasi dari portfolio modern seperti [iqbalmuthahhary.vercel.app](https://iqbalmuthahhary.vercel.app/).

## ✨ Fitur

- **Single Page Design** - Semua konten dalam satu halaman dengan smooth scrolling
- **Minimalis & Modern** - Desain clean dengan tipografi yang elegan
- **Fully Responsive** - Optimized untuk desktop, tablet, dan mobile
- **Smooth Animations** - Animasi halus untuk pengalaman yang lebih baik
- **Dark Theme** - Tema gelap yang modern dan eye-friendly
- **Interactive Elements** - Hover effects dan transitions yang smooth
- **Easy Customization** - Edit semua konten di satu file (`js/config.js`)
- **Admin Login System** - Sistem autentikasi untuk akses dashboard
- **Dashboard Panel** - Panel admin untuk manage projects dengan mudah
- **Image Upload** - Upload image langsung dari dashboard dengan drag & drop
- **Git Sync** - Sync projects dengan GitHub/GitLab repositories
- **Local Database** - Projects disimpan di localStorage untuk akses cepat
- **Auto Tech Icons** - Tags teknologi otomatis berubah menjadi icon (50+ technologies)
- **Deploy Anywhere** - Siap deploy ke Vercel, Netlify, GitHub Pages, dll

## 🛠️ Tech Stack

### Core Technologies

- **HTML5** - Semantic markup dan struktur website
- **CSS3** - Styling dengan modern CSS features:
  - CSS Custom Properties (Variables)
  - Flexbox & CSS Grid
  - CSS Animations & Transitions
  - Media Queries (Responsive Design)
  - Aspect Ratio
  - Backdrop Filter
- **JavaScript (ES6+)** - Vanilla JavaScript untuk interaktivitas:
  - ES6 Modules
  - Arrow Functions
  - Template Literals
  - Destructuring
  - Async/Await
  - DOM Manipulation

### APIs & Web Standards

- **Intersection Observer API** - Scroll-triggered animations
- **CSS Scroll Behavior** - Smooth scrolling
- **Web Animations API** - Advanced animations
- **DOM APIs** - Element manipulation dan event handling

### Fonts & Typography

- **Google Fonts** - Inter font family
  - Weights: 300, 400, 500, 600, 700
  - Optimized loading dengan preconnect

### Deployment Platforms

- **Vercel** - Serverless deployment platform
- **Netlify** - Static site hosting
- **GitHub Pages** - Free hosting via GitHub
- **Cloudflare Pages** - Global CDN hosting
- **Firebase Hosting** - Google's hosting solution
- **Surge.sh** - Simple static web publishing

### Development Tools

- **Git** - Version control
- **NPM** - Package management
- **Vercel CLI** - Command-line deployment tool
- **Netlify CLI** - Netlify deployment tool

### Browser APIs Used

- **Window API** - Window object methods
- **Document API** - DOM manipulation
- **Event API** - Event listeners dan handlers
- **History API** - Navigation handling
- **Performance API** - Page load optimization

### CSS Features

- **CSS Variables** - Dynamic theming
- **Flexbox** - Flexible layouts
- **CSS Grid** - Grid-based layouts
- **CSS Animations** - Keyframe animations
- **CSS Transitions** - Smooth state changes
- **Media Queries** - Responsive breakpoints
- **Backdrop Filter** - Glass morphism effects
- **Aspect Ratio** - Responsive image containers

### JavaScript Features

- **Event Listeners** - User interaction handling
- **Intersection Observer** - Scroll-based animations
- **DOM Manipulation** - Dynamic content rendering
- **Template Literals** - String interpolation
- **Array Methods** - map, forEach, filter, etc.
- **Object Methods** - Object manipulation
- **Async Operations** - Non-blocking code execution

### Performance Optimizations

- **Font Preloading** - Google Fonts optimization
- **Lazy Loading** - Deferred content loading
- **CSS Optimization** - Efficient selectors
- **JavaScript Optimization** - Event delegation
- **Image Optimization** - Responsive images support

### Browser Compatibility

- **Modern Browsers** - Chrome, Firefox, Safari, Edge (latest)
- **Progressive Enhancement** - Graceful degradation
- **Feature Detection** - Conditional feature usage

### File Structure Standards

- **Semantic HTML5** - Accessible markup
- **BEM-like Naming** - CSS class naming convention
- **Modular JavaScript** - Separated concerns
- **Configuration-based** - Easy customization

## 📁 Struktur File

```
portfolio/
├── index.html              # HTML utama
├── login.html             # Admin login page
├── css/
│   ├── style.css          # Stylesheet utama
│   ├── dashboard.css      # Dashboard panel styles
│   └── login.css          # Login page styles
├── js/
│   ├── config.js          # ⭐ KONFIGURASI - Edit file ini!
│   ├── constants.js       # Application constants
│   ├── icons.js           # Technology icons mapping
│   ├── utils.js           # Utility functions
│   ├── renderer.js        # Content rendering
│   ├── navigation.js      # Navigation handler
│   ├── animations.js      # Animations handler
│   ├── time.js            # Time display handler
│   ├── auth.js            # Authentication system
│   ├── login.js           # Login page logic
│   ├── dashboard.js       # Dashboard panel logic
│   ├── gitSync.js         # GitHub/GitLab sync module
│   └── app.js             # Main application
├── assets/
│   └── images/            # Project images
├── docs/
│   ├── README.md          # Dokumentasi lengkap
│   ├── DEPLOYMENT.md      # Panduan deployment
│   ├── CUSTOMIZATION_GUIDE.md  # Panduan customization
│   ├── DASHBOARD_GUIDE.md # Panduan dashboard panel
│   ├── ADMIN_GUIDE.md     # Panduan admin & login
│   ├── GIT_SYNC_GUIDE.md  # Panduan Git Sync
│   └── ICONS_GUIDE.md     # Panduan technology icons
├── LICENSE                # MIT License
├── .gitignore
├── package.json
├── vercel.json
└── netlify.toml
```

## 🚀 Quick Start

### 1. Customize Portfolio

**Edit file `js/config.js`** - Semua konten bisa diubah di sini:

```javascript
const CONFIG = {
    personal: {
        name: "Your Name",           // ← Ganti nama Anda
        title: "Creative Developer", // ← Ganti title
        location: "City, Country",   // ← Ganti lokasi
        email: "your.email@example.com", // ← Ganti email
        bio: [/* ... */]             // ← Edit bio
    },
    // ... edit lainnya
};
```

### 2. Preview Locally

```bash
# Option 1: NPM script (recommended - uses port 8000)
npm run dev

# Option 2: Custom port (if 8000 is busy)
npm run dev:3001  # Port 3001
npm run dev:5000  # Port 5000

# Option 3: Python
python -m http.server 8000

# Option 4: Direct serve command
npx serve . -l 8000
```

Buka browser: `http://localhost:8000` (atau port yang digunakan)

### 3. Deploy

Lihat **[DEPLOYMENT.md](./DEPLOYMENT.md)** untuk panduan lengkap deployment ke berbagai platform.

**Quick Deploy:**
- **Vercel**: `vercel` (setelah install Vercel CLI)
- **Netlify**: Drag & drop folder ke [netlify.com/drop](https://app.netlify.com/drop)
- **GitHub Pages**: Push ke GitHub, enable Pages di Settings

## 🎨 Customization

### ⭐ Dashboard Panel (Recommended)

**Cara termudah untuk manage projects!**

Dashboard panel memungkinkan Anda untuk menambah, mengedit, dan menghapus project tanpa perlu mengedit file `config.js` secara manual.

**Cara menggunakan:**
1. Buka website portfolio Anda
2. Klik tombol ⚙️ di pojok kanan bawah (atau tekan `Ctrl + Shift + D`)
3. Gunakan form untuk menambah/edit project
4. Download file `config.js` yang sudah diupdate
5. Ganti file `js/config.js` dengan file baru
6. Reload halaman

**Lihat [DASHBOARD_GUIDE.md](./DASHBOARD_GUIDE.md) untuk panduan lengkap!**

### ⭐ Dashboard Panel (Recommended)

**Cara termudah untuk manage projects!**

Dashboard panel memungkinkan Anda untuk menambah, mengedit, dan menghapus project tanpa perlu mengedit file `config.js` secara manual.

**Cara menggunakan:**
1. Login sebagai admin di `login.html` (default: `admin` / `admin123`)
2. Setelah login, tombol ⚙️ akan muncul di pojok kanan bawah
3. Klik tombol ⚙️ atau tekan `Ctrl + Shift + D` untuk buka dashboard
4. Gunakan form untuk menambah/edit project
5. Upload image langsung dari dashboard
6. Semua perubahan langsung tersimpan ke local database
7. Halaman otomatis reload untuk menampilkan perubahan

**Fitur Dashboard:**
- ✅ **Projects List** - Lihat dan manage semua projects
- ✅ **Add Project** - Tambah project baru dengan form lengkap
- ✅ **Upload Image** - Upload image dengan drag & drop
- ✅ **Sync Repos** - Sync dengan GitHub/GitLab repositories
- ✅ **Auto-save** - Semua perubahan langsung tersimpan
- ✅ **Local Database** - Projects disimpan di localStorage

**Lihat [DASHBOARD_GUIDE.md](./DASHBOARD_GUIDE.md) dan [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) untuk panduan lengkap!**

### ⭐ Manual Customization via `config.js`

**Semua konten bisa diubah di file `js/config.js`!** Tidak perlu edit HTML.

#### Personal Information

```javascript
personal: {
    name: "Your Name",
    title: "Creative Developer",
    location: "City, Country",
    email: "your.email@example.com",
    bio: [
        "First paragraph of your bio...",
        "Second paragraph of your bio..."
    ]
}
```

#### Services & Technologies

```javascript
services: {
    title: "services",
    items: [
        "Frontend Development",
        "Animation & Interaction"
    ]
},

technologies: {
    title: "technologies",
    items: [
        "JavaScript",
        "React",
        "Next.js"
        // Tambahkan lebih banyak...
    ]
}
```

#### Projects

```javascript
projects: [
    {
        number: "01",
        title: "Project Name",
        description: "Project description...",
        tags: ["React", "GSAP", "Next.js"],
        link: "https://project-url.com",
        image: "images/project1.jpg" // atau null untuk placeholder
    }
    // Tambahkan lebih banyak projects...
]
```

#### Social Links

```javascript
social: {
    instagram: "https://instagram.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    github: "https://github.com/yourusername",
    twitter: null, // Optional - set null untuk hide
    behance: null,
    dribbble: null
}
```

### Mengubah Warna

Edit variabel CSS di `style.css`:

```css
:root {
    --bg-color: #0a0a0a;        /* Background color */
    --text-color: #f5f5f5;      /* Text color */
    --text-muted: #888;         /* Muted text */
    --accent-color: #f5f5f5;    /* Accent color */
    --border-color: #1a1a1a;    /* Border color */
}
```

### Menambah Gambar Project

**Cara 1: Upload dari Dashboard (Recommended)**
1. Login sebagai admin di `login.html`
2. Buka dashboard → tab "Add Project"
3. Upload image dengan drag & drop atau klik area upload
4. Image akan otomatis disimpan sebagai data URL

**Cara 2: Manual di `js/config.js`**
```javascript
projects: [
    {
        // ...
        image: "assets/images/project1.jpg" // Path relatif dari root
    }
]
```

**Tips:**
- Buat folder `assets/images/` di root project
- Simpan gambar project di folder tersebut
- Gunakan format WebP untuk performa lebih baik
- Optimal size: 1200x675px (16:9 ratio)
- Upload dari dashboard: max 5MB, format PNG/JPG/GIF

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

## 🎯 Sections

Website terdiri dari 4 section utama:

1. **Hero** - Introduction dan nama
2. **About** - Bio, services, dan technologies
3. **Projects** - Portfolio projects
4. **Contact** - Email dan social media links

## 🔧 Fitur JavaScript

- Smooth scrolling navigation
- Intersection Observer untuk scroll animations
- Active nav link highlighting
- Current time display
- Parallax effect pada hero section
- Custom cursor (desktop only)
- Mobile menu toggle

## 🎨 Animations

- Fade in animations untuk hero text
- Scroll-triggered animations untuk projects
- Hover effects pada links dan buttons
- Smooth transitions pada semua elements

## 📦 Deployment

**Lihat [DEPLOYMENT.md](./DEPLOYMENT.md) untuk panduan lengkap!**

### Quick Deploy Options:

1. **Vercel** (Recommended)
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Netlify** (Easiest)
   - Drag & drop folder ke [netlify.com/drop](https://app.netlify.com/drop)

3. **GitHub Pages**
   - Push ke GitHub, enable Pages di Settings

4. **Cloudflare Pages**
   - Connect Git repository di dashboard

**Semua file konfigurasi sudah disediakan!** ✅

## 🛠️ Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Tips

1. **Optimize Images** - Gunakan format WebP dan compress images
2. **Add Meta Tags** - Tambahkan Open Graph tags untuk social sharing
3. **SEO** - Tambahkan meta description dan keywords
4. **Analytics** - Tambahkan Google Analytics jika perlu
5. **Performance** - Minify CSS dan JS untuk production

## 🎨 Customization Ideas

- Tambahkan section "Skills" atau "Experience"
- Tambahkan blog section
- Integrate dengan CMS (Contentful, Sanity)
- Tambahkan dark/light mode toggle
- Tambahkan language switcher
- Integrate dengan contact form service

## 📄 License

Copyright (c) 2025 **Yovie Kobba**

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

**Author:** [Yovie Kobba](https://github.com/yopzman)  
**GitHub:** [@yopzman](https://github.com/yopzman)

