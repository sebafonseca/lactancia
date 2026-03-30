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
    pages/          # landing, dashboard, admin, dev-admin
    router/         # guards por rol
    services/       # auth demo
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

## Roles demo

El login actual es un placeholder. En `/login` podes entrar como:
- Clienta -> `/dashboard`
- Asesora -> `/admin`
- Dev Admin -> `/dev-admin`

## Notas

- Los endpoints de MercadoPago y OAuth son placeholders para integrar tokens reales.
- `DEV_ADMIN_EMAIL` y `ADMIN_EMAIL` se seed-ean con el comando `flask seed-admins`.
