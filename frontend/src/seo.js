import site from "../site.json";

export const SITE_URL = site.siteUrl;

const PAGES = {
  "/": {
    title: "Asesoría de lactancia en Uruguay | Ana Cecilia Acosta",
    description:
      "Asesoría de lactancia en Uruguay por Ana Cecilia Acosta. Presencial en Melo, Cerro Largo, y online desde cualquier lugar."
  },
  "/contacto": {
    title: "Contacto | Asesoría de lactancia en Uruguay",
    description:
      "Escribile a Ana Cecilia Acosta para una consulta de lactancia. Presencial en Melo, Cerro Largo, y online."
  }
};

function setMeta(attr, key, content) {
  const el = document.querySelector(`meta[${attr}="${key}"]`);
  if (el) {
    el.setAttribute("content", content);
  }
}

export function applyRouteSeo(pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";
  const page = PAGES[path] || PAGES["/"];
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;

  document.title = page.title;
  setMeta("name", "description", page.description);
  setMeta("property", "og:title", page.title);
  setMeta("property", "og:description", page.description);
  setMeta("property", "og:url", url);
  setMeta("name", "twitter:title", page.title);
  setMeta("name", "twitter:description", page.description);

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute("href", url);
  }
}
