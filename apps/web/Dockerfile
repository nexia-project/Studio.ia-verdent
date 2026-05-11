FROM node:20-alpine

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar arquivos de configuração
COPY package.json pnpm-workspace.yaml turbo.json ./
COPY packages/config ./packages/config

# Copiar packages
COPY packages/types ./packages/types
COPY packages/db ./packages/db
COPY packages/ai ./packages/ai
COPY packages/sdk ./packages/sdk

# Copiar app web
COPY apps/web ./apps/web

# Instalar dependências
RUN pnpm install --frozen-lockfile

# Buildar packages e app
RUN pnpm --filter @studyai/types build
RUN pnpm --filter @studyai/db build
RUN pnpm --filter @studyai/ai build
RUN pnpm --filter @studyai/sdk build
RUN pnpm --filter @studyai/web build

# Expor porta
EXPOSE 5173

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5173/ || exit 1

# Comando para servir o app
CMD ["npx", "serve", "-s", "apps/web/dist", "-l", "5173"]
