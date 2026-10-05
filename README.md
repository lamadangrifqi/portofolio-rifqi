# Portfolio Rifqi Lamadang

Source React + Vite yang sudah dibersihkan dari data proyek, testimoni, dan riwayat karier contoh. Identitas hero merah-hitam, lanyard pendulum, Lenis, dan Motion dipertahankan.

## Menjalankan

Gunakan Node.js 22 atau lebih baru.

```bash
npm ci
npm run dev
```

Pemeriksaan TypeScript dan build produksi:

```bash
npm run lint
npm run build
npm run preview
```

Build menghasilkan folder `dist`. Jangan deploy `src` sebagai website statis: `index.html` pada source menunjuk file TSX yang harus dibangun terlebih dahulu.

## AI Studio

Buka/import source ZIP ini sebagai proyek. Tidak ada fitur Gemini dan tidak diperlukan API key. Pertahankan `package-lock.json`. Jika melakukan perubahan dengan AI, batasi satu jenis perubahan per tahap dan jalankan build sesudahnya.

## Netlify

`netlify.toml` sudah menentukan:

- Build command: `npm run build`
- Publish directory: `dist`
- Node.js: 22

Untuk unggah manual, unggah isi folder `dist` sesudah build. Source ZIP bukan folder publish. Repository source: https://github.com/lamadangrifqi/portofolio-rifqi. Untuk deploy melalui integrasi GitHub, gunakan build command dan publish directory di atas.

## Isi yang dapat diedit

- `src/data/profileData.ts`: identitas, gelar, email, sosial, serta fokus pekerjaan.
- `src/data/portfolioData.ts`: proyek, uraian, status, dan tautan.
- `src/data/servicesData.ts`: layanan, paket fotografi, alat, dan workflow.
- `public/projects`: sampul identitas proyek dalam SVG. Ini bukan screenshot produk atau hasil fotografi.

Red Rush Digital dan Galeri Ku Palu disebut sebagai dua usaha terpisah. Sistem Cuti Akademik dan SKP Autolog diberi label pengembangan/internal. Foto contoh Unsplash dan testimoni contoh tidak digunakan.

Alamat GitHub diselaraskan menjadi `lamadangrifqi`, berdasarkan URL repo yang Anda berikan. URL Instagram dan LinkedIn dipertahankan dari source awal; kepemilikan dan keberadaan profil belum diverifikasi. Konfirmasikan kedua alamat tersebut sebelum publikasi. Nomor WhatsApp belum tersedia dalam source terkonfirmasi, sehingga kontak memakai email dan salin brief.

Nama institusi serta tahun pendidikan belum ditambahkan karena belum ada data terkonfirmasi. Galeri hasil fotografi dan screenshot produk nyata dapat dimasukkan setelah aset tersedia; jangan memakai gambar stok sebagai hasil pekerjaan sendiri.

## SEO setelah domain final dipilih

Isi `SITE_URL` di environment build, atau salin `.env.example` menjadi `.env.local` dan isi origin domain final (tanpa subpath). Lalu build kembali. Dengan domain ini, build menambahkan canonical, OG URL, alamat OG image absolut, dan sitemap. Jika kosong, build tidak mengarang domain; JSON-LD Person, metadata, OG cover, favicon, dan robots tetap tersedia.

Contoh shell, ganti domain dengan domain final Anda:

```bash
SITE_URL=https://domain-anda.id npm run build
```

## Scrolling & interaksi

Provider Lenis berada di `main.tsx`, dengan `smoothWheel: true`, `duration: 1.2`, `syncTouch: false` pada kondisi normal. Reduced motion mematikan smooth wheel dan membuat navigasi langsung. Hero, navbar, serta footer memakai `usePageScroll` dengan offset 90px. CSS scroll margin sengaja nol agar offset tidak dihitung dua kali oleh Lenis.

Motion tetap membaca scroll melalui `useScroll → useSpring → useTransform`. Timeline menggunakan `scaleY`, bukan animasi tinggi per frame. Lanyard mempertahankan gravitasi, damping, pointer capture, dan `touch-action: none`; rotasi memakai MotionValue. Lenis berhenti selama drag dan dipulihkan sesudahnya.

Hero tidak lagi memakai `canvas.toDataURL()` per frame. Mask dibuat dengan CSS radial gradient; cursor dan partikel hanya berjalan pada desktop dengan pointer halus. Efek berhenti saat tidak terlihat atau tab tidak aktif. Mobile mempertahankan native touch scroll dan versi visual yang lebih ringan. Sketchbook ThreeUI tersedia sebagai eksperimen opsional dengan kredit serta keterangan aset demo.

Laporan perubahan dan validasi tersedia di `PERUBAHAN_DAN_PENGUJIAN.md`.

## Menambahkan foto hasil karya — Infinite Drift 2

