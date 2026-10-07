import React, { useState } from 'react';
import { TAIWAN_DELICACIES, DIARY_IMAGES } from '../data/diaryData';
import { TaiwanDelicacy } from '../types/diary';
import { VintagePostageStamp } from './VintagePostageStamp';
import { vintageAudio } from '../utils/audio';
import { Sparkles, MapPin, Tag } from 'lucide-react';

interface TaiwanTreatsArchiveProps {
  onSelectDelicacy: (delicacy: TaiwanDelicacy) => void;
}

export const TaiwanTreatsArchive: React.FC<TaiwanTreatsArchiveProps> = ({
  onSelectDelicacy,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const categories = ['all', '감미로운 빙과', '시원한 찻잔', '따스한 면 요리', '전통 농향 다류', '정통 육류 진미', '얼큰한 온탕', '야시장 꼬치 구이'];

  const filteredFoods = selectedFilter === 'all'
    ? TAIWAN_DELICACIES
    : TAIWAN_DELICACIES.filter(f => f.category === selectedFilter);

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-6 pb-20 sm:pb-6">
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-[#8c704f]/40 pb-3 sm:pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-garamond uppercase tracking-widest text-[#9e4624]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Taipei Gastronomy Archive · 19th Century Field Notes</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-batang font-bold text-[#351e0e] mt-1">
            대만 미식 고서 도감 (臺灣美食圖鑑)
          </h2>
          <p className="text-sm font-batang text-[#6b523e] mt-1 max-w-2xl leading-relaxed">
            10월 2일 그림일기에 꼼꼼하게 기록된 7가지 대만의 대표 음식들. 어린 시절 연필로 눌러 쓴 친근한 이름과 함께 앤틱 식문화 도감으로 재현했습니다.
          </p>
        </div>

        {/* Decorative Archive Badge & Stamp */}
        <div className="flex items-center gap-3">
          <div className="border border-[#a38058] bg-[#f5e9d3] px-3 py-1.5 rounded-xs text-right shadow-2xs">
            <span className="text-[10px] font-garamond uppercase text-[#885d39] tracking-wider block">
              COLLECTION RECORD
            </span>
            <span className="text-xs font-batang font-bold text-[#422915]">
              총 7선 수록 완료
            </span>
          </div>
          <VintagePostageStamp size="sm" variant="red" postmarkDate="10.02" denomination="5 SEN" label="美食 郵便" rotate="rotate-[3deg]" className="hidden sm:inline-block" />
        </div>
      </div>

      {/* Filter Segmented Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedFilter(cat);
              vintageAudio.playQuillScratch();
            }}
            className={`px-3 py-1.5 rounded-xs transition-colors whitespace-nowrap cursor-pointer font-batang ${
              selectedFilter === cat
                ? 'bg-[#5c3e25] text-[#fbf6ec] shadow-xs'
                : 'bg-[#ede0c8] text-[#543b25] hover:bg-[#dfcca9]'
            }`}
          >
            {cat === 'all' ? '전체 보기 (7)' : cat}
          </button>
        ))}
      </div>

      {/* Grid of Antique Food Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFoods.map((food, idx) => (
          <div
            key={food.id}
            onClick={() => {
              vintageAudio.playMusicBoxNote(idx);
              onSelectDelicacy(food);
            }}
            className="group relative bg-[#fdfaf2] border-2 border-[#8c6f4f] rounded-xs p-4 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            style={{
              background: 'radial-gradient(ellipse at top left, #fffdf8 0%, #fbf5e6 70%, #f1e2c7 100%)',
            }}
          >
            {/* Top Row: Child Label Tag + Chinese Character */}
            <div>
              <div className="flex items-center justify-between border-b border-[#c8b293]/60 pb-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="bg-[#8b3519] text-[#fff7ec] px-2 py-0.5 text-xs font-pen font-bold rounded-xs shadow-2xs">
                    일기: {food.childLabel}
                  </span>
                  <span className="text-[11px] font-batang text-[#7b5c40]">
                    {food.category}
                  </span>
                </div>
                <span className="text-sm font-serif font-bold text-[#5c371d]">
                  {food.chineseName}
                </span>
              </div>

              {/* Title & Pinyin */}
              <h3 className="text-lg font-batang font-bold text-[#351e0e] group-hover:text-[#8b3519] transition-colors">
                {food.koreanName}
              </h3>
              <span className="text-[11px] font-garamond italic text-[#84684f] block mb-2">
                {food.pinyin}
              </span>

              {/* Antique Description */}
              <p className="text-xs font-batang text-[#483321] line-clamp-3 leading-relaxed mb-3">
                {food.antiqueDescription}
              </p>
            </div>

            {/* Bottom Child Memory Callout */}
            <div className="pt-2 border-t border-[#dfcca9] flex flex-col gap-1">
              <div className="flex items-center gap-1 text-[11px] text-[#8b3519] font-batang font-bold">
                <Tag className="w-3 h-3" />
                <span>꼬마 여행자의 한 줄 기억</span>
              </div>
              <p className="text-xs font-pen text-[#2a1b10] italic bg-[#f5e9d3] p-1.5 rounded-xs">
                &ldquo;{food.childMemory}&rdquo;
              </p>

              <div className="flex items-center justify-between text-[10px] text-[#785b42] mt-1 font-garamond">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#995932]" />
                  <span>{food.location}</span>
                </span>
                <span className="font-batang group-hover:underline text-[#8b3519]">
                  상세 도감 열기 &rarr;
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Archival Note */}
      <div className="bg-[#ede1c7] border border-[#a88a64] p-4 rounded-xs text-xs font-batang text-[#543b24] flex items-center justify-between">
        <span>* 10월 2일 일기 그림 속 7가지 메뉴는 당시 타이베이 미식 문화의 진수를 그대로 담고 있습니다.</span>
        <span className="font-garamond italic">Taiwan Culinary Expedition, October 2nd</span>
      </div>
    </div>
  );
};
