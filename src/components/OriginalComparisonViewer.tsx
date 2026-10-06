import React, { useState } from 'react';
import { DIARY_IMAGES, INITIAL_DIARY, TAIWAN_DELICACIES } from '../data/diaryData';
import { vintageAudio } from '../utils/audio';
import { SplitSquareVertical, Sliders, CheckCircle2, Info, Compass } from 'lucide-react';

export const OriginalComparisonViewer: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [activePin, setActivePin] = useState<string | null>(null);

  const annotationPins = [
    {
      id: 'pin-header',
      title: '날씨 & 시계 헤더',
      original: '10월 2일 금요일 / 비 🌧️ (우산에 연필 동그라미) / 기상 9:40, 취침 1:30',
      antiqueInterpretation: '19세기 천문 관측 기록양식과 황동 앤틱 회중시계 다이얼로 재해석',
      x: 18,
      y: 12,
    },
    {
      id: 'pin-tower',
      title: '타이베이 101 마천루',
      original: '네모난 상자들이 층층이 하늘로 뻗은 대나무 모양 마천루와 뾰족한 안테나',
      antiqueInterpretation: '빅토리아 양식 건축 세밀 동판화 (Copperplate Engraving)로 구현',
      x: 20,
      y: 65,
    },
    {
      id: 'pin-treats',
      title: '대만 미식 7종 (망빙·신바커·곱창국수 등)',
      original: '망빙, 신바커(스타벅스), 곱창국수, 버블티, 동파육덮밥, 마라탕, 소시지 손글씨 라벨',
      antiqueInterpretation: '식물학 및 박물관 미식 도감의 수채 삽화와 금박 장정 엠블럼으로 승화',
      x: 45,
      y: 45,
    },
    {
      id: 'pin-companions',
      title: '세 남매의 초상화 & 즉석 사진',
      original: '안경 쓴 오빠, 미소 짓는 언니, 활짝 웃는 나 & 3컷 포토부스 스티커 사진',
      antiqueInterpretation: '황동 오벌 카메오(Cameo) 브로치와 다게레오타입 은판 사진 양식',
      x: 65,
      y: 55,
    },
    {
      id: 'pin-grid',
      title: '10칸 원고지 그림일기 문장',
      original: '“언니랑 오빠랑 대만 여행했다. 오늘은 타이베이에서 맛난 거 먹고 야경봤다. 최고!”',
      antiqueInterpretation: '조선 및 동양 고서적 목판 인쇄 원고지와 깃펜 만년필 캘리그래피',
      x: 82,
      y: 80,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-6 pb-20 sm:pb-6">
      {/* Intro Header */}
      <div className="border-b border-[#8c704f]/40 pb-3 sm:pb-4">
        <div className="flex items-center gap-2 text-xs font-garamond uppercase tracking-widest text-[#9e4624]">
          <Compass className="w-3.5 h-3.5" />
          <span>Comparative Archival Study · Original Sketch vs. Antique Illuminated Page</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-batang font-bold text-[#351e0e] mt-1">
          원본 연필 스케치 vs 앤틱 고서 아카이브 비교 분석
        </h2>
        <p className="text-sm font-batang text-[#6b523e] mt-1 max-w-2xl leading-relaxed">
          어린 날의 순수한 연필선 속에 담긴 타이베이의 풍경과 감정을 19세기 양장본 도감의 섬세한 기법으로 복원한 대비 뷰어입니다. 슬라이더를 움직여 감상해 보세요.
        </p>
      </div>

      {/* Interactive Split Slider Viewer */}
      <div className="relative w-full aspect-[16/9] md:aspect-[16/8] rounded-sm overflow-hidden border-2 border-[#7a5937] shadow-xl select-none bg-[#1a1510]">
        {/* Layer 1: Right Side (Antique Illuminated Folio) */}
        <div className="absolute inset-0">
          <img
            src={DIARY_IMAGES.heroJournal}
            alt="Antique Folio"
            className="w-full h-full object-cover filter contrast-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 right-4 bg-[#2e1d10]/90 text-[#fbf6ea] border border-[#a68661] px-2.5 py-1 text-xs font-batang rounded shadow-md">
            앤틱 양장본 복원본 (Antique Archive)
          </div>
        </div>

        {/* Layer 2: Left Side (Original Pencil Sketch Recreation) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <div
            className="absolute inset-0 bg-[#f7f3e8]"
            style={{ width: '100%', minWidth: '100%' }}
          >
            {/* Visual representation of the original pencil drawing texture */}
            <img
              src={DIARY_IMAGES.foodSketch}
              alt="Original Drawing"
              className="w-full h-full object-cover filter grayscale contrast-125 opacity-90"
              referrerPolicy="no-referrer"
            />
            {/* Pencil sketch tint */}
            <div className="absolute inset-0 bg-[#e8e1ce]/50 mix-blend-multiply pointer-events-none" />
          </div>

          <div className="absolute top-4 left-4 bg-[#fcf8ec]/95 text-[#352315] border border-[#78593a] px-2.5 py-1 text-xs font-pen font-bold rounded shadow-md">
            원본 연필 그림일기장 (Original Pencil Sketch)
          </div>
        </div>

        {/* Slider Divider Bar */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-[#fbf6ea] shadow-2xl cursor-ew-resize z-30 flex items-center justify-center -translate-x-1/2"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-[#5c3e25] border-2 border-[#fbf6ea] shadow-lg flex items-center justify-center text-[#fbf6ea]">
            <SplitSquareVertical className="w-4 h-4 rotate-90" />
          </div>
        </div>

        {/* Hidden Range Input for full touch/mouse drag accessibility */}
        <input
          type="range"
          min="5"
          max="95"
          value={sliderPos}
          onChange={(e) => {
            setSliderPos(Number(e.target.value));
            vintageAudio.playClockTick();
          }}
          className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-40"
          aria-label="스케치 비교 슬라이더"
        />

        {/* Annotation Pins */}
        {annotationPins.map((pin) => (
          <button
            key={pin.id}
            onClick={() => {
              setActivePin(activePin === pin.id ? null : pin.id);
              vintageAudio.playMusicBoxNote(3);
            }}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          >
            <div className="relative">
              <span className="flex h-6 w-6">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c0392b] opacity-60"></span>
                <span className="relative inline-flex rounded-full h-6 w-6 bg-[#8c2d1b] border-2 border-[#fff3e0] text-[#fff3e0] text-[10px] font-bold items-center justify-center shadow-md">
                  ★
                </span>
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Annotation Detail Card when Pin Clicked */}
      {activePin && (
        <div className="bg-[#fcf8ee] border-2 border-[#875d38] p-4 rounded-xs shadow-md animate-in fade-in duration-200">
          {(() => {
            const pin = annotationPins.find((p) => p.id === activePin);
            if (!pin) return null;
            return (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between border-b border-[#cbbaa3] pb-2">
                  <h4 className="text-base font-batang font-bold text-[#351e0e]">
                    📌 {pin.title}
                  </h4>
                  <button
                    onClick={() => setActivePin(null)}
                    className="text-xs text-[#735338] hover:text-[#2a1708] underline cursor-pointer"
                  >
                    닫기
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#f5ebd7] p-2.5 rounded-xs">
                    <span className="font-bold text-[#8c3519] block mb-1">
                      어린 시절 원본 스케치 특징
                    </span>
                    <p className="text-[#3c2a1b] font-pen text-sm">{pin.original}</p>
                  </div>
                  <div className="bg-[#ebdfc7] p-2.5 rounded-xs">
                    <span className="font-bold text-[#452e1a] block mb-1">
                      앤틱 아카이브 재해석 기법
                    </span>
                    <p className="text-[#3c2a1b] font-batang">{pin.antiqueInterpretation}</p>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Key Element Mapping Table */}
      <div className="bg-[#faf3e3] border border-[#a48661] p-4 rounded-xs shadow-xs">
        <h3 className="text-base font-batang font-bold text-[#3d2716] mb-3 flex items-center gap-2">
          <Info className="w-4 h-4 text-[#8c3519]" />
          <span>원본 그림일기 속 요소와 앤틱 디자인 매핑 일람</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {annotationPins.map((pin) => (
            <div
              key={pin.id}
              onClick={() => {
                setActivePin(pin.id);
                vintageAudio.playQuillScratch();
              }}
              className="p-3 bg-[#fffbf2] border border-[#c8b59b] rounded-xs hover:border-[#8c3519] transition-colors cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-batang font-bold text-[#382312] group-hover:text-[#8c3519]">
                  {pin.title}
                </span>
                <span className="text-[10px] text-[#8e6e52]">보기</span>
              </div>
              <p className="text-[11px] font-batang text-[#5e4530] line-clamp-2">
                {pin.antiqueInterpretation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
