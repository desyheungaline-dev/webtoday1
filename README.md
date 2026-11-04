# Website PT. Tahan Angin: panduan hosting

Website statis (HTML, CSS, JS) tanpa database dan tanpa build. Isi folder ini bisa langsung diunggah ke hosting mana pun.

## Isi folder
```
deploy/
├── index.html            Halaman utama
├── 404.html              Halaman bila alamat tidak ditemukan
├── .htaccess             Pengaturan untuk Hostinger / IDwebhost (Apache/LiteSpeed)
├── .nojekyll             Pengaturan untuk GitHub Pages
├── robots.txt            Izin untuk mesin pencari
└── assets/
    ├── css/style.css     Tampilan
    ├── js/main.js        Menu HP, skala Beaufort, tab layanan, formulir
    └── img/              Foto dan ikon (favicon.svg)
```

> **Penting:** yang diunggah adalah **isi** folder `deploy`, bukan foldernya. `index.html` harus berada di folder paling atas di hosting.
> File `.htaccess` dan `.nojekyll` diawali titik, jadi bisa tersembunyi di Windows Explorer. Aktifkan **View → Show → Hidden items** agar file itu ikut terunggah.

---

## A. Hostinger (hPanel)
1. Login ke hPanel, lalu buka **Websites → Manage → File Manager**.
2. Masuk ke folder **`public_html`**. Hapus file bawaan `default.php` bila ada.
3. Klik **Upload**, lalu unggah `tahan-angin-deploy.zip` (ada di folder `profile pt`).
4. Klik kanan file zip, pilih **Extract**, dan pastikan hasil ekstraknya langsung ke `public_html` (bukan ke subfolder).
5. Pasang SSL: **Security → SSL → Install** (gratis).
6. Setelah SSL aktif, buka `.htaccess` lalu hapus tanda `#` di tiga baris "Paksa HTTPS".

## B. IDwebhost / Niagahoster / hosting cPanel lain
1. Login ke **cPanel**, lalu buka **File Manager → public_html**.
2. Klik **Upload**, unggah file zip, lalu klik kanan dan pilih **Extract** ke `public_html`.
3. Pasang SSL lewat menu **SSL/TLS Status** atau **AutoSSL** (gratis).
4. Setelah SSL aktif, aktifkan aturan "Paksa HTTPS" di `.htaccess` seperti di atas.

Cara lain tanpa File Manager: pakai FileZilla (FTP) dengan data FTP dari panel hosting, lalu seret isi folder `deploy` ke `public_html`.

## C. GitHub Pages (gratis)
1. Buat repository baru di GitHub, misalnya `tahan-angin`.
2. Klik **Add file → Upload files**, lalu seret **isi** folder `deploy` (termasuk folder `assets`). Klik **Commit changes**.
3. Buka **Settings → Pages**. Pada **Source**, pilih **Deploy from a branch**, branch `main`, folder `/ (root)`, lalu **Save**.
4. Tunggu 1–2 menit. Website tampil di `https://<username>.github.io/tahan-angin/`.

Bila memakai Git di komputer:
```bash
cd deploy
git init
git add .
git commit -m "Website PT. Tahan Angin"
git branch -M main
git remote add origin https://github.com/<username>/tahan-angin.git
git push -u origin main
```

> Catatan GitHub Pages: pada alamat `username.github.io/nama-repo/`, tombol "Kembali ke beranda" di halaman 404 mengarah ke `username.github.io`, bukan ke website ini. Masalah ini hilang bila memakai domain sendiri atau repo bernama `username.github.io`.

## D. Netlify / Vercel / Cloudflare Pages (gratis)
Seret folder `deploy` ke halaman **app.netlify.com/drop**. Website langsung online. Vercel dan Cloudflare Pages juga bisa: pilih "upload folder", tanpa build command.

---

## Memakai domain sendiri (misal tahanangin.co.id)
- **Hostinger / IDwebhost:** domain yang dibeli di tempat yang sama biasanya langsung terhubung ke `public_html`.
- **GitHub Pages:** di **Settings → Pages → Custom domain** isi nama domain. Lalu di pengelola DNS domain, buat record `CNAME` `www` → `<username>.github.io`.

## Sebelum online, ganti data contoh
Semua data di website masih **contoh**. Ubah di file berikut (buka dengan Notepad atau VS Code):

| Yang diganti | File | Cari teks |
|---|---|---|
| Alamat, telepon, email | `index.html` | `Jl. Pelabuhan Raya`, `(021) 000-0000`, `info@tahanangin.co.id` |
| Tahun berdiri, karyawan, jumlah pelabuhan | `index.html` | `2005`, `±150`, `Pelabuhan tujuan rutin` |
| Jam operasional | `index.html` | `Senin–Sabtu` |
| Rincian 4 layanan, rute, terminal | `assets/js/main.js` | `var SVC=` |
| Email di ringkasan formulir | `assets/js/main.js` | `info@tahanangin.co.id` |
| Foto | `assets/img/` | Ganti file dengan nama yang sama |
| Catatan "data contoh" di footer | `index.html` | `data contoh` |

## Formulir penawaran
Formulir saat ini **tidak mengirim** ke mana pun. Formulir hanya menampilkan ringkasan permintaan. Agar benar-benar terkirim ke email, sambungkan ke layanan formulir seperti Formspree, Web3Forms, atau Getform (gratis untuk volume kecil), atau minta saya memasangnya.
