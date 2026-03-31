#!/bin/sh
set -e
cd /app
npm install
ROLLUP_VER=$(node -p "require('./node_modules/rollup/package.json').version")
ARCH=$(uname -m)
case "$ARCH" in
  aarch64 | arm64)
    ROLLUP_NATIVE_PKG="@rollup/rollup-linux-arm64-gnu"
    ;;
  x86_64)
    ROLLUP_NATIVE_PKG="@rollup/rollup-linux-x64-gnu"
    ;;
  *)
    echo "Arquitectura no soportada para Rollup nativo: $ARCH"
    exit 1
    ;;
esac
npm install "${ROLLUP_NATIVE_PKG}@${ROLLUP_VER}"
exec npm run dev -- --host 0.0.0.0
