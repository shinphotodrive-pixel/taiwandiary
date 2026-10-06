import React from 'react';
import { TaiwanDelicacy, Companion } from '../types/diary';
import { TAIPEI_101_INFO, DIARY_IMAGES } from '../data/diaryData';
import { vintageAudio } from '../utils/audio';
import { X, Sparkles, MapPin, Bookmark, Utensils, Building, Users } from 'lucide-react';

interface AntiqueFolioModalProps {
  selectedDelicacy: TaiwanDelicacy | null;
  selectedCompanion: Companion | null;
  showTower: boolean;
  onClose: () => void;
}

export const AntiqueFolioModal: React.FC<AntiqueFolioModalProps> = ({
  selectedDelicacy,
  selectedCompanion,
  showTower,
  onClose,
}) => {
  if (!selectedDelicacy && !selectedCompanion && !showTower) return null;

  const handleClose = () => {
    vintageAudio.playPageTurn();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/65 backdrop-blur-xs transition-opacity"
      onClick={handleClose}
    >
      <div
        className="relative w-full sm:max-w-xl max-h-[88vh] overflow-y-auto bg-parchment-warm border-t-4 sm:border-4 border-[#7a5937] rounded-t-2xl sm:rounded-sm p-5 sm:p-6 shadow-2xl text-[#2a1c12] animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-200"
        style={{
          boxShadow: '0 0 0 1px #452e1b, 0 20px 40px rgba(0,0,0,0.6)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Handle Bar */}
        <div className="sm:hidden w-12 h-1 bg-[#8c6f4f] rounded-full mx-auto mb-3 opacity-60" />

        {/* Ornate corner ornaments (desktop only) */}
        <div className="hidden sm:block absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#875f3a] pointer-events-none" />
        <div className="hidden sm:block absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#875f3a] pointer-events-none" />
        <div className="hidden sm:block absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#875f3a] pointer-events-none" />
        <div className="hidden sm:block absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#875f3a] pointer-events-none" />

        {/* Mobile touch-friendly Close button (min 44x44px hitbox) */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[#735133] hover:text-[#2d1b0d] hover:bg-[#ebdcc0] active:scale-95 transition-all cursor-pointer z-10"
          title="닫기"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* -------------------- 1. DELICACY VIEW -------------------- */}
        {selectedDelicacy && (
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Header Lockup */}
            <div className="border-b border-[#a68661] pb-2 sm:pb-3 pr-8 sm:pr-0">
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] sm:text-xs font-garamond uppercase tracking-widest text-[#884725]">
                <Utensils className="w-3.5 h-3.5 shrink-0" />
                <span>대만 미식 고서록 · {selectedDelicacy.category}</span>
                <span className="hidden sm:inline">·</span>
                <span className="truncate">{selectedDelicacy.location}</span>
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-batang font-bold text-[#351e0e]">
                  {selectedDelicacy.koreanName}
                </h3>
                <div className="text-right">
                  <span className="text-base sm:text-lg font-serif font-bold text-[#723c1e]">
                    {selectedDelicacy.chineseName}
                  </span>
                  <span className="block text-[11px] sm:text-xs font-garamond italic text-[#7f644e]">
                    {selectedDelicacy.pinyin}
                  </span>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-4 items-center">
              {/* Illustration Thumbnail */}
              <div className="sm:col-span-2 flex flex-col items-center">
                <div className="w-full max-w-[200px] sm:max-w-none aspect-square border-2 border-[#7e5c3b] rounded-xs overflow-hidden shadow-inner bg-[#fffbf2] p-2 relative">
                  <img
                    src={DIARY_IMAGES.foodSketch}
                    alt={selectedDelicacy.koreanName}
                    className="w-full h-full object-cover filter contrast-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-1 right-1 bg-[#8c361c] text-[#fbf5e6] text-[10px] font-pen px-1.5 py-0.5 rounded shadow-xs">
                    일기 속: &ldquo;{selectedDelicacy.childLabel}&rdquo;
                  </div>
                </div>
                <span className="text-[10px] sm:text-[11px] font-garamond italic text-[#6a4f38] mt-1">
                  Archival Gastronomy Folio
                </span>
              </div>

              {/* Text Description */}
              <div className="sm:col-span-3 flex flex-col gap-2.5 sm:gap-3">
                <div className="bg-[#fbf4e2] border border-[#cfbca1] p-2.5 sm:p-3 rounded-xs shadow-2xs">
                  <div className="flex items-center gap-1.5 text-xs font-bold font-batang text-[#6b3a1a] mb-1">
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>앤틱 고서 설명</span>
                  </div>
                  <p className="text-xs sm:text-sm font-batang leading-relaxed text-[#2c1d11]">
                    {selectedDelicacy.antiqueDescription}
                  </p>
                </div>

                <div className="bg-[#f2e2c4] border border-[#bfa686] p-2.5 sm:p-3 rounded-xs shadow-2xs">
                  <div className="flex items-center gap-1.5 text-xs font-bold font-batang text-[#783617] mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>어린 시절 그림일기 기억</span>
                  </div>
                  <p className="text-xs sm:text-sm font-pen text-[#1c1209] leading-snug">
                    &ldquo;{selectedDelicacy.childMemory}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#bfa686]/60 text-xs font-batang text-[#73553c]">
              <span>원작 일기 라벨: <strong className="text-[#8c361c] font-pen text-base">[{selectedDelicacy.childLabel}]</strong></span>
              <button
                onClick={handleClose}
                className="min-h-[38px] px-4 py-1.5 bg-[#5c3e25] active:bg-[#432b17] text-[#f9f3e5] rounded text-xs font-medium transition-colors cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        )}

        {/* -------------------- 2. COMPANION VIEW -------------------- */}
        {selectedCompanion && (
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="border-b border-[#a68661] pb-2 sm:pb-3 pr-8 sm:pr-0">
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-garamond uppercase tracking-widest text-[#884725]">
                <Users className="w-3.5 h-3.5" />
                <span>여행 동반자 · {selectedCompanion.role}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-batang font-bold text-[#351e0e] mt-1">
                {selectedCompanion.name} ({selectedCompanion.role})
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-4 items-center">
              <div className="sm:col-span-2 flex flex-col items-center">
                <div className="w-full max-w-[180px] sm:max-w-none aspect-square border-2 border-[#7e5c3b] rounded-full overflow-hidden shadow-inner bg-[#fffbf2] p-2 relative flex items-center justify-center">
                  <img
                    src={DIARY_IMAGES.travelersPortrait}
                    alt={selectedCompanion.name}
                    className="w-full h-full object-cover filter sepia contrast-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-[10px] sm:text-[11px] font-garamond italic text-[#6a4f38] mt-1">
                  Vintage Daguerreotype Cameo
                </span>
              </div>

              <div className="sm:col-span-3 flex flex-col gap-2.5 sm:gap-3">
                <div className="bg-[#fbf4e2] border border-[#cfbca1] p-2.5 sm:p-3 rounded-xs shadow-2xs">
                  <span className="text-xs font-bold text-[#6b3a1a] block mb-1">인물 해설</span>
                  <p className="text-xs sm:text-sm font-batang leading-relaxed text-[#2c1d11]">
                    {selectedCompanion.description}
                  </p>
                </div>

                <div className="bg-[#f2e2c4] border border-[#bfa686] p-2.5 sm:p-3 rounded-xs shadow-2xs">
                  <span className="text-xs font-bold text-[#783617] block mb-1">일기 속 묘사 포인트</span>
                  <p className="text-xs sm:text-sm font-pen text-[#1c1209]">
                    {selectedCompanion.feature}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#bfa686]/60 text-xs font-batang text-[#73553c]">
              <span>원문: &ldquo;언니랑 오빠랑 대만 여행했다.&rdquo;</span>
              <button
                onClick={handleClose}
                className="min-h-[38px] px-4 py-1.5 bg-[#5c3e25] active:bg-[#432b17] text-[#f9f3e5] rounded text-xs font-medium transition-colors cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        )}

        {/* -------------------- 3. TAIPEI 101 TOWER VIEW -------------------- */}
        {showTower && (
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="border-b border-[#a68661] pb-2 sm:pb-3 pr-8 sm:pr-0">
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-garamond uppercase tracking-widest text-[#884725]">
                <Building className="w-3.5 h-3.5" />
                <span>타이베이의 상징 마천루 · 야경 명소</span>
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <h3 className="text-xl sm:text-2xl font-batang font-bold text-[#351e0e]">
                  {TAIPEI_101_INFO.name}
                </h3>
                <span className="text-xs font-garamond text-[#694e36]">
                  {TAIPEI_101_INFO.height}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-4 items-center">
              <div className="sm:col-span-2 flex flex-col items-center">
                <div className="w-full max-w-[200px] sm:max-w-none aspect-square border-2 border-[#7e5c3b] rounded-xs overflow-hidden shadow-inner bg-[#16120e] relative">
                  <img
                    src={DIARY_IMAGES.nightView}
                    alt="Taipei 101 Night"
                    className="w-full h-full object-cover filter contrast-115"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-1 left-1 bg-black/60 text-amber-200 text-[9px] px-1.5 py-0.5 rounded font-garamond">
                    NIGHT PANORAMA
                  </div>
                </div>
                <span className="text-[10px] sm:text-[11px] font-garamond italic text-[#6a4f38] mt-1">
                  Copperplate Night Engraving
                </span>
              </div>

              <div className="sm:col-span-3 flex flex-col gap-2.5 sm:gap-3">
                <div className="bg-[#fbf4e2] border border-[#cfbca1] p-2.5 sm:p-3 rounded-xs shadow-2xs">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#6b3a1a] mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>건축적 상징과 야경</span>
                  </div>
                  <p className="text-xs sm:text-sm font-batang leading-relaxed text-[#2c1d11]">
                    {TAIPEI_101_INFO.antiqueDescription}
                  </p>
                </div>

                <div className="bg-[#f2e2c4] border border-[#bfa686] p-2.5 sm:p-3 rounded-xs shadow-2xs">
                  <span className="text-xs font-bold text-[#783617] block mb-1">어린 시절 그림일기 속 소감</span>
                  <p className="text-xs sm:text-sm font-pen text-[#1c1209]">
                    &ldquo;{TAIPEI_101_INFO.childNote}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#bfa686]/60 text-xs font-batang text-[#73553c]">
              <span className="truncate pr-2">원문: &ldquo;오늘은 타이베이에서 맛난 거 먹고 야경봤다. 최고!&rdquo;</span>
              <button
                onClick={handleClose}
                className="min-h-[38px] px-4 py-1.5 bg-[#5c3e25] active:bg-[#432b17] text-[#f9f3e5] rounded text-xs font-medium transition-colors cursor-pointer shrink-0"
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
