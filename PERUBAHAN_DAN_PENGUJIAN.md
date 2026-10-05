# Perubahan Portfolio Rifqi Lamadang

Basis revisi: `cyberpunk-portfolio-hero.zip`, source terbaru yang diaudit. Dua ZIP referensi lain tidak digabungkan atau ditimpa. Tidak dilakukan push GitHub atau publikasi website.

## 1. Akar masalah dan koreksi audit

Lenis sebenarnya sudah terpasang. Versi 1.3.26 menyediakan root store sebagai fallback, sehingga `useLenis()` di atas provider tidak otomatis menjadi bug. Provider dipindahkan ke `main.tsx` melalui `ScrollProvider` untuk memperjelas kepemilikan instance, dan navigasi disatukan melalui `usePageScroll`.

Hero lama meng-encode canvas menjadi data URL mask pada setiap frame, serta menjalankan efek meskipun tidak dibutuhkan. Spotlight sekarang memakai mask CSS radial gradient. Gambar hero yang sama tersedia secara lokal, sehingga tidak bergantung pada host gambar eksternal saat runtime.

Saat pengujian revisi, CSS scroll margin dan offset Lenis sempat terhitung dua kali. CSS margin dihapus sehingga hanya offset Lenis 90px yang berlaku. Ayunan lanyard pada layar kecil juga sempat memperlebar dokumen; dekorasi kini di-clip secara horizontal pada wrapper tanpa membuat scroll container baru.

## 2. Dependency

Dipertahankan: React, React DOM, Motion, Lenis, Lucide, ThreeUI, Vite, Tailwind, TypeScript.

Ditambahkan: `@fontsource-variable/urbanist`, `@fontsource-variable/manrope`, `@fontsource/jetbrains-mono`, serta tipe React dan React DOM. Font dilayani dari build lokal, bukan dua request stylesheet Google Fonts yang memuat tujuh keluarga font.

Dihapus: `@google/genai`, `express`, `dotenv`, `@types/express`, serta dependency langsung yang tidak dipakai (`autoprefixer`, `esbuild`, `tsx`). Dependency internal yang dibutuhkan toolchain tetap ditangani oleh npm. Tidak ditambahkan GSAP. `package-lock.json` disertakan dan lockfile Bun lama dihapus.

## 3. File dan struktur

- `App.tsx` diringkas menjadi susunan section.
- Hero dipisahkan ke `HeroSection.tsx`; efeknya berada di `useHeroEffects.ts` dan `useDecorativeMotion.ts`.
- `main.tsx`, `ScrollProvider.tsx`, dan `usePageScroll.ts` mengatur scrolling global.
- `profileData.ts`, `portfolioData.ts`, dan `servicesData.ts` menyimpan konten terkonfirmasi.
- Navbar, Footer, About, Career Journey, Tech Stack, Contact, Karya, dan HireMeModal dibenahi.
- `useDialog.ts` menyediakan focus trap, Escape, fokus kembali, background inert, dan penghentian scroll saat modal aktif.
- `LayananSection.tsx` kini menampilkan tiga layanan nyata.
- Demo Sketchbook dipindahkan ke `InteractiveLabSection.tsx` dengan loading opsional serta kredit ThreeUI.
- Komponen lanyard lama, testimoni contoh, pendidikan contoh, showcase toggle, dan re-export tidak terpakai dibuang.
- `index.html`, CSS, metadata, Vite config, favicon, OG cover, README, dan konfigurasi Netlify diperbarui.

## 4. Konfigurasi Lenis final

```tsx
<ReactLenis
  root
  options={{
    smoothWheel: !reducedMotion,
    duration: 1.2,
    syncTouch: false,
  }}
>
  {children}
</ReactLenis>
```

Satu instance mengendalikan document root. Touch tetap native. Reduced motion membuat navigasi langsung dan mematikan decorative motion. Offset navigasi 90px; Beranda dan Footer menuju posisi nol.

## 5. Navigasi native yang disatukan

Navbar, hero ke Kontak, indicator Eksplorasi Profil, dan Footer kembali ke atas memakai `usePageScroll`/Lenis. Hanya ada fallback native instan bila instance belum tersedia. Tidak ada browser `behavior: smooth`, scroll snap, body fixed, atau wrapper dengan vertical scrolling khusus.

## 6. Motion tetap dipertahankan

Hero dan timeline memakai `useScroll → useSpring → useTransform`. Timeline mengubah `scaleY` agar tidak menganimasikan tinggi layout per frame. Reveal layanan menggunakan `whileInView`, perpindahan subtil, dan easing lembut. Reduced motion ditangani tanpa aturan global `transform: none !important`.

Partikel hanya bekerja pada desktop dengan pointer halus; loop berhenti saat idle, hero tidak terlihat, atau tab tidak aktif. Vortex di-load terpisah dan tidak menangkap pointer pada lapisan dekoratif. Sketchbook hanya dimuat ketika pengguna membuka eksperimen.

## 7. Lanyard

Komponen utama tetap `src/components/lightswind/hanging-id-card.tsx`. Gravitasi, damping, tali, klip, kartu, pointer capture, drag, dan momentum dipertahankan. Transform rotasi kini memakai MotionValue sehingga tidak merender ulang seluruh kartu tiap frame. Touch memakai `touch-action: none`. Lenis berhenti selama drag dan dipulihkan saat selesai. Keyboard juga dapat mengayunkan kartu.

