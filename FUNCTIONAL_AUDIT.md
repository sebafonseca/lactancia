# Auditoría funcional

Base comparada: `fb4a2fa`. Rama: `cursor/seo-onpage-7d78`.

Probado en el navegador contra `http://127.0.0.1:5173`, escritorio 1280×900 y móvil 390×844.

| Elemento | Ubicación | Destino esperado | Resultado | Estado |
|----------|-----------|------------------|-----------|--------|
| Reservar consulta | Hero | `https://cal.com/lactanciasuy/consulta-presencial` | Abre esa URL. Fondo violeta original, clickeable en desktop y móvil. | PASS |
| Contactar por WhatsApp | Hero | `https://wa.me/59899049093` con el mensaje de consulta | Apunta a ese WhatsApp. | PASS |
| Ver disponibilidad | Servicios | Cal.com presencial | `https://cal.com/lactanciasuy/consulta-presencial` | PASS |
| Reservar esta consulta | Consulta presencial | Cal.com presencial | `https://cal.com/lactanciasuy/consulta-presencial` | PASS |
| Coordinar sesión | Consulta online | Cal.com online | `https://cal.com/lactanciasuy/consulta-online` | PASS |
| Ver detalles | Talleres | `/contacto` | Llega al formulario. | PASS |
| Consultar esta opción | Cuidados del recién nacido | `/contacto` | Llega al formulario. | PASS |
| Instagram | Bloque de contacto | `https://www.instagram.com/lactancia_uy/` | Href correcto. | PASS |
| WhatsApp | Bloque de contacto | Mismo mensaje que el hero | Href correcto. | PASS |
| Formulario de contacto | Bloque de contacto | `/contacto` | Navega al formulario. | PASS |
| Inicio | Navbar desktop | `/` | Visible y correcto en 1280. Oculto bajo 768, como en el original. | PASS |
| Servicios | Navbar | `/#servicios` | El ancla existe. | PASS |
| Como funciona | Navbar | `/#como` | El ancla existe. | PASS |
| FAQ | Navbar | `/#faq` | El ancla existe y la primera pregunta abre la respuesta. | PASS |
| Contacto | Navbar | `/contacto` | Title y canonical de contacto. | PASS |
| Logo | Header | `/` | Ahora es un enlace a la home. Mismas clases visuales. | PASS |
| Servicios, Como funciona, Preguntas frecuentes | Footer | `/#servicios`, `/#como`, `/#faq` | Antes eran texto sin enlace. Ahora navegan. El clic a Servicios cambia el hash a `#servicios`. | PASS |
| Lactancia | Footer | `/` | Enlace a la home, sin subrayado. | PASS |
| WhatsApp directo | Footer | `https://wa.me/59899049093` | Href correcto. | PASS |
| Instagram @lactancia_uy | Footer | `https://www.instagram.com/lactancia_uy/` | Href correcto. | PASS |
| Carrusel | Historias | Anterior, siguiente, pausa | En desktop, Siguiente y Pausa responden. En móvil esos botones siguen ocultos, como en el original. | PASS |
| Preguntas | FAQ | Abre y cierra la respuesta | “Online 60 minutos…” aparece al abrir la primera. | PASS |
| Formulario vacío | `/contacto` | Errores de nombre, email y mensaje | Los tres textos de validación aparecen. | PASS |
| Motivo de consulta | `/contacto` | Lista: Primera consulta, Seguimiento, Dolor o molestias, Vuelta al trabajo, Otro | El listbox abre y muestra esas opciones. | PASS |
| Volver | `/contacto` | Página anterior o `/` | Vuelve a `/`. | PASS |
| Email | Sitio | No hay `mailto:` en el proyecto | No existía un enlace de email. No se agregó. | PASS |
| Menú móvil | Header &lt; 768px | El original no tiene botón de menú | `nav` queda `display: none`. No se agregó un menú nuevo. | PASS |

No hay FAIL.
