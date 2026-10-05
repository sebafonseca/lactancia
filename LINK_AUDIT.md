# Auditoría de links

Búsqueda en `frontend` de `href="#"`, `href=""`, `noindex`, `nofollow` y `mailto:`. No hay coincidencias.

Anclas del home: `servicios`, `como`, `casos`, `faq`, `contacto`. Las cuatro que usa la navegación existen.

| Link | Destino | Notas | Estado |
|------|---------|-------|--------|
| Reservar consulta, Ver disponibilidad, Reservar esta consulta | `https://cal.com/lactanciasuy/consulta-presencial` | Corregido en esta rama: sin variable de entorno ya no cae en WhatsApp. | PASS |
| Coordinar sesión | `https://cal.com/lactanciasuy/consulta-online` | Mismo criterio. Talleres y cuidados no tienen URL de Cal.com en el sitio y siguen yendo a `/contacto`. | PASS |
| Contactar por WhatsApp y WhatsApp del bloque de contacto | `https://wa.me/59899049093?text=Hola%20Ceci...` | Sin cambio de destino. | PASS |
| WhatsApp directo del footer | `https://wa.me/59899049093` | Antes era texto plano. | PASS |
| Instagram (contacto y footer) | `https://www.instagram.com/lactancia_uy/` | El del footer antes era texto plano. | PASS |
| Navbar y footer internos | `/`, `/#servicios`, `/#como`, `/#faq`, `/contacto` | Ningún handler se perdió al pasar el logo y el footer de `div`/`p` a `a`. | PASS |
| `/testimonials/testimonial_1.jpg` … `_6.jpg` | Ya no se piden | Esos archivos no están en el repo. El componente ya mostraba las iniciales cuando la imagen fallaba. Sacar el `src` evita el 404 y deja el mismo resultado visible. | PASS |
| `/favicon.ico` | 404 | No hay favicon en `fb4a2fa` ni ahora. Es anterior a esta rama. No se diseñó uno. | WARNING |
| Rutas desconocidas en producción | 404 de Vercel | `vercel.json` ya no reescribe todo a `/`. Solo `/contacto`. `/` lo sirve el archivo estático. En `vite dev` el servidor sigue entregando la SPA para cualquier ruta; eso es el comportamiento de Vite, no de producción. | PASS |

No quedaron links rotos introducidos por la rama.
