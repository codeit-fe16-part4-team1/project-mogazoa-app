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

    # 원본이 내려주는 캐시 지시 헤더 제거
    proxy_hide_header Cache-Control;
    proxy_hide_header Expires;
    proxy_hide_header Pragma;

    # 캐시 금지 강제 (모든 캐시 계층 대상)
    add_header Cache-Control "no-store, no-cache, must-revalidate, max-age=0, s-maxage=0" always;
    add_header Pragma "no-cache" always;
    add_header Expires "0" always;

    # CloudFront 단계 응답 헤더 디버그
    add_header X-Debug-Host $host always;
    add_header X-Debug-Server $server_name always;

    proxy_pass http://127.0.0.1:${FINAL_PORT};
  }
}