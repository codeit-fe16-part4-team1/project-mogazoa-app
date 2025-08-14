server {
  listen 80;
  server_name ${BRANCH}.preview.${DOMAIN};

  # HTML 응답은 캐시 금지
  location / {
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    proxy_hide_header Cache-Control;
    add_header Cache-Control "no-store" always;

    proxy_pass http://127.0.0.1:${FINAL_PORT};
  }
}