server {
  listen 80;
  server_name ${BRANCH}.preview.${DOMAIN};

  location / {
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    proxy_pass http://127.0.0.1:${FINAL_PORT};

    # CloudFront 단계 응답 헤더 디버그
    add_header X-Debug-Host $host always;
    add_header X-Debug-Server $server_name always;
  }
}