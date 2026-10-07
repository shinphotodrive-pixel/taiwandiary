import React, { useState, useEffect } from 'react';
import { vintageAudio } from '../utils/audio';
import { Play, Pause, Volume2, VolumeX, Disc, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

export const AntiqueAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.25);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    const handleMusicState = (playing: boolean) => {
      setIsPlaying(playing);
    };

    vintageAudio.addMusicListener(handleMusicState);
    setIsPlaying(vintageAudio.getIsMusicPlaying());

    return () => {
      vintageAudio.removeMusicListener(handleMusicState);
    };
  }, []);

  const handleToggle = () => {
    const nextState = vintageAudio.toggleClassicalMusic();
    setIsPlaying(nextState);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    vintageAudio.setMusicVolume(val);
    if (val === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      vintageAudio.setMusicVolume(volume > 0 ? volume : 0.25);
    } else {
      setIsMuted(true);
      vintageAudio.setMusicVolume(0);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-2 select-none">
      {/* Minimized Floating Badge */}
      {!isExpanded ? (
        <div className="flex justify-end">
          <button
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2a1d13]/95 border border-[#6b4e33] text-[#f2e2cb] shadow-lg hover:bg-[#382618] active:scale-95 transition-all cursor-pointer text-xs font-batang"
            title="앤틱 오디오 플레이어 펼치기"
          >
            <Disc className={`w-3.5 h-3.5 text-[#d89e52] ${isPlaying ? 'animate-spin duration-3000' : ''}`} />
            <span>19세기 클래식 배경음악</span>
            <ChevronUp className="w-3.5 h-3.5 text-[#a8825b]" />
          </button>
        </div>
      ) : (
        /* Full Antique Audio Player Bar */
        <div
          className="relative bg-gradient-to-r from-[#211710] via-[#2a1d13] to-[#211710] border-2 border-[#5c4027] rounded-sm p-2 sm:p-2.5 shadow-2xl text-[#f3e3cb] flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 sm:gap-4 ring-1 ring-[#735133]/40"
          style={{
            boxShadow: '0 8px 24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          {/* Left: Vintage Gramophone Vinyl Animation & Track Info */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            {/* Spinning Disc Frame */}
            <div
              onClick={handleToggle}
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#825c38] bg-[#140e0a] flex items-center justify-center shrink-0 shadow-md cursor-pointer group"
              title={isPlaying ? '일시 정지' : '클래식 재생'}
            >
              <Disc
                className={`w-5 h-5 sm:w-6 sm:h-6 text-[#caa269] transition-transform ${
                  isPlaying ? 'animate-spin duration-3000' : 'group-hover:rotate-45'
                }`}
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-amber-200/10 to-transparent pointer-events-none" />
            </div>

            {/* Track Prose */}
            <div className="flex flex-col min-w-0 pr-1">
              <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-garamond uppercase tracking-widest text-[#d4a36b] truncate">
                <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                <span className="truncate">19th-Century Classical Salon Ambiance</span>
              </div>
              <div className="text-xs sm:text-sm font-batang font-bold text-[#faecd7] truncate flex items-center gap-1.5">
                <span>에릭 사티: 짐노페디 1번 (1888)</span>
                <span className="hidden md:inline text-[11px] font-normal text-[#baa187]">
                  · 앤틱 오르골 편곡
                </span>
              </div>
            </div>
          </div>

          {/* Center / Right: Player Controls & Volume */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
            {/* Play/Pause Button (Min 44x44px Touch Target) */}
            <button
              onClick={handleToggle}
              className="min-w-[42px] min-h-[42px] px-3 py-1.5 rounded-full bg-[#5c3e25] hover:bg-[#452c17] active:scale-95 text-[#fcf5e8] border border-[#8a653f] shadow-md flex items-center justify-center gap-1.5 text-xs font-batang font-bold transition-all cursor-pointer"
              title={isPlaying ? '음악 멈추기' : '음악 재생'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current text-amber-200" />
                  <span className="text-[11px]">일시정지</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current text-amber-200" />
                  <span className="text-[11px]">음악 재생</span>
                </>
              )}
            </button>

            {/* Volume Control */}
            <div className="hidden sm:flex items-center gap-1.5 pl-1 border-l border-[#4a3421]">
              <button
                onClick={handleToggleMute}
                className="p-1 text-[#caa269] hover:text-[#fff0d6] transition-colors cursor-pointer"
                title={isMuted ? '음소거 해제' : '음소거'}
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5 text-rose-300" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="0.6"
                step="0.02"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 accent-[#caa269] cursor-pointer"
                title="배경음악 음량 조절"
              />
            </div>

            {/* Minimize Chevron */}
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 rounded text-[#997f64] hover:text-[#e8d5be] transition-colors cursor-pointer"
              title="플레이어 접기"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
