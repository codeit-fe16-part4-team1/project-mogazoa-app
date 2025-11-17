#!/bin/bash

# 배포용 파일 패키징 스크립트
# GitHub Actions 또는 로컬 환경에서 실행 가능

set -e  # 에러 발생 시 스크립트 중단

# 색상 코드 정의
RED="\033[1;31m"
GREEN="\033[1;32m"
BLUE="\033[1;34m"
CYAN="\033[1;36m"
YELLOW="\033[1;33m"
RESET="\033[0m"

# 로그 함수
log_info() {
    echo -e "${BLUE}[INFO]${RESET} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${RESET} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${RESET} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${RESET} $1"
}

# 메인 패키징 함수
package_deployment() {
    log_info "⌛ 배포용 파일 패키징 진행 중..."
    
    # 1. 개발 의존성 제거
    log_info "개발 의존성 제거 중..."
    BEFORE_SIZE=$(du -sh node_modules 2>/dev/null | cut -f1 || echo "N/A")
    
    npm prune --omit=dev
    
    AFTER_SIZE=$(du -sh node_modules 2>/dev/null | cut -f1 || echo "N/A")
    log_success "개발 의존성 제거 완료"
    
    # 2. 배포 패키지 디렉토리 생성
    log_info "배포 패키지 디렉토리 생성 중..."
    rm -rf deploy-package
    mkdir -p deploy-package
    
    # 3. Next.js 빌드 결과물 복사
    log_info "Next.js 빌드 결과물 복사 중..."
    if [ -d ".next" ]; then
        cp -r .next deploy-package/
        log_success ".next 디렉토리 복사 완료"
    else
        log_error ".next 디렉토리가 존재하지 않습니다. 빌드를 먼저 실행하세요."
        exit 1
    fi
    
    # 4. public 디렉토리 복사 (선택적)
    if [ -d "public" ]; then
        cp -r public deploy-package/
        log_success "public 디렉토리 복사 완료"
    else
        log_warning "public 디렉토리가 존재하지 않습니다."
    fi
    
    # 5. 런타임 필수 파일 복사
    log_info "런타임 필수 파일 복사 중..."
    
    # package.json (필수)
    if [ -f "package.json" ]; then
        cp package.json deploy-package/
        log_success "package.json 복사 완료"
    else
        log_error "package.json이 존재하지 않습니다."
        exit 1
    fi
    
    # package-lock.json (선택적)
    cp package-lock.json deploy-package/ 2>/dev/null && log_success "package-lock.json 복사 완료" || log_warning "package-lock.json 없음"
    
    # next.config.* (선택적)
    if ls next.config.* 1> /dev/null 2>&1; then
        cp next.config.* deploy-package/
        log_success "next.config 파일 복사 완료"
    else
        log_warning "next.config 파일이 존재하지 않습니다."
    fi
    
    # 6. config 폴더 복사 (선택적)
    if [ -d "config" ]; then
        cp -r config deploy-package/
        log_success "config 디렉토리 복사 완료"
    else
        log_warning "config 디렉토리가 존재하지 않습니다."
    fi
    
    # 7. 프로덕션 의존성 복사
    log_info "프로덕션 node_modules 복사 중..."
    if [ -d "node_modules" ]; then
        cp -r node_modules deploy-package/
        log_success "node_modules 복사 완료"
    else
        log_error "node_modules가 존재하지 않습니다."
        exit 1
    fi
    
    PACKAGE_SIZE=$(du -sh deploy-package 2>/dev/null | cut -f1 || echo "N/A")
    
    # 8. 압축
    log_info "⌛ 고압축 진행 중..."
    cd deploy-package
    tar -czf ../production-app.tar.gz \
        --exclude='node_modules/*/.cache' \
        --exclude='node_modules/*/coverage' \
        --exclude='node_modules/*/.git' \
        --exclude='node_modules/*/test' \
        --exclude='node_modules/*/tests' \
        --exclude='node_modules/*/*.md' \
        .
    cd ..
    
    log_success "압축 완료"
    
    # 9. 임시 디렉토리 정리
    log_info "임시 디렉토리 정리 중..."
    rm -rf deploy-package
    log_success "정리 완료"
    
    FINAL_SIZE=$(du -sh production-app.tar.gz 2>/dev/null | cut -f1 || echo "N/A")
    
    # 10. 결과 출력
    echo ""
    echo -e "${BLUE}====================== 📦 패키징 정보 ======================${RESET}"
    printf "${CYAN}%-30s${RESET} | %s\n" "Full node_modules size" "$BEFORE_SIZE"
    printf "${CYAN}%-30s${RESET} | %s\n" "Production node_modules size" "$AFTER_SIZE"
    printf "${CYAN}%-30s${RESET} | %s\n" "Deploy package size" "$PACKAGE_SIZE"
    printf "${CYAN}%-30s${RESET} | %s\n" "Final compressed size" "$FINAL_SIZE"
    echo -e "${BLUE}=============================================================${RESET}"
    echo ""
    
    log_success "✅ 배포용 파일 패키징 완료"
    echo -e "${GREEN}생성된 파일: production-app.tar.gz${RESET}"
}

# 스크립트 실행
package_deployment