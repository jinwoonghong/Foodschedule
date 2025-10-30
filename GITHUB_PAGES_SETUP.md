# GitHub Pages 배포 가이드 📘

## ✅ 완료된 작업

1. ✅ GitHub 저장소 생성 완료
2. ✅ 코드 푸시 완료
3. ✅ docs 폴더에 정적 사이트 준비 완료

**저장소 URL**: https://github.com/jinwoonghong/Foodschedule

---

## 🚀 GitHub Pages 활성화 방법

### 방법 1: GitHub 웹 UI에서 설정 (권장)

1. **GitHub 저장소 접속**
   - https://github.com/jinwoonghong/Foodschedule 접속

2. **Settings 탭 클릭**
   - 저장소 상단 메뉴에서 "Settings" 클릭

3. **Pages 메뉴 선택**
   - 좌측 사이드바에서 "Pages" 클릭

4. **Source 설정**
   - Source: **"Deploy from a branch"** 선택
   - Branch: **"main"** 선택
   - Folder: **"/docs"** 선택
   - **Save** 버튼 클릭

5. **배포 완료 대기**
   - 약 1-2분 후 페이지 상단에 URL 표시
   - **예상 URL**: `https://jinwoonghong.github.io/Foodschedule/`

6. **확인**
   - 표시된 URL 클릭하여 사이트 확인

---

## 🌐 배포 후 접속 URL

배포가 완료되면 다음 URL에서 서비스를 확인할 수 있습니다:

```
https://jinwoonghong.github.io/Foodschedule/
```

---

## 📱 사용자에게 공유하기

배포 후 다음과 같이 공유할 수 있습니다:

### QR 코드 생성
```
https://jinwoonghong.github.io/Foodschedule/
```
위 URL을 QR 코드로 변환하여 학교 게시판에 붙이기

### 단축 URL 만들기
- bit.ly 또는 tinyurl.com 사용
- 예: `bit.ly/sogang-menu`

### 카카오톡 공유
```
🍽️ 서강대 우정원 식단표
https://jinwoonghong.github.io/Foodschedule/

매일 메뉴 간편하게 확인하세요!
```

---

## 🔧 문제 해결

### 404 에러가 발생하는 경우

1. **대기 시간**
   - 첫 배포는 최대 5분까지 걸릴 수 있음
   - 조금 더 기다린 후 재시도

2. **캐시 삭제**
   - 브라우저 캐시 삭제 (Ctrl+Shift+R)
   - 시크릿 모드로 접속

3. **설정 확인**
   - Settings > Pages에서 설정 확인
   - Branch: main, Folder: /docs 확인

### 페이지가 제대로 표시되지 않는 경우

1. **개발자 도구 확인**
   - F12 키로 콘솔 열기
   - 에러 메시지 확인

2. **파일 경로 확인**
   - 모든 리소스가 상대 경로로 되어 있는지 확인

---

## 🔄 업데이트 방법

코드를 수정한 후:

```bash
cd /home/user/webapp/sogang-menu

# docs 폴더의 파일 수정 후

git add docs/
git commit -m "업데이트 내용"
git push origin main
```

푸시 후 1-2분 내에 자동으로 배포됩니다!

---

## 📊 배포 상태 확인

### GitHub Actions에서 확인
1. 저장소의 "Actions" 탭 클릭
2. "pages build and deployment" 워크플로우 확인
3. 녹색 체크마크 = 성공, 빨간 X = 실패

---

## 🎯 다음 단계

### 1. 커스텀 도메인 설정 (선택)
- 자신의 도메인이 있다면 연결 가능
- Settings > Pages > Custom domain

### 2. HTTPS 강제
- Settings > Pages > "Enforce HTTPS" 체크

### 3. Google Analytics 추가 (선택)
- 방문자 통계 추적

### 4. SEO 최적화
- meta 태그 추가
- sitemap.xml 생성

---

## 📝 주의사항

1. **저장소가 Public이어야 함**
   - Private 저장소는 GitHub Pro 이상 필요

2. **용량 제한**
   - 저장소 크기: 1GB 이하 권장
   - 파일 크기: 100MB 이하

3. **트래픽 제한**
   - 월 100GB 대역폭 제한
   - 일반적인 사용에는 충분함

---

## 💡 팁

### 빠른 테스트
```bash
# 로컬에서 docs 폴더 테스트
cd docs
python3 -m http.server 8000
# http://localhost:8000 접속
```

### 자동 배포
- main 브랜치에 푸시하면 자동 배포
- 별도 빌드 과정 불필요

---

## 📞 도움이 필요한 경우

1. **GitHub Docs**: https://docs.github.com/pages
2. **GitHub Community**: https://github.community/
3. **Stack Overflow**: `github-pages` 태그 검색

---

**🎉 배포 완료 후 서강대 학생들에게 공유하세요!**
