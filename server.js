const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 정적 파일 제공
app.use(express.static(__dirname));

// CORS 설정
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// 메뉴 데이터 캐시 (5분)
let menuCache = {
    data: null,
    timestamp: 0,
    ttl: 5 * 60 * 1000 // 5분
};

// 더미 메뉴 데이터 (서강대 실제 API 연동 전까지 사용)
function getDummyMenu(date) {
    const dayOfWeek = new Date(date).getDay();
    
    // 주말은 메뉴 없음
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        return null;
    }
    
    const menus = [
        {
            lunch: {
                main: ['제육볶음', '계란찜', '김치', '밥'],
                sideDish: ['미역국', '감자채볶음', '배추김치'],
                special: ['돈까스정식 (5,500원)']
            }
        },
        {
            lunch: {
                main: ['닭갈비', '된장찌개', '김치', '밥'],
                sideDish: ['시금치나물', '두부조림', '배추김치'],
                special: ['비빔밥정식 (4,500원)']
            }
        },
        {
            lunch: {
                main: ['불고기', '김치찌개', '김치', '밥'],
                sideDish: ['콩나물무침', '계란후라이', '배추김치'],
                special: ['카레라이스 (4,000원)']
            }
        },
        {
            lunch: {
                main: ['생선구이', '된장국', '김치', '밥'],
                sideDish: ['고사리나물', '감자조림', '배추김치'],
                special: ['제육덮밥 (5,000원)']
            }
        },
        {
            lunch: {
                main: ['김치찌개', '계란말이', '김치', '밥'],
                sideDish: ['어묵볶음', '시금치무침', '배추김치'],
                special: ['참치김치찌개정식 (5,000원)']
            }
        }
    ];
    
    // 요일에 따라 메뉴 선택 (월요일=1)
    const menuIndex = dayOfWeek - 1;
    return menus[menuIndex] || menus[0];
}

// 서강대 웹사이트에서 메뉴 크롤링 (실제 구현)
async function scrapeMenuFromSogang(date) {
    try {
        // 서강대 식단표 페이지 URL
        const url = 'https://www.sogang.ac.kr/bachelor/onestop/menu.html';
        
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            timeout: 5000
        });
        
        const $ = cheerio.load(response.data);
        
        // 실제 HTML 구조에 맞게 파싱 로직 작성 필요
        // 현재는 더미 데이터 반환
        return getDummyMenu(date);
        
    } catch (error) {
        console.error('크롤링 에러:', error.message);
        // 에러 시 더미 데이터 반환
        return getDummyMenu(date);
    }
}

// API 엔드포인트: 특정 날짜의 메뉴 조회
app.get('/api/menu', async (req, res) => {
    try {
        const date = req.query.date || new Date().toISOString().split('T')[0];
        
        // 캐시 확인
        const now = Date.now();
        if (menuCache.data && menuCache.data[date] && (now - menuCache.timestamp < menuCache.ttl)) {
            return res.json(menuCache.data[date]);
        }
        
        // 메뉴 가져오기
        const menu = await scrapeMenuFromSogang(date);
        
        // 캐시 업데이트
        if (!menuCache.data) menuCache.data = {};
        menuCache.data[date] = menu;
        menuCache.timestamp = now;
        
        res.json(menu);
        
    } catch (error) {
        console.error('API 에러:', error);
        res.status(500).json({ error: '메뉴를 불러올 수 없습니다.' });
    }
});

// API 엔드포인트: 주간 메뉴 조회
app.get('/api/menu/week', async (req, res) => {
    try {
        const startDate = req.query.start || new Date().toISOString().split('T')[0];
        const weekMenu = {};
        
        // 5일치 메뉴 가져오기 (월~금)
        for (let i = 0; i < 5; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);
            const dateStr = date.toISOString().split('T')[0];
            
            weekMenu[dateStr] = await scrapeMenuFromSogang(dateStr);
        }
        
        res.json(weekMenu);
        
    } catch (error) {
        console.error('API 에러:', error);
        res.status(500).json({ error: '주간 메뉴를 불러올 수 없습니다.' });
    }
});

// 헬스체크
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 메인 페이지
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 서버 시작
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🍽️  서강대 우정원 식단표 서버가 실행 중입니다.`);
    console.log(`📡 포트: ${PORT}`);
    console.log(`🌐 로컬: http://localhost:${PORT}`);
    console.log(`⏰ 시작 시간: ${new Date().toLocaleString('ko-KR')}`);
});

module.exports = app;
