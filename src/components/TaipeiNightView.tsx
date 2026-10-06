import React, { useState } from 'react';
import { DIARY_IMAGES, TAIPEI_101_INFO } from '../data/diaryData';
import { vintageAudio } from '../utils/audio';
import { Moon, CloudRain, Volume2, VolumeX, Sparkles, Compass } from 'lucide-react';

export const TaipeiNightView: React.FC = () => {
  const [rainActive, setRainActive] = useState(false);
  const [lanternGlow, setLanternGlow] = useState(true);

  const toggleRainSound = () => {
    const isPlaying = vintageAudio.toggleRain();
    setRainActive(isPlaying);
  };

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-6 pb-20 sm:pb-6">
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-[#8c704f]/40 pb-3 sm:pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-garamond uppercase tracking-widest text-[#d49a5b]">
            <Moon className="w-3.5 h-3.5 text-amber-300" />
            <span>Taipei Celestial Nocturne · Copperplate Lithograph</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-batang font-bold text-[#f7ecd7] mt-1">
            타이베이 101 안개비 야경도 (台北夜景圖)
          </h2>
          <p className="text-sm font-batang text-[#c5ad93] mt-1 max-w-2xl leading-relaxed">
            &ldquo;오늘은 타이베이에서 맛난 거 먹고 야경봤다. 최고!&rdquo; — 비 내리는 10월 2일 밤, 89층 전망대에서 바라본 찬란한 도시의 황금빛 불빛과 빗소리를 재현한 앤틱 야경입니다.
          </p>
        </div>

        {/* Rain Sound Effect Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleRainSound}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xs text-xs font-batang transition-all cursor-pointer border ${
              rainActive
                ? 'bg-[#1e3c54] border-[#447699] text-[#e0f1fc] shadow-md ring-1 ring-[#5a9ac7]'
                : 'bg-[#2b221a] border-[#6b523e] text-[#d6c2a8] hover:bg-[#382d23]'
            }`}
          >
            <CloudRain className={`w-3.5 h-3.5 ${rainActive ? 'text-cyan-300 animate-bounce' : ''}`} />
            <span>타이베이 밤비 소리: {rainActive ? 'ON' : 'OFF'}</span>
            {rainActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Night Engraving Display */}
      <div className="relative w-full aspect-[16/9] rounded-sm overflow-hidden border-2 border-[#82613d] shadow-2xl bg-[#0e0c0a] group">
        <img
          src={DIARY_IMAGES.nightView}
          alt="Taipei Night Engraving"
          className="w-full h-full object-cover filter contrast-125 brightness-95"
          referrerPolicy="no-referrer"
        />

        {/* Soft rain texture overlay when rain is active */}
        {rainActive && (
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-transparent to-black/40 pointer-events-none animate-pulse duration-1000" />
        )}

        {/* Delicate antique frame inside */}
        <div className="absolute inset-4 border border-[#b89569]/40 pointer-events-none" />
        <div className="absolute inset-5 border border-[#8a6a43]/30 pointer-events-none" />

        {/* Top Floating Seal */}
        <div className="absolute top-8 left-8 bg-[#18130ebf] backdrop-blur-xs border border-[#a47e52] px-3 py-1.5 rounded text-[#faecd5] shadow-lg">
          <div className="text-[10px] font-garamond uppercase tracking-widest text-[#d8a873]">
            NOCTURNAL SURVEY · 101 TOWER
          </div>
          <div className="text-xs font-batang font-bold text-[#fff2dc]">
            해발 508m 전망대 시야 확보
          </div>
        </div>

        {/* Interactive Lantern Hotspots */}
        <div
          onClick={() => {
            setLanternGlow(!lanternGlow);
            vintageAudio.playMusicBoxNote(5);
          }}
          className="absolute bottom-8 right-8 bg-[#201811cc] backdrop-blur-xs border border-[#b88c5a] p-3 rounded text-[#faecd5] shadow-xl max-w-sm cursor-pointer hover:bg-[#2b2016ee] transition-all"
        >
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#e6b379] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>그림일기 속 그날 밤의 감동</span>
          </div>
          <p className="text-xs font-batang leading-relaxed text-[#eddcc7]">
            비가 부슬부슬 내리던 10월 2일 밤 1시 30분까지 잠들지 못할 만큼, 세 남매의 가슴을 벅차게 했던 타이베이 101의 찬란한 야경.
          </p>
          <span className="block text-[10px] text-[#b4906a] mt-1 italic font-garamond">
            * 클릭하여 등불 조명 밝기 토글
          </span>
        </div>
      </div>

      {/* Poetic Night Journal Entry */}
      <div className="bg-[#241c16] border border-[#6b5037] p-5 rounded-xs text-[#ebd8c0] shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-[#b88a53] bg-[#33261c] flex items-center justify-center shrink-0">
            <Compass className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h4 className="text-sm font-batang font-bold text-[#f7e9d4]">
              &ldquo;타이베이에서 맛난 거 먹고 야경봤다. 최고!&rdquo;
            </h4>
            <p className="text-xs font-batang text-[#b59f87] mt-0.5">
              10월 2일 금요일 밤 1시 30분 취침 전, 어린 꼬마 여행자가 일기장에 마지막으로 눌러 쓴 솔직하고 벅찬 감탄.
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="text-xs font-garamond text-amber-200/90 block">
            October 2nd, Taipei Nightscape
          </span>
          <span className="text-[11px] font-batang text-[#967d64]">
            기상 9:40 ~ 취침 1:30의 하루 완결
          </span>
        </div>
      </div>
    </div>
  );
};
