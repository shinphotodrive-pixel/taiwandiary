import React, { useState } from 'react';
import { TAIPEI_MAP_LANDMARKS, DIARY_IMAGES } from '../data/diaryData';
import { MapLandmark, TaiwanDelicacy } from '../types/diary';
import { VintagePostageStamp } from './VintagePostageStamp';
import { vintageAudio } from '../utils/audio';
import { Compass, MapPin, Sparkles, Bookmark, Eye, Info, X } from 'lucide-react';

interface VintageTaipeiMapProps {
  onSelectDelicacy?: (delicacy: TaiwanDelicacy) => void;
}

export const VintageTaipeiMap: React.FC<VintageTaipeiMapProps> = () => {
  const [selectedLandmark, setSelectedLandmark] = useState<MapLandmark | null>(
    TAIPEI_MAP_LANDMARKS[0]
  );
  const [activeFilter, setActiveFilter] = useState<'all' | 'food' | 'landmark' | 'history'>('all');

  const filteredLandmarks = activeFilter === 'all'
    ? TAIPEI_MAP_LANDMARKS
    : TAIPEI_MAP_LANDMARKS.filter((l) => l.category === activeFilter);

  const handlePinClick = (landmark: MapLandmark) => {
    setSelectedLandmark(landmark);
    vintageAudio.playMusicBoxNote(2);
  };

  return (
    <div className="w-full flex flex-col gap-5 sm:gap-6 pb-20 sm:pb-6">
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-[#8c704f]/40 pb-3 sm:pb-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-garamond uppercase tracking-widest text-[#9e4624]">
            <Compass className="w-3.5 h-3.5 text-amber-500" />
            <span>19th-Century Cartography Survey · Formosa Taihoku Map</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-batang font-bold text-[#351e0e] dark:text-[#faebd7] mt-1">
            타이베이 고지도 여정기 (臺北古地圖)
          </h2>
          <p className="text-xs sm:text-sm font-batang text-[#6b523e] dark:text-[#cbb399] mt-1 max-w-2xl leading-relaxed">
            10월 2일 그림일기에 등장하는 타이베이 101과 시먼딩, 융캉제 등 주요 여정을 19세기 고서 동판화 고지도로 복원했습니다. 지도 위 붉은 나침반 핀을 눌러 감상해 보세요.
          </p>
        </div>

        {/* Filter Buttons & Postage Stamp */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => {
                setActiveFilter('all');
                vintageAudio.playQuillScratch();
              }}
              className={`px-2.5 py-1.5 rounded-xs transition-colors whitespace-nowrap cursor-pointer font-batang ${
                activeFilter === 'all'
                  ? 'bg-[#5c3e25] text-[#fbf6ec] font-bold shadow-xs'
                  : 'bg-[#ede0c8] text-[#543b25] hover:bg-[#dfcca9]'
              }`}
            >
              전체 명소 (7)
            </button>
            <button
              onClick={() => {
                setActiveFilter('food');
                vintageAudio.playQuillScratch();
              }}
              className={`px-2.5 py-1.5 rounded-xs transition-colors whitespace-nowrap cursor-pointer font-batang ${
                activeFilter === 'food'
                  ? 'bg-[#5c3e25] text-[#fbf6ec] font-bold shadow-xs'
                  : 'bg-[#ede0c8] text-[#543b25] hover:bg-[#dfcca9]'
              }`}
            >
              일기 속 미식
            </button>
            <button
              onClick={() => {
                setActiveFilter('history');
                vintageAudio.playQuillScratch();
              }}
              className={`px-2.5 py-1.5 rounded-xs transition-colors whitespace-nowrap cursor-pointer font-batang ${
                activeFilter === 'history'
                  ? 'bg-[#5c3e25] text-[#fbf6ec] font-bold shadow-xs'
                  : 'bg-[#ede0c8] text-[#543b25] hover:bg-[#dfcca9]'
              }`}
            >
              역사 유적
            </button>
          </div>
          <VintagePostageStamp size="sm" variant="indigo" postmarkDate="1888" denomination="20 SEN" label="地圖 郵便" rotate="rotate-[-2deg]" className="hidden sm:inline-block" />
        </div>
      </div>

      {/* Main Map Viewer & Detail Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Antique Map Canvas (7 cols on Desktop) */}
        <div className="lg:col-span-7 relative w-full aspect-[16/11] rounded-sm overflow-hidden border-2 sm:border-3 border-[#735133] shadow-2xl bg-[#1b1510] group select-none">
          {/* High-res 19th Century Map Copperplate Background */}
          <img
            src={DIARY_IMAGES.antiqueMap}
            alt="19th Century Antique Taipei Map"
            className="w-full h-full object-cover filter contrast-110 sepia-[0.25]"
            referrerPolicy="no-referrer"
          />

          {/* Delicate Antique Margin Rules & Cartouche Border */}
          <div className="absolute inset-3 border border-[#bfa27b]/50 pointer-events-none" />
          <div className="absolute inset-4 border border-[#8f6e4a]/30 pointer-events-none" />

          {/* Ornate Corner Title Cartouche */}
          <div className="absolute top-5 left-5 bg-[#faf2dd]/95 border border-[#8a6845] px-2.5 py-1.5 rounded-xs shadow-md pointer-events-none">
            <span className="text-[9px] font-garamond uppercase tracking-widest text-[#7a4421] block">
              HISTORICAL ATLAS
            </span>
            <span className="text-xs font-serif font-bold text-[#2a1a0f]">
              臺北府地圖 · 1888
            </span>
          </div>

          {/* Decorative Compass Rose (Top Right) */}
          <div className="absolute top-5 right-5 w-12 h-12 rounded-full border border-[#8a6845]/60 bg-[#faf2dd]/70 flex items-center justify-center pointer-events-none shadow-sm">
            <Compass className="w-8 h-8 text-[#784724]/80 animate-spin-slow duration-30000" />
          </div>

          {/* Interactive Map Landmark Pins */}
          {filteredLandmarks.map((landmark) => {
            const isSelected = selectedLandmark?.id === landmark.id;

            return (
              <div
                key={landmark.id}
                onClick={() => handlePinClick(landmark)}
                className={`absolute transition-all duration-200 cursor-pointer group z-20 ${
                  isSelected ? 'scale-120 z-30' : 'hover:scale-110'
                }`}
                style={{
                  left: `${landmark.coordinates.x}%`,
                  top: `${landmark.coordinates.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Pin Head */}
                <div className="relative flex flex-col items-center">
                  {/* Ping Animation for Selected Pin */}
                  {isSelected && (
                    <span className="absolute -top-1 w-7 h-7 rounded-full bg-[#c0392b] opacity-40 animate-ping pointer-events-none" />
                  )}

                  {/* Brass / Wax Pin Seal */}
                  <div
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center shadow-lg transition-colors ${
                      isSelected
                        ? 'bg-[#8c2d1b] border-[#fff4e0] text-[#fff4e0] ring-2 ring-[#c0824b]'
                        : 'bg-[#fffaf0] border-[#5e3e23] text-[#5e3e23] group-hover:bg-[#f6ebd4]'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 fill-current" />
                  </div>

                  {/* Callout Label */}
                  <span
                    className={`mt-0.5 px-1.5 py-0.2 rounded text-[10px] font-batang font-bold whitespace-nowrap shadow-xs transition-colors ${
                      isSelected
                        ? 'bg-[#8c2d1b] text-[#fbf5e6] border border-[#52190d]'
                        : 'bg-[#faf4e4]/90 border border-[#876746] text-[#2c1d11] group-hover:bg-[#f3dfbf]'
                    }`}
                  >
                    {landmark.koreanName}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Bottom Map Note Strip */}
          <div className="absolute bottom-2 inset-x-3 bg-[#1c1510]/85 backdrop-blur-xs text-[#e8d7c2] px-2 py-1 rounded-xs flex items-center justify-between text-[10px] font-batang">
            <span className="truncate pr-2">
              * 지도 위 핀을 누르면 10월 2일 일기 속 미식 및 여행지 해설을 볼 수 있습니다.
            </span>
            <span className="font-garamond italic text-[#caa269] shrink-0">Scale: 1:25,000</span>
          </div>
        </div>

        {/* Right: Selected Landmark Field Note Dossier (5 cols on Desktop) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {selectedLandmark ? (
            <div
              className="bg-parchment-warm border-2 border-[#7a5937] rounded-sm p-4 sm:p-5 shadow-xl text-[#2a1c12] flex flex-col justify-between min-h-[360px]"
              style={{
                boxShadow: 'inset 0 0 40px rgba(120, 80, 40, 0.1), 0 10px 25px rgba(0,0,0,0.4)',
              }}
            >
              <div>
                {/* Header Lockup */}
                <div className="border-b border-[#a88a65] pb-2.5 mb-3">
                  <div className="flex items-center justify-between text-[11px] font-garamond uppercase tracking-widest text-[#8c3519]">
                    <span className="font-bold flex items-center gap-1">
                      <Bookmark className="w-3.5 h-3.5" />
                      {selectedLandmark.tag}
                    </span>
                    <span className="text-[#6d5138]">{selectedLandmark.zone}</span>
                  </div>
                  <div className="flex items-baseline justify-between mt-1">
                    <h3 className="text-xl sm:text-2xl font-batang font-bold text-[#351e0e]">
                      {selectedLandmark.koreanName}
                    </h3>
                    <span className="text-base font-serif font-bold text-[#723c1e]">
                      {selectedLandmark.chineseName}
                    </span>
                  </div>
                </div>

                {/* Antique Historical Geographical Survey */}
                <div className="bg-[#fbf4e2] border border-[#cfbca1] p-3 rounded-xs shadow-2xs mb-3">
                  <span className="text-xs font-bold font-batang text-[#6b3a1a] block mb-1">
                    19세기 고서 지리지 해설
                  </span>
                  <p className="text-xs sm:text-sm font-batang leading-relaxed text-[#2c1d11]">
                    {selectedLandmark.antiqueDesc}
                  </p>
                </div>

                {/* Child's Diary Link */}
                <div className="bg-[#f2e2c4] border border-[#bfa686] p-3 rounded-xs shadow-2xs">
                  <div className="flex items-center gap-1.5 text-xs font-bold font-batang text-[#783617] mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>그림일기 속 연계 기억</span>
                  </div>
                  <p className="text-xs sm:text-sm font-pen text-[#1c1209] leading-snug">
                    {selectedLandmark.childDiaryNote}
                  </p>
                </div>
              </div>

              {/* Dossier Footer */}
              <div className="pt-3 mt-3 border-t border-[#bfa686]/60 flex items-center justify-between text-[11px] font-batang text-[#73553c]">
                <span>위치: <strong>{selectedLandmark.zone}</strong></span>
                <span className="font-garamond italic">Taiwan Expedition Journal</span>
              </div>
            </div>
          ) : (
            <div className="bg-[#241a13] border border-[#523c28] p-6 rounded-sm text-center text-[#baa186] font-batang text-xs">
              지도 위의 핀을 선택해 주세요.
            </div>
          )}

          {/* Quick Landmark Thumbnails Row */}
          <div className="bg-[#241a13] border border-[#523c28] p-3 rounded-sm">
            <span className="text-[11px] font-batang text-[#baa186] block mb-2 font-bold">
              탐방지 목록 바로가기:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {TAIPEI_MAP_LANDMARKS.map((landmark) => (
                <button
                  key={landmark.id}
                  onClick={() => handlePinClick(landmark)}
                  className={`px-2 py-1 text-[11px] rounded-xs font-batang transition-colors cursor-pointer ${
                    selectedLandmark?.id === landmark.id
                      ? 'bg-[#8c2d1b] text-[#fff6ea] font-bold shadow-xs'
                      : 'bg-[#33261a] hover:bg-[#433222] text-[#d6c2a8]'
                  }`}
                >
                  {landmark.koreanName.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
