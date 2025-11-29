# 🎨 Customization Guide

Panduan lengkap untuk customize portfolio website dengan mudah.

## 📝 Quick Start

**Ada 2 cara untuk customize:**

1. **Dashboard Panel (Recommended)** - Gunakan dashboard untuk manage projects dengan mudah
2. **Manual Edit** - Edit file `js/config.js` secara manual

**Semua customization bisa dilakukan di file `js/config.js`!** Tidak perlu edit HTML atau CSS.

---

## 1️⃣ Personal Information

Edit bagian `personal` di `config.js`:

```javascript
personal: {
    name: "John Doe",                    // Nama Anda
    title: "Creative Developer",         // Title/role Anda
    location: "Jakarta, Indonesia",      // Lokasi
    email: "john@example.com",          // Email
    bio: [
        "First paragraph of your bio...",
        "Second paragraph of your bio..."
    ]
}
```

**Tips:**
- `bio` adalah array, bisa 1-3 paragraf
- Gunakan bahasa yang natural dan engaging
- Highlight achievements dan passion Anda

---

## 2️⃣ Services

Edit bagian `services`:

```javascript
services: {
    title: "services",  // Bisa diubah ke bahasa lain
    items: [
        "Frontend Development",
        "UI/UX Design",
        "Animation & Interaction",
        "Web Consulting"
    ]
}
```

**Tips:**
- Tambahkan semua services yang Anda tawarkan
- Gunakan format yang konsisten
- Maksimal 4-5 items untuk tampilan yang clean

---

## 3️⃣ Technologies

Edit bagian `technologies`:

```javascript
technologies: {
    title: "technologies",
    items: [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Vue.js",
        "Nuxt",
        "GSAP",
        "Tailwind CSS",
        "Three.js",
        "Node.js"
    ]
}
```

**Tips:**
- List semua technologies yang Anda kuasai
- Urutkan dari yang paling dikuasai
- Maksimal 10-12 items

---

## 4️⃣ Projects

Edit bagian `projects`:

```javascript
projects: [
    {
        number: "01",
        title: "E-Commerce Platform",
        description: "Modern e-commerce platform with smooth animations and excellent UX. Built with Next.js and integrated payment system.",
        tags: ["React", "Next.js", "Stripe", "Tailwind"],
        link: "https://project-url.com",
        image: "images/project1.jpg"  // atau null untuk placeholder
    },
    {
        number: "02",
        title: "Portfolio Website",
        description: "Creative portfolio website for a photographer with stunning visuals and interactive gallery.",
        tags: ["Nuxt", "GSAP", "Lenis"],
        link: "https://project-url.com",
        image: "images/project2.jpg"
    }
    // Tambahkan lebih banyak...
]
```

**Tips:**
- **Number**: Urutkan dari 01, 02, 03, dst
- **Title**: Gunakan nama project yang jelas
- **Description**: 1-2 kalimat yang menjelaskan project
- **Tags**: 3-5 teknologi yang digunakan - **Icons akan otomatis muncul!** ✨
- **Link**: URL project (live atau GitHub)
- **Image**: Path relatif dari root, data URL (dari upload), atau `null` untuk placeholder

### 🎨 Technology Icons

**Tags otomatis berubah menjadi icon!** Tidak perlu setup tambahan.

Saat Anda menambahkan tags seperti:
- `"React"` → Akan muncul icon React
- `"Next.js"` → Akan muncul icon Next.js
- `"JavaScript"` → Akan muncul icon JavaScript
- `"Tailwind"` → Akan muncul icon Tailwind
- Dan banyak lagi!

**Supported Technologies:**
- JavaScript, TypeScript
- React, Vue, Angular, Svelte
- Next.js, Nuxt, Astro, Remix, Gatsby
- Tailwind, Bootstrap, Sass
- GSAP, Framer Motion, Lenis
- Three.js, Blender
- Node.js, Express, Python, PHP
- PostgreSQL, MySQL, MongoDB, Firebase, Supabase
- Vercel, Netlify, AWS, Docker
- Git, GitHub, GitLab
- Figma, Adobe tools
- Dan banyak lagi!

**Jika teknologi tidak ada icon:**
- Tag akan tetap muncul sebagai text
- Anda bisa menambahkan icon baru di `icons.js`

**Icon juga muncul di:**
- Project tags (di section Projects)
- Technologies list (di section About)

### Menambah Gambar Project

**Cara 1: Upload dari Dashboard (Recommended)**
1. Login sebagai admin di `login.html`
2. Buka dashboard → tab "Add Project"
3. Upload image dengan drag & drop atau klik area upload
4. Image akan otomatis disimpan sebagai data URL
5. Tidak perlu setup folder atau path manual

**Cara 2: Manual (File Path)**
1. Buat folder `assets/images/` di root project
2. Simpan gambar project (format: JPG, PNG, atau WebP)
3. Update path di `image: "assets/images/your-image.jpg"`

**Optimal Image Specs:**
- Format: WebP (terbaik) atau JPG
- Size: 1200x675px (16:9 ratio)
- File size: < 500KB (optimize dengan TinyPNG)

---

## 5️⃣ Social Links

Edit bagian `social`:

