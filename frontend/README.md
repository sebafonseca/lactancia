# Frontend - Desarrollo

Guia rapida para levantar el frontend React (Vite) en desarrollo.

## Requisitos

- Node 20+
- npm

## Seleccionar version de Node

No se usa virtualenv en Node. Para manejar versiones usa un manager:

### nvm

```
cd frontend
nvm install
nvm use
```

Esto usa `.nvmrc` (incluido) con la version 20.

### fnm

Si no esta instalado:

```
brew install fnm
```

Configura tu shell (zsh):

```
echo 'eval "$(fnm env --use-on-cd)"' >> ~/.zshrc
source ~/.zshrc
```

Instala Node 20:

```
fnm install 20
```

```
cd frontend
fnm use
```

### Volta

Si no esta instalado:

```
brew install volta
```

```
cd frontend
volta install node@20
```

## Configuracion

Copia `env.sample` a `.env` y ajusta.

Variables opcionales:

- `VITE_API_URL` — backend (por defecto `http://localhost:5000`)
- `VITE_CAL_COM_PRESENCIAL_URL` — event type presencial en Cal.com
- `VITE_CAL_COM_ONLINE_URL` — event type online

Sin un `.env`, “Reservar consulta” abre Cal.com (`lactanciasuy/consulta-presencial`) y la sesión online abre `lactanciasuy/consulta-online`. Una variable `VITE_CAL_COM_*` reemplaza ese enlace. Creá `frontend/.env` y **reiniciá** el servidor de Vite tras cambiar variables.

Ejemplo:

```
export VITE_API_URL=http://localhost:5000
export VITE_CAL_COM_PRESENCIAL_URL=https://cal.com/lactanciasuy/consulta-presencial
export VITE_CAL_COM_ONLINE_URL=https://cal.com/lactanciasuy/consulta-online
```

## Instalar dependencias

```
cd frontend
npm install
```

## Levantar el servidor

```
npm run dev
```

Frontend en `http://localhost:5173`.

## Produccion (Vercel)

Variables `VITE_*`, dominio del API en Railway y checklist: ver **`DEPLOYMENT.md`** en la raíz del monorepo.

## Notas

- Los datos de UI estan mockeados en los componentes.
