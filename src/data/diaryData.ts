import { TaiwanDelicacy, Companion, DiaryEntryData } from '../types/diary';
import heroJournalImg from '../assets/images/antique_taipei_journal_hero_1791322889374.jpg';
import foodSketchImg from '../assets/images/antique_taiwan_treats_sketch_1791322901305.jpg';
import travelersPortraitImg from '../assets/images/antique_travelers_portrait_1791322913984.jpg';
import nightViewImg from '../assets/images/antique_taipei_night_view_1791322928012.jpg';

export const DIARY_IMAGES = {
  heroJournal: heroJournalImg || '/assets/images/antique_taipei_journal_hero_1791322889374.jpg',
  foodSketch: foodSketchImg || '/assets/images/antique_taiwan_treats_sketch_1791322901305.jpg',
  travelersPortrait: travelersPortraitImg || '/assets/images/antique_travelers_portrait_1791322913984.jpg',
  nightView: nightViewImg || '/assets/images/antique_taipei_night_view_1791322928012.jpg',
};

export const INITIAL_DIARY: DiaryEntryData = {
  id: 'diary-taiwan-oct-02',
  title: '언니 오빠와 함께한 대만 여행기',
  dateStr: '10월 2일',
  dayOfWeek: '금요일',
  weather: 'rain',
  wakeTime: '9시 40분',
  wakeHour: 9,
  wakeMinute: 40,
  sleepTime: '1시 30분',
  sleepHour: 1,
  sleepMinute: 30,
  // 10x4 Korean manuscript paper grid
  manuscriptText: [
    ['언', '니', '랑', ' ', '오', '빠', '랑', ' ', '대', '만'],
    ['여', '행', '했', '다', '.', ' ', '오', '늘', '은', ' '],
    ['타', '이', '베', '이', '에', '서', ' ', '맛', '난', '거'],
    ['먹', '고', ' ', '야', '경', '봤', '다', '.', '최', '고!'],
  ],
  fullText: '언니랑 오빠랑 대만 여행했다. 오늘은 타이베이에서 맛난 거 먹고 야경봤다. 최고!',
  reflection: '비 내리는 타이베이의 촉촉한 거리에서 언니, 오빠와 손을 잡고 맛있는 음식을 가득 맛본 날. 밤에는 구름 사이로 우뚝 솟은 타이베이 101 타워에 올라 별빛처럼 반짝이는 도시 야경을 내려다보았다. 마음 깊이 남겨진 따스한 추억의 페이지.',
};

