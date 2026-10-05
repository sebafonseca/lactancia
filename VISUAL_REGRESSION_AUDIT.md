# Regresión visual

Comparado contra `fb4a2fa`.

No cambiaron `frontend/src/styles.css` ni `frontend/tailwind.config.js`. El CSS de producción sigue llamándose `index-ThmNmo_g.css`, el mismo hash que el deploy actual de `main`.

Medido en el navegador, en el hero actual:

- Fuente: Poppins
- H1: `text-4xl font-semibold leading-tight md:text-5xl`, color `rgb(90, 79, 207)`, 48px en desktop y 36px en móvil
- Botón Reservar: fondo `rgb(90, 79, 207)`, radio pill
- Fondo de la página: el degradado rosa/crema original

| Zona | Qué cambió en el DOM | Aspecto | Estado |
|------|----------------------|---------|--------|
| Hero, servicios, proceso, historias, FAQ, formulario | Sin cambio de clases de color, tipo, spacing ni layout | Igual | PASS |
| Header | El contenedor del logo pasó de `div` a `Link` con las mismas clases `flex items-center gap-3` | Sin subrayado. Mismo bloque. | PASS |
| Footer | Los `<p>` de enlaces pasaron a `<a class="block">` conservando el texto y el color heredado | El título “Lactancia” mide color violeta y `text-decoration: none` | PASS |
| Páginas | Se envolvió el contenido en `<main>` sin clases | `main` no tiene margen en este CSS | PASS |
| Foto del hero | Solo el alt, de “Madre con bebe” a “Madre con bebé” | No se ve | PASS |
| Avatares de historias | Se dejó de pedir JPG que no existen | Se ven las iniciales, que ya era el resultado cuando la imagen fallaba | PASS |

No hay una diferencia visual intencional. No hizo falta revertir estilos.
