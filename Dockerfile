FROM node:16 as build

RUN mkdir -p /usr/local/src/attoly/web
WORKDIR /usr/local/src/attoly/web

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm install

COPY .env* .
COPY tailwind.config.js ./tailwind.config.js
COPY src ./src
COPY public ./public
RUN npm run build

FROM nginx:1.13 as production

COPY --from=build /usr/local/src/attoly/web/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
