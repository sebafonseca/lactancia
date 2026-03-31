# Debian (glibc), no Alpine: Vite/Rollup en ARM dentro de Docker falla en musl
# por dependencias opcionales (@rollup/rollup-linux-arm64-musl).
FROM node:20-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

COPY . ./

EXPOSE 5173
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
