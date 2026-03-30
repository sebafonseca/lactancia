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

Variable opcional:

- `VITE_API_URL` (por defecto `http://localhost:5000`)

Si queres, podes exportarla antes de iniciar:

```
export VITE_API_URL=http://localhost:5000
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

- El login actual es un placeholder en `/login`.
- Los datos de UI estan mockeados en los componentes.