Bagian **Foto & Karya Visual** berada setelah katalog proyek. Pengaturan sesuai permintaan: curve 0.35, curveRadius 1.5, zoom 0.08, tile 220×220, gap 18, borderRadius 18, autoScrollX 0.4, autoScrollY 0.15, drag/wheel aktif, dan vignette 0.25. Tinggi 620px di desktop dan 420px di ponsel.

1. Simpan JPG/WebP/PNG karya sendiri di `public/hasil-karya/`. Misalnya `wisuda-01.webp`. Sebaiknya sisi panjang sekitar 1600–2000px dan kompres ukuran file untuk web.
2. Edit `public/hasil-karya/gallery.json`. Ganti `[]` dengan daftar foto seperti contoh berikut. File yang disebut harus benar-benar tersedia; foto contoh belum disertakan.

```json
[
  {
    "id": "wisuda-01",
    "src": "/hasil-karya/wisuda-01.webp",
    "title": "Foto Wisuda",
    "alt": "Deskripsikan subjek dan suasana foto yang sebenarnya",
    "caption": "Keterangan singkat hasil karya ini"
  },
  {
    "id": "desain-01",
    "src": "/hasil-karya/desain-01.jpg",
    "title": "Poster Kegiatan",
    "alt": "Deskripsikan isi poster yang sebenarnya",
    "caption": "Jenis pekerjaan dan konteks desain"
  }
]
```

`id` harus unik. `src`, `title`, dan `alt` wajib; `caption` opsional. Jangan tulis `public` di URL foto. Semua entri ditampilkan; tidak dibatasi sembilan foto seperti atlas komponen asal. Daftar kosong menampilkan keterangan koleksi sedang disiapkan.

3. Jalankan `npm run build` dan perbarui deployment menggunakan hasil `dist`.

Untuk paket Netlify siap unggah, salin foto ke folder `hasil-karya/` dan edit `hasil-karya/gallery.json` dengan pola yang sama, lalu unggah ulang seluruh paket. Perubahan foto/JSON tidak memerlukan build ulang jika kode tidak berubah.

Galeri ini memakai daftar foto untuk publikasi, bukan uploader publik atau penyimpanan foto lewat browser. Pembaruan dilakukan dengan mengunggah file foto dan daftar tersebut ke website.

Tersedia jeda gerak, navigasi keyboard, daftar seluruh foto, dan dialog ukuran penuh dengan judul/keterangan. Gerak otomatis dimatikan di ponsel; reduced motion memakai daftar statis. Jika WebGL atau gambar atlas gagal, galeri beralih ke daftar foto. Render berhenti di luar layar dan saat tab tidak aktif. Drag menghentikan Lenis sementara. Wheel di dalam galeri menggeser foto; wheel di luar galeri menggulir halaman.

Komponen asal: Lightswind UI Infinite Drift 2, disesuaikan untuk proyek ini. Lisensi: `docs/licenses/LIGHTSWIND-LICENSE`.

## Menambahkan logo brand yang pernah bekerja sama

Marquee logo berada **tepat di bawah hero**, sebelum profil. Tidak ada nama/logo perusahaan contoh yang diklaim sebagai mitra.

1. Simpan logo PNG transparan, SVG, atau WebP di `public/brands/`, misalnya `nama-brand.png`.
2. Edit `public/brands/logos.json`. Ganti `[]` dengan daftar berikut, lalu sesuaikan dengan brand yang benar-benar pernah bekerja sama:

```json
[
  {
    "id": "brand-01",
    "name": "Nama Brand",
    "src": "/brands/nama-brand.png",
    "href": "https://website-brand.id"
  }
]
```

`id`, `name`, dan `src` wajib; `id` unik. `href` opsional, hapus jika tidak ada website tujuan. Jangan gunakan URL contoh di atas untuk publikasi. Logo yang gagal dimuat diganti dengan nama brand tersebut.

Konfigurasi: `speed={60}`, `height="120px"`, blur aktif dengan intensitas 2, pause on hover, dan grid background. Kecepatan dihitung 60 piksel per detik agar konsisten saat jumlah logo/lebar layar berubah. Tidak memakai callback `console.log` contoh; logo dengan `href` membuka website brand.

Animasi berhenti saat hover, fokus keyboard, di luar layar, tab tidak aktif, atau dijeda lewat tombol. Jeda manual tetap berlaku setelah kursor keluar dari area logo. Reduced motion menampilkan semua logo secara statis. Duplikasi untuk loop tidak menjadi tautan/tab tambahan bagi pembaca layar atau pengguna keyboard.

Seperti galeri foto, paket Netlify dapat diperbarui langsung melalui folder `brands/` dan `brands/logos.json`, kemudian unggah ulang seluruh paket. Untuk source, gunakan `npm run build` sebelum deploy.
