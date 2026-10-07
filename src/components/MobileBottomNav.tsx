import React from 'react';
import { vintageAudio } from '../utils/audio';
import { BookOpen, Calendar, Utensils, Compass, SplitSquareVertical, PenTool, Moon } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabs = [
    { id: 'journal', label: '그림일기', icon: BookOpen },
    { id: 'itinerary', label: '여정록', icon: Calendar },
    { id: 'treats', label: '미식도감', icon: Utensils },
    { id: 'map', label: '고지도', icon: Compass },
    { id: 'comparison', label: '원본비교', icon: SplitSquareVertical },
    { id: 'atelier', label: '드로잉', icon: PenTool },
    { id: 'night', label: '101야경', icon: Moon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#16110c]/95 backdrop-blur-md border-t border-[#423121] shadow-2xl pb-safe">
      <div className="max-w-md mx-auto grid grid-cols-7 h-15 items-center px-0.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                vintageAudio.playPageTurn();
              }}
              className={`flex flex-col items-center justify-center min-h-[46px] py-0.5 transition-all cursor-pointer relative ${
                isActive ? 'text-[#f5d5a3]' : 'text-[#877058] hover:text-[#bfa286]'
              }`}
            >
              {/* Active Indicator Top Dot */}
              {isActive && (
                <div className="absolute top-0.5 w-1 h-1 rounded-full bg-[#dfa45c]" />
              )}

              <div
                className={`p-1 rounded-full transition-transform ${
                  isActive ? 'scale-105 bg-[#382618]' : ''
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span
                className={`text-[8.5px] font-batang tracking-tighter mt-0.5 whitespace-nowrap ${
                  isActive ? 'font-bold text-[#fce5c3]' : 'text-[#877058]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
