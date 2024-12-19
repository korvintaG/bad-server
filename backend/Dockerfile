FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json /app/
RUN npm i
COPY . /app/
RUN npm run build

FROM node:22-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i --omit=dev
COPY --from=builder /app/dist ./dist
COPY /src/public/images/ ./dist/public/images/
RUN mkdir /usr/src/app/dist/public/temp
EXPOSE 3000
CMD [ "sh", "-c", "node ./dist/app.js" ]
