# Portfolio Website - Single Page Minimalis

## 🛠️ Tech Stack yang Digunakan

### Frontend Technologies

- **HTML5** - Semantic markup untuk struktur konten yang accessible dan SEO-friendly
- **CSS3** - Modern styling dengan:
  - CSS Custom Properties (Variables) untuk theming
  - Flexbox & CSS Grid untuk layout responsif
  - CSS Animations & Transitions untuk smooth interactions
  - Media Queries untuk responsive design
  - Backdrop Filter untuk glass morphism effects
- **JavaScript (ES6+)** - Vanilla JavaScript tanpa framework untuk:
  - Dynamic content rendering
  - DOM manipulation dan event handling
  - Intersection Observer untuk scroll animations
  - LocalStorage untuk data persistence
  - Module-based architecture

### Web APIs

- **Intersection Observer API** - Untuk scroll-triggered animations
- **CSS Scroll Behavior** - Smooth scrolling navigation
- **DOM APIs** - Element manipulation dan event handling
- **LocalStorage API** - Local database untuk projects dan credentials
- **Fetch API** - Untuk GitHub/GitLab API integration
- **Custom Events API** - Untuk komunikasi antar modules

### External Services

- **Google Fonts** - Inter font family untuk typography yang elegan
- **Simple Icons CDN** - Technology icons untuk visual enhancement
- **GitHub API** - Untuk sync dengan GitHub repositories
- **GitLab API** - Untuk sync dengan GitLab repositories

### Development & Deployment

- **Git** - Version control
- **NPM** - Package management
- **Vercel/Netlify/GitHub Pages** - Static site hosting

## ✨ Fitur

### Core Features
- **Single Page Design** - Semua konten dalam satu halaman dengan smooth scrolling
- **Minimalis & Modern** - Desain clean dengan tipografi yang elegan
- **Fully Responsive** - Optimized untuk desktop, tablet, dan mobile
- **Smooth Animations** - Animasi halus untuk pengalaman yang lebih baik
- **Dark Theme** - Tema gelap yang modern dan eye-friendly
- **Interactive Elements** - Hover effects dan transitions yang smooth
- **Auto Tech Icons** - Tags teknologi otomatis berubah menjadi icon (50+ technologies)

### Admin & Management
- **Admin Login System** - Sistem autentikasi untuk akses dashboard
- **Dashboard Panel** - Panel admin untuk manage projects dengan mudah
- **Local Database** - Projects disimpan di localStorage untuk akses cepat
- **Git Sync** - Sync projects dengan GitHub/GitLab repositories
- **Auto-detect Technologies** - Auto-detect technologies dari repository topics

### Customization & Deployment
- **Easy Customization** - Edit semua konten di satu file (`js/config.js`)
- **Deploy Anywhere** - Siap deploy ke Vercel, Netlify, GitHub Pages, dll

## 📁 Struktur Project

