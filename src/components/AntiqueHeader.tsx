import React, { useState } from 'react';
import { vintageAudio } from '../utils/audio';
import { Volume2, VolumeX, Music, Smartphone, Monitor } from 'lucide-react';

interface AntiqueHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isPhoneMockup: boolean;
  setIsPhoneMockup: (val: boolean) => void;
}

export const AntiqueHeader: React.FC<AntiqueHeaderProps> = ({
  activeTab,
  setActiveTab,
  isPhoneMockup,
  setIsPhoneMockup,
}) => {
  const [isMuted, setIsMuted] = useState(false);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    vintageAudio.setMuted(nextMuted);
  };

  const playChime = () => {
    vintageAudio.playMusicBoxNote(0);
  };

  return (
    <header className="w-full border-b border-[#473627] bg-[#1a140f] text-[#efe3d1] sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark in display face */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('journal');
            vintageAudio.playPageTurn();
          }}
          className="text-base sm:text-lg md:text-xl font-cinzel font-bold tracking-wider text-[#e8cda2] hover:text-[#fae5c3] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
        >
          <span>Taipei Memoire</span>
          <span className="text-xs text-[#a28669] font-batang tracking-normal">10.02</span>
        </a>

        {/* Zone 2: 4–7 nav links, 1–2 word labels, single-line (Desktop) */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-5 xl:gap-6 text-sm font-batang">
          <button
            onClick={() => {
              setActiveTab('journal');
              vintageAudio.playPageTurn();
            }}
            className={`whitespace-nowrap transition-colors hover:underline cursor-pointer ${
              activeTab === 'journal'
                ? 'text-[#f5d7a6] font-bold underline underline-offset-4 decoration-[#b5834a]'
                : 'text-[#baa186] hover:text-[#ebd8be]'
            }`}
          >
            그림일기
          </button>
          <button
            onClick={() => {
              setActiveTab('itinerary');
              vintageAudio.playPageTurn();
            }}
            className={`whitespace-nowrap transition-colors hover:underline cursor-pointer ${
              activeTab === 'itinerary'
                ? 'text-[#f5d7a6] font-bold underline underline-offset-4 decoration-[#b5834a]'
                : 'text-[#baa186] hover:text-[#ebd8be]'
            }`}
          >
            여정록
          </button>
          <button
            onClick={() => {
              setActiveTab('treats');
              vintageAudio.playPageTurn();
            }}
            className={`whitespace-nowrap transition-colors hover:underline cursor-pointer ${
              activeTab === 'treats'
                ? 'text-[#f5d7a6] font-bold underline underline-offset-4 decoration-[#b5834a]'
                : 'text-[#baa186] hover:text-[#ebd8be]'
            }`}
          >
            미식 도감
          </button>
          <button
            onClick={() => {
              setActiveTab('map');
              vintageAudio.playPageTurn();
            }}
            className={`whitespace-nowrap transition-colors hover:underline cursor-pointer ${
              activeTab === 'map'
                ? 'text-[#f5d7a6] font-bold underline underline-offset-4 decoration-[#b5834a]'
                : 'text-[#baa186] hover:text-[#ebd8be]'
            }`}
          >
            고지도
          </button>
          <button
            onClick={() => {
              setActiveTab('comparison');
              vintageAudio.playPageTurn();
            }}
            className={`whitespace-nowrap transition-colors hover:underline cursor-pointer ${
              activeTab === 'comparison'
                ? 'text-[#f5d7a6] font-bold underline underline-offset-4 decoration-[#b5834a]'
                : 'text-[#baa186] hover:text-[#ebd8be]'
            }`}
          >
            원본 비교
          </button>
          <button
            onClick={() => {
              setActiveTab('atelier');
              vintageAudio.playPageTurn();
            }}
            className={`whitespace-nowrap transition-colors hover:underline cursor-pointer ${
              activeTab === 'atelier'
                ? 'text-[#f5d7a6] font-bold underline underline-offset-4 decoration-[#b5834a]'
                : 'text-[#baa186] hover:text-[#ebd8be]'
            }`}
          >
            드로잉 공방
          </button>
          <button
            onClick={() => {
              setActiveTab('night');
              vintageAudio.playPageTurn();
            }}
            className={`whitespace-nowrap transition-colors hover:underline cursor-pointer ${
              activeTab === 'night'
                ? 'text-[#f5d7a6] font-bold underline underline-offset-4 decoration-[#b5834a]'
                : 'text-[#baa186] hover:text-[#ebd8be]'
            }`}
          >
            101 야경
          </button>
        </nav>

        {/* Zone 3: 1–2 primary actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Smartphone Mockup Frame Toggle (Visible on desktop/tablet to test phone app view) */}
          <button
            onClick={() => {
              setIsPhoneMockup(!isPhoneMockup);
              vintageAudio.playClockTick();
            }}
            className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 text-xs font-batang text-[#dec099] bg-[#2d2218] hover:bg-[#3d2e20] border border-[#59432f] rounded-xs transition-colors whitespace-nowrap cursor-pointer"
            title="스마트폰 화면 프레임 토글"
          >
            {isPhoneMockup ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-amber-300" />
                <span>와이드 뷰</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-amber-300" />
                <span>스마트폰 뷰</span>
              </>
            )}
          </button>

          <button
            onClick={playChime}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-batang text-[#e6cb9f] bg-[#2d2218] hover:bg-[#3d2e20] border border-[#59432f] rounded-xs transition-colors whitespace-nowrap cursor-pointer min-h-[36px]"
            title="오르골 멜로디 재생"
          >
            <Music className="w-3.5 h-3.5 text-[#d89e52]" />
            <span>오르골</span>
          </button>

          <button
            onClick={toggleSound}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-batang text-[#ebd1a7] bg-[#423122] hover:bg-[#523d2b] active:scale-95 border border-[#6d5138] rounded-xs transition-all whitespace-nowrap cursor-pointer min-h-[36px]"
            title={isMuted ? '음향 켜기' : '음향 끄기'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-300" /> : <Volume2 className="w-3.5 h-3.5 text-amber-300" />}
            <span className="hidden sm:inline">{isMuted ? '음소거' : '사운드'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
