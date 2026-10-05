# Auditoría SEO y regresiones

Rama `cursor/seo-onpage-7d78`, comparada con `fb4a2fa` (origin/main antes de estos cambios). No incluye el rediseño `2b1864c`.

## 1. Resumen ejecutivo

El sitio original sigue en pie: misma paleta, Poppins, hero, botones y layout. “Reservar consulta” abre `https://cal.com/lactanciasuy/consulta-presencial`. El build pasa. Title, description, canonical, Open Graph, Twitter y JSON-LD están en el HTML inicial. No hay `noindex` ni `nofollow`.

El H1 y el texto de la página siguen dependiendo de JavaScript. No se migró a SSR.

## 2. Cambios revisados

| Archivo | Clase |
|---------|--------|
| `frontend/index.html` | SEO |
| `frontend/src/seo.js` | SEO |
| `frontend/site.json` | SEO |
| `frontend/public/robots.txt` | SEO |
| `frontend/public/sitemap.xml` | SEO |
| `frontend/src/App.jsx` | SEO. Actualiza title y canonical según la ruta. |
| `frontend/vercel.json` | Infraestructura. `trailingSlash: false` y rewrite solo de `/contacto`. |
| `frontend/scripts/check-seo.mjs` | Infraestructura. El build falla si falta metadata o aparece `noindex`. |
| `frontend/package.json` | Infraestructura. El script de build llama a ese chequeo. |
| `frontend/src/components/Footer.jsx` | Corrección funcional y SEO. Texto que no enlazaba ahora tiene href, con las mismas clases de color. |
| `frontend/src/components/Navbar.jsx` | SEO. El logo enlaza a `/` con las mismas clases. |
| `frontend/src/pages/LandingPage.jsx` | Accesibilidad y corrección. `<main>`, alt con acento, y se quitaron imágenes de testimonios que 404. |
| `frontend/src/pages/ContactPage.jsx` | Accesibilidad. `<main>` sin clases. |
| `frontend/src/config/booking.js` | Corrección funcional. Cal.com público como destino por defecto. |
| `frontend/env.sample`, `frontend/README.md`, `DEPLOYMENT.md` | Infraestructura. Documentan el enlace de Cal.com y Search Console. |

Ningún archivo de esta lista es un cambio visual intencional. `styles.css` y `tailwind.config.js` no se tocaron.

## 3. Regresiones funcionales encontradas

La única regresión real de la rama era “Reservar consulta” yendo a WhatsApp cuando no estaba la variable `VITE_CAL_COM_*`. Quedó corregida: presencial y online usan los enlaces públicos de `lactanciasuy` que ya estaban en el bundle de producción.

El resto de los CTA, el formulario, el carrusel, las anclas y Volver responden. Detalle en `FUNCTIONAL_AUDIT.md`. No queda ningún FAIL.

## 4. Regresiones visuales encontradas

Ninguna. El CSS compilado conserva el nombre `index-ThmNmo_g.css`. Detalle en `VISUAL_REGRESSION_AUDIT.md`.

## 5. Links rotos

No hay `href="#"` ni `href=""`. El 404 de `/favicon.ico` ya estaba: el proyecto no tiene favicon. Las fotos `/testimonials/testimonial_*.jpg` ya no se piden. Detalle en `LINK_AUDIT.md`.

## 6. SEO técnico

| Chequeo | Resultado |
|---------|-----------|
| Title | `Asesoría de lactancia en Uruguay \| Ana Cecilia Acosta`. En `/contacto`: `Contacto \| Asesoría de lactancia en Uruguay`. |
| Meta description | Presente en el HTML inicial y actualizada en `/contacto`. |
| Canonical | `https://lactancia.vercel.app/` y, en contacto, `https://lactancia.vercel.app/contacto`. |
| Open Graph y Twitter | `og:title`, `og:description`, `og:url`, `og:image`, `twitter:card=summary_large_image`. La imagen es la foto de stock que ya usa el hero. |
| H1 | Uno solo, el texto original, clases originales. |
| H2 | Cinco, los títulos de sección que ya existían. |
| H3 | Cuatro, los servicios que ya existían. |
| Alt | “Madre con bebé”. |
| HTML semántico | `<main>` en home y contacto. El H1 ya era `h1`. |
| noindex / nofollow | No aparecen. El meta robots es `index, follow`. |
| X-Robots-Tag | No se envía. |
| Redirects | En el sitio ya publicado, HTTP responde 308 a HTTPS. `www.lactancia.vercel.app` no resuelve. Tras este deploy, `/contacto/` debe ir a `/contacto`. |
| 404 | En producción, una ruta distinta de `/` y `/contacto` ya no devuelve la home. |

## 7. Structured data

El JSON-LD del build es JSON válido. Tipo `ProfessionalService`.

Incluye solo datos que ya están en la página: nombre Ana Cecilia Acosta, asesora de lactancia, Melo, Cerro Largo, Uruguay, teléfono del enlace de WhatsApp, Instagram, la frase del H1, la formación en el IULAM y en el Instituto Europeo, y los cuatro servicios.

No incluye reviews, rating, precios, número de calle, horarios, coordenadas ni un objeto de certificación.

## 8. Robots y sitemap

`frontend/dist/robots.txt` es texto y apunta a `https://lactancia.vercel.app/sitemap.xml`.

`frontend/dist/sitemap.xml` tiene dos URLs absolutas HTTPS, sin duplicados y sin www:

- `https://lactancia.vercel.app/`
- `https://lactancia.vercel.app/contacto`

Esas rutas existen en la app. En el deploy que está hoy en el aire, `/robots.txt` y `/sitemap.xml` todavía responden el HTML de la home, porque este cambio no está en `main`. Hay que desplegar la rama para que producción los sirva.

## 9. Build, lint y tests

`npm run build` terminó bien. Antes y después corre `scripts/check-seo.mjs`.

No hay script de lint, typecheck ni tests.

Aviso previo, no introducido por esta rama: Browserslist dice que `caniuse-lite` tiene 9 meses.

## 10. Mobile

En 390×844 el nav de escritorio sigue oculto. No hay menú hamburguesa en el original y no se agregó. El botón Reservar queda visible, con el violeta original, y no hay otro elemento tapándolo. El H1 llega a opacidad 1 después de la animación que ya tenía. El footer enlaza.

## 11. Desktop

En 1280×900 se ven Inicio, Servicios, Como funciona, FAQ y Contacto. Reservar, carrusel, FAQ, formulario y Volver funcionan.

## 12. Consola y red

Error de consola: `404 /favicon.ico`. Es el único request fallido nuevo en la sesión de prueba, y es anterior a la rama.

No hubo excepciones de JavaScript. Google Fonts y la foto de Unsplash cargan. Ya no hay 404 de `testimonial_*.jpg`.

## 13. Correcciones realizadas durante la auditoría

Ninguna de código. La corrección de Cal.com ya estaba en el commit `c9b33ce`, antes de este informe. Esta pasada no encontró un FAIL nuevo que corregir.

## 14. Problemas pendientes

- El HTML inicial no contiene el H1 ni el párrafo del hero. Están en el primer render de React. Google ejecuta ese JavaScript. No se cambió el framework.
- No hay favicon ni foto propia para `og:image`. La imagen social es la de stock del hero.
- `/robots.txt` y `/sitemap.xml` faltan en el deploy actual hasta que esta rama se publique.
- Search Console sigue pendiente de la persona que administra la propiedad. Los pasos están en `DEPLOYMENT.md`.
