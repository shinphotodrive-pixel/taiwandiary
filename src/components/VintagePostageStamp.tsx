import React, { useState } from 'react';
import { DIARY_IMAGES } from '../data/diaryData';
import { vintageAudio } from '../utils/audio';

interface VintagePostageStampProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'red' | 'sepia' | 'indigo' | 'gold' | 'navy';
  postmarkDate?: string;
  denomination?: string;
  label?: string;
  className?: string;
  rotate?: string; // e.g. 'rotate-[-3deg]' or 'rotate-[4deg]'
}

export const VintagePostageStamp: React.FC<VintagePostageStampProps> = ({
  size = 'md',
  variant = 'red',
  postmarkDate = 'OCT 02',
  denomination = '5 SEN',
  label = '臺北 郵便',
  className = '',
  rotate = 'rotate-[-3deg]',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: 'w-16 h-20',
    md: 'w-20 h-24 sm:w-22 sm:h-28',
    lg: 'w-24 h-30 sm:w-28 sm:h-34',
  };

  const accentColors = {
    red: {
      border: 'border-[#8f2d1b]',
      bg: 'bg-[#993420]',
      ink: '#8f2d1b',
    },
    sepia: {
      border: 'border-[#6e4e31]',
      bg: 'bg-[#735134]',
      ink: '#5c3e23',
    },
    indigo: {
      border: 'border-[#2a455a]',
      bg: 'bg-[#2b4c65]',
      ink: '#1e384d',
    },
    gold: {
      border: 'border-[#82612d]',
      bg: 'bg-[#7e5b22]',
      ink: '#6b4c19',
    },
    navy: {
      border: 'border-[#1b3147]',
      bg: 'bg-[#1b344d]',
      ink: '#122438',
    },
  };

  const currentTheme = accentColors[variant];

  const handleClick = () => {
    vintageAudio.playPageTurn();
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => {
        setIsHovered(true);
        vintageAudio.playClockTick();
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-block cursor-pointer select-none transition-transform duration-200 ${rotate} ${
        isHovered ? 'scale-105 z-30' : 'hover:scale-102'
      } ${className}`}
      title="19세기 타이베이 빈티지 우표 (1888 臺北郵便局)"
    >
      {/* Outer Perforated Stamp Base Frame with Jagged Philatelic Edges */}
      <div
        className={`${sizeClasses[size]} relative p-1.5 shadow-md transition-shadow`}
        style={{
          backgroundColor: '#f8f2e2',
          backgroundImage:
            'radial-gradient(circle at center, transparent 3px, #f8f2e2 3.5px)',
          backgroundSize: '10px 10px',
          boxShadow: '0 3px 8px rgba(0,0,0,0.35), inset 0 0 4px rgba(120,90,50,0.2)',
          border: '1.5px dashed #caa87b',
        }}
      >
        {/* Inner Stamp Vignette */}
        <div
          className={`w-full h-full border-1.5 ${currentTheme.border} p-1 flex flex-col justify-between overflow-hidden relative bg-[#faf4e6]`}
        >
          {/* Top Stamp Header: FORMOSA / Denomination */}
          <div className="flex items-center justify-between text-[7px] sm:text-[8px] font-garamond font-bold uppercase tracking-wider text-[#6b4728] border-b border-[#cca77e]/60 pb-0.5">
            <span>FORMOSA</span>
            <span className="font-mono">{denomination}</span>
          </div>

          {/* Center Engraved Artwork */}
          <div className="flex-1 my-0.5 overflow-hidden relative border border-[#c4a076]/40 bg-[#16120e]">
            <img
              src={DIARY_IMAGES.vintageStamps}
              alt="19th Century Taipei Stamp"
              className="w-full h-full object-cover filter sepia-[0.3] contrast-110"
              referrerPolicy="no-referrer"
            />
            {/* Subtle vintage ink wash overlay */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none mix-blend-color"
              style={{ backgroundColor: currentTheme.ink }}
            />
          </div>

          {/* Bottom Stamp Label: Chinese Calligraphy */}
          <div className="flex items-center justify-between text-[7px] sm:text-[8px] font-batang font-bold text-[#5c3c20] border-t border-[#cca77e]/60 pt-0.5">
            <span>{label}</span>
            <span className="font-garamond italic text-[6px]">10.02</span>
          </div>
        </div>

        {/* Circular Vintage Postal Cancellation Postmark Stamp Mark */}
        <div
          className="absolute -top-1.5 -right-2.5 w-11 h-11 sm:w-13 sm:h-13 rounded-full border-1.5 border-dashed pointer-events-none flex flex-col items-center justify-center rotate-[-12deg] opacity-75"
          style={{
            borderColor: currentTheme.ink,
            color: currentTheme.ink,
          }}
        >
          {/* Concentric Cancellation Ring */}
          <div
            className="absolute inset-1 rounded-full border border-solid pointer-events-none opacity-60"
            style={{ borderColor: currentTheme.ink }}
          />
          <span className="text-[6px] sm:text-[7px] font-garamond font-bold tracking-tighter">
            TAIPEI POST
          </span>
          <span className="text-[7px] sm:text-[8px] font-mono font-bold tracking-widest my-[-1px]">
            {postmarkDate}
          </span>
          <span className="text-[5px] sm:text-[6px] font-batang tracking-tight">
            臺北
          </span>
        </div>
      </div>
    </div>
  );
};
