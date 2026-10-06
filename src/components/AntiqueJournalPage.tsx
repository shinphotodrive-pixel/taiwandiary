import React, { useState } from 'react';
import { INITIAL_DIARY, SIBLING_COMPANIONS, TAIWAN_DELICACIES } from '../data/diaryData';
import { TaiwanDelicacy, Companion } from '../types/diary';
import { AntiqueClock } from './AntiqueClock';
import { ManuscriptGrid } from './ManuscriptGrid';
import { InteractiveSketchBoard } from './InteractiveSketchBoard';
import { vintageAudio } from '../utils/audio';
import { Sun, Cloud, CloudRain, Snowflake, Feather, Sparkles, Heart, BookOpen, PenTool, LayoutGrid } from 'lucide-react';

interface AntiqueJournalPageProps {
  onSelectDelicacy: (delicacy: TaiwanDelicacy) => void;
  onSelectCompanion: (companion: Companion) => void;
  onSelectTower: () => void;
  onNavigateTab: (tab: string) => void;
}

export const AntiqueJournalPage: React.FC<AntiqueJournalPageProps> = ({
  onSelectDelicacy,
  onSelectCompanion,
  onSelectTower,
  onNavigateTab,
}) => {
  const [selectedWeather, setSelectedWeather] = useState<'sun' | 'cloud' | 'rain' | 'snow'>('rain');
  const [mobilePageView, setMobilePageView] = useState<'sketch' | 'manuscript' | 'both'>('sketch');

  return (
    <div className="w-full flex flex-col items-center pb-20 lg:pb-6">
      {/* Antique Desk Banner / Context */}
      <div className="w-full max-w-6xl mb-3 flex items-center justify-between text-xs font-batang text-[#9d8164] px-1 sm:px-2">
        <div className="flex items-center gap-1.5 truncate">
          <Feather className="w-3.5 h-3.5 text-[#b3864d] shrink-0" />
          <span className="truncate">10월 2일 금요일 · 대만 타이베이 여행록 (臺北紀行)</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 font-garamond italic text-[12px] text-[#caa77e] shrink-0">
          <span>Archival Leather Folio</span>
          <span>·</span>
          <span>1002</span>
        </div>
      </div>

      {/* Mobile Page Segmented Switcher (Visible on small screens) */}
      <div className="lg:hidden w-full max-w-6xl mb-3 flex items-center justify-center">
        <div className="bg-[#241a13] p-1 rounded-sm border border-[#523b28] flex items-center gap-1 w-full max-w-sm">
          <button
            onClick={() => {
              setMobilePageView('sketch');
              vintageAudio.playPageTurn();
            }}
            className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-xs text-xs font-batang transition-all cursor-pointer min-h-[36px] ${
              mobilePageView === 'sketch'
                ? 'bg-[#5c3e25] text-[#fbf6ea] font-bold shadow-xs'
                : 'text-[#9c846d] hover:text-[#d5bda4]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>도화 (그림)</span>
          </button>
          <button
            onClick={() => {
              setMobilePageView('manuscript');
              vintageAudio.playPageTurn();
            }}
            className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-xs text-xs font-batang transition-all cursor-pointer min-h-[36px] ${
              mobilePageView === 'manuscript'
                ? 'bg-[#5c3e25] text-[#fbf6ea] font-bold shadow-xs'
                : 'text-[#9c846d] hover:text-[#d5bda4]'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>원고지 (글)</span>
          </button>
          <button
            onClick={() => {
              setMobilePageView('both');
              vintageAudio.playPageTurn();
            }}
            className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-xs text-xs font-batang transition-all cursor-pointer min-h-[36px] ${
              mobilePageView === 'both'
                ? 'bg-[#5c3e25] text-[#fbf6ea] font-bold shadow-xs'
                : 'text-[#9c846d] hover:text-[#d5bda4]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>양면 펼침</span>
          </button>
        </div>
      </div>

      {/* The Master Double-Page Antique Book Container */}
      <div
        className="w-full max-w-6xl bg-[#281c13] rounded-sm p-2 sm:p-4 md:p-6 shadow-2xl border-2 sm:border-4 border-[#523924] relative"
        style={{
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), inset 0 0 100px rgba(0,0,0,0.6)',
        }}
      >
        {/* Antique Book Spine & Stitching in Center (Desktop) */}
        <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-[#170f0a] via-[#332215] to-[#170f0a] shadow-inner z-20 pointer-events-none">
          <div className="w-[1px] h-full bg-[#100a06] mx-auto" />
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-[#caa269] rounded-xs opacity-75 shadow-xs" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-[#caa269] rounded-xs opacity-75 shadow-xs" />
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-[#caa269] rounded-xs opacity-75 shadow-xs" />
        </div>

        {/* Two Pages Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-8 relative z-10">
          {/* ===================== LEFT PAGE: THE ILLUSTRATED SKETCH ===================== */}
          <div
            className={`bg-parchment-warm rounded-xs p-3 sm:p-4 md:p-5 flex flex-col justify-between border border-[#a2845f]/70 shadow-inner ${
              mobilePageView === 'manuscript' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            {/* Top Page Folio Title */}
            <div className="flex items-center justify-between border-b border-[#bda07b]/60 pb-1.5 mb-2.5 text-xs font-batang text-[#68492c]">
              <div className="flex items-center gap-1.5 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8c3519]" />
                <span className="text-[11px] sm:text-xs">도화(圖畵): 대만 미식 &amp; 101 타워</span>
              </div>
              <span className="font-garamond italic text-[#846342] text-[11px]">Folio 14</span>
            </div>

            {/* The Main Interactive Sketch Board */}
            <div className="w-full">
              <InteractiveSketchBoard
                onSelectDelicacy={onSelectDelicacy}
                onSelectCompanion={onSelectCompanion}
                onSelectTower={onSelectTower}
              />
            </div>

            {/* Bottom Sibling Companions Ribbon */}
            <div className="mt-2.5 pt-2 border-t border-[#c6af90]/70 flex flex-wrap items-center justify-between gap-1.5 text-xs font-batang text-[#5a3f27]">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#8c3519] text-[11px]">동행:</span>
                {SIBLING_COMPANIONS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      vintageAudio.playMusicBoxNote(2);
                      onSelectCompanion(c);
                    }}
                    className="hover:underline text-[#3a2514] font-medium cursor-pointer text-[11px] px-0.5"
                  >
                    [{c.role}]
                  </button>
                ))}
              </div>

              <button
                onClick={() => onNavigateTab('treats')}
                className="text-[11px] text-[#8c3519] hover:underline cursor-pointer font-bold"
              >
                미식 7선 도감 &rarr;
              </button>
            </div>
          </div>

          {/* ===================== RIGHT PAGE: THE JOURNAL & MANUSCRIPT ===================== */}
          <div
            className={`bg-parchment-warm rounded-xs p-3 sm:p-4 md:p-5 flex flex-col justify-between border border-[#a2845f]/70 shadow-inner ${
              mobilePageView === 'sketch' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            {/* Page Header Strip: Date, Weather Seal, Clocks */}
            <div>
              <div className="flex items-center justify-between border-b border-[#bda07b]/60 pb-1.5 mb-2.5 text-xs font-batang text-[#68492c]">
                <span className="font-garamond italic text-[#846342] text-[11px]">Folio 15</span>
                <span className="font-bold text-[#8c3519] text-[11px]">10월 2일 금요일 그림일기</span>
              </div>

              {/* Header Box: Date + Weather + Clocks */}
              <div className="bg-[#fcf8ec] border border-[#947754] rounded-xs p-2 sm:p-3 shadow-2xs mb-3">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-3 items-center">
                  {/* Date Column */}
                  <div className="sm:col-span-4 flex items-center justify-between sm:flex-col sm:items-start border-b sm:border-b-0 sm:border-r border-[#cdbba1] pb-1.5 sm:pb-0 sm:pr-2">
                    <div>
                      <span className="text-[10px] font-batang text-[#876c4e] block">여행 날짜</span>
                      <div className="text-lg sm:text-xl md:text-2xl font-pen font-bold text-[#2a1b10] leading-none mt-0.5">
                        {INITIAL_DIARY.dateStr}
                      </div>
                    </div>
                    <div className="text-xs font-batang text-[#735233] bg-[#ebdcc2] px-2 py-0.5 rounded-xs sm:bg-transparent sm:p-0">
                      {INITIAL_DIARY.dayOfWeek}
                    </div>
                  </div>

                  {/* Weather Column */}
                  <div className="sm:col-span-4 flex items-center justify-between sm:flex-col sm:items-center border-b sm:border-b-0 sm:border-r border-[#cdbba1] pb-1.5 sm:pb-0 sm:px-2">
                    <span className="text-[10px] font-batang text-[#876c4e]">
                      날씨 (비 🌧️)
                    </span>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <button
                        onClick={() => {
                          setSelectedWeather('sun');
                          vintageAudio.playClockTick();
                        }}
                        className={`p-1 rounded cursor-pointer transition-colors ${
                          selectedWeather === 'sun' ? 'bg-[#ebd6b5] text-[#b8541c]' : 'text-[#a28669]'
                        }`}
                        title="맑음"
                      >
                        <Sun className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedWeather('cloud');
                          vintageAudio.playClockTick();
                        }}
                        className={`p-1 rounded cursor-pointer transition-colors ${
                          selectedWeather === 'cloud' ? 'bg-[#ebd6b5] text-[#4f6479]' : 'text-[#a28669]'
                        }`}
                        title="흐림"
                      >
                        <Cloud className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedWeather('rain');
                          vintageAudio.playMusicBoxNote(1);
                        }}
                        className={`relative p-1 rounded cursor-pointer transition-all ${
                          selectedWeather === 'rain' ? 'text-[#235882] font-bold' : 'text-[#a28669]'
                        }`}
                        title="비 (연필 동그라미!)"
                      >
                        <CloudRain className="w-4 h-4" />
                        {selectedWeather === 'rain' && (
                          <div
                            className="absolute -inset-1 rounded-full border-2 border-[#8c2d1b] pointer-events-none rotate-[-6deg]"
                            style={{
                              borderRadius: '48% 52% 47% 53% / 54% 46% 54% 46%',
                            }}
                          />
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setSelectedWeather('snow');
                          vintageAudio.playClockTick();
                        }}
                        className={`p-1 rounded cursor-pointer transition-colors ${
                          selectedWeather === 'snow' ? 'bg-[#ebd6b5] text-[#4d7a97]' : 'text-[#a28669]'
                        }`}
                        title="눈"
                      >
                        <Snowflake className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Clocks Column */}
                  <div className="sm:col-span-4 flex items-center justify-around sm:pl-1 pt-1 sm:pt-0">
                    <AntiqueClock
                      label="기상 시각"
                      hour={INITIAL_DIARY.wakeHour}
                      minute={INITIAL_DIARY.wakeMinute}
                      displayTime={INITIAL_DIARY.wakeTime}
                      size={48}
                    />
                    <AntiqueClock
                      label="취침 시각"
                      hour={INITIAL_DIARY.sleepHour}
                      minute={INITIAL_DIARY.sleepMinute}
                      displayTime={INITIAL_DIARY.sleepTime}
                      size={48}
                    />
                  </div>
                </div>
              </div>

              {/* The Traditional 10x4 Manuscript Grid */}
              <ManuscriptGrid
                grid={INITIAL_DIARY.manuscriptText}
                fullText={INITIAL_DIARY.fullText}
              />
            </div>

            {/* Archival Editorial Reflection Commentary */}
            <div className="mt-3 pt-2.5 border-t border-[#c6af90]/70">
              <div className="bg-[#f5e9d3] border border-[#a88a65] p-2.5 rounded-xs shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#783617] mb-0.5 font-batang">
                  <Heart className="w-3.5 h-3.5 text-[#8c2d1b] shrink-0" />
                  <span>앤틱 사서(司書)의 감상 해제</span>
                </div>
                <p className="text-[11px] sm:text-xs font-batang leading-relaxed text-[#3a2615]">
                  {INITIAL_DIARY.reflection}
                </p>
              </div>

              {/* Bottom Quick Navigation Links */}
              <div className="flex items-center justify-between mt-2.5 text-xs font-batang text-[#735841]">
                <button
                  onClick={() => onNavigateTab('comparison')}
                  className="hover:underline text-[#783617] font-medium cursor-pointer text-[11px]"
                >
                  &larr; 원본 스케치 비교
                </button>
                <button
                  onClick={() => onNavigateTab('night')}
                  className="hover:underline text-[#783617] font-medium cursor-pointer text-[11px]"
                >
                  101 타워 야경 &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
