# 🎨 Technology Icons Guide

Panduan lengkap tentang sistem icon teknologi yang otomatis.

## ✨ Fitur

Saat Anda menambahkan tags teknologi di `config.js`, icon akan **otomatis muncul** tanpa setup tambahan!

## 🚀 Cara Menggunakan

### Di Projects

```javascript
projects: [
    {
        tags: ["React", "Next.js", "Tailwind", "GSAP"]
        // Icons akan otomatis muncul untuk semua tags!
    }
]
```

### Di Technologies

```javascript
technologies: {
    items: [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js"
        // Icons juga muncul di sini!
    ]
}
```

## 📋 Supported Technologies

### Frontend Frameworks
- ✅ React
- ✅ Vue / Vue.js
- ✅ Angular
- ✅ Svelte

### Meta Frameworks
- ✅ Next.js / NextJS
- ✅ Nuxt / Nuxt.js
- ✅ Astro
- ✅ Remix
- ✅ Gatsby

### Languages
- ✅ JavaScript / JS
- ✅ TypeScript / TS
- ✅ Python
- ✅ PHP

### CSS Frameworks
- ✅ Tailwind / TailwindCSS
- ✅ Bootstrap
- ✅ Sass / SCSS
- ✅ CSS3 / CSS
- ✅ HTML5 / HTML

### Animation Libraries
- ✅ GSAP
- ✅ Framer / Framer Motion
- ✅ Lenis

### 3D & Graphics
- ✅ Three.js / ThreeJS
- ✅ Blender

### Backend
- ✅ Node.js / NodeJS / Node
- ✅ Express

### Databases
- ✅ PostgreSQL
- ✅ MySQL
- ✅ MongoDB
- ✅ Firebase
- ✅ Supabase

### Cloud & Hosting
- ✅ Vercel
- ✅ Netlify
- ✅ AWS
- ✅ Docker

### Tools
- ✅ Git
- ✅ GitHub
- ✅ GitLab
- ✅ Figma
- ✅ Adobe / Photoshop / Illustrator / XD

### Others
- ✅ Webpack
- ✅ Vite
- ✅ NPM
- ✅ Yarn
- ✅ Redux
- ✅ Zustand
- ✅ Prisma
- ✅ GraphQL
- ✅ Jest
- ✅ Cypress

## 🔧 Menambah Icon Baru

Jika teknologi Anda tidak ada di list, tambahkan di `icons.js`:

```javascript
const TECH_ICONS = {
    // ... existing icons
    
    'your-tech': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/yourtech.svg',
    'your-tech-name': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/yourtechname.svg',
};
```

**Cara menemukan icon:**
1. Cek [Simple Icons](https://simpleicons.org/)
2. Cari nama teknologi Anda
3. Copy slug (contoh: `react`, `nextdotjs`)
4. Gunakan format: `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/SLUG.svg`

**Contoh:**
```javascript
// Untuk "Next.js", slug-nya adalah "nextdotjs"
'next.js': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nextdotjs.svg',
'nextjs': 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nextdotjs.svg',
```

## 🎯 Case Sensitivity

Icon matching **case-insensitive** dan **flexible**:

- `"React"` = `"react"` = `"REACT"` ✅
- `"Next.js"` = `"next.js"` = `"NextJS"` ✅
- `"TypeScript"` = `"typescript"` = `"TS"` ✅

## 💡 Tips

1. **Gunakan nama standar** - Gunakan nama teknologi yang umum dikenal
2. **Check spelling** - Pastikan spelling benar (case tidak masalah)
3. **Multiple aliases** - Beberapa teknologi punya multiple names (contoh: Next.js = NextJS)
4. **Fallback** - Jika icon tidak ditemukan, akan muncul sebagai text

## 🐛 Troubleshooting

### Icon tidak muncul
- **Check spelling** - Pastikan nama teknologi benar
- **Check icons.js** - Pastikan teknologi ada di mapping
- **Browser console** - Check untuk error loading icon
- **Fallback** - Icon akan fallback ke text jika gagal load

### Icon tidak ter-load
- **Internet connection** - Icons di-load dari CDN
- **CDN down** - Simple Icons CDN mungkin down
- **CORS issue** - Rare, tapi bisa terjadi

### Ingin custom icon
1. Download icon SVG
2. Simpan di folder `images/icons/`
3. Update `icons.js` untuk point ke local file:
   ```javascript
   'your-tech': 'images/icons/your-tech.svg',
   ```

## 📚 Resources

- [Simple Icons](https://simpleicons.org/) - Library icon yang digunakan
- [Simple Icons CDN](https://cdn.jsdelivr.net/npm/simple-icons@v9/) - CDN untuk icons
- [DevIcons](https://devicon.dev/) - Alternative icon library

---

**Icons powered by [Simple Icons](https://simpleicons.org/)** 🎨

