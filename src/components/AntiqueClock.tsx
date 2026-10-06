import React, { useState } from 'react';
import { vintageAudio } from '../utils/audio';

interface AntiqueClockProps {
  label: string;
  hour: number;
  minute: number;
  displayTime: string;
  size?: number;
}

export const AntiqueClock: React.FC<AntiqueClockProps> = ({
  label,
  hour,
  minute,
  displayTime,
  size = 72,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate hand angles:
  // Minute hand: 360 deg / 60 min = 6 deg per minute
  const minuteAngle = minute * 6;
  // Hour hand: 360 deg / 12 hr = 30 deg per hour + (minute / 60) * 30
  const hourAngle = (hour % 12) * 30 + (minute / 60) * 30;

  const handleInteract = () => {
    vintageAudio.playClockTick();
  };

  return (
    <div
      className="flex flex-col items-center gap-1 cursor-pointer group"
      onMouseEnter={() => {
        setIsHovered(true);
        vintageAudio.playClockTick();
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleInteract}
      title={`${label}: ${displayTime}`}
    >
      <span className="text-[11px] font-batang tracking-tight text-[#8c7457] group-hover:text-[#523d29] transition-colors">
        {label}
      </span>

      {/* Antique Clock Dial */}
      <div
        className="relative rounded-full shadow-inner transition-transform duration-200 group-hover:scale-105"
        style={{
          width: size,
          height: size,
          background: 'radial-gradient(circle at 35% 35%, #faf3e0 0%, #ecdcb9 65%, #c8b087 100%)',
          border: '2.5px solid #846746',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3), 0 2px 5px rgba(0,0,0,0.15)',
        }}
      >
        {/* Subtle decorative inner ring */}
        <div className="absolute inset-[3px] rounded-full border border-[#b89d75]/50 pointer-events-none" />

        {/* 12 tick marks */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1 left-1/2 -translate-x-1/2 origin-bottom pointer-events-none"
            style={{
              height: `${size / 2 - 4}px`,
              transform: `rotate(${i * 30}deg)`,
            }}
          >
            <div
              className={`w-[1px] ${
                i % 3 === 0 ? 'h-[4px] bg-[#5a4128]' : 'h-[2.5px] bg-[#9a7f60]'
              }`}
            />
          </div>
        ))}

        {/* Hour Hand */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 origin-bottom pointer-events-none transition-transform duration-300"
          style={{
            width: '2px',
            height: `${size * 0.28}px`,
            backgroundColor: '#382513',
            transform: `translate(-50%, -100%) rotate(${hourAngle}deg)`,
            borderRadius: '1px',
          }}
        />

        {/* Minute Hand */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 origin-bottom pointer-events-none transition-transform duration-300"
          style={{
            width: '1.5px',
            height: `${size * 0.38}px`,
            backgroundColor: '#4d341b',
            transform: `translate(-50%, -100%) rotate(${minuteAngle}deg)`,
            borderRadius: '1px',
          }}
        />

        {/* Center Brass Cap */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: '6px',
            height: '6px',
            background: 'radial-gradient(circle, #f4e0a5 0%, #876229 100%)',
            boxShadow: '0 0.5px 1.5px rgba(0,0,0,0.4)',
          }}
        />
      </div>

      {/* Digital / Text representation */}
      <span
        className={`text-xs font-serif font-bold transition-colors ${
          isHovered ? 'text-[#8c4b26]' : 'text-[#483321]'
        }`}
      >
        {displayTime}
      </span>
    </div>
  );
};
