/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AntiqueHeader } from './components/AntiqueHeader';
import { MobileBottomNav } from './components/MobileBottomNav';
import { AntiqueJournalPage } from './components/AntiqueJournalPage';
import { TaiwanItineraryTimeline } from './components/TaiwanItineraryTimeline';
import { TaiwanTreatsArchive } from './components/TaiwanTreatsArchive';
import { VintageTaipeiMap } from './components/VintageTaipeiMap';
import { OriginalComparisonViewer } from './components/OriginalComparisonViewer';
import { AntiqueDrawingStudio } from './components/AntiqueDrawingStudio';
import { TaipeiNightView } from './components/TaipeiNightView';
import { AntiqueFolioModal } from './components/AntiqueFolioModal';
import { AntiqueAudioPlayer } from './components/AntiqueAudioPlayer';
import { TaiwanDelicacy, Companion } from './types/diary';
import { Feather, Wifi, Battery, Signal } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('journal');
  const [selectedDelicacy, setSelectedDelicacy] = useState<TaiwanDelicacy | null>(null);
  const [selectedCompanion, setSelectedCompanion] = useState<Companion | null>(null);
  const [showTower, setShowTower] = useState<boolean>(false);
  const [isPhoneMockup, setIsPhoneMockup] = useState<boolean>(false);

  const handleSelectDelicacy = (delicacy: TaiwanDelicacy) => {
    setSelectedDelicacy(delicacy);
    setSelectedCompanion(null);
    setShowTower(false);
  };

  const handleSelectCompanion = (companion: Companion) => {
    setSelectedCompanion(companion);
    setSelectedDelicacy(null);
    setShowTower(false);
  };

  const handleSelectTower = () => {
    setShowTower(true);
    setSelectedDelicacy(null);
    setSelectedCompanion(null);
  };

  const handleCloseModal = () => {
    setSelectedDelicacy(null);
    setSelectedCompanion(null);
    setShowTower(false);
  };

  return (
    <div className="min-h-screen bg-[#140f0b] text-[#efe3d1] flex flex-col justify-between selection:bg-[#966b38]/40 selection:text-[#fff6ea]">
      {/* 1. Header (Adhering to Top Bar Contract) */}
      <AntiqueHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isPhoneMockup={isPhoneMockup}
        setIsPhoneMockup={setIsPhoneMockup}
      />

      {/* 2. Main Content Canvas */}
      <main className="flex-1 w-full mx-auto flex items-center justify-center p-2 sm:p-4 md:py-6">
        {isPhoneMockup ? (
          /* Smartphone Phone Mockup Shell (for Desktop Preview) */
          <div className="w-full max-w-[414px] bg-[#1a140f] border-[10px] border-[#382618] rounded-[48px] shadow-2xl overflow-hidden relative min-h-[820px] flex flex-col justify-between ring-2 ring-[#705035]/50">
            {/* Phone Top Notch & Status Bar */}
            <div className="bg-[#120d09] px-6 pt-3 pb-2 flex items-center justify-between text-xs text-[#b89f84] select-none border-b border-[#2d1e12]">
              <span className="font-semibold tracking-tight text-[11px] font-mono">09:40</span>
              {/* Dynamic Island / Camera Notch */}
              <div className="w-20 h-4 bg-black rounded-full" />
              <div className="flex items-center gap-1.5 text-[10px]">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Scrollable Phone App Content */}
            <div className="flex-1 overflow-y-auto px-3 py-3">
              {activeTab === 'journal' && (
                <AntiqueJournalPage
                  onSelectDelicacy={handleSelectDelicacy}
                  onSelectCompanion={handleSelectCompanion}
                  onSelectTower={handleSelectTower}
                  onNavigateTab={setActiveTab}
                />
              )}

              {activeTab === 'itinerary' && (
                <div className="bg-[#241a13] border border-[#523c28] rounded-sm p-3 shadow-md">
                  <TaiwanItineraryTimeline
                    onSelectDelicacy={handleSelectDelicacy}
                    onNavigateTab={setActiveTab}
                  />
                </div>
              )}

              {activeTab === 'treats' && (
                <div className="bg-[#241a13] border border-[#523c28] rounded-sm p-3 shadow-md">
                  <TaiwanTreatsArchive onSelectDelicacy={handleSelectDelicacy} />
                </div>
              )}

              {activeTab === 'map' && (
                <div className="bg-[#241a13] border border-[#523c28] rounded-sm p-3 shadow-md">
                  <VintageTaipeiMap onSelectDelicacy={handleSelectDelicacy} />
                </div>
              )}

              {activeTab === 'comparison' && (
                <div className="bg-[#241a13] border border-[#523c28] rounded-sm p-3 shadow-md">
                  <OriginalComparisonViewer />
                </div>
              )}

              {activeTab === 'atelier' && (
                <div className="bg-[#241a13] border border-[#523c28] rounded-sm p-3 shadow-md">
                  <AntiqueDrawingStudio />
                </div>
              )}

              {activeTab === 'night' && (
                <div className="bg-[#14100c] border border-[#473627] rounded-sm p-3 shadow-md">
                  <TaipeiNightView />
                </div>
              )}
            </div>

            {/* Mobile Bottom Tab Bar inside Mockup */}
            <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        ) : (
          /* Responsive Fluid Full Layout (Mobile-first adaptable to any screen width) */
          <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
            {activeTab === 'journal' && (
              <AntiqueJournalPage
                onSelectDelicacy={handleSelectDelicacy}
                onSelectCompanion={handleSelectCompanion}
                onSelectTower={handleSelectTower}
                onNavigateTab={setActiveTab}
              />
            )}

            {activeTab === 'itinerary' && (
              <div className="bg-[#241a13] border-2 border-[#523c28] rounded-sm p-3 sm:p-6 md:p-8 shadow-2xl">
                <TaiwanItineraryTimeline
                  onSelectDelicacy={handleSelectDelicacy}
                  onNavigateTab={setActiveTab}
                />
              </div>
            )}

            {activeTab === 'treats' && (
              <div className="bg-[#241a13] border-2 border-[#523c28] rounded-sm p-3 sm:p-6 md:p-8 shadow-2xl">
                <TaiwanTreatsArchive onSelectDelicacy={handleSelectDelicacy} />
              </div>
            )}

            {activeTab === 'map' && (
              <div className="bg-[#241a13] border-2 border-[#523c28] rounded-sm p-3 sm:p-6 md:p-8 shadow-2xl">
                <VintageTaipeiMap onSelectDelicacy={handleSelectDelicacy} />
              </div>
            )}

            {activeTab === 'comparison' && (
              <div className="bg-[#241a13] border-2 border-[#523c28] rounded-sm p-3 sm:p-6 md:p-8 shadow-2xl">
                <OriginalComparisonViewer />
              </div>
            )}

            {activeTab === 'atelier' && (
              <div className="bg-[#241a13] border-2 border-[#523c28] rounded-sm p-3 sm:p-6 md:p-8 shadow-2xl">
                <AntiqueDrawingStudio />
              </div>
            )}

            {activeTab === 'night' && (
              <div className="bg-[#14100c] border-2 border-[#473627] rounded-sm p-3 sm:p-6 md:p-8 shadow-2xl">
                <TaipeiNightView />
              </div>
            )}
          </div>
        )}
      </main>

      {/* 3. Bottom Antique Audio Player (19th-Century Classical BGM) */}
      <div className="w-full pb-16 md:pb-3 px-2 sm:px-4 z-30 pointer-events-auto">
        <AntiqueAudioPlayer />
      </div>

      {/* 4. Detail Inspector Bottom Sheet / Modal */}
      <AntiqueFolioModal
        selectedDelicacy={selectedDelicacy}
        selectedCompanion={selectedCompanion}
        showTower={showTower}
        onClose={handleCloseModal}
      />

      {/* 4. Mobile Fixed Bottom Navigation Bar (Visible on mobile screens) */}
      <div className="md:hidden">
        <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* 5. Refined Editorial Footer (Desktop only) */}
      <footer className="hidden md:block border-t border-[#3a2c20] bg-[#120e0a] text-[#8e765f] py-4 text-xs font-batang">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Feather className="w-3.5 h-3.5 text-[#a87f50]" />
            <span className="font-serif tracking-wide text-[#b89b7b]">
              타이베이 그림일기 아카이브 (10월 2일 금요일의 기록)
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-[#78614c]">
            <span>언니랑 오빠랑 대만 여행</span>
            <span>·</span>
            <span>미식 7선 &amp; 101 야경</span>
            <span>·</span>
            <span>스마트폰 모바일 최적화</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