```
portfolio/
├── index.html              # HTML utama
├── css/
│   ├── style.css          # Stylesheet utama
│   └── dashboard.css       # Dashboard panel styles
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
│   ├── ADMIN_GUIDE.md    # Panduan admin & login system
│   ├── GIT_SYNC_GUIDE.md  # Panduan Git Sync (GitHub/GitLab)
│   └── ICONS_GUIDE.md     # Panduan technology icons
├── login.html             # Admin login page
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
    projects: [/* ... */],           // ← Edit projects
    // ...
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

**Troubleshooting:**
- Jika port sudah digunakan, gunakan port lain: `npx serve . -l 3001`
- Atau kill process di port tersebut (lihat bagian Troubleshooting di bawah)

### 3. Deploy

Lihat **[docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)** untuk panduan lengkap deployment.

**Quick Deploy:**
- **Vercel**: `vercel` (setelah install Vercel CLI)
- **Netlify**: Drag & drop folder ke [netlify.com/drop](https://app.netlify.com/drop)
- **GitHub Pages**: Push ke GitHub, enable Pages di Settings

## 🎨 Customization

### ⭐ Dashboard Panel (Recommended)

**Cara termudah untuk manage projects!**

Dashboard panel memungkinkan Anda untuk menambah, mengedit, dan menghapus project tanpa perlu mengedit file `config.js` secara manual.

**Cara menggunakan:**
1. Login sebagai admin di `login.html` (default: `admin` / `admin123`)
2. Setelah login, tombol ⚙️ akan muncul di pojok kanan bawah
3. Klik tombol ⚙️ atau tekan `Ctrl + Shift + D` untuk buka dashboard
4. Gunakan form untuk menambah/edit project
5. Semua perubahan langsung tersimpan ke local database
6. Halaman otomatis reload untuk menampilkan perubahan

**Fitur Dashboard:**
- ✅ **Projects List** - Lihat dan manage semua projects
- ✅ **Add Project** - Tambah project baru dengan form lengkap
- ✅ **Sync Repos** - Sync dengan GitHub/GitLab repositories
- ✅ **Auto-save** - Semua perubahan langsung tersimpan
- ✅ **Local Database** - Projects disimpan di localStorage

**Lihat [docs/DASHBOARD_GUIDE.md](./docs/DASHBOARD_GUIDE.md) dan [docs/ADMIN_GUIDE.md](./docs/ADMIN_GUIDE.md) untuk panduan lengkap!**

### ⭐ Manual Customization

**Lihat [docs/CUSTOMIZATION_GUIDE.md](./docs/CUSTOMIZATION_GUIDE.md) untuk panduan lengkap!**

#### Quick Customization

1. **Personal Info** - Edit `js/config.js` → `personal`
2. **Projects** - Edit `js/config.js` → `projects`
3. **Technologies** - Edit `js/config.js` → `technologies`
4. **Social Links** - Edit `js/config.js` → `social`

### Technology Icons

Tags teknologi otomatis berubah menjadi icon! Lihat [docs/ICONS_GUIDE.md](./docs/ICONS_GUIDE.md) untuk daftar lengkap.

### Git Sync (GitHub/GitLab)

Sync projects dengan repositories GitHub atau GitLab secara otomatis!

**Cara menggunakan:**
1. Login sebagai admin
2. Buka dashboard → tab **"Sync Repos"**
3. Masukkan GitHub/GitLab username (dan token untuk private repos)
4. Klik **"Fetch Repositories"**
5. Klik **"Import"** pada repository yang ingin diimport
6. Technologies otomatis terdeteksi dari repository topics

**Fitur Git Sync:**
- ✅ **GitHub Integration** - Fetch dan import dari GitHub
- ✅ **GitLab Integration** - Fetch dan import dari GitLab
- ✅ **Auto-detect Technologies** - Otomatis detect dari repository
- ✅ **Update Existing** - Update project yang sudah diimport
- ✅ **Sync All** - Sync semua projects sekaligus

**Lihat [docs/GIT_SYNC_GUIDE.md](./docs/GIT_SYNC_GUIDE.md) untuk panduan lengkap!**

Lihat dokumentasi lengkap di [docs/README.md](./docs/README.md) untuk detail lebih lanjut tentang tech stack dan implementasi.

## 📚 Dokumentasi

- **[docs/README.md](./docs/README.md)** - Dokumentasi lengkap
- **[docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - Panduan deployment
- **[docs/CUSTOMIZATION_GUIDE.md](./docs/CUSTOMIZATION_GUIDE.md)** - Panduan customization
- **[docs/DASHBOARD_GUIDE.md](./docs/DASHBOARD_GUIDE.md)** - Panduan dashboard panel
- **[docs/ADMIN_GUIDE.md](./docs/ADMIN_GUIDE.md)** - Panduan admin & login system
- **[docs/GIT_SYNC_GUIDE.md](./docs/GIT_SYNC_GUIDE.md)** - Panduan Git Sync (GitHub/GitLab)
- **[docs/ICONS_GUIDE.md](./docs/ICONS_GUIDE.md)** - Panduan technology icons

## 🎯 Sections

Website terdiri dari 4 section utama:

1. **Hero** - Introduction dan nama
2. **About** - Bio, services, dan technologies
3. **Projects** - Portfolio projects dengan tech icons
4. **Contact** - Email dan social media links

## 📦 Deployment

**Lihat [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) untuk panduan lengkap!**

Semua file konfigurasi sudah disediakan untuk:
- ✅ Vercel
- ✅ Netlify
- ✅ GitHub Pages
- ✅ Cloudflare Pages
- ✅ Firebase Hosting
- ✅ Surge.sh

## 🛠️ Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Tips

### Development
1. **Gunakan Dashboard Panel** untuk manage projects dengan mudah (tombol ⚙️)
2. **Edit `js/config.js`** untuk customize semua konten secara manual
3. **Simpan project images** di `assets/images/`
4. **Technology icons** otomatis muncul untuk tags
5. **Optimize images** sebelum upload
6. **Test di local** sebelum deploy

### Admin & Security
7. **Login sebagai admin** di `login.html` untuk akses dashboard
8. **Ganti default credentials** di `js/auth.js` untuk keamanan
9. **Keyboard shortcut** `Ctrl + Shift + D` untuk buka dashboard
10. **Backup data** secara berkala menggunakan tombol download config

### Git Sync
11. **Gunakan token** untuk akses private repositories dan rate limit lebih tinggi
12. **Sync regularly** untuk update project info dari repository
13. **Auto-detect technologies** dari repository topics dan language

## 🐛 Troubleshooting

### Port Already in Use

Jika mendapat error `EADDRINUSE: address already in use`:

**Solusi 1: Gunakan Port Lain**
```bash
# Gunakan port 8000 (default)
npm run dev

# Atau port lain
npm run dev:3001
npm run dev:5000

# Atau custom port
npx serve . -l 5000
```

**Solusi 2: Kill Process di Port 3000 (Windows)**
```powershell
# Cari process yang menggunakan port 3000
netstat -ano | findstr :3000

# Kill process (ganti PID dengan nomor dari command di atas)
taskkill /PID <PID> /F
```

**Solusi 3: Kill Process di Port 3000 (Mac/Linux)**
```bash
# Cari process
lsof -ti:3000

# Kill process
kill -9 $(lsof -ti:3000)
```

### Server Tidak Start

1. Pastikan Node.js sudah terinstall: `node --version`
2. Install dependencies: `npm install` (jika ada)
3. Coba port lain: `npx serve . -l 8000`
4. Cek firewall/antivirus yang mungkin block port

## 📄 License

This project is licensed under the **MIT License** - a free and open source license.

You are free to use, modify, distribute, and commercialize this software, subject to including the copyright notice and license text in all copies.

**Author:** [Yovie Kobba](https://github.com/yopzman)  
**GitHub:** [@yopzman](https://github.com/yopzman)

For more information, see [LICENSE](./LICENSE) file.

