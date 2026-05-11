FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-workspace.yaml ./
COPY packages ./packages
COPY apps/api ./apps/api

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

RUN pnpm --filter @studyai/api build

EXPOSE 3000

CMD ["node", "apps/api/dist/index.js"]