## 8. Konten dan batas data

- Gelar diselaraskan menjadi A.Md.Kom.; email menjadi `rifqilamadang@gmail.com`.
- Statistik pencapaian, proyek contoh, gambar stok sebagai karya, testimoni, organisasi, serta riwayat karier yang tidak terkonfirmasi dihapus.
- Proyek yang ditampilkan: Red Rush Digital, website Galeri Ku Palu, Aneka Kuliner, Sistem Cuti Akademik, SKP Autolog, serta portfolio ini.
- Sistem internal/pengembangan tidak diberi demo publik atau diklaim selesai.
- Sampul SVG adalah identitas proyek dan diberi label, bukan screenshot produk.
- Red Rush Digital dan Galeri Ku Palu tetap dua usaha berbeda.
- Pendidikan hanya memuat gelar terkonfirmasi; tidak mengarang institusi/tahun.
- Foto hasil kerja nyata, screenshot proyek, serta konfirmasi URL Instagram dan LinkedIn masih perlu dilengkapi. Tidak ditambahkan nomor WhatsApp tanpa data terkonfirmasi.

Domain final belum diberikan. Canonical, OG URL absolut, dan sitemap dibangkitkan ketika `SITE_URL` tersedia. Jalur ini sudah diuji dengan domain uji, yang tidak dimasukkan ke build final.

## 9. Hasil validasi

Build akhir menjalankan `tsc --noEmit && vite build` dan berhasil. Bundle dipisah menjadi app, React, Motion, Vortex, dan Sketchbook; tidak ada peringatan chunk lebih dari 500KB. Konfigurasi domain SEO juga lolos uji canonical, OG image absolut, robots, dan sitemap.

Pengujian utama browser Chromium: **40 pemeriksaan lolos, 0 gagal**. Meliputi:

- wheel bertahap, wheel kecil, dan wheel cepat;
- semua menu navbar dan active state;
- hero ke kontak dan Footer ke atas;
- modal karya melalui keyboard, focus trap, Escape, dan fokus kembali;
- layanan yang benar saat beralih dari karya ke modal konsultasi;
- alamat dan isi draf email yang ter-encode;
- drag lanyard serta halaman tidak ikut bergerak;
- progress timeline;
- lebar mobile, drawer, tap navigasi, swipe touch native, dan modal;
- reduced motion, efek dekoratif, serta navigasi langsung;
- tidak ada error JavaScript atau asset hilang pada alur utama.

Desktop diuji pada 1440×900; mobile disimulasikan pada 390×844. Uji menggunakan input browser otomatis. Ini bukan pengukuran FPS perangkat nyata atau pengujian fisik trackpad, iPhone, maupun Redmi. Input wheel kecil digunakan untuk memeriksa ketelitian perpindahan; tidak diklaim sebagai uji trackpad fisik.

Pengujian tambahan juga lolos: lebar layar 320, 375, 768, dan 1024px; navbar tetap muat; lanyard dapat digerakkan dengan touch tanpa menggeser halaman dan Lenis aktif kembali; light mode dapat diubah. Sketchbook berhasil dimuat saat diminta dan ditutup, tanpa asset hilang. Lima aset demo yang belum tersedia di ZIP awal dilengkapi dari paket ThreeUI, dengan lisensi aset dan font di `docs/licenses`.

## Pembaruan galeri foto dan logo brand

- Infinite Drift 2 ditambahkan setelah katalog karya, dengan parameter sesuai permintaan. Atlas disesuaikan agar semua foto masuk, termasuk lebih dari sembilan foto.
- Gallery memakai daftar `public/hasil-karya/gallery.json`; foto disimpan di folder yang sama. Daftar saat ini kosong karena foto hasil karya belum disediakan.
- Galeri punya jeda, daftar foto, keyboard panning, dialog foto ukuran penuh, focus trap/Escape, dan fallback saat WebGL/gambar atlas tidak tersedia. Drag mouse/touch terisolasi dari scroll halaman.
- Sliding Logo Marquee ditambahkan tepat di bawah hero. Data berasal dari `public/brands/logos.json`; logo disimpan di `public/brands/`. Tidak ada nama perusahaan contoh yang diklaim sebagai mitra.
- Konfigurasi logo: speed 60 (60px/detik), tinggi 120px, blur 2, pause on hover, grid background. Duplikasi loop tidak masuk tab order/pembaca layar; jeda manual tidak dibatalkan saat kursor keluar.
- Gerak otomatis logo berhenti saat hover, fokus, di luar layar, tab tidak aktif, dan reduced motion. Galeri memakai tampilan daftar statis saat reduced motion; autoplay dimatikan di ponsel.
- Komponen diadaptasi dari source Lightswind UI resmi. Lisensi MIT disertakan. Tidak ada dependency baru yang diperlukan.
- Build TypeScript/Vite lulus. Pemeriksaan: 40 alur utama website, 16 galeri, dan 13 logo. Semuanya lulus dalam browser desktop/mobile otomatis; foto dan logo pengujian hanya fixture sementara dan tidak masuk paket.
- Petunjuk penambahan foto serta logo tersedia di README. Ini merupakan daftar aset untuk publikasi, bukan uploader/admin penyimpanan lewat browser.
