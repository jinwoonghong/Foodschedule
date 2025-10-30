# 서강대학교 우정원 식단표 📱

서강대학교 베르크만스우정원(BW관) 구내식당의 주간 메뉴를 간편하게 확인할 수 있는 모바일 웹 서비스입니다.

## ✨ 주요 기능

- 📅 **주간 메뉴 조회**: 월~금 요일별 식단 확인
- 📱 **모바일 최적화**: 반응형 디자인으로 모바일 환경에 최적화
- ⚡ **빠른 로딩**: 메뉴 데이터 캐싱으로 빠른 응답 속도
- 🎨 **깔끔한 UI**: 직관적이고 사용하기 쉬운 인터페이스
- 🌓 **다크모드 지원**: 시스템 테마에 따른 자동 다크모드

## 🚀 시작하기

### 필요 사항

- Node.js 14.0 이상
- npm 또는 yarn

### 설치 및 실행

1. 의존성 패키지 설치:
```bash
npm install
```

2. 서버 실행:
```bash
npm start
```

3. 개발 모드 (자동 재시작):
```bash
npm run dev
```

4. 브라우저에서 접속:
```
http://localhost:3000
```

## 📁 프로젝트 구조

```
sogang-menu/
├── index.html          # 메인 HTML 파일
├── style.css           # 스타일시트
├── app.js              # 프론트엔드 JavaScript
├── server.js           # Express 백엔드 서버
├── package.json        # 프로젝트 설정
└── README.md          # 문서
```

## 🛠️ 기술 스택

### 프론트엔드
- HTML5
- CSS3 (반응형 디자인, CSS Grid/Flexbox)
- Vanilla JavaScript (ES6+)

### 백엔드
- Node.js
- Express.js
- Axios (HTTP 클라이언트)
- Cheerio (웹 스크래핑)

## 📖 API 엔드포인트

### 특정 날짜 메뉴 조회
```
GET /api/menu?date=YYYY-MM-DD
```

응답 예시:
```json
{
  "lunch": {
    "main": ["제육볶음", "계란찜", "김치", "밥"],
    "sideDish": ["미역국", "감자채볶음", "배추김치"],
    "special": ["돈까스정식 (5,500원)"]
  }
}
```

### 주간 메뉴 조회
```
GET /api/menu/week?start=YYYY-MM-DD
```

응답 예시:
```json
{
  "2025-10-27": {
    "lunch": { ... }
  },
  "2025-10-28": {
    "lunch": { ... }
  }
}
```

### 헬스체크
```
GET /api/health
```

## 🎨 주요 UI 컴포넌트

- **헤더**: 서비스 제목 및 부제
- **날짜 네비게이션**: 주간 이동 버튼
- **요일 탭**: 월~금 요일 선택 탭
- **메뉴 컨테이너**: 선택한 날짜의 메뉴 표시
- **정보 섹션**: 식당 운영 정보
- **푸터**: 연락처 및 공지사항

## 🔧 커스터마이징

### 색상 테마 변경
`style.css` 파일의 `:root` 변수를 수정:

```css
:root {
    --primary-color: #0066CC;    /* 메인 색상 */
    --secondary-color: #004C99;  /* 보조 색상 */
    --accent-color: #FF6B35;     /* 강조 색상 */
}
```

### 메뉴 데이터 소스 변경
`server.js`의 `scrapeMenuFromSogang()` 함수를 수정하여 실제 API 또는 크롤링 로직 구현

## 📱 모바일 브라우저 지원

- iOS Safari 12+
- Chrome for Android
- Samsung Internet
- 기타 모던 모바일 브라우저

## 🚀 배포 가이드

### Vercel 배포
```bash
npm install -g vercel
vercel
```

### Heroku 배포
```bash
heroku create sogang-menu
git push heroku main
```

## 📝 개선 계획

- [ ] 실제 서강대 식단표 API 연동
- [ ] PWA (Progressive Web App) 지원
- [ ] 즐겨찾기 메뉴 기능
- [ ] 알레르기 정보 표시
- [ ] 영양 정보 제공
- [ ] 사용자 평가 및 리뷰 기능

## 📞 문의

서강대학교 종합봉사실: 02-705-8000

베르크만스우정원: 02-706-7691

## 📄 라이선스

MIT License

## 🙏 기여

기여는 언제나 환영합니다! Pull Request를 보내주세요.

---

Made with ❤️ for Sogang University Students
