FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build the frontend
RUN cd apps/web && npm install && npm run build

EXPOSE 3000

CMD ["node", "server.js"]
