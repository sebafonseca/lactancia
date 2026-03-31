# Deploy: Vercel (frontend) + Railway (backend)

Arquitectura recomendada para producción: sitio estático/React en **Vercel**, API Flask en **Railway** (con Postgres). Las reservas van por **Cal.com**; el backend sigue sirviendo el **formulario de contacto** (`POST /contact` con Resend) y el resto de módulos si los usás más adelante.

## Orden de trabajo

1. **Railway** — subir el backend y obtener la URL pública (`https://…up.railway.app` o dominio propio).
2. **Vercel** — configurar `VITE_API_URL` apuntando a esa URL y desplegar el frontend.

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
| `VITE_CAL_COM_PRESENCIAL_URL` | Opcional; link público Cal.com presencial. |
| `VITE_CAL_COM_ONLINE_URL` | Opcional; link público Cal.com online. |

Tras cambiar variables, hacé **Redeploy** (el build de Vite inyecta los `VITE_*` en el cliente).

### SPA

`frontend/vercel.json` define un rewrite para que el router del cliente reciba todas las rutas.

---

## 3. Checklist post-deploy

- [ ] `GET https://tu-backend/health` → `{"status":"ok"}`
- [ ] Desde el sitio en Vercel: enviar **Contacto** y verificar correo con Resend.
- [ ] En el navegador, red **sin** errores de CORS al hacer `POST /contact`.
- [ ] Botones de reserva abren Cal.com (si configuraste las `VITE_CAL_COM_*`).

---

## 4. Referencias en el repo

- `frontend/vercel.json` — build SPA.
- `backend/Dockerfile` — imagen de producción (Gunicorn).
- `backend/.dockerignore` — reduce contexto de build.
- `backend/railway.json` — builder Docker + healthcheck.
- `backend/Procfile` — útil para otros hosts (p. ej. Heroku); Railway con Docker usa el `CMD` del Dockerfile.
- `backend/env.sample` — plantilla de variables.
