# Admin Guide - Login & Local Database

## Overview

Sistem admin portfolio menggunakan **authentication** dan **local database** (localStorage) untuk mengelola projects. Dashboard hanya dapat diakses oleh admin yang sudah login.

## 🔐 Login System

### Default Credentials

- **Username**: `admin`
- **Password**: `admin123`

⚠️ **PENTING**: Ganti credentials default di `js/auth.js` untuk keamanan!

### Cara Login

1. Buka `login.html` di browser
2. Masukkan username dan password
3. Klik "Login"
4. Anda akan di-redirect ke halaman utama dengan akses dashboard

### Mengubah Credentials

Edit file `js/auth.js`:

```javascript
const Auth = {
    credentials: {
        username: 'your_username',  // ← Ganti ini
        password: 'your_password'    // ← Ganti ini
    },
    // ...
}
```

Atau gunakan method `updateCredentials()`:

```javascript
Auth.updateCredentials('new_username', 'new_password');
```

## 🗄️ Local Database

Projects disimpan di **localStorage** browser dengan key `portfolio_projects_db`. Ini berarti:

- ✅ Data tersimpan di browser lokal
- ✅ Tidak perlu server atau database eksternal
- ✅ Perubahan langsung tersimpan
- ⚠️ Data hanya tersimpan di browser yang sama
- ⚠️ Data bisa hilang jika clear browser data

### Struktur Data

Projects disimpan dalam format JSON array:

```javascript
[
    {
        number: "01",
        title: "Project Name",
        description: "Project description",
        tags: ["React", "Next.js"],
        link: "https://project-url.com",
        image: "assets/images/project1.jpg"
    },
    // ... more projects
]
```

### Backup & Restore

#### Backup Data

```javascript
// Di browser console
const projects = JSON.parse(localStorage.getItem('portfolio_projects_db'));
console.log(JSON.stringify(projects, null, 2));
// Copy output dan simpan ke file
```

#### Restore Data

```javascript
// Di browser console
const projects = [/* paste your projects array here */];
localStorage.setItem('portfolio_projects_db', JSON.stringify(projects));
location.reload();
```

## 🎯 Cara Menggunakan Dashboard

### 1. Login

Buka `login.html` dan login dengan credentials admin.

### 2. Akses Dashboard

Setelah login, tombol ⚙️ akan muncul di pojok kanan bawah halaman utama.

**Cara akses:**
- Klik tombol ⚙️
- Atau tekan `Ctrl + Shift + D`

### 3. Manage Projects

#### Menambah Project

1. Buka dashboard
2. Klik tab "Add Project"
3. Isi form:
   - **Project Number**: Nomor project (contoh: "01")
   - **Project Title**: Nama project
   - **Description**: Deskripsi project
   - **Tags**: Tag teknologi (pisahkan dengan koma)
   - **Project Link**: URL project (opsional)
   - **Image Path**: Path gambar (opsional)
4. Klik "Save Project"
5. Halaman akan otomatis reload untuk menampilkan project baru

#### Mengedit Project

1. Buka dashboard
2. Di tab "Projects List", klik "Edit" pada project yang ingin diedit
3. Edit data di form
4. Klik "Save Project"
5. Halaman akan otomatis reload

#### Menghapus Project

1. Buka dashboard
2. Di tab "Projects List", klik "Delete" pada project yang ingin dihapus
3. Konfirmasi penghapusan
4. Halaman akan otomatis reload

## 🔄 Sync dengan CONFIG

Dashboard menggunakan **local database sebagai primary storage**, tetapi juga:

- ✅ Menyimpan ke localStorage (`portfolio_projects_db`)
- ✅ Update CONFIG object di memory
- ✅ Generate file `config.js` untuk download (opsional)

### Priority Order

1. **localStorage** (`portfolio_projects_db`) - Primary source
2. **CONFIG.projects** - Fallback jika localStorage kosong

### Download Config.js

Dashboard menyediakan tombol "Download Updated config.js" untuk:
- Backup projects ke file
- Deploy ke production
- Version control

## 🔒 Security Notes

⚠️ **PENTING**: Sistem ini menggunakan localStorage dan tidak aman untuk production!

### Untuk Development/Local Use:
- ✅ Cukup aman untuk penggunaan lokal
- ✅ Tidak perlu server
- ✅ Simple dan mudah digunakan

### Untuk Production:
- ⚠️ Ganti credentials default
- ⚠️ Pertimbangkan menggunakan backend dengan proper authentication
- ⚠️ localStorage bisa diakses oleh JavaScript di halaman yang sama
- ⚠️ Tidak ada enkripsi password (password disimpan plain text)

### Best Practices:

1. **Ganti Default Credentials**
   ```javascript
   // js/auth.js
   credentials: {
       username: 'strong_username',
       password: 'strong_password_123!'
   }
   ```

2. **Jangan Commit Credentials**
   - Tambahkan `js/auth.js` ke `.gitignore` jika berisi credentials sensitif
   - Atau gunakan environment variables

3. **Backup Data Regularly**
   - Export projects dari localStorage secara berkala
   - Simpan backup di tempat aman

## 🚪 Logout

### Cara Logout

1. Buka dashboard
2. Klik tombol "Logout" di header dashboard
3. Atau hapus session secara manual:
   ```javascript
   // Di browser console
   localStorage.removeItem('portfolio_admin_auth');
   location.reload();
   ```

### Session Duration

Session admin berlaku selama **24 jam** sejak login. Setelah itu, user harus login lagi.

## 🐛 Troubleshooting

### Dashboard tidak muncul

1. Pastikan sudah login di `login.html`
2. Cek apakah `js/auth.js` sudah dimuat
3. Buka browser console untuk melihat error
4. Cek localStorage: `localStorage.getItem('portfolio_admin_auth')`

### Projects tidak tersimpan

1. Cek browser console untuk error
2. Pastikan localStorage tidak penuh
3. Cek apakah browser support localStorage
4. Coba clear localStorage dan login lagi:
   ```javascript
   localStorage.clear();
   location.reload();
   ```

### Login tidak berfungsi

1. Cek credentials di `js/auth.js`
2. Pastikan `js/auth.js` sudah dimuat sebelum `js/login.js`
3. Clear browser cache dan coba lagi
4. Cek browser console untuk error

### Projects hilang setelah clear browser

- Data localStorage akan hilang jika:
  - Clear browser data
  - Incognito/Private mode
  - Browser cache cleared
- **Solusi**: Backup data secara berkala menggunakan tombol "Download config.js"

## 📝 Notes

- Session disimpan di localStorage dengan key `portfolio_admin_auth`
- Projects disimpan di localStorage dengan key `portfolio_projects_db`
- Credentials bisa disimpan di localStorage dengan key `portfolio_admin_credentials` (opsional)
- Semua data localStorage bisa diakses melalui browser DevTools

## 🔗 Related Files

- `login.html` - Halaman login
- `js/auth.js` - Authentication system
- `js/login.js` - Login page logic
- `js/dashboard.js` - Dashboard dengan local database
- `js/renderer.js` - Render projects dari localStorage

