FROM nginx

COPY ./settings/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./frontend/build /usr/share/nginx/html

EXPOSE 80
