import React, { useState, useEffect } from 'react';
import { vintageAudio } from '../utils/audio';
import { Play, RotateCcw } from 'lucide-react';

interface ManuscriptGridProps {
  grid: string[][];
  fullText: string;
}

export const ManuscriptGrid: React.FC<ManuscriptGridProps> = ({ grid }) => {
  const [animating, setAnimating] = useState(false);
  const [visibleCount, setVisibleCount] = useState<number>(40);

  const flatChars: { char: string; row: number; col: number }[] = [];
  grid.forEach((row, rIdx) => {
    row.forEach((char, cIdx) => {
      flatChars.push({ char, row: rIdx, col: cIdx });
    });
  });

  const startAnimation = () => {
    setAnimating(true);
    setVisibleCount(0);
    vintageAudio.playQuillScratch();
  };

  const resetAll = () => {
    setAnimating(false);
    setVisibleCount(flatChars.length);
  };

  useEffect(() => {
    if (!animating) return;

    if (visibleCount < flatChars.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
        if (flatChars[visibleCount]?.char && flatChars[visibleCount].char.trim() !== '') {
          vintageAudio.playQuillScratch();
        }
      }, 85);
      return () => clearTimeout(timer);
    } else {
      setAnimating(false);
    }
  }, [animating, visibleCount, flatChars]);

  return (
    <div className="w-full flex flex-col gap-2">
      {/* Action bar for manuscript paper */}
      <div className="flex items-center justify-between text-xs font-batang text-[#735841] border-b border-[#c8b497]/60 pb-1.5">
        <div className="flex items-center gap-1.5 font-bold tracking-tight">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8b3a20] shrink-0" />
          <span className="text-[11px] sm:text-xs">그림일기 본문 원고지 (10×4)</span>
        </div>
        <div className="flex items-center gap-1.5">
          {animating ? (
            <span className="text-[10px] sm:text-[11px] text-[#8b3a20] animate-pulse">
              필사 중...
            </span>
          ) : (
            <>
              <button
                onClick={startAnimation}
                className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-[#4a3525] bg-[#ebdcc2] hover:bg-[#decab0] active:scale-95 rounded transition-all cursor-pointer shadow-2xs"
                title="만년필 서예 애니메이션 다시 보기"
              >
                <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#8b3a20]" />
                <span>필사 재현</span>
              </button>
              {visibleCount < flatChars.length && (
                <button
                  onClick={resetAll}
                  className="flex items-center gap-1 px-1.5 py-1 text-[10px] sm:text-[11px] text-[#634e3e] hover:text-[#2d2117] transition-colors cursor-pointer"
                  title="전체 보기"
                >
                  <RotateCcw className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  <span>전체</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Traditional Korean Manuscript Paper (원고지) - Fully Mobile Fluid Grid */}
      <div className="w-full border border-[#a24830]/70 bg-[#faf3e3] rounded-xs shadow-xs p-1 sm:p-2">
        <div className="flex flex-col gap-[2px] sm:gap-[3px]">
          {grid.map((row, rIdx) => (
            <div key={rIdx} className="grid grid-cols-10 gap-[2px] sm:gap-[3px]">
              {row.map((char, cIdx) => {
                const globalIdx = rIdx * 10 + cIdx;
                const isVisible = globalIdx < visibleCount;
                const isFilled = char.trim() !== '';

                return (
                  <div
                    key={cIdx}
                    onClick={() => {
                      vintageAudio.playQuillScratch();
                    }}
                    className={`relative aspect-square flex items-center justify-center border border-[#c47764]/70 bg-[#fffdf7] rounded-[1px] transition-all duration-150 select-none group cursor-pointer hover:bg-[#f6ebd4] active:bg-[#ede0c7] ${
                      isFilled ? 'shadow-2xs' : ''
                    }`}
                  >
                    {/* Subtle manuscript guideline cross in background */}
                    <div className="absolute inset-0 pointer-events-none opacity-20">
                      <div className="absolute top-1/2 left-0 right-0 h-[0.5px] bg-[#a24830] -translate-y-1/2" />
                      <div className="absolute left-1/2 top-0 bottom-0 w-[0.5px] bg-[#a24830] -translate-x-1/2" />
                    </div>

                    {/* Character */}
                    <span
                      className={`relative z-10 text-xs sm:text-sm md:text-base font-pen font-bold text-[#1f1915] transition-opacity duration-200 group-hover:scale-110 ${
                        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                      }`}
                      style={{
                        textShadow: '0 0.5px 0.5px rgba(0,0,0,0.12)',
                      }}
                    >
                      {char}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Caption note */}
      <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#7d6550] px-1 font-garamond italic">
        <span className="truncate pr-2">
          &ldquo;언니랑 오빠랑 대만 여행했다. 오늘은 타이베이에서 맛난 거 먹고 야경봤다. 최고!&rdquo;
        </span>
        <span className="not-italic font-batang text-[9px] sm:text-[10px] text-[#9b7e63] shrink-0">
          10칸 규격
        </span>
      </div>
    </div>
  );
};
