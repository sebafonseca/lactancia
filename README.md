# Lactancia - Plataforma de Asesoria

Monorepo con `frontend` (React + Vite) y `backend` (Flask + PostgreSQL/SQLite). Incluye estructura modular, endpoints base, paneles de ejemplo y Docker Compose para desarrollo.

## Estructura

```
backend/
  app/
    auth/           # OAuth Google/Facebook (placeholder)
    users/          # /me
    appointments/   # reservas
    availability/   # disponibilidad
    cases/          # casos/sesiones/tareas
    content/        # casos de exito / FAQs
    payments/       # MercadoPago (placeholder)
    devadmin/       # panel dev admin
    common/         # modelos y helpers
  migrations/       # Flask-Migrate (placeholder)
  run.py
frontend/
  src/
    pages/          # landing, contacto
    router/         # rutas publicas
  docker-compose.yml
```

## Requisitos

- Docker + Docker Compose
- Node 20+ (si corres frontend local)
- Python 3.12+ (si corres backend local)

## Levantar con Docker (recomendado)

```
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Para **Cal.com** en Docker: creá `frontend/.env` (podés partir de `frontend/env.sample`) con `VITE_CAL_COM_PRESENCIAL_URL` y `VITE_CAL_COM_ONLINE_URL`. El `docker-compose` carga ese archivo en el contenedor; después de cambiarlo, **`docker compose up --build`** de nuevo (o reiniciá solo el servicio `frontend`) para que Vite lea las variables.

## Backend local (sin Docker)

```
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp env.sample .env  # si queres usar dotenv (opcional)
flask db init
flask db migrate -m \"init\"
flask db upgrade
flask seed-admins
python run.py
```

Si no queres Postgres en dev, podes usar SQLite ajustando `DATABASE_URL=sqlite:///lactancia.db`.

## Frontend local (sin Docker)

```
cd frontend
npm install
npm run dev
```

## Producción (Vercel + Railway)

Guía paso a paso, variables de entorno y checklist: **[DEPLOYMENT.md](./DEPLOYMENT.md)** (frontend en Vercel, API en Railway, Postgres en Railway).

## Notas

- Los endpoints de MercadoPago y OAuth son placeholders para integrar tokens reales.
- `DEV_ADMIN_EMAIL` y `ADMIN_EMAIL` se seed-ean con el comando `flask seed-admins`.
