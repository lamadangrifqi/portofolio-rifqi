import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig, loadEnv, type Plugin } from "vite";
import { PROFILE } from "./src/data/profileData";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const configured = process.env.SITE_URL || env.SITE_URL;
  let siteUrl: string | undefined;
  if (configured) {
    const url = new URL(configured);
    if (!["http:", "https:"].includes(url.protocol) || url.pathname !== "/")
      throw new Error(
        "SITE_URL harus berupa origin domain, contoh https://domain-anda.id",
      );
    siteUrl = url.origin;
  }
  const seo: Plugin = {
    name: "portfolio-seo",
    transformIndexHtml(html) {
      const image = siteUrl ? `${siteUrl}/og-cover.jpg` : "/og-cover.jpg";
      const tags: string[] = [
        `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "Person", name: PROFILE.name, description: "Website, sistem web, fotografi, dan desain digital.", email: PROFILE.email, homeLocation: { "@type": "Place", name: PROFILE.location }, ...(siteUrl ? { url: siteUrl } : {}) }).replace(/</g, "\\u003c")}</script>`,
      ];
      if (siteUrl)
        tags.push(
          `<link rel="canonical" href="${siteUrl}/"/>`,
          `<meta property="og:url" content="${siteUrl}/"/>`,
        );
      return html
        .replace(/content="\/og-cover.jpg"/g, `content="${image}"`)
        .replace("</head>", tags.join("\n") + "\n</head>");
    },
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *\nAllow: /\n${siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : ""}`,
      });
      if (siteUrl)
        this.emitFile({
          type: "asset",
          fileName: "sitemap.xml",
          source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${siteUrl.replace(/&/g, "&amp;")}/</loc></url></urlset>`,
        });
    },
  };
  return {
    plugins: [react(), tailwindcss(), seo],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("/motion") || id.includes("/framer-motion"))
                return "motion";
              if (
                id.includes("/react/") ||
                id.includes("/react-dom/") ||
                id.includes("/scheduler/")
              )
                return "react";
            }
          },
        },
      },
    },
    resolve: {
      alias: {
        "@/components": path.resolve(__dirname, "./src/components"),
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== "true",
      watch: process.env.DISABLE_HMR === "true" ? null : {},
    },
  };
});
