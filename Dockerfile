FROM node:18.17.1 AS build
WORKDIR /app
COPY package*.json ./
RUN set -eux \
    && npm ci \
    && npm install react-scripts@3.4.1 -g --silent
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
COPY default.conf /etc/nginx/conf.d/
CMD ["nginx", "-g", "daemon off;"]
