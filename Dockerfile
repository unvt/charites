FROM node:24-slim

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
RUN chmod +x /app/docker-entrypoint.sh
ENTRYPOINT [ "/app/docker-entrypoint.sh" ]
