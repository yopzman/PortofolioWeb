# Git Sync Guide

## Overview

Fitur **Git Sync** memungkinkan Anda untuk sync projects portfolio dengan repositories dari **GitHub** atau **GitLab**. Anda bisa fetch repositories, import sebagai project, dan auto-update project info dari repository.

## ✨ Fitur

- ✅ **GitHub Integration** - Fetch repositories dari GitHub
- ✅ **GitLab Integration** - Fetch repositories dari GitLab
- ✅ **Auto-detect Technologies** - Otomatis detect technologies dari repository topics dan language
- ✅ **Import Repository** - Import repository sebagai project portfolio
- ✅ **Update Existing** - Update project yang sudah ada dari repository
- ✅ **Sync All** - Sync semua projects sekaligus
- ✅ **Credentials Storage** - Simpan credentials untuk akses mudah

## 🚀 Cara Menggunakan

### 1. Setup GitHub Sync

1. Buka dashboard (tombol ⚙️)
2. Klik tab **"Sync Repos"**
3. Di section **"GitHub Sync"**:
   - Masukkan **GitHub Username** Anda
   - (Optional) Masukkan **GitHub Token** untuk akses private repos
4. Klik **"Fetch Repositories"**
5. List repositories akan muncul di bawah

### 2. Setup GitLab Sync

1. Di tab **"Sync Repos"**
2. Di section **"GitLab Sync"**:
   - Masukkan **GitLab Username** Anda
   - (Optional) Masukkan **GitLab Token** untuk akses private repos
3. Klik **"Fetch Repositories"**
4. List repositories akan muncul di bawah

### 3. Import Repository

1. Setelah fetch repositories, list akan muncul
2. Setiap repository card menampilkan:
   - Repository name
   - Description
   - Technologies (auto-detected)
   - Stars & Forks count
   - Status (Imported/Not imported)
3. Klik tombol **"Import"** pada repository yang ingin diimport
4. Repository akan otomatis diimport sebagai project
5. Halaman akan reload untuk menampilkan project baru

### 4. Update Existing Project

1. Jika repository sudah diimport sebelumnya, tombol akan berubah menjadi **"Update"**
2. Klik **"Update"** untuk sync data terbaru dari repository
3. Project akan diupdate dengan info terbaru

### 5. Sync All Repositories

1. Klik tombol **"Sync All Repositories"**
2. Sistem akan:
   - Fetch semua repositories dari GitHub/GitLab yang sudah dikonfigurasi
   - Update semua projects yang sudah memiliki `repoUrl`
   - Menampilkan jumlah projects yang diupdate

## 🔑 GitHub Token

### Kapan Perlu Token?

- ✅ Untuk akses private repositories
- ✅ Untuk menghindari rate limit (60 requests/hour tanpa token)
- ✅ Untuk akses repositories dari organization

### Cara Membuat GitHub Token