```javascript
social: {
    instagram: "https://instagram.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    github: "https://github.com/yourusername",
    twitter: "https://twitter.com/yourusername",  // Optional
    behance: null,  // Set null untuk hide
    dribbble: null  // Set null untuk hide
}
```

**Tips:**
- Set `null` untuk social media yang tidak digunakan
- Link akan otomatis di-hide jika `null`
- Pastikan URL lengkap dengan `https://`

---

## 6️⃣ Meta Information (SEO)

Edit bagian `meta` untuk SEO:

```javascript
meta: {
    title: "John Doe — Creative Developer Portfolio",
    description: "Creative Developer specializing in modern web development, animations, and user experience. Based in Jakarta, Indonesia.",
    keywords: "portfolio, web developer, creative developer, frontend, javascript, react",
    author: "John Doe",
    ogImage: "/og-image.jpg"  // Open Graph image untuk social sharing
}
```

**Tips:**
- **Title**: Maksimal 60 karakter
- **Description**: 150-160 karakter (optimal untuk SEO)
- **Keywords**: 5-10 keywords relevan
- **ogImage**: Buat gambar 1200x630px untuk social media preview

---

## 7️⃣ Theme Colors (Optional)

Edit bagian `theme` untuk custom colors:

```javascript
theme: {
    bgColor: "#0a0a0a",      // Background color
    textColor: "#f5f5f5",    // Text color
    textMuted: "#888",       // Muted text
    accentColor: "#f5f5f5", // Accent color
    borderColor: "#1a1a1a"  // Border color
}
```

**Note:** Theme colors akan override CSS variables jika diimplementasikan.

---

## 🎯 Contoh Lengkap

Berikut contoh `config.js` yang lengkap:

```javascript
const CONFIG = {
    personal: {
        name: "Sarah Johnson",
        title: "Frontend Developer & Designer",
        location: "San Francisco, USA",
        email: "sarah@example.com",
        bio: [
            "I'm a passionate frontend developer with 5 years of experience creating beautiful and functional web experiences. I specialize in React, Next.js, and modern CSS.",
            "When I'm not coding, I love exploring new design trends and contributing to open-source projects."
        ]
    },
    
    services: {
        title: "services",
        items: [
            "Frontend Development",
            "UI/UX Design",
            "Performance Optimization"
        ]
    },
    
    technologies: {
        title: "technologies",
        items: [
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "Tailwind CSS",
            "GSAP"
        ]
    },
    
    projects: [
        {
            number: "01",
            title: "E-Commerce Platform",
            description: "Full-featured e-commerce platform with modern design and smooth animations.",
            tags: ["React", "Next.js", "Stripe"],
            link: "https://example.com",
            image: "images/project1.jpg"
        },
        {
            number: "02",
            title: "SaaS Dashboard",
            description: "Analytics dashboard with real-time data visualization and interactive charts.",
            tags: ["Vue.js", "D3.js", "Firebase"],
            link: "https://example.com",
            image: null
        }
    ],
    
    social: {
        instagram: "https://instagram.com/sarah",
        linkedin: "https://linkedin.com/in/sarah",
        github: "https://github.com/sarah",
        twitter: null,
        behance: null,
        dribbble: null
    },
    
    meta: {
        title: "Sarah Johnson — Frontend Developer Portfolio",
        description: "Frontend developer specializing in React and modern web development.",
        keywords: "portfolio, frontend developer, react, javascript",
        author: "Sarah Johnson",
        ogImage: "/og-image.jpg"
    }
};
```

---

## ✅ Checklist Customization

Setelah edit `config.js`, pastikan:

- [ ] Nama dan title sudah benar
- [ ] Email sudah benar
- [ ] Bio sudah di-update
- [ ] Services sesuai dengan yang Anda tawarkan
- [ ] Technologies list sudah lengkap
- [ ] Projects sudah diisi dengan project Anda
- [ ] Social links sudah benar
- [ ] Meta information sudah diisi untuk SEO
- [ ] Test di browser untuk memastikan semua tampil dengan benar

---

## 🐛 Troubleshooting

### Konten tidak berubah setelah edit config.js
- **Solution**: Hard refresh browser (Ctrl+F5 atau Cmd+Shift+R)
- Pastikan `config.js` di-load sebelum `app.js` di HTML

### Gambar project tidak muncul
- **Solution**: 
  - Jika menggunakan upload: Pastikan image sudah diupload dengan benar di dashboard
  - Jika menggunakan path: Pastikan path gambar benar (relatif dari root)
  - Check apakah file gambar ada di folder `assets/images/`
  - Gunakan path seperti: `"assets/images/project1.jpg"` bukan `"/assets/images/project1.jpg"`
  - Data URL dari upload akan otomatis bekerja

### Social links tidak muncul
- **Solution**: Pastikan URL lengkap dengan `https://`
- Set `null` untuk social media yang tidak digunakan

---

## 💡 Tips Pro

1. **Backup config.js** sebelum edit besar
2. **Test di local** sebelum deploy
3. **Optimize images** untuk performa lebih baik
4. **Update meta tags** untuk SEO yang lebih baik
5. **Keep it simple** - jangan terlalu banyak projects (3-6 optimal)

---

**Happy Customizing!** 🎨

