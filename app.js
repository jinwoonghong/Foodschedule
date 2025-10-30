// 전역 상태
let currentWeekOffset = 0;
let selectedDayIndex = new Date().getDay();

// 더미 메뉴 데이터 (실제로는 API에서 가져올 데이터)
const menuData = {
    '2025-10-27': {
        lunch: {
            main: ['제육볶음', '계란찜', '김치', '밥'],
            sideDish: ['미역국', '감자채볶음', '배추김치'],
            special: ['돈까스정식']
        }
    },
    '2025-10-28': {
        lunch: {
            main: ['닭갈비', '된장찌개', '김치', '밥'],
            sideDish: ['시금치나물', '두부조림', '배추김치'],
            special: ['비빔밥정식']
        }
    },
    '2025-10-29': {
        lunch: {
            main: ['불고기', '김치찌개', '김치', '밥'],
            sideDish: ['콩나물무침', '계란후라이', '배추김치'],
            special: ['카레라이스']
        }
    },
    '2025-10-30': {
        lunch: {
            main: ['생선구이', '된장국', '김치', '밥'],
            sideDish: ['고사리나물', '감자조림', '배추김치'],
            special: ['제육덮밥']
        }
    },
    '2025-10-31': {
        lunch: {
            main: ['김치찌개', '계란말이', '김치', '밥'],
            sideDish: ['어묵볶음', '시금치무침', '배추김치'],
            special: ['돈까스정식']
        }
    }
};

// 유틸리티 함수
function getWeekDates(offset = 0) {
    const today = new Date();
    const currentDay = today.getDay();
    const monday = new Date(today);
    
    // 월요일로 이동
    const diff = currentDay === 0 ? -6 : 1 - currentDay;
    monday.setDate(today.getDate() + diff + (offset * 7));
    
    const weekDates = [];
    for (let i = 0; i < 5; i++) { // 월~금
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        weekDates.push(date);
    }
    
    return weekDates;
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatDateDisplay(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
}

function getDayName(dayIndex) {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[dayIndex];
}

function getWeekRange(dates) {
    const start = dates[0];
    const end = dates[dates.length - 1];
    return `${start.getMonth() + 1}월 ${start.getDate()}일 - ${end.getMonth() + 1}월 ${end.getDate()}일`;
}

function isToday(date) {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
}

// 요일 탭 렌더링
function renderDayTabs() {
    const dayTabs = document.getElementById('dayTabs');
    const weekDates = getWeekDates(currentWeekOffset);
    
    dayTabs.innerHTML = '';
    
    weekDates.forEach((date, index) => {
        const button = document.createElement('button');
        button.className = 'day-tab';
        
        if (index === selectedDayIndex && currentWeekOffset === 0) {
            button.classList.add('active');
        }
        
        if (isToday(date)) {
            button.classList.add('today');
        }
        
        button.innerHTML = `
            <span class="day-name">${getDayName(date.getDay())}</span>
            <span class="day-date">${formatDateDisplay(date)}</span>
        `;
        
        button.addEventListener('click', () => {
            selectedDayIndex = index;
            renderDayTabs();
            renderMenu();
        });
        
        dayTabs.appendChild(button);
    });
}

// 메뉴 렌더링
async function renderMenu() {
    const container = document.getElementById('menuContainer');
    const weekDates = getWeekDates(currentWeekOffset);
    const selectedDate = weekDates[selectedDayIndex];
    const dateKey = formatDate(selectedDate);
    
    // 로딩 표시
    container.innerHTML = '<div class="loading"><div class="spinner"></div><p>메뉴를 불러오는 중...</p></div>';
    
    // API에서 메뉴 가져오기
    const menu = await fetchMenuFromAPI(dateKey);
    
    if (!menu) {
        container.innerHTML = `
            <div class="no-menu">
                <div class="no-menu-icon">🍽️</div>
                <h3>메뉴 정보가 없습니다</h3>
                <p>주말 또는 공휴일에는 식당이 운영되지 않습니다.</p>
            </div>
        `;
        return;
    }
    
    let html = '<div class="menu-content">';
    
    // 메인 메뉴
    if (menu.lunch && menu.lunch.main) {
        html += `
            <div class="menu-section">
                <h3>🍚 오늘의 메뉴</h3>
                <ul class="menu-items">
                    ${menu.lunch.main.map(item => `<li class="menu-item">${item}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    // 반찬
    if (menu.lunch && menu.lunch.sideDish) {
        html += `
            <div class="menu-section">
                <h3>🥗 반찬</h3>
                <ul class="menu-items">
                    ${menu.lunch.sideDish.map(item => `<li class="menu-item">${item}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    // 특선 메뉴
    if (menu.lunch && menu.lunch.special) {
        html += `
            <div class="menu-section">
                <h3>⭐ 특선 메뉴</h3>
                <ul class="menu-items">
                    ${menu.lunch.special.map(item => `<li class="menu-item">${item}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    html += '</div>';
    container.innerHTML = html;
}

// 주간 네비게이션
function updateWeekDisplay() {
    const weekDates = getWeekDates(currentWeekOffset);
    const weekDisplay = document.getElementById('weekDisplay');
    
    if (currentWeekOffset === 0) {
        weekDisplay.textContent = '이번 주';
    } else if (currentWeekOffset === 1) {
        weekDisplay.textContent = '다음 주';
    } else if (currentWeekOffset === -1) {
        weekDisplay.textContent = '지난 주';
    } else {
        weekDisplay.textContent = getWeekRange(weekDates);
    }
}

function navigateWeek(offset) {
    currentWeekOffset += offset;
    selectedDayIndex = 0; // 주가 바뀌면 첫 번째 요일(월요일) 선택
    updateWeekDisplay();
    renderDayTabs();
    renderMenu();
}

// 초기화
function init() {
    // 오늘이 월~금이 아니면 월요일로 설정
    const today = new Date();
    const dayOfWeek = today.getDay();
    
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        // 주말이면 다음 주 월요일
        if (dayOfWeek === 0) { // 일요일
            currentWeekOffset = 1;
        }
        selectedDayIndex = 0; // 월요일
    } else {
        // 평일이면 오늘
        selectedDayIndex = dayOfWeek - 1; // 월요일이 0
    }
    
    // 이벤트 리스너
    document.getElementById('prevWeek').addEventListener('click', () => navigateWeek(-1));
    document.getElementById('nextWeek').addEventListener('click', () => navigateWeek(1));
    
    // 초기 렌더링
    updateWeekDisplay();
    renderDayTabs();
    renderMenu();
}

// 실제 API 연동 함수 (향후 사용)
async function fetchMenuFromAPI(date) {
    try {
        // 실제 API 엔드포인트로 교체
        const response = await fetch(`/api/menu?date=${date}`);
        if (!response.ok) throw new Error('메뉴를 불러올 수 없습니다.');
        return await response.json();
    } catch (error) {
        console.error('메뉴 로딩 에러:', error);
        return null;
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', init);

// 서비스 워커 등록 (PWA 지원, 선택적)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // Service worker 등록 실패는 무시
        });
    });
}
