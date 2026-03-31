# Backend - Desarrollo

Guia rapida para levantar el backend Flask en desarrollo.

## Requisitos

- Python 3.12+
- Postgres (opcional, se puede usar SQLite)

## Variables de entorno

Ejemplo en `env.sample`. Podes copiarlo:

```
cp env.sample .env
```

Variables clave:

- `DATABASE_URL` (por defecto en sample: Postgres)
- `JWT_SECRET_KEY`
- `SECRET_KEY`
- `DEV_ADMIN_EMAIL`
- `ADMIN_EMAIL`

## Setup local

```
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Migraciones

```
flask db init
flask db migrate -m "init"
flask db upgrade
```

## Seed de usuarios admin

```
flask seed-admins
```

## Ejecutar servidor

```
python run.py
```

Servidor en `http://localhost:5000`.

## SQLite en dev (opcional)

Si no queres usar Postgres:

```
export DATABASE_URL=sqlite:///lactancia.db
```

## Notas

- OAuth y MercadoPago estan como placeholders.
- Los endpoints esperan JWT en `Authorization: Bearer <token>`.

## Produccion (Railway)

La guía completa está en la raíz del monorepo: **[DEPLOYMENT.md](../DEPLOYMENT.md)**.

Resumen:

- **Healthcheck público:** `GET /health`
- **Start:** `gunicorn wsgi:app --bind 0.0.0.0:$PORT` (`Procfile` / `railway.json`)
- **CORS:** `CORS_ORIGINS` puede listar varios orígenes **separados por coma** (URL del frontend en Vercel, con `https://`)
- Variables: `DATABASE_URL`, `SECRET_KEY`, `JWT_SECRET_KEY`, admins, Resend (`RESEND_API_KEY`, `RESEND_FROM`, `CONTACT_TO`), etc.

## Contacto por email (Resend)

Variables necesarias:

- `RESEND_API_KEY`
- `RESEND_FROM` (dominio verificado en Resend)
- `CONTACT_TO` (por defecto `lactanciasuy@gmail.com`)

El endpoint `POST /contact` envia el email usando `RESEND_FROM` como `from` y el email de la usuaria en `reply_to`.

