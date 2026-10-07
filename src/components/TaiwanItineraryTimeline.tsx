import React, { useState } from 'react';
import {
  TAIWAN_ITINERARY_DAYS,
  TAIWAN_ITINERARY_ITEMS,
  TAIWAN_DELICACIES,
  DIARY_IMAGES,
} from '../data/diaryData';
import { ItineraryItem, TaiwanDelicacy } from '../types/diary';
import { VintagePostageStamp } from './VintagePostageStamp';
import { vintageAudio } from '../utils/audio';
import {
  Compass,
  Calendar,
  Clock,
  MapPin,
  Utensils,
  IceCream,
  Soup,
  Sparkles,
  Moon,
  Sun,
  Cloud,
  CloudRain,
  Camera,
  PlaneTakeoff,
  Building,
  Flame,
  Landmark,
  HeartHandshake,
  ArrowRight,
  BookOpen,
  Filter,
  CheckCircle2,
  Bookmark,
} from 'lucide-react';

interface TaiwanItineraryTimelineProps {
  onSelectDelicacy?: (delicacy: TaiwanDelicacy) => void;
  onNavigateTab?: (tab: string) => void;
}

export const TaiwanItineraryTimeline: React.FC<TaiwanItineraryTimelineProps> = ({
  onSelectDelicacy,
  onNavigateTab,
}) => {
  const [selectedDay, setSelectedDay] = useState<number | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  // Filter items
  const filteredItems = TAIWAN_ITINERARY_ITEMS.filter((item) => {
    const matchesDay = selectedDay === 'all' || item.dayNumber === selectedDay;
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    return matchesDay && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'food':
        return <Utensils className="w-4 h-4 text-amber-400" />;
      case 'night':
        return <Moon className="w-4 h-4 text-indigo-300" />;
      case 'history':
        return <Landmark className="w-4 h-4 text-yellow-500" />;
      case 'landmark':
        return <Camera className="w-4 h-4 text-emerald-400" />;
      case 'transit':
        return <PlaneTakeoff className="w-4 h-4 text-sky-400" />;
      default:
        return <MapPin className="w-4 h-4 text-amber-300" />;
    }
  };

  const getWeatherIcon = (weather: 'rain' | 'sun' | 'cloud') => {
    switch (weather) {
      case 'rain':
        return (
          <span className="flex items-center gap-1 text-cyan-300 font-batang text-[11px]">
            <CloudRain className="w-3.5 h-3.5" />
            <span>비 (Rain)</span>
          </span>
        );
      case 'sun':
        return (
          <span className="flex items-center gap-1 text-amber-300 font-batang text-[11px]">
            <Sun className="w-3.5 h-3.5" />
            <span>맑음 (Sun)</span>
          </span>
        );
      case 'cloud':
        return (
          <span className="flex items-center gap-1 text-stone-300 font-batang text-[11px]">
            <Cloud className="w-3.5 h-3.5" />
            <span>구름 (Cloud)</span>
          </span>
        );
    }
  };

  const handleItemClick = (id: string) => {
    setExpandedItemId(expandedItemId === id ? null : id);
    vintageAudio.playClockTick();
  };

  const handleDelicacyClick = (delicacyId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onSelectDelicacy) return;
    const found = TAIWAN_DELICACIES.find((d) => d.id === delicacyId);
    if (found) {
      vintageAudio.playMusicBoxNote(3);
      onSelectDelicacy(found);
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 sm:gap-6 pb-20 sm:pb-6 select-none">
      {/* 1. Header Ledger Banner */}
      <div className="relative rounded-sm overflow-hidden border-2 border-[#735133] shadow-2xl bg-[#1c1510]">
        {/* Antique Ledger Image Banner */}
        <div className="relative h-44 sm:h-52 md:h-60 w-full overflow-hidden">
          <img
            src={DIARY_IMAGES.itineraryLedger}
            alt="Antique Taiwan Itinerary Ledger"
            className="w-full h-full object-cover filter brightness-75 contrast-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a140f] via-[#1a140f]/60 to-transparent" />

          {/* Top Title Overlay */}
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-garamond uppercase tracking-widest text-[#caa06a]">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>19th-Century Travelogue Chronology · Formosa Itinerary</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-batang font-bold text-[#fbf4e8] mt-1 drop-shadow-md">
                대만 여행 여정록 (臺灣旅行 行程錄)
              </h2>
              <p className="text-xs sm:text-sm font-batang text-[#d4bea4] mt-1 max-w-2xl leading-relaxed drop-shadow-xs">
                10월 1일 도착부터 10월 4일 귀국까지, 세 남매의 발자취와 10월 2일 그림일기 속 7대 미식 &amp; 101 야경의 타임라인 기록입니다.
              </p>
            </div>

            <div className="shrink-0 self-end">
              <VintagePostageStamp
                size="sm"
                variant="gold"
                postmarkDate="10.02"
                denomination="10 SEN"
                label="行程 郵便"
                rotate="rotate-[-2deg]"
                className="hidden sm:inline-block"
              />
            </div>
          </div>
        </div>

        {/* Trip Stats Ribbon */}
        <div className="bg-[#120d09] px-3 sm:px-6 py-2.5 border-t border-[#4a3421] flex flex-wrap items-center justify-between gap-2 text-xs font-batang text-[#a88f76]">
          <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
            <span className="flex items-center gap-1.5 text-[#e5d0b5]">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>4일간의 여정 (10.01 ~ 10.04)</span>
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5 text-[#e5d0b5]">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>10곳의 주요 방문지</span>
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5 text-[#e5d0b5]">
              <Utensils className="w-3.5 h-3.5 text-amber-300" />
              <span>7대 대만 명물 미식</span>
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-[#cca579] font-garamond italic">
            <span>Sister &amp; Brother Companions</span>
          </div>
        </div>
      </div>

      {/* 2. Filter Controls (Day Selector & Category Filter) */}
      <div className="bg-[#241a13] p-3 sm:p-4 rounded-sm border border-[#523b28] shadow-md flex flex-col gap-3">
        {/* Day Selector Buttons */}
        <div>
          <span className="text-[11px] font-batang text-[#a08468] block mb-1.5">
            일차별 여정 선택 (Day Filter)
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2">
            <button
              onClick={() => {
                setSelectedDay('all');
                vintageAudio.playPageTurn();
              }}
              className={`py-2 px-2.5 rounded-xs text-xs font-batang transition-all cursor-pointer flex flex-col items-center justify-center border ${
                selectedDay === 'all'
                  ? 'bg-[#5c3e25] border-[#8a653f] text-[#fbf6ec] font-bold shadow-xs ring-1 ring-[#c29661]'
                  : 'bg-[#1b140e] border-[#402d1d] text-[#a38a72] hover:bg-[#2e2116] hover:text-[#e0cca8]'
              }`}
            >
              <span className="text-[11px] font-bold">전체 여정</span>
              <span className="text-[10px] opacity-80">10개 장소</span>
            </button>

            {TAIWAN_ITINERARY_DAYS.map((day) => {
              const isSelected = selectedDay === day.dayNumber;
              return (
                <button
                  key={day.dayNumber}
                  onClick={() => {
                    setSelectedDay(day.dayNumber);
                    vintageAudio.playPageTurn();
                  }}
                  className={`py-2 px-2.5 rounded-xs text-xs font-batang transition-all cursor-pointer flex flex-col items-center justify-center border relative ${
                    isSelected
                      ? 'bg-[#5c3e25] border-[#8a653f] text-[#fbf6ec] font-bold shadow-xs ring-1 ring-[#c29661]'
                      : day.isMainDiaryDay
                      ? 'bg-[#291c13] border-[#704d2e] text-[#e8caa4] hover:bg-[#3d291a]'
                      : 'bg-[#1b140e] border-[#402d1d] text-[#a38a72] hover:bg-[#2e2116] hover:text-[#e0cca8]'
                  }`}
                >
                  {day.isMainDiaryDay && (
                    <span className="absolute -top-1.5 -right-1 bg-[#8c3519] text-[#fff] text-[9px] px-1 py-0.2 rounded-xs font-bold shadow-xs">
                      그림일기 ★
                    </span>
                  )}
                  <span className="text-[11px] font-bold">
                    {day.dayNumber}일차 ({day.dateStr})
                  </span>
                  <span className="text-[10px] opacity-80 truncate max-w-full">
                    {day.chineseTheme}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-[#3b2a1c] text-xs font-batang">
          <span className="text-[11px] text-[#93775b] shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            <span>분류:</span>
          </span>

          {[
            { id: 'all', label: '전체 보기' },
            { id: 'food', label: '🍽️ 미식 탐방' },
            { id: 'night', label: '🌙 101 야경' },
            { id: 'landmark', label: '📸 명소 & 사진' },
            { id: 'history', label: '🏛️ 역사 & 사찰' },
            { id: 'transit', label: '✈️ 이동 & 기상' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                vintageAudio.playQuillScratch();
              }}
              className={`px-2.5 py-1 rounded-xs transition-colors whitespace-nowrap cursor-pointer text-[11px] ${
                selectedCategory === cat.id
                  ? 'bg-[#734e2c] text-[#fcf6ec] font-bold shadow-xs'
                  : 'bg-[#1a140f] text-[#98816b] hover:bg-[#332417] hover:text-[#dbc5ae]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. The Scrollable Timeline Container */}
      <div className="relative">
        {/* Timeline Central Brass Line (Desktop & Tablet) */}
        <div className="hidden md:block absolute top-8 bottom-8 left-8 lg:left-10 w-0.5 bg-gradient-to-b from-[#8f693e] via-[#caa06a] to-[#8f693e] opacity-70 z-0 pointer-events-none" />

        {/* Mobile Left Timeline Guide Line */}
        <div className="md:hidden absolute top-6 bottom-6 left-5 w-0.5 bg-gradient-to-b from-[#8f693e] via-[#caa06a] to-[#8f693e] opacity-60 z-0 pointer-events-none" />

        {/* Timeline Items List */}
        <div className="flex flex-col gap-5 sm:gap-6 relative z-10">
          {filteredItems.map((item, index) => {
            const isExpanded = expandedItemId === item.id;
            const isMainDay = item.isMainDiaryDay;

            return (
              <div
                key={item.id}
                className={`relative transition-all duration-300 rounded-sm border ${
                  isMainDay
                    ? 'border-[#8f653b] bg-gradient-to-r from-[#2a1d13] via-[#241810] to-[#20150d] shadow-xl'
                    : 'border-[#523b28] bg-[#1e1610] shadow-md'
                } hover:border-[#b08754]`}
                style={{
                  boxShadow: isMainDay
                    ? '0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,230,190,0.06)'
                    : '0 4px 16px rgba(0,0,0,0.4)',
                }}
              >
                {/* Timeline Node Marker (Icon Circle) */}
                <div
                  className={`absolute -left-2.5 md:-left-3.5 top-5 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center border-2 shadow-lg transition-transform ${
                    isMainDay
                      ? 'bg-[#732a18] border-[#caa06a] text-[#fdf6ec] scale-105'
                      : 'bg-[#2d1e14] border-[#7d5c3b] text-[#dbba95]'
                  }`}
                  style={{
                    boxShadow: '0 0 12px rgba(190, 140, 80, 0.35)',
                  }}
                >
                  {getCategoryIcon(item.category)}
                </div>

                {/* Main Card Content Area */}
                <div className="pl-8 sm:pl-9 md:pl-10 p-3 sm:p-5">
                  {/* Top Metadata Row: Date, Time, Zone, Category */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#443020] pb-2 mb-3">
                    <div className="flex items-center gap-2 flex-wrap text-xs font-batang">
                      {/* Date & Time Badge */}
                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-xs bg-[#120d08] border border-[#4a3421] text-[#e8caa4] font-bold">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>{item.dateStr}</span>
                        <span className="text-amber-300 font-mono text-[11px]">
                          {item.timeStr}
                        </span>
                      </span>

                      {/* Main Diary Day Ribbon */}
                      {isMainDay && (
                        <span className="px-1.5 py-0.5 rounded-xs bg-[#8c3519] text-[#fff6ea] text-[10px] font-bold shadow-2xs">
                          10.02 그림일기 수록 ★
                        </span>
                      )}

                      {/* Category Label */}
                      <span className="px-1.5 py-0.5 rounded-xs bg-[#2e2015] text-[#caa06a] text-[11px] border border-[#543b25]">
                        {item.categoryLabel}
                      </span>
                    </div>

                    {/* Weather & Location Zone */}
                    <div className="flex items-center gap-3 text-xs">
                      {getWeatherIcon(item.weather)}
                      <span className="hidden sm:inline text-[#8a725b] text-[11px]">
                        {item.zone}
                      </span>
                    </div>
                  </div>

                  {/* Location Title Header */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2.5">
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl font-batang font-bold text-[#fcf4e8] flex items-center gap-2">
                        <span>{item.locationName}</span>
                      </h3>
                      <span className="text-xs sm:text-sm font-serif italic text-[#c29661] tracking-wide block mt-0.5">
                        {item.chineseName}
                      </span>
                    </div>

                    {item.photoStripLabel && (
                      <span className="self-start sm:self-auto text-[10px] sm:text-[11px] font-garamond italic text-[#9e7d5c] bg-[#140e09] px-2 py-0.5 rounded-xs border border-[#3d2a1b]">
                        🏷️ {item.photoStripLabel}
                      </span>
                    )}
                  </div>

                  {/* 4. Child's Handwritten Diary Box (The Star Feature) */}
                  <div className="my-3 p-3 sm:p-4 rounded-xs bg-[#fbf6ea] border-2 border-[#b5956f] text-[#2b1b10] shadow-inner relative overflow-hidden">
                    {/* Watermark Antique Corner */}
                    <div className="absolute top-1 right-2 text-[9px] font-garamond uppercase tracking-widest text-[#947653] opacity-60">
                      Child Diary Memoire
                    </div>

                    <div className="flex items-center gap-1.5 mb-1 text-[11px] font-batang font-bold text-[#8c3519]">
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                      <span>어린 시절 그림일기 메모:</span>
                    </div>

                    {/* Authentic Child Voice Handwritten Prose */}
                    <p className="font-pen text-base sm:text-lg leading-relaxed text-[#2a170b] pl-2 border-l-2 border-[#8c3519]/40">
                      &ldquo;{item.shortDiaryEntry}&rdquo;
                    </p>
                  </div>

                  {/* 5. 19th-Century Archival & Companion Section */}
                  <div className="flex flex-col gap-2.5 text-xs font-batang">
                    {/* Victorian Archival Commentary */}
                    <div className="text-[#d8c3ab] leading-relaxed bg-[#150f0a] p-2.5 rounded-xs border border-[#3d2a1c]">
                      <span className="font-bold text-[#caa06a] mr-1.5 text-[11px]">
                        [19세기 고서 탐험록]:
                      </span>
                      <span>{item.antiqueArchivalNote}</span>
                    </div>

                    {/* Sibling Memory Quote */}
                    {item.companionMemory && (
                      <div className="flex items-center gap-2 text-[#e3cdb2] bg-[#291b10] px-3 py-1.5 rounded-xs border border-[#523720] text-[11px]">
                        <span className="shrink-0 text-amber-400 font-bold">💬</span>
                        <span className="italic">{item.companionMemory}</span>
                      </div>
                    )}
                  </div>

                  {/* 6. Action Jump Buttons for Connected Components */}
                  <div className="mt-3.5 pt-2.5 border-t border-[#443020] flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Delicacy Modal Trigger */}
                      {item.highlightDelicacyId && onSelectDelicacy && (
                        <button
                          onClick={(e) =>
                            handleDelicacyClick(item.highlightDelicacyId!, e)
                          }
                          className="px-2.5 py-1 rounded-xs bg-[#5c3e25] hover:bg-[#432b17] text-[#fcf5e8] text-xs font-batang font-bold border border-[#8a653f] transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                        >
                          <Utensils className="w-3 h-3 text-amber-300" />
                          <span>미식 도감 열기</span>
                        </button>
                      )}

                      {/* Map Location Link */}
                      {onNavigateTab && (
                        <button
                          onClick={() => {
                            vintageAudio.playPageTurn();
                            onNavigateTab('map');
                          }}
                          className="px-2.5 py-1 rounded-xs bg-[#241a12] hover:bg-[#33251a] text-[#d4bea5] text-xs font-batang border border-[#4d3623] transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Compass className="w-3 h-3 text-amber-400" />
                          <span>고지도에서 위치 보기</span>
                        </button>
                      )}

                      {/* Day 2 Drawing Diary Link */}
                      {isMainDay && onNavigateTab && (
                        <button
                          onClick={() => {
                            vintageAudio.playPageTurn();
                            onNavigateTab('journal');
                          }}
                          className="px-2.5 py-1 rounded-xs bg-[#7a2a16] hover:bg-[#601f0f] text-[#fff6ea] text-xs font-batang font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                        >
                          <BookOpen className="w-3 h-3" />
                          <span>10.02 그림일기 본문</span>
                        </button>
                      )}
                    </div>

                    <span className="text-[10px] font-garamond italic text-[#78614c]">
                      Folio Ref: {item.id}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Bottom Journey Postlude Card */}
      <div className="bg-[#1c150f] border-2 border-[#5c4028] rounded-sm p-4 sm:p-6 text-center shadow-xl">
        <h4 className="text-base sm:text-lg font-batang font-bold text-[#faeedc] mb-1">
          &ldquo;언니랑 오빠랑 대만 여행했다. 오늘은 타이베이에서 맛난 거 먹고 야경봤다. 최고!&rdquo;
        </h4>
        <p className="text-xs sm:text-sm font-batang text-[#bda489] max-w-xl mx-auto leading-relaxed">
          어린 시절의 소중한 한 페이지 그림일기에서 시작된 4일간의 타이베이 여정록. 비 오는 날의 따뜻한 국수와 달콤한 망빙, 그리고 밤 1시 30분의 빛나는 101 야경이 영원히 기억됩니다.
        </p>

        {onNavigateTab && (
          <div className="mt-4 flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={() => {
                vintageAudio.playPageTurn();
                onNavigateTab('journal');
              }}
              className="px-3.5 py-1.5 rounded-xs bg-[#5c3e25] hover:bg-[#432b17] text-[#fbf6ec] text-xs font-batang font-bold border border-[#8a653f] transition-colors cursor-pointer"
            >
              그림일기장으로 돌아가기 &rarr;
            </button>
            <button
              onClick={() => {
                vintageAudio.playPageTurn();
                onNavigateTab('map');
              }}
              className="px-3.5 py-1.5 rounded-xs bg-[#241a12] hover:bg-[#36271c] text-[#dfccb7] text-xs font-batang border border-[#523b28] transition-colors cursor-pointer"
            >
              타이베이 고지도 탐색 &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
