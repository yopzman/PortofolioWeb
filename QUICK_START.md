# 🚀 Quick Start Guide

Panduan cepat untuk memulai portfolio website.

## ⚡ 3 Langkah Setup

### 1️⃣ Edit Configuration

Buka `js/config.js` dan edit:

```javascript
personal: {
    name: "Your Name",        // ← Ganti nama
    email: "your@email.com",  // ← Ganti email
    // ...
}
```

### 2️⃣ Preview

```bash
# NPM script (recommended)
npm run dev

# Atau custom port
npm run dev:3001
```

Buka: `http://localhost:8000` (atau port yang digunakan)

### 3️⃣ Deploy

**Vercel:**
```bash
vercel
```

**Netlify:**
- Drag & drop folder ke [netlify.com/drop](https://app.netlify.com/drop)

**GitHub Pages:**
- Push ke GitHub → Settings → Pages → Enable

## 📝 File yang Perlu Diedit

| File | Untuk Apa |
|------|-----------|
| `js/config.js` | ⭐ **Semua konten** - Edit ini saja! |
| `css/style.css` | Hanya jika ingin ubah design |
| `js/icons.js` | Hanya jika ingin tambah icon baru |
| `js/auth.js` | Ganti default credentials admin (penting!) |

## 🎛️ Dashboard Panel (Recommended)

**Cara termudah untuk manage projects!**

1. Login sebagai admin di `login.html` (default: `admin` / `admin123`)
2. Buka dashboard dengan tombol ⚙️ atau `Ctrl + Shift + D`
3. Tambah/edit/hapus projects dengan mudah
4. Upload image langsung dari dashboard
5. Sync dengan GitHub/GitLab repositories

**Lihat [docs/DASHBOARD_GUIDE.md](./docs/DASHBOARD_GUIDE.md) untuk panduan lengkap!**

## 🎨 Customization

**Semua customization di `js/config.js`:**

- `personal` → Nama, email, bio, lokasi
- `projects` → Projects dengan tags (icons otomatis!)
- `technologies` → Tech stack (icons otomatis!)
- `social` → Social media links

## 📚 Dokumentasi Lengkap

- **[docs/README.md](./docs/README.md)** - Dokumentasi lengkap
- **[docs/CUSTOMIZATION_GUIDE.md](./docs/CUSTOMIZATION_GUIDE.md)** - Panduan customization
- **[docs/DASHBOARD_GUIDE.md](./docs/DASHBOARD_GUIDE.md)** - Panduan dashboard panel
- **[docs/ADMIN_GUIDE.md](./docs/ADMIN_GUIDE.md)** - Panduan admin & login
- **[docs/GIT_SYNC_GUIDE.md](./docs/GIT_SYNC_GUIDE.md)** - Panduan Git Sync
- **[docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - Panduan deployment
- **[docs/ICONS_GUIDE.md](./docs/ICONS_GUIDE.md)** - Technology icons
- **[STRUCTURE.md](./STRUCTURE.md)** - Struktur project

## ✅ Checklist

- [ ] Edit `js/config.js` dengan info Anda
- [ ] Ganti default credentials di `js/auth.js` (penting!)
- [ ] Test di local (`npm run dev`)
- [ ] Login sebagai admin dan test dashboard
- [ ] Tambah project images (upload dari dashboard atau manual)
- [ ] Test Git Sync jika menggunakan GitHub/GitLab
- [ ] Deploy ke platform pilihan
- [ ] Test website setelah deploy

---

**That's it! Happy coding! 🎉**

