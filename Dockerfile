FROM node:8.13 as builder

WORKDIR /opt/app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

# build application
RUN [ "npm", "run", "build" ]

# multi-stage build allows us to cut the size of the image
# only taking the dist folder - https://docs.docker.com/develop/develop-images/multistage-build/
FROM nginx:latest
WORKDIR /var/www/app

EXPOSE 80

# take what we need from the last image
COPY --from=builder /opt/app/build .

COPY nginx-config/default.conf /etc/nginx/conf.d/default.conf
COPY nginx-config/nginx.conf /usr/local/openresty/nginx/conf/nginx.conf

RUN mkdir -p /var/cache/nginx/ken /var/log/nginx/

# serve with nginx conf
CMD ["nginx", "-g", "daemon off;"]
