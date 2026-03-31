# Deploy (Vercel + Railway)

## Frontend en Vercel

1. Importa el repo en Vercel.
2. Selecciona el root directory `frontend`.
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Variables de entorno:
   - `VITE_API_URL` = URL publica del backend (Railway)
   - `VITE_CAL_COM_PRESENCIAL_URL` / `VITE_CAL_COM_ONLINE_URL` = Cal.com (opcional; si faltan, reserva por WhatsApp)
6. Deploy.

El archivo `frontend/vercel.json` ya incluye el rewrite para SPA.

## Backend en Railway

1. Crea un nuevo proyecto y conecta el repo.
2. Selecciona el root directory `backend`.
3. Railway detecta Python y usa `Procfile` / `railway.json`.
4. Variables de entorno minimas:
   - `DATABASE_URL` (Railway Postgres o externa)
   - `JWT_SECRET_KEY`
   - `SECRET_KEY`
   - `DEV_ADMIN_EMAIL`
   - `ADMIN_EMAIL`
   - `CORS_ORIGINS` (ej: `https://tu-app.vercel.app`)
5. Agrega un plugin de Postgres en Railway si queres DB managed.
6. Deploy.

Comando de start (via Procfile):
```
gunicorn wsgi:app --bind 0.0.0.0:$PORT
```

## Flujo recomendado

- Backend primero (Railway) para obtener URL publica.
- Luego frontend en Vercel con `VITE_API_URL`.
