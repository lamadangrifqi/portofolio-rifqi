export type ProjectCategory = "web" | "foto" | "desain" | "video";
export interface PortfolioItem {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  year: string;
  clientOrContext: string;
  tagline: string;
  description: string;
  image: string;
  gallery?: string[];
  videoUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  tags: string[];
  metricsOrHighlight?: string;
  aspectRatio?: "landscape" | "portrait" | "square";
}
export const PORTFOLIO_CATEGORIES: {
  id: "all" | ProjectCategory;
  label: string;
  iconName: string;
}[] = [
  { id: "all", label: "Semua Proyek", iconName: "Grid" },
  { id: "web", label: "Web & Aplikasi", iconName: "Globe" },
];
// Sampul SVG merupakan identitas proyek, bukan screenshot atau karya fotografi.
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "red-rush-digital",
    title: "Red Rush Digital",
    category: "web",
    categoryLabel: "Website Jasa",
    year: "2026",
    clientOrContext: "Usaha mandiri • Jasa website",
    tagline:
      "Website untuk memperkenalkan layanan desain dan pengembangan website.",
    description:
      "Website usaha Red Rush Digital untuk menyampaikan layanan website dan mengarahkan pengunjung ke kontak. Red Rush Digital dan Galeri Ku Palu adalah dua usaha yang berbeda.",
    image: "/projects/red-rush-digital.svg",
    liveUrl: "https://redrushdigital.netlify.app/",
    githubUrl: "https://github.com/lamadangrifqi/redrushdigital",
    tags: ["Website Jasa", "Personal Business", "Web Design"],
    metricsOrHighlight: "Website usaha",
  },
  {
    id: "galeri-ku-palu",
    title: "Galeri Ku Palu",
    category: "web",
    categoryLabel: "Website Fotografi",
    year: "2026",
    clientOrContext: "Usaha mandiri • Fotografi",
    tagline:
      "Pengembangan website fotografi di Palu untuk layanan, galeri, dan pemesanan.",
    description:
      "Website untuk usaha fotografi Galeri Ku Palu. Fokus pada layanan dan harga, hasil fotografi, layanan datang ke lokasi, serta alur booking. Versi website masih dikembangkan dan belum ditampilkan sebagai website publik yang final.",
    image: "/projects/galeri-ku-palu.svg",
    tags: ["Website Fotografi", "Palu", "Booking"],
    metricsOrHighlight: "Website dalam pengembangan",
  },
  {
    id: "aneka-kuliner",
    title: "Aneka Kuliner",
    category: "web",
    categoryLabel: "Website UMKM",
    year: "2026",
    clientOrContext: "Proyek website kuliner",
    tagline:
      "Website kuliner dengan pengembangan fitur pendukung operasional usaha.",
    description:
      "Proyek website Aneka Kuliner dengan pekerjaan pada fitur kasir, stok, ongkir, dan karyawan. Cakupan pengembangan disesuaikan dengan kebutuhan usaha.",
    image: "/projects/aneka-kuliner.svg",
    liveUrl: "https://rifqilamadang.github.io/anekakuliner/",
    tags: ["UMKM", "Kuliner", "Operasional"],
    metricsOrHighlight: "Proyek website kuliner",
  },
  {
    id: "cuti-akademik",
    title: "Sistem Pengajuan Cuti Akademik",
    category: "web",
    categoryLabel: "Sistem Internal",
    year: "2026",
    clientOrContext: "Pengembangan • FH Universitas Tadulako",
    tagline: "Pengajuan online, pemeriksaan berkas, dan penyusunan surat cuti.",
    description:
      "Sistem dalam pengembangan untuk pengajuan cuti mahasiswa, verifikasi berkas, draf surat berversi, pemeriksaan Kabag TU, persetujuan Wadek I, dan penomoran. Proyek internal ini tidak memiliki demo publik dan belum diklaim sebagai produk selesai.",
    image: "/projects/cuti-akademik.svg",
    tags: ["Express", "Vite", "Alur Persetujuan"],
    metricsOrHighlight: "Dalam pengembangan • Internal",
  },
  {
    id: "skp-autolog",
    title: "SKP Autolog",
    category: "web",
    categoryLabel: "Sistem Internal",
    year: "2026",
    clientOrContext: "Pengembangan • Dokumentasi pekerjaan",
    tagline:
      "Pencatatan aktivitas kerja berdasarkan dokumen dan sumber pekerjaan.",
    description:
      "Pengembangan aplikasi untuk menyusun draf log pekerjaan dari dokumen Google Drive, meninjau hasil klasifikasi, dan menandai status pengisian SKP. Sistem masih dikembangkan dan belum ditampilkan sebagai integrasi OSDM yang final.",
    image: "/projects/skp-autolog.svg",
    tags: ["Google Drive", "Log Pekerjaan", "Dashboard"],
    metricsOrHighlight: "Dalam pengembangan • Internal",
  },
  {
    id: "portfolio-rifqi",
    title: "Portfolio Rifqi Lamadang",
    category: "web",
    categoryLabel: "Website Personal",
    year: "2026",
    clientOrContext: "Proyek mandiri • Eksplorasi antarmuka",
    tagline:
      "Portfolio interaktif dengan karakter merah-hitam, smooth scroll, dan lanyard.",
    description:
      "Eksplorasi website personal menggunakan React, Motion, dan Lenis. Menyatukan profil, katalog proyek, layanan, dan kontak dengan interaksi lanyard serta visual hero cyberpunk.",
    image: "/projects/portfolio-rifqi.svg",
    tags: ["React", "Motion", "Lenis", "TypeScript"],
    metricsOrHighlight: "Eksplorasi antarmuka interaktif",
  },
];
