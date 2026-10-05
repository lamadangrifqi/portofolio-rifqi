import type {
  ServiceItem,
  TechItem,
  WorkflowStep,
  PillarService,
} from "../types";
import { PROFILE } from "./profileData";
export const CONTACT_EMAIL = PROFILE.email;
export const CONTACT_LOCATION = PROFILE.location;
export const CONTACT_HOURS = PROFILE.contactHours;
export const createMailtoUrl = (subject: string, body: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
export const PILLAR_SERVICES: PillarService[] = [
  {
    id: "pillar-web",
    category: "web",
    categoryLabel: "Website & Sistem",
    pillarNumber: "01",
    title: "Website & Sistem Web",
    tagline: "Website yang jelas, responsif, dan mudah digunakan",
    description:
      "Website usaha, portfolio, dan sistem sederhana berdasarkan alur kerja yang dibutuhkan. Layanan website dikembangkan melalui Red Rush Digital.",
    subServices: [
      {
        name: "Website Usaha & Portfolio",
        description: "Profil, layanan, katalog, dan jalur kontak yang jelas.",
      },
      {
        name: "Sistem Operasional",
        description:
          "Formulir, dashboard, dan alur pencatatan sesuai kebutuhan.",
      },
    ],
    techChips: ["React", "TypeScript", "Vite", "Express"],
    deliverables: [
      "Website responsif",
      "Source project",
      "Panduan sesuai lingkup",
    ],
    defaultInquiryText:
      "Halo Rifqi, saya ingin mendiskusikan website atau sistem web.",
  },
  {
    id: "pillar-media",
    category: "media",
    categoryLabel: "Fotografi",
    pillarNumber: "02",
    title: "Fotografi di Palu",
    tagline: "Abadikan momen wisuda di lokasi pilihan",
    description:
      "Layanan melalui Galeri Ku Palu, usaha yang terpisah dari Red Rush Digital. Fotografer dapat datang ke lokasi sesuai kesepakatan jadwal.",
    subServices: [
      { name: "Wisuda Keliling", description: "Rp100.000 / 35 menit." },
      {
        name: "Single Shot & Mini Paket",
        description: "Single Shot Rp5.000; Mini Paket 5 file Rp20.000.",
      },
    ],
    techChips: ["Canon 70D", "EF 50mm f/1.8", "Palu"],
    deliverables: [
      "File foto digital sesuai paket",
      "Lokasi dan jadwal sesuai kesepakatan",
    ],
    defaultInquiryText:
      "Halo Rifqi, saya ingin menanyakan sesi foto Galeri Ku Palu.",
  },
  {
    id: "pillar-design",
    category: "design",
    categoryLabel: "Desain Digital",
    pillarNumber: "03",
    title: "Desain & Materi Digital",
    tagline: "Informasi yang rapi dan mudah dibaca",
    description:
      "Poster, materi pengumuman, dan visual promosi untuk kebutuhan digital maupun cetak sesuai spesifikasi yang disepakati.",
    subServices: [
      {
        name: "Poster & Pengumuman",
        description: "Materi informasi untuk kampus, komunitas, atau usaha.",
      },
      {
        name: "Visual Promosi",
        description: "Konten media sosial dan banner sesuai identitas usaha.",
      },
    ],
    techChips: ["Poster", "Media Sosial", "Banner"],
    deliverables: ["File desain sesuai ukuran", "Output sesuai lingkup"],
    defaultInquiryText:
      "Halo Rifqi, saya ingin mendiskusikan kebutuhan desain digital.",
  },
];
export const SERVICES_DATA: ServiceItem[] = [];
export const TECH_STACK: TechItem[] = [
  {
    name: "React",
    category: "Web Tech",
    badge: "Frontend",
    desc: "Komponen dan antarmuka interaktif",
  },
  {
    name: "TypeScript",
    category: "Web Tech",
    badge: "Language",
    desc: "Struktur data dan kode bertipe",
  },
  {
    name: "Vite",
    category: "Web Tech",
    badge: "Build",
    desc: "Pengembangan dan build website",
  },
  {
    name: "Tailwind CSS",
    category: "Web Tech",
    badge: "Styling",
    desc: "Tampilan responsif dan konsisten",
  },
  {
    name: "Node.js & Express",
    category: "Web Tech",
    badge: "Backend",
    desc: "API dan alur aplikasi web",
  },
  {
    name: "Motion & Lenis",
    category: "Web Tech",
    badge: "Interaction",
    desc: "Animasi dan scrolling halaman",
  },
  {
    name: "Canon 70D",
    category: "Creative Suite",
    badge: "Camera",
    desc: "Perangkat fotografi yang digunakan",
  },
  {
    name: "EF 50mm f/1.8",
    category: "Creative Suite",
    badge: "Lens",
    desc: "Lensa untuk sesi portrait dan wisuda",
  },
  {
    name: "Desain Informasi",
    category: "Creative Suite",
    badge: "Visual",
    desc: "Poster, pengumuman, dan materi digital",
  },
];
export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: "01",
    title: "Diskusi Kebutuhan",
    duration: "Sesuai kesepakatan",
    description:
      "Membahas tujuan, isi, lokasi atau platform, serta lingkup pekerjaan sebelum menentukan jadwal dan biaya.",
    deliverables: [
      "Ringkasan kebutuhan",
      "Lingkup dan biaya",
      "Jadwal yang disepakati",
    ],
  },
  {
    step: "02",
    title: "Desain & Pengerjaan",
    duration: "Sesuai lingkup",
    description:
      "Mengerjakan website, sesi fotografi, atau materi visual sesuai brief yang disepakati.",
    deliverables: [
      "Preview website atau desain",
      "Hasil sesi sesuai paket",
      "Pembaruan progres",
    ],
  },
  {
    step: "03",
    title: "Tinjau & Perbaiki",
    duration: "Sesuai kesepakatan",
    description:
      "Meninjau hasil bersama dan melakukan perbaikan sesuai lingkup revisi yang disepakati.",
    deliverables: [
      "Catatan tinjauan",
      "Perbaikan hasil",
      "Pemeriksaan penggunaan",
    ],
  },
  {
    step: "04",
    title: "Serah Terima",
    duration: "Setelah hasil disetujui",
    description:
      "Menyerahkan hasil dan file yang termasuk dalam kesepakatan, beserta petunjuk penggunaan bila diperlukan.",
    deliverables: [
      "Hasil final sesuai lingkup",
      "File yang disepakati",
      "Panduan bila diperlukan",
    ],
  },
];
