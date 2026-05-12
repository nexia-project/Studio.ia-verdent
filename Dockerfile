FROM node:20-alpine

WORKDIR /app

# Copy everything
COPY . .

# Install root dependencies
RUN npm install

# Install web app dependencies and build
WORKDIR /app/apps/web
RUN npm install
RUN npm run build

# Go back to root
WORKDIR /app

EXPOSE 8080

CMD ["node", "server.js"]
