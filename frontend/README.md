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

Sin las URLs de Cal.com, “Reservar” abre **WhatsApp** con un mensaje acorde (no el formulario). Creá `frontend/.env` y **reiniciá** el servidor de Vite tras cambiar variables.

Ejemplo:

```
export VITE_API_URL=http://localhost:5000
export VITE_CAL_COM_PRESENCIAL_URL=https://cal.com/tu-usuario/consulta-presencial
export VITE_CAL_COM_ONLINE_URL=https://cal.com/tu-usuario/consulta-online
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

## Notas

- Los datos de UI estan mockeados en los componentes.
