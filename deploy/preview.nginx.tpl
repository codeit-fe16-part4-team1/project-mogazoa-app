# HTTP → HTTPS 리다이렉트
server {
  listen 80;
  server_name ${BRANCH}.preview.${DOMAIN};

  location / {
    return 301 https://$host$request_uri;
  }
}

# HTTPS 서버 블록
server {
  listen 443 ssl http2;
  server_name ${BRANCH}.preview.${DOMAIN};

  # 인증서 경로 (Let's Encrypt 발급 후 동일 경로 사용)
  ssl_certificate /etc/letsencrypt/live/new-project-final.link/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/new-project-final.link/privkey.pem;

  # 보안 옵션 (권장)
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_prefer_server_ciphers on;

  location / {
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    proxy_pass http://127.0.0.1:${FINAL_PORT};

    # 디버그 헤더
    add_header X-Debug-Host $host always;
    add_header X-Debug-Server $server_name always;
  }
}