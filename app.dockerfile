FROM node:20-alpine as angular
WORKDIR /home/app
COPY ./app/package*.json .
RUN npm ci
COPY ./app .
RUN npm run build

FROM nginx:alpine as app
WORKDIR /usr/share/nginx/html
COPY --from=angular /home/app/dist/show-catalog/browser .
EXPOSE 80