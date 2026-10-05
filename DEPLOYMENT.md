# Deploy: Vercel (frontend) + Railway (backend)

Arquitectura recomendada para producción: sitio estático/React en **Vercel**, API Flask en **Railway** (con Postgres). Las reservas van por **Cal.com**; el backend sigue sirviendo el **formulario de contacto** (`POST /contact` con Resend) y el resto de módulos si los usás más adelante.

## Resumen del stack

| Parte | Dónde | Cómo se despliega |
|-------|--------|-------------------|
| **Frontend** | [Vercel](https://vercel.com) | Root **`frontend`**, build `npm run build`, salida `dist` (ver `frontend/vercel.json`). |
| **API** | [Railway](https://railway.app) | Root **`backend`**, imagen **Docker** (`backend/Dockerfile` + `railway.json`). |
| **Base de datos** | Railway | Plugin **PostgreSQL**; `DATABASE_URL` la inyecta Railway. |
| **Reservas** | [Cal.com](https://cal.com) | Por defecto `lactanciasuy/consulta-presencial` y `consulta-online`. `VITE_CAL_COM_*` en Vercel las reemplaza. |
| **Contacto por mail** | Resend | Variables en Railway: `RESEND_API_KEY`, `RESEND_FROM`, `CONTACT_TO`. |

## Orden de trabajo (resumido)

1. **Railway:** proyecto → servicio con **Root Directory** `backend` → plugin Postgres → variables de entorno (ver tabla más abajo y `backend/env.sample`).
2. **Primera vez:** shell del servicio u one-off con la misma imagen y env:

   ```bash
   export FLASK_APP=wsgi:app
   flask db upgrade
   flask seed-admins
   ```

3. Anotar la **URL pública HTTPS** del backend (**sin** `/` final).
4. **Vercel:** proyecto con Root **`frontend`** → `VITE_API_URL` = esa URL; opcional `VITE_CAL_COM_PRESENCIAL_URL` / `VITE_CAL_COM_ONLINE_URL` → deploy o **Redeploy** si cambiás variables.

**Recordatorios:** en Railway, `CORS_ORIGINS` debe ser el origen exacto del sitio en Vercel (varias URLs: separadas por coma). Tras cambiar `VITE_*` en Vercel, hace falta redeploy.

**Smoke test:** `GET https://tu-backend/health` → `{"status":"ok"}`.

---

## 1. Backend en Railway (Docker)

### Proyecto

1. [Railway](https://railway.app) → **New project** → **Deploy from GitHub** (o el proveedor que uses).
2. Agregá un servicio con **Root Directory** = **`backend`**.
3. El build usa **`backend/Dockerfile`**: imagen `python:3.12-slim`, dependencias desde `requirements.txt` y arranque con **Gunicorn** (el `CMD` de la imagen respeta la variable **`PORT`** que inyecta Railway).
4. `backend/railway.json` declara **`builder`: `DOCKERFILE`** y el healthcheck **`GET /health`**.

Podés comprobar la imagen en local:

```bash
cd backend
docker build -t lactancia-api .
docker run --rm -p 5000:5000 -e PORT=5000 -e DATABASE_URL=sqlite:////tmp/test.db lactancia-api
```

(En producción usá Postgres vía `DATABASE_URL`; para un smoke test local con SQLite el archivo debe ser una ruta que el contenedor pueda escribir.)

### Migraciones en Docker / Railway

En la consola **Shell** del servicio en Railway (entra al contenedor en ejecución) o con un deploy temporal:

```bash
export FLASK_APP=wsgi:app
flask db upgrade
flask seed-admins
```

Si el contenedor no incluye herramientas interactivas, usá **Run command** / **one-off** en Railway apuntando a la misma imagen y las mismas variables de entorno.

### Base de datos

- Agregá el plugin **PostgreSQL** en Railway.
- Railway inyecta **`DATABASE_URL`** en el servicio del backend. No hace falta `sqlite` en producción.

### Variables de entorno (Railway)

| Variable | Descripción |
|----------|-------------|
| `DATABASE_URL` | La provee el plugin Postgres (o manual). Si viene como `postgres://`, la app la normaliza a `postgresql://`. |
| `SECRET_KEY` | Secreto de Flask (cadena larga aleatoria). |
| `JWT_SECRET_KEY` | Secreto para JWT. |
| `DEV_ADMIN_EMAIL` / `ADMIN_EMAIL` | Emails para `flask seed-admins`. |
| `CORS_ORIGINS` | Orígenes del frontend, **separados por coma**, sin espacios problemáticos. Ejemplo: `https://tu-app.vercel.app` o varias URLs: `https://prod.vercel.app,https://staging.vercel.app` |
| `RESEND_API_KEY` | API key de Resend. |
| `RESEND_FROM` | Remitente verificado en Resend. |
| `CONTACT_TO` | Email que recibe los contactos (ej. `lactanciasuy@gmail.com`). |
| `ENVIRONMENT` | Opcional: `production`. |
| `APP_VERSION` | Opcional. |

**CORS:** debe incluir el **origen exacto** del sitio en Vercel (protocolo + host, sin path final). Cada preview de Vercel tiene su propia URL: si querés probar previews contra Railway, agregá esa URL a `CORS_ORIGINS` o usá un dominio de preview fijo según tu flujo.

### Dominio

En Railway podés generar un dominio público o acoplar un dominio propio; esa URL base es la que usarás en `VITE_API_URL` (sin barra al final).

---

## 2. Frontend en Vercel

### Proyecto

1. [Vercel](https://vercel.com) → **Add New** → **Project** → importá el repo.
2. **Root Directory:** `frontend`
3. Framework: **Vite** (o deja detectado). Build: `npm run build`, output: `dist` (ya alineado con `frontend/vercel.json`).

### Variables de entorno (Vercel)

| Variable | Descripción |
|----------|-------------|
| `VITE_API_URL` | URL pública del backend Railway, **https**, **sin** `/` final. Ej: `https://tu-backend.up.railway.app` |
| `VITE_CAL_COM_PRESENCIAL_URL` | Opcional. Si falta, se usa `https://cal.com/lactanciasuy/consulta-presencial`. |
| `VITE_CAL_COM_ONLINE_URL` | Opcional. Si falta, se usa `https://cal.com/lactanciasuy/consulta-online`. |

Tras cambiar variables, hacé **Redeploy** (el build de Vite inyecta los `VITE_*` en el cliente).

### SPA

`frontend/vercel.json` reescribe solo `/contacto` hacia el `index.html`. `/` lo sirve el archivo estático. El resto responde 404 de Vercel, para no indexar URLs inventadas. `trailingSlash: false` manda `/contacto/` a `/contacto`.

`robots.txt` y `sitemap.xml` están en `frontend/public/` y se copian a la raíz del deploy. La URL canónica es `https://lactancia.vercel.app` (`frontend/site.json`). Si más adelante hay un dominio propio, hay que cambiar esa URL en `site.json`, `index.html`, `robots.txt` y `sitemap.xml`, y redirigir `lactancia.vercel.app` al dominio.

---

## 3. Checklist post-deploy

- [ ] `GET https://tu-backend/health` → `{"status":"ok"}`
- [ ] Desde el sitio en Vercel: enviar **Contacto** y verificar correo con Resend.
- [ ] En el navegador, red **sin** errores de CORS al hacer `POST /contact`.
- [ ] “Reservar consulta” abre `https://cal.com/lactanciasuy/consulta-presencial`.

---

## 4. Google Search Console

Hoy el sitio público es `https://lactancia.vercel.app`. HTTP ya redirige a HTTPS (308). `www.lactancia.vercel.app` no resuelve, así que no hay copia en www. No hay dominio propio configurado en el repo.

Después del deploy de esta rama:

1. Entrá a [Google Search Console](https://search.google.com/search-console) con la cuenta que administra el sitio.
2. Agregá una propiedad de prefijo de URL: `https://lactancia.vercel.app`. No uses `http://` ni `www`.
3. Verificá la propiedad. La vía más simple es la etiqueta HTML que te da Google: pegá el `meta name="google-site-verification"` en `frontend/index.html`, dentro de `<head>`, y volvé a desplegar. No inventes el código: tiene que ser el que muestra Search Console.
4. Cuando la propiedad figure como verificada, abrí **Sitemaps** y enviá `sitemap.xml` (la URL completa queda `https://lactancia.vercel.app/sitemap.xml`).
5. En **Inspección de URLs** probá `https://lactancia.vercel.app/` y `https://lactancia.vercel.app/contacto`. Si el estado es “La URL no está en Google”, pedí indexación.
6. Unos días después revisá **Rendimiento** (consultas) y **Páginas** / indexación. Ahí se ve si Google tomó la home y `/contacto`, y con qué búsquedas aparecen.
7. Confirmá en el navegador, ya en producción:
   - `https://lactancia.vercel.app/robots.txt` responde texto, no el HTML de la home, y nombra el sitemap.
   - `https://lactancia.vercel.app/sitemap.xml` lista solo `https://lactancia.vercel.app/` y `https://lactancia.vercel.app/contacto`.
8. Si más adelante conectás un dominio propio, elegí una sola versión (con o sin www), redirigí la otra y `lactancia.vercel.app` hacia esa, y actualizá la URL canónica del repo antes de volver a enviar el sitemap.

No hay favicon en el proyecto ni una foto propia para redes. La imagen de Open Graph y Twitter es la misma foto de stock que ya usa el hero. Si después hay una foto real de Ana Cecilia, conviene reemplazar `og:image` y `twitter:image` en `frontend/index.html`.

## 5. Referencias en el repo

- `frontend/vercel.json` — build SPA.
- `backend/Dockerfile` — imagen de producción (Gunicorn).
- `backend/.dockerignore` — reduce contexto de build.
- `backend/railway.json` — builder Docker + healthcheck.
- `backend/Procfile` — útil para otros hosts (p. ej. Heroku); Railway con Docker usa el `CMD` del Dockerfile.
- `backend/env.sample` — plantilla de variables.
