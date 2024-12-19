FROM node:22-alpine as build
WORKDIR /app/frontend
COPY package*.json ./
RUN npm ci
COPY . .
CMD [ "sh", "-c", "npm run build" ]
