# 서강대학교 우정원 식단표 프로젝트 요약

## 📱 프로젝트 개요

서강대학교 베르크만스우정원(BW관) 구내식당의 주간 메뉴를 쉽고 빠르게 확인할 수 있는 모바일 웹 애플리케이션입니다.

## 🎯 주요 목표

1. **간편한 메뉴 확인**: 복잡한 웹사이트 대신 간단하게 식단 확인
2. **모바일 최적화**: 스마트폰에서 편리하게 사용
3. **직관적인 UI**: 한눈에 들어오는 깔끔한 디자인
4. **빠른 응답**: 캐싱을 통한 빠른 메뉴 로딩

## ✨ 구현된 기능

### 사용자 기능
- ✅ 주간 메뉴 조회 (월~금)
- ✅ 요일별 탭 네비게이션
- ✅ 주간 이동 (이전 주 / 다음 주)
- ✅ 오늘 날짜 하이라이트
- ✅ 식당 정보 표시 (위치, 운영시간, 가격, 연락처)
- ✅ 반응형 디자인 (모바일/태블릿/데스크톱)
- ✅ 다크모드 지원 (시스템 설정 연동)
- ✅ PWA 지원 (홈 화면 추가 가능)

### 기술적 기능
- ✅ RESTful API 제공
- ✅ 메뉴 데이터 캐싱 (5분)
- ✅ 에러 핸들링
- ✅ 로딩 상태 표시
- ✅ 크로스 브라우저 호환

## 🛠️ 기술 스택

### Frontend
- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, Grid, CSS Variables, 애니메이션
- **JavaScript (ES6+)**: Vanilla JS, Async/Await, Fetch API

### Backend
- **Node.js**: v14 이상
- **Express.js**: 웹 서버 프레임워크
- **Axios**: HTTP 클라이언트
- **Cheerio**: HTML 파싱 (웹 크롤링)

## 📂 프로젝트 구조

```
sogang-menu/
├── index.html          # 메인 HTML (UI 구조)
├── style.css           # 스타일시트 (디자인)
├── app.js              # 프론트엔드 로직
├── server.js           # 백엔드 서버
├── manifest.json       # PWA 매니페스트
├── package.json        # 프로젝트 설정
├── .gitignore         # Git 제외 파일
└── README.md          # 사용자 문서
```

## 🎨 UI/UX 디자인

### 색상 팔레트
- **Primary**: #0066CC (서강대 블루)
- **Secondary**: #004C99
- **Accent**: #FF6B35 (오늘 날짜 강조)
- **Background**: #F5F7FA
- **Text**: #2C3E50

### 디자인 원칙
1. **모바일 퍼스트**: 모바일 화면을 우선 고려
2. **최소주의**: 불필요한 요소 제거
3. **명확한 계층**: 정보의 중요도에 따른 시각적 구분
4. **터치 친화적**: 충분한 버튼 크기와 간격

## 🔌 API 명세

### GET /api/menu
특정 날짜의 메뉴 조회

**Query Parameters:**
- `date` (optional): YYYY-MM-DD 형식, 미입력 시 오늘 날짜

**Response:**
```json
{
  "lunch": {
    "main": ["제육볶음", "계란찜", "김치", "밥"],
    "sideDish": ["미역국", "감자채볶음", "배추김치"],
    "special": ["돈까스정식 (5,500원)"]
  }
}
```

### GET /api/menu/week
주간 메뉴 조회 (5일치)

**Query Parameters:**
- `start` (optional): 시작 날짜 (YYYY-MM-DD), 미입력 시 이번 주 월요일

**Response:**
```json
{
  "2025-10-27": { "lunch": {...} },
  "2025-10-28": { "lunch": {...} },
  ...
}
```

### GET /api/health
서버 헬스체크

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-30T02:40:52.123Z"
}
```

## 🚀 배포 및 실행

### 로컬 개발 환경
```bash
npm install
npm start
# http://localhost:3000 접속
```

### 프로덕션 배포
```bash
# Vercel
vercel

# Heroku
git push heroku main

# Docker
docker build -t sogang-menu .
docker run -p 3000:3000 sogang-menu
```

## 📱 지원 플랫폼

### 브라우저
- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+
- Samsung Internet 14+

### 모바일 OS
- iOS 14+
- Android 8+

## 🎯 향후 개선 계획

### Phase 1: 데이터 연동
- [ ] 서강대 공식 식단표 API 연동
- [ ] 실시간 메뉴 업데이트
- [ ] 메뉴 이미지 추가

### Phase 2: 기능 확장
- [ ] 즐겨찾기 메뉴
- [ ] 알레르기 정보 표시
- [ ] 영양 정보 제공
- [ ] 메뉴 검색 기능

### Phase 3: 소셜 기능
- [ ] 사용자 평가 시스템
- [ ] 메뉴 리뷰 및 댓글
- [ ] 추천 메뉴 알림

### Phase 4: 확장
- [ ] 다른 식당 메뉴 추가
- [ ] 주변 맛집 정보
- [ ] 배달 주문 연동

## 📊 성능 지표

### 목표 메트릭
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- API Response Time: < 300ms
- Lighthouse Score: > 90

### 최적화
- CSS/JS 번들 최소화
- 이미지 최적화 (WebP)
- 브라우저 캐싱
- Gzip 압축

## 🔒 보안 고려사항

- HTTPS 필수
- CORS 정책 설정
- Rate Limiting
- Input Validation
- XSS 방어

## 📞 연락처

### 서강대학교
- 종합봉사실: 02-705-8000
- 베르크만스우정원: 02-706-7691

## 📝 변경 이력

### v1.0.0 (2025-10-30)
- 초기 릴리스
- 기본 메뉴 조회 기능
- 모바일 UI 구현
- PWA 지원

## 🙏 크레딧

- 디자인 영감: Modern Mobile-First Design
- 아이콘: Unicode Emoji
- 폰트: System Fonts

## 📄 라이선스

MIT License - 자유롭게 사용 및 수정 가능

---

**Made with ❤️ for Sogang University Students**
