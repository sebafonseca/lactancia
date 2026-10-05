import fs from "node:fs";

const site = JSON.parse(fs.readFileSync(new URL("../site.json", import.meta.url), "utf8"));
const siteUrl = site.siteUrl;
const dist = process.argv.includes("--dist");
const root = dist ? new URL("../dist/", import.meta.url) : new URL("../", import.meta.url);

function read(relative) {
  const path = dist
    ? new URL(relative.replace(/^public\//, ""), root)
    : new URL(`../${relative}`, import.meta.url);
  return fs.readFileSync(path, "utf8");
}

const html = read(dist ? "index.html" : "index.html");
const robots = read(dist ? "robots.txt" : "public/robots.txt");
const sitemap = read(dist ? "sitemap.xml" : "public/sitemap.xml");
const seoSource = fs.readFileSync(new URL("../src/seo.js", import.meta.url), "utf8");
const landing = fs.readFileSync(new URL("../src/pages/LandingPage.jsx", import.meta.url), "utf8");
const srcFiles = ["src/App.jsx", "src/seo.js", "src/components/Footer.jsx", "src/components/Navbar.jsx", "src/pages/LandingPage.jsx", "src/pages/ContactPage.jsx"];
for (const file of srcFiles) {
  const text = fs.readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
  if (/noindex|nofollow/i.test(text)) {
    throw new Error(`${file} contiene noindex o nofollow`);
  }
}
const vercel = fs.readFileSync(new URL("../vercel.json", import.meta.url), "utf8");

const blobs = { html, robots, sitemap, seoSource, vercel };
for (const [name, text] of Object.entries(blobs)) {
  if (/noindex|nofollow/i.test(text)) {
    throw new Error(`${name} contiene noindex o nofollow`);
  }
}

if (!html.includes("<title>Asesoría de lactancia en Uruguay | Ana Cecilia Acosta</title>")) {
  throw new Error("falta el title");
}
if (!html.includes('name="description"')) {
  throw new Error("falta meta description");
}
if (!html.includes(`<link rel="canonical" href="${siteUrl}/" />`)) {
  throw new Error("falta canonical");
}
if (!html.includes('type="application/ld+json"')) {
  throw new Error("falta JSON-LD");
}
if (!html.includes('name="robots" content="index, follow"')) {
  throw new Error("falta robots index, follow");
}

const jsonLd = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (!jsonLd) {
  throw new Error("JSON-LD ilegible");
}
const data = JSON.parse(jsonLd[1]);
if (data.url !== `${siteUrl}/`) {
  throw new Error("JSON-LD no usa la URL canónica");
}

if (!robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`)) {
  throw new Error("robots.txt no apunta al sitemap canónico");
}
if (!sitemap.includes(`<loc>${siteUrl}/</loc>`)) {
  throw new Error("sitemap sin la home canónica");
}
if (!sitemap.includes(`<loc>${siteUrl}/contacto</loc>`)) {
  throw new Error("sitemap sin /contacto");
}
if (
  sitemap.includes("lactancia.vercel.app") ||
  robots.includes("lactancia.vercel.app") ||
  html.includes("lactancia.vercel.app")
) {
  throw new Error("el HTML, sitemap o robots usan lactancia.vercel.app");
}
if (siteUrl !== "https://www.lactanciasuy.com") {
  throw new Error("siteUrl no es https://www.lactanciasuy.com");
}
if (!seoSource.includes('from "../site.json"')) {
  throw new Error("seo.js no lee site.json");
}
if (!landing.includes("Lactancia con calma, apoyo real y orientación profesional")) {
  throw new Error("el H1 original cambió");
}
if (!vercel.includes('"trailingSlash": false')) {
  throw new Error("falta trailingSlash false");
}

console.log(dist ? "seo dist ok" : "seo source ok");
