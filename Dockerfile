FROM node:20-alpine

WORKDIR /app

# Copiar tudo
COPY . .

# Instalar dependências
RUN npm install

# Build
RUN cd apps/api && npm run build

# Expor porta
EXPOSE 3000

# Start
CMD ["node", "apps/api/dist/index.js"]
