FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY apps/web/package.json apps/web/
COPY packages/config/package.json packages/config/
COPY packages/sdk/package.json packages/sdk/
COPY packages/types/package.json packages/types/
COPY packages/ai/package.json packages/ai/
COPY packages/db/package.json packages/db/

RUN npm install

COPY . .

RUN npm run build --workspace=apps/web

EXPOSE 8080

CMD ["node", "server.js"]