export const TAIWAN_DELICACIES: TaiwanDelicacy[] = [
  {
    id: 'food-mango-ice',
    childLabel: '망빙',
    koreanName: '망고 빙수',
    chineseName: '芒果雪花冰',
    pinyin: 'Mángguǒ Xuěhuābīng',
    category: '감미로운 빙과',
    location: '타이베이 융캉제 (永康街)',
    antiqueDescription: '눈꽃처럼 곱게 갈아낸 우유 빙수 위에 진한 황금빛 완숙 망고 과육과 연유, 새콤달콤한 망고 아이스크림을 소복이 쌓아 올린 대만 최고의 명물 후식.',
    childMemory: '커다란 그릇에 노란 망고가 깍둑깍둑 가득 담겨있었다. 숟가락으로 푹 떠먹으면 머리가 띵할 정도로 시원하고 달콤했다!',
    iconName: 'IceCream',
    coordinates: { x: 42, y: 53 },
  },
  {
    id: 'food-starbucks',
    childLabel: '신바커',
    koreanName: '스타벅스 (싱바커)',
    chineseName: '星巴克',
    pinyin: 'Xīngbākè',
    category: '시원한 찻잔',
    location: '타이베이 도심 가두점',
    antiqueDescription: '한자로 "성파극(星巴克)"이라 표기된 녹색 사이렌 문장의 휴식처. 이국적인 거리 속에서 익숙하면서도 반가운 음료와 시원한 안식을 주었던 곳.',
    childMemory: '초록색 인어 그림이 그려진 테이크아웃 컵! 대만에서는 스타벅스를 싱바커(신바커)라고 부른다는 것이 신기해서 컵에 똑같이 그렸다.',
    iconName: 'Coffee',
    coordinates: { x: 64, y: 53 },
  },
  {
    id: 'food-noodles',
    childLabel: '곱창국수',
    koreanName: '아종면선 곱창국수',
    chineseName: '阿宗麵線',
    pinyin: 'Āzōng Miànxiàn',
    category: '따스한 면 요리',
    location: '서문정 (시먼딩 西門町)',
    antiqueDescription: '가쓰오부시 훈연 육수에 얇고 부드러운 쌀국수 면발과 정성스레 삶아낸 돼지 곱창을 푹 끓여낸 대만 서민 미식의 정수. 다진 마늘과 흑식초를 살짝 둘러먹는다.',
    childMemory: '가게 앞에 서서 플라스틱 그릇을 들고 숟가락으로 후루룩 떠먹었다. 뜨거웠지만 곱창이 쫄깃쫄깃하고 국물이 정말 구수했다.',
    iconName: 'Soup',
    coordinates: { x: 60, y: 34 },
  },
  {
    id: 'food-bubble-tea',
    childLabel: '버블티',
    koreanName: '진주 밀크티',
    chineseName: '珍珠奶茶',
    pinyin: 'Zhēnzhū Nǎichá',
    category: '전통 농향 다류',
    location: '춘수당 및 거리 찻집',
    antiqueDescription: '짙게 우려낸 아삼 홍차에 신선한 우유를 섞고, 흑당에 졸여낸 쫄깃한 카사바 타피오카 펄을 넉넉히 담아 굵은 대나무 빨대로 함께 음미하는 차.',
    childMemory: '굵은 빨대로 쏙쏙 빨아들이면 쫀득쫀득한 검은 구슬들이 입안으로 퐁퐁 튀어나와 재미있고 달콤했다.',
    iconName: 'CupSoda',
    coordinates: { x: 80, y: 36 },
  },
  {
    id: 'food-dongpo-pork',
    childLabel: '동파육덮밥',
    koreanName: '동파육 덮밥',
    chineseName: '東坡肉飯',
    pinyin: 'Dōngpōròu Fàn',
    category: '정통 육류 진미',
    location: '전통 노포 식당',
    antiqueDescription: '소흥주와 전통 양조간장, 빙당에 정성스레 약불로 서너 시간 졸여 젓가락만 대어도 부드럽게 갈라지는 윤기 나는 삼겹살과 따스한 쌀밥.',
    childMemory: '도톰하고 네모난 갈색 고기가 밥 위에 크게 얹어져 있었다. 양념이 밥에 쏙 배어있어서 밥 한 공기를 뚝딱 비웠다.',
    iconName: 'UtensilsCrossed',
    coordinates: { x: 58, y: 16 },
  },
  {
    id: 'food-malatang',
    childLabel: '마라탕',
    koreanName: '마라탕 & 훠궈',
    chineseName: '麻辣燙',
    pinyin: 'Málà Tàng',
    category: '얼큰한 온탕',
    location: '타이베이 야시장 노점',
    antiqueDescription: '사천 화자오의 톡 쏘는 얼얼함과 붉은 고추기름이 어우러진 알싸한 국물에 어묵, 두부, 연근, 신선한 버섯을 가득 데쳐낸 향연.',
    childMemory: '그릇 안에 여러 가지 완자랑 맛있는 재료들이 퐁당퐁당 들어가 있어서 언니랑 오빠랑 건져먹는 재미가 있었다.',
    iconName: 'Flame',
    coordinates: { x: 40, y: 34 },
  },
  {
    id: 'food-sausage',
    childLabel: '소시지',
    koreanName: '대만식 샹창 (흑돼지 소시지)',
    chineseName: '台灣香腸',
    pinyin: 'Táiwān Xiāngcháng',
    category: '야시장 꼬치 구이',
    location: '스린 및 라오허제 야시장',
    antiqueDescription: '달착지근한 오향과 고량주로 마리네이드하여 숯불에 겉은 바삭하고 속은 육즙 가득하게 구워낸 수제 흑돼지 소시지.',
    childMemory: '긴 나무 꼬치에 꽂혀 김이 모락모락 나던 통통한 소시지! 겉은 노릇노릇하고 속은 톡 터지는 맛이 최고였다.',
    iconName: 'Sparkles',
    coordinates: { x: 38, y: 16 },
  },
];

export const SIBLING_COMPANIONS: Companion[] = [
  {
    id: 'companion-brother',
    role: '오빠',
    name: '다정한 오빠',
    description: '동그란 안경 너머로 늘 다정하게 웃어주고 길을 찾아주던 든든한 길잡이.',
    feature: '둥근 안경과 활짝 웃는 얼굴, 꽃잎 같은 반짝임',
    coordinates: { x: 50, y: 82 },
  },
  {
    id: 'companion-sister',
    role: '언니',
    name: '상냥한 언니',
    description: '맛있는 디저트를 함께 고르고 손을 꼭 잡고 야경을 보며 감탄했던 소중한 단짝.',
    feature: '차분한 단발머리와 눈웃음, 다정한 미소',
    coordinates: { x: 64, y: 82 },
  },
  {
    id: 'companion-me',
    role: '나 (일기 주인공)',
    name: '호기심 가득한 나',
    description: '타이베이의 모든 풍경과 맛난 음식들을 눈에 가득 담고 연필로 일기장에 정성스레 기록한 꼬마 여행자.',
    feature: '신나서 입을 벌리고 환하게 웃는 발랄한 모습',
    coordinates: { x: 78, y: 82 },
  },
];

export const PHOTO_BOOTH_INFO = {
  title: '타이베이 즉석 네컷 사진 (紀念拍立得)',
  description: '거리 모퉁이 작은 사진 부스에서 세 남매가 우스꽝스러운 표정과 브이 포즈로 남긴 영원한 우정의 기록.',
  coordinates: { x: 80, y: 18 },
};

export const TAIPEI_101_INFO = {
  name: '타이베이 101 타워 (台北101)',
  subname: 'Taipei World Financial Center',
  height: '508m (101층)',
  symbolism: '대나무처럼 마디마디 뻗어 올라가는 8단 번영의 상징',
  antiqueDescription: '비 구름이 신비롭게 감싸는 타이베이의 밤, 찬란한 황금빛 불빛을 뿜어내며 동방의 등대처럼 우뚝 솟아있던 거대한 마천루. 꼭대기 전망대에서 내려다본 불빛들은 마치 보석 상자를 쏟아놓은 듯했다.',
  childNote: '네모난 상자들이 층층이 하늘 높이 끝없이 쌓여있는 것 같았던 거대한 탑. 밤에 본 야경은 정말 잊지 못할 만큼 최고였다!',
  coordinates: { x: 16, y: 50 },
};
