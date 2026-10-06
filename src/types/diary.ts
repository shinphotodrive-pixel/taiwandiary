export interface TaiwanDelicacy {
  id: string;
  childLabel: string;
  koreanName: string;
  chineseName: string;
  pinyin: string;
  category: string;
  location: string;
  antiqueDescription: string;
  childMemory: string;
  iconName: string;
  coordinates: { x: number; y: number }; // Relative position on the sketch canvas (%)
}

export interface Companion {
  id: string;
  role: string;
  name: string;
  description: string;
  feature: string;
  coordinates: { x: number; y: number };
}

export interface DiaryEntryData {
  id: string;
  title: string;
  dateStr: string;
  dayOfWeek: string;
  weather: 'sun' | 'cloud' | 'rain' | 'snow';
  wakeTime: string;
  wakeHour: number;
  wakeMinute: number;
  sleepTime: string;
  sleepHour: number;
  sleepMinute: number;
  manuscriptText: string[][]; // 4 rows x 10 cols
  fullText: string;
  reflection: string;
}