1. Buka [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Klik **"Generate new token (classic)"**
3. Beri nama token (contoh: "Portfolio Sync")
4. Pilih scope: **`public_repo`** (untuk public repos) atau **`repo`** (untuk private repos)
5. Klik **"Generate token"**
6. Copy token (hanya muncul sekali!)
7. Paste token di form GitHub Sync

### Token Format

GitHub token biasanya dimulai dengan `ghp_`:
```
ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 🔑 GitLab Token

### Kapan Perlu Token?

- ✅ Untuk akses private repositories
- ✅ Untuk akses repositories dari group/organization
- ✅ Untuk rate limit yang lebih tinggi

### Cara Membuat GitLab Token

1. Buka [GitLab Settings > Access Tokens](https://gitlab.com/-/user_settings/personal_access_tokens)
2. Klik **"Add new token"**
3. Beri nama token (contoh: "Portfolio Sync")
4. Pilih scope: **`read_api`** atau **`read_repository`**
5. Pilih expiration date (optional)
6. Klik **"Create personal access token"**
7. Copy token (hanya muncul sekali!)
8. Paste token di form GitLab Sync

### Token Format

GitLab token biasanya dimulai dengan `glpat-`:
```
glpat-xxxxxxxxxxxxxxxxxxxx
```

## 🔍 Auto-detect Technologies

Sistem akan otomatis detect technologies dari:

1. **Repository Language** - Bahasa utama repository (JavaScript, Python, dll)
2. **Repository Topics** - Topics/tags yang ditambahkan di repository
3. **Filter Generic Topics** - Topics seperti "portfolio", "project", "website" akan di-filter

### Contoh

Repository dengan:
- Language: `JavaScript`
- Topics: `react`, `nextjs`, `portfolio`, `web`

Akan menghasilkan tags: `JavaScript`, `react`, `nextjs` (portfolio dan web di-filter)

## 📋 Repository Card Info

Setiap repository card menampilkan:

- **🐙/🦊 Icon** - GitHub (🐙) atau GitLab (🦊)
- **Repository Name** - Nama repository
- **Description** - Deskripsi repository
- **Technologies** - Technologies dengan icon (jika didukung)
- **Stars** - Jumlah stars
- **Forks** - Jumlah forks
- **Status Badge** - "Imported" jika sudah diimport
- **Actions**:
  - **View Repo** - Buka repository di GitHub/GitLab
  - **Import/Update** - Import atau update project

## 🔄 Sync Process

### Import Repository

Saat import repository:

1. Repository data di-fetch dari API
2. Technologies di-detect dari language dan topics
3. Project dibuat dengan format:
   ```javascript
   {
       number: "01", // Auto-generated
       title: "repository-name",
       description: "Repository description",
       tags: ["JavaScript", "React", "Next.js"], // Auto-detected
       link: "https://homepage-url.com" || "https://github.com/...",
       image: null,
       repoUrl: "https://github.com/username/repo", // For sync
       source: "github" || "gitlab",
       stars: 10,
       forks: 5
   }
   ```
4. Project disimpan ke localStorage
5. Halaman reload untuk menampilkan project

### Update Existing Project

Saat update project:

1. Sistem mencari project dengan `repoUrl` yang sama
2. Fetch data terbaru dari repository
3. Update project dengan data baru
4. Technologies di-update dari topics terbaru
5. Description di-update dari repository description
6. Project disimpan ke localStorage
7. Halaman reload

### Sync All

Saat sync all:

1. Fetch semua repositories dari GitHub/GitLab yang dikonfigurasi
2. Untuk setiap project yang memiliki `repoUrl`:
   - Cari repository yang sesuai
   - Update project dengan data terbaru
3. Tampilkan jumlah projects yang diupdate

## 💾 Credentials Storage

Credentials disimpan di **localStorage** dengan key `portfolio_git_credentials`:

```javascript
{
    githubUsername: "your-username",
    githubToken: "ghp_xxxxx",
    gitlabUsername: "your-username",
    gitlabToken: "glpat-xxxxx"
}
```

⚠️ **Security Note**: Credentials disimpan di browser localStorage. Jangan share browser atau clear data jika ingin tetap tersimpan.

## 🐛 Troubleshooting

### "User not found" Error

- Pastikan username benar (case-sensitive untuk GitLab)
- Pastikan username adalah username, bukan organization name
- Untuk GitHub, coba akses `https://github.com/username` untuk verifikasi

### "Rate limit exceeded" Error

- **GitHub**: Gunakan token untuk meningkatkan rate limit (5000 requests/hour)
- **GitLab**: Token juga meningkatkan rate limit
- Tunggu beberapa saat sebelum fetch lagi

### "API error" Error

- Cek koneksi internet
- Pastikan token valid (jika menggunakan token)
- Cek apakah API GitHub/GitLab sedang down
- Buka browser console untuk error detail

### Repository tidak muncul

- Pastikan repository adalah public (jika tidak menggunakan token)
- Untuk private repos, wajib menggunakan token
- Cek apakah repository ada di account yang benar

### Technologies tidak terdeteksi

- Repository harus memiliki language atau topics
- Topics generic akan di-filter
- Bisa edit manual setelah import

### Import tidak berfungsi

- Pastikan sudah fetch repositories terlebih dahulu
- Cek browser console untuk error
- Pastikan localStorage tidak penuh
- Coba reload halaman dan fetch lagi

## 📝 Tips

1. **Gunakan Token** - Token meningkatkan rate limit dan akses ke private repos
2. **Sync Regularly** - Sync all secara berkala untuk update project info
3. **Edit Manual** - Setelah import, bisa edit project manual di tab "Add Project"
4. **Backup Credentials** - Simpan credentials di tempat aman jika perlu
5. **Check Rate Limits** - Jangan fetch terlalu sering untuk menghindari rate limit

## 🔗 API References

- [GitHub REST API](https://docs.github.com/en/rest)
- [GitLab REST API](https://docs.gitlab.com/ee/api/)

## 📄 Related Files

- `js/gitSync.js` - Git sync module
- `js/dashboard.js` - Dashboard dengan sync integration
- `css/dashboard.css` - Styling untuk sync section

