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
  },
  "/asesoria-lactancia-melo": {
    title: "Asesoría de lactancia en Melo | Ana Cecilia Acosta",
    description:
      "Consulta de lactancia a domicilio en Melo, Cerro Largo, con Ana Cecilia Acosta. Dura 90 minutos. Reservá el horario o escribime por WhatsApp.",
    serviceName: "Consulta presencial",
    areaServed: [
      { "@type": "City", name: "Melo" },
      { "@type": "AdministrativeArea", name: "Cerro Largo" }
    ]
  },
  "/asesoria-lactancia-online-uruguay": {
    title: "Asesoría de lactancia online en Uruguay | Ana Cecilia Acosta",
    description:
      "Consulta de lactancia por videollamada, de 60 minutos, para familias en Uruguay. Reservá la sesión online con Ana Cecilia Acosta.",
    serviceName: "Consulta online",
    areaServed: [{ "@type": "Country", name: "Uruguay" }]
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

  syncPageJsonLd(page, url);
}

function syncPageJsonLd(page, url) {
  let script = document.getElementById("route-jsonld");
  if (!page.serviceName) {
    script?.remove();
    return;
  }
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "route-jsonld";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    inLanguage: "es",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Lactancia",
      url: `${SITE_URL}/`
    },
    about: { "@id": `${SITE_URL}/#asesoria` },
    mainEntity: {
      "@type": "Service",
      name: page.serviceName,
      areaServed: page.areaServed,
      provider: { "@id": `${SITE_URL}/#asesoria` }
    }
  });
}
