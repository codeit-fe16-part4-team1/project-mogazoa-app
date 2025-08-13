server {
  listen 80;
  server_name __BRANCH__.preview.__DOMAIN__;
  return 301 https://$host$request_uri;
}

map $http_upgrade $connection_upgrade {
  default upgrade;
  ''      close;
}

server {
  listen 443 ssl http2;
  server_name __BRANCH__.preview.__DOMAIN__;

  ssl_certificate     /etc/letsencrypt/live/__DOMAIN__/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/__DOMAIN__/privkey.pem;

  ssl_protocols       TLSv1.2 TLSv1.3;
  ssl_ciphers         HIGH:!aNULL:!MD5;
  ssl_prefer_server_ciphers on;

  location / {
    proxy_http_version 1.1;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;

    proxy_pass http://127.0.0.1:__FINAL_PORT__;
  }
}