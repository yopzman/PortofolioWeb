# Dashboard Guide

## Overview

Dashboard adalah panel admin yang memungkinkan Anda untuk mengelola project portfolio dengan mudah tanpa perlu mengedit file `config.js` secara manual.

## Fitur

- ✅ **Tambah Project** - Form lengkap untuk menambah project baru
- ✅ **Edit Project** - Edit project yang sudah ada dengan mudah
- ✅ **Hapus Project** - Hapus project dengan konfirmasi
- ✅ **Upload Image** - Upload image langsung dari dashboard dengan drag & drop
- ✅ **Image Preview** - Preview image sebelum save
- ✅ **Preview Tags** - Lihat preview icon teknologi untuk setiap tag
- ✅ **Git Sync** - Sync dengan GitHub/GitLab repositories
- ✅ **Local Database** - Auto-save ke localStorage
- ✅ **Download Config** - Download file `config.js` untuk backup (opsional)
- ✅ **Keyboard Shortcuts** - Akses cepat dengan keyboard

## Cara Menggunakan

### Membuka Dashboard

1. **Tombol Toggle** - Klik tombol ⚙️ di pojok kanan bawah halaman
2. **Keyboard Shortcut** - Tekan `Ctrl + Shift + D`

### Menambah Project Baru

1. Buka dashboard
2. Klik tab **"Add Project"**
3. Isi form:
   - **Project Number**: Nomor project (contoh: "01", "02")
   - **Project Title**: Nama project
   - **Description**: Deskripsi project
   - **Tags**: Tag teknologi (pisahkan dengan koma, contoh: "React, Next.js, GSAP")
   - **Project Link**: URL project (opsional)
   - **Project Image**: 
     - Upload image dengan klik area upload atau drag & drop
     - Atau masukkan image path manual (contoh: "assets/images/project1.jpg")
     - Image akan otomatis di-preview
4. Klik **"Save Project"**
5. Project langsung tersimpan ke local database
6. Halaman otomatis reload untuk menampilkan project baru

### Mengedit Project

1. Buka dashboard
2. Di tab **"Projects List"**, klik tombol **"Edit"** pada project yang ingin diedit
3. Form akan terisi dengan data project yang ada
4. Edit data yang diperlukan
5. Klik **"Save Project"**
6. Project langsung tersimpan ke local database
7. Halaman otomatis reload untuk menampilkan perubahan

### Menghapus Project

1. Buka dashboard
2. Di tab **"Projects List"**, klik tombol **"Delete"** pada project yang ingin dihapus
3. Konfirmasi penghapusan
4. Project langsung dihapus dari local database
5. Halaman otomatis reload

## Keyboard Shortcuts

- `Ctrl + Shift + D` - Buka/tutup dashboard
- `Escape` - Tutup dashboard

## Tips

### Tags dengan Icon Otomatis

Saat Anda menambahkan tag teknologi, icon akan otomatis muncul jika teknologi tersebut didukung. Lihat `ICONS_GUIDE.md` untuk daftar teknologi yang didukung.

Contoh tag yang akan menampilkan icon:
- `React` → Icon React
- `Next.js` → Icon Next.js
- `TypeScript` → Icon TypeScript
- `Vue` → Icon Vue

### Upload Image

Dashboard mendukung upload image langsung dengan beberapa cara:

**Cara 1: Upload File**
1. Klik area upload atau tombol "Select Image"
2. Pilih file image dari komputer
3. Image akan otomatis di-preview
4. Image akan disimpan sebagai data URL (base64)

**Cara 2: Drag & Drop**
1. Drag file image ke area upload
2. Drop file di area upload
3. Image akan otomatis di-preview

**Cara 3: Image Path Manual**
1. Masukkan path image di input text
2. Format: `assets/images/project1.jpg`
3. Gunakan path relatif dari root folder

**Catatan:**
- Format yang didukung: PNG, JPG, GIF
- Ukuran maksimal: 5MB
- Image yang diupload disimpan sebagai data URL di localStorage
- Untuk production, pertimbangkan upload ke server/CDN

**Format Image Path:**
- ✅ `assets/images/project1.jpg`
- ✅ `assets/images/my-project.png`
- ❌ `/assets/images/project1.jpg` (jangan gunakan leading slash)
- ✅ Data URL (otomatis saat upload)

### Project Number

Project number digunakan untuk sorting dan display. Format yang disarankan:
- `01`, `02`, `03` (dengan leading zero)
- `1`, `2`, `3` (tanpa leading zero)

## Troubleshooting

### Dashboard tidak muncul

1. Pastikan `dashboard.js` sudah dimuat di `index.html`
2. Pastikan `dashboard.css` sudah dimuat di `index.html`
3. Pastikan `config.js` sudah dimuat sebelum `dashboard.js`
4. Buka browser console untuk melihat error

### Project tidak tersimpan

1. Pastikan semua field required sudah diisi
2. Pastikan format data valid (URL untuk link, dll)
3. Cek browser console untuk error
4. Coba download config.js dan cek apakah data sudah benar

### Icon tidak muncul

1. Pastikan tag menggunakan nama yang tepat (case-sensitive)
2. Lihat `ICONS_GUIDE.md` untuk daftar teknologi yang didukung
3. Pastikan `icons.js` sudah dimuat

## Catatan Penting

⚠️ **Admin Login Required**

Dashboard hanya bisa diakses setelah login sebagai admin. Default credentials: `admin` / `admin123`. **PENTING**: Ganti credentials di `js/auth.js` untuk keamanan!

💾 **Local Database (localStorage)**

Dashboard menggunakan localStorage sebagai primary storage:
- Projects disimpan di `portfolio_projects_db`
- Semua perubahan langsung tersimpan
- Tidak perlu download config.js setiap kali (opsional untuk backup)
- Data bisa diakses melalui browser console:

```javascript
JSON.parse(localStorage.getItem('portfolio_projects_db'))
```

📸 **Image Upload**

- Image yang diupload disimpan sebagai data URL (base64)
- Ukuran maksimal: 5MB
- Format: PNG, JPG, GIF
- Untuk production, pertimbangkan upload ke server/CDN

## Struktur Data Project

Setiap project memiliki struktur berikut:

```javascript
{
    number: "01",              // String: Nomor project
    title: "Project Name",     // String: Nama project
    description: "Description", // String: Deskripsi project
    tags: ["React", "Next.js"], // Array: Tag teknologi
    link: "https://...",       // String: URL project (atau "#")
    image: "assets/images/..." // String: Path gambar (atau null)
}
```

## Support

Jika ada masalah atau pertanyaan, silakan cek:
- `README.md` - Dokumentasi utama
- `CUSTOMIZATION_GUIDE.md` - Panduan kustomisasi
- `ICONS_GUIDE.md` - Panduan icon teknologi

