FROM nginx

WORKDIR /usr/share/nginx/html

COPY index.html .
COPY game.js .
COPY style.css .

CMD ["nginx", "-g", "daemon off;"]