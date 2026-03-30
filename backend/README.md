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

Variables recomendadas:

- `DATABASE_URL` (Railway Postgres)
- `JWT_SECRET_KEY` (secreto fuerte)
- `SECRET_KEY` (secreto fuerte)
- `DEV_ADMIN_EMAIL`
- `ADMIN_EMAIL`
- `CORS_ORIGINS` (ej: `https://tu-app.vercel.app`)
- `ENVIRONMENT=production`
- `APP_VERSION=1.0.0`

Start command (via `Procfile`):

```
gunicorn wsgi:app --bind 0.0.0.0:$PORT
```

## Contacto por email (Resend)

Variables necesarias:

- `RESEND_API_KEY`
- `RESEND_FROM` (dominio verificado en Resend)
- `CONTACT_TO` (por defecto `sebafonseca@gmail.com`)

El endpoint `POST /contact` envia el email usando `RESEND_FROM` como `from` y el email de la usuaria en `reply_to`.

