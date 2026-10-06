import React, { useState } from 'react';
import {
  TAIWAN_DELICACIES,
  SIBLING_COMPANIONS,
  TAIPEI_101_INFO,
  PHOTO_BOOTH_INFO,
  DIARY_IMAGES,
} from '../data/diaryData';
import { TaiwanDelicacy, Companion } from '../types/diary';
import { vintageAudio } from '../utils/audio';
import { Search, Eye, Sparkles, Utensils, Users, Building, Image as ImageIcon } from 'lucide-react';

interface InteractiveSketchBoardProps {
  onSelectDelicacy: (delicacy: TaiwanDelicacy) => void;
  onSelectCompanion: (companion: Companion) => void;
  onSelectTower: () => void;
}

export const InteractiveSketchBoard: React.FC<InteractiveSketchBoardProps> = ({
  onSelectDelicacy,
  onSelectCompanion,
  onSelectTower,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'foods' | 'people' | 'landmarks'>('all');
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [loupeActive, setLoupeActive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!loupeActive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!loupeActive || !e.touches[0]) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    const y = ((e.touches[0].clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="relative w-full rounded-sm overflow-hidden border-2 border-[#8c704f] bg-[#fbf6ea] shadow-md">
      {/* Antique Toolbar inside the Sketch Area */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-[#ecdcb9]/80 border-b border-[#a88a64]/60 text-xs font-batang text-[#483321]">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-[#6a4221]">스케치 감상 카테고리:</span>
          <div className="flex items-center gap-1 p-0.5 bg-[#dfcaa5] rounded">
            <button
              onClick={() => {
                setActiveCategory('all');
                vintageAudio.playQuillScratch();
              }}
              className={`px-2 py-0.5 text-[11px] font-medium rounded transition-colors cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#5b3c22] text-[#fbf6ea] shadow-xs'
                  : 'text-[#5a432d] hover:text-[#2d1e11]'
              }`}
            >
              전체 보기
            </button>
            <button
              onClick={() => {
                setActiveCategory('foods');
                vintageAudio.playQuillScratch();
              }}
              className={`flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded transition-colors cursor-pointer ${
                activeCategory === 'foods'
                  ? 'bg-[#5b3c22] text-[#fbf6ea] shadow-xs'
                  : 'text-[#5a432d] hover:text-[#2d1e11]'
              }`}
            >
              <Utensils className="w-3 h-3" />
              <span>미식 7종</span>
            </button>
            <button
              onClick={() => {
                setActiveCategory('people');
                vintageAudio.playQuillScratch();
              }}
              className={`flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded transition-colors cursor-pointer ${
                activeCategory === 'people'
                  ? 'bg-[#5b3c22] text-[#fbf6ea] shadow-xs'
                  : 'text-[#5a432d] hover:text-[#2d1e11]'
              }`}
            >
              <Users className="w-3 h-3" />
              <span>세 남매</span>
            </button>
            <button
              onClick={() => {
                setActiveCategory('landmarks');
                vintageAudio.playQuillScratch();
              }}
              className={`flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded transition-colors cursor-pointer ${
                activeCategory === 'landmarks'
                  ? 'bg-[#5b3c22] text-[#fbf6ea] shadow-xs'
                  : 'text-[#5a432d] hover:text-[#2d1e11]'
              }`}
            >
              <Building className="w-3 h-3" />
              <span>101 타워</span>
            </button>
          </div>
        </div>

        {/* Loupe Toggle */}
        <button
          onClick={() => {
            setLoupeActive(!loupeActive);
            vintageAudio.playMusicBoxNote(2);
          }}
          className={`flex items-center gap-1 px-2.5 py-1 text-[11px] rounded transition-colors border cursor-pointer ${
            loupeActive
              ? 'bg-[#823b19] border-[#5e260e] text-[#fff6ea]'
              : 'bg-[#faf2df] border-[#9c7d58] text-[#543b23] hover:bg-[#ebdcc0]'
          }`}
          title="앤틱 돋보기로 세밀화 확대 보기"
        >
          <Search className="w-3.5 h-3.5" />
          <span>돋보기 (Loupe) {loupeActive ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {/* Main Drawing Canvas Area */}
      <div
        className="relative w-full aspect-[16/11] select-none overflow-hidden cursor-crosshair bg-parchment-warm touch-manipulation"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* Antique Page Background Texture / Etchings */}
        <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-multiply">
          <img
            src={DIARY_IMAGES.heroJournal}
            alt="Parchment base"
            className="w-full h-full object-cover filter sepia"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Delicate antique margin lines */}
        <div className="absolute inset-3 border border-[#b49874]/60 pointer-events-none" />
        <div className="absolute inset-4 border border-[#cfbca1]/40 pointer-events-none" />

        {/* Vintage Top Corner Stamp */}
        <div className="absolute top-6 left-6 pointer-events-none opacity-85 rotate-[-4deg]">
          <div className="border-2 border-dashed border-[#9e3a24] text-[#9e3a24] px-2 py-0.5 text-[10px] font-garamond uppercase tracking-widest font-bold">
            TAIPEI MEMOIRE · 10.02
          </div>
        </div>

        {/* -------------------- 1. TAIPEI 101 TOWER (Left / Bottom-Left Area) -------------------- */}
        {(activeCategory === 'all' || activeCategory === 'landmarks') && (
          <div
            className={`absolute transition-all duration-300 group cursor-pointer ${
              hoveredItemId === 'tower' ? 'z-30 scale-102' : 'z-10'
            }`}
            style={{
              left: '8%',
              bottom: '6%',
              width: '28%',
              height: '75%',
            }}
            onClick={() => {
              vintageAudio.playMusicBoxNote(3);
              onSelectTower();
            }}
            onMouseEnter={() => {
              setHoveredItemId('tower');
              vintageAudio.playClockTick();
            }}
            onMouseLeave={() => setHoveredItemId(null)}
          >
            {/* Hand-drawn antique representation of Taipei 101 Tower */}
            <div className="relative w-full h-full flex flex-col items-center justify-end">
              {/* Spire / Antenna */}
              <div className="w-[3px] h-[18%] bg-[#422f1e] relative">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-[#422f1e] bg-[#fbf5e6]" />
              </div>

              {/* Top Observation Deck Section */}
              <div className="w-[42%] h-[10%] border-2 border-[#422f1e] bg-[#f5e9d0]/90 flex items-center justify-center relative shadow-xs">
                <div className="text-[9px] font-batang font-bold text-[#422f1e]">89F 전망</div>
              </div>

              {/* 8 Tier Pagoda Modules (Characteristic Bamboo Section Structure) */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-[52%] h-[8.5%] border-2 border-[#422f1e] bg-[#faefe0] my-[1px] relative flex items-center justify-center shadow-2xs group-hover:bg-[#f3dfc0] transition-colors"
                  style={{
                    width: `${46 + i * 2.5}%`,
                  }}
                >
                  {/* Windows dots */}
                  <div className="flex gap-1.5 opacity-70">
                    <span className="w-1.5 h-2 bg-[#422f1e]/80 rounded-[0.5px]" />
                    <span className="w-1.5 h-2 bg-[#422f1e]/80 rounded-[0.5px]" />
                    <span className="w-1.5 h-2 bg-[#422f1e]/80 rounded-[0.5px]" />
                  </div>
                  {/* Flared pagoda eaves */}
                  <div className="absolute -top-[2px] -left-1.5 -right-1.5 h-[2px] bg-[#422f1e]" />
                </div>
              ))}

              {/* Pedestal Base */}
              <div className="w-[72%] h-[12%] border-2 border-[#422f1e] bg-[#ebd8ba] flex items-center justify-center shadow-xs">
                <span className="text-[10px] font-batang font-bold text-[#422f1e] tracking-tighter">
                  타이베이 101
                </span>
              </div>
            </div>

            {/* Handwritten label in child pencil style */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#fff9ed]/95 border border-[#8f6d48] px-1.5 py-0.5 rounded text-[11px] font-pen font-bold text-[#2a1c11] shadow-xs">
              타이베이 101 타워 (야경 명소!)
            </div>
          </div>
        )}

        {/* -------------------- 2. SEVEN TAIWAN DELICACIES -------------------- */}
        {(activeCategory === 'all' || activeCategory === 'foods') &&
          TAIWAN_DELICACIES.map((food) => {
            const isHovered = hoveredItemId === food.id;

            return (
              <div
                key={food.id}
                onClick={() => {
                  vintageAudio.playMusicBoxNote(1);
                  onSelectDelicacy(food);
                }}
                onMouseEnter={() => {
                  setHoveredItemId(food.id);
                  vintageAudio.playQuillScratch();
                }}
                onMouseLeave={() => setHoveredItemId(null)}
                className={`absolute transition-all duration-200 group cursor-pointer ${
                  isHovered ? 'z-30 scale-110' : 'z-20'
                }`}
                style={{
                  left: `${food.coordinates.x}%`,
                  top: `${food.coordinates.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Antique Hand-drawn Dish Illustration Frame */}
                <div className="relative flex flex-col items-center">
                  <div
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-[#543b24] bg-[#fffaf0] shadow-sm flex items-center justify-center p-1.5 transition-all ${
                      isHovered
                        ? 'border-[#8f3c1d] shadow-md ring-2 ring-[#dfaf78]'
                        : 'group-hover:border-[#7b512e]'
                    }`}
                  >
                    {/* Hand-drawn Antique Style Icon / Miniature Dish Rendering */}
                    {food.id === 'food-mango-ice' && (
                      <div className="relative w-full h-full flex flex-col items-center justify-center">
                        <div className="w-10 h-7 rounded-b-full border-2 border-[#543b24] bg-[#fcedbb] flex items-center justify-center relative overflow-hidden">
                          <div className="w-4 h-4 rounded-full bg-[#f39c12]/80 border border-[#b86200] absolute -top-1" />
                          <div className="flex gap-0.5 mt-1">
                            <span className="w-2 h-2 bg-[#f1c40f] rounded-xs" />
                            <span className="w-2 h-2 bg-[#f39c12] rounded-xs" />
                          </div>
                        </div>
                        <div className="w-12 h-1 bg-[#543b24] rounded-full mt-0.5" />
                      </div>
                    )}

                    {food.id === 'food-starbucks' && (
                      <div className="relative w-full h-full flex flex-col items-center justify-center">
                        <div className="w-6 h-8 border-2 border-[#543b24] bg-[#f8f5ec] rounded-b-sm flex items-center justify-center relative">
                          <div className="w-3.5 h-3.5 rounded-full border border-[#1b6535] bg-[#e3f4e8] flex items-center justify-center">
                            <span className="text-[7px] font-bold text-[#1b6535]">★</span>
                          </div>
                          {/* Straw */}
                          <div className="absolute -top-3 right-1 w-[2px] h-4 bg-[#1b6535] rotate-12" />
                        </div>
                      </div>
                    )}

                    {food.id === 'food-noodles' && (
                      <div className="relative w-full h-full flex flex-col items-center justify-center">
                        {/* Steaming noodle bowl */}
                        <div className="w-10 h-8 rounded-b-full border-2 border-[#543b24] bg-[#ebd8bb] flex flex-col items-center justify-center relative">
                          <div className="w-8 h-2 rounded-full border border-[#543b24] bg-[#d5b080] -mt-2 flex items-center justify-center">
                            <span className="text-[7px] font-batang text-[#3a2512]">면선</span>
                          </div>
                          <div className="flex gap-1 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7a4825]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7a4825]" />
                          </div>
                        </div>
                      </div>
                    )}

                    {food.id === 'food-bubble-tea' && (
                      <div className="relative w-full h-full flex flex-col items-center justify-center">
                        <div className="w-6 h-9 border-2 border-[#543b24] bg-[#ebd1b4] rounded-b-sm flex flex-col justify-end p-1 relative">
                          {/* Giant Boba Straw */}
                          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-1.5 h-5 bg-[#bf492b] -rotate-6" />
                          {/* Boba pearls */}
                          <div className="flex flex-wrap gap-0.5 justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#24170d]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#24170d]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#24170d]" />
                          </div>
                        </div>
                      </div>
                    )}

                    {food.id === 'food-dongpo-pork' && (
                      <div className="relative w-full h-full flex flex-col items-center justify-center">
                        <div className="w-10 h-7 rounded-b-full border-2 border-[#543b24] bg-[#f3e9d7] flex flex-col items-center justify-center relative">
                          {/* Braised pork block */}
                          <div className="w-5 h-3.5 bg-[#6d2f16] border border-[#401a0b] rounded-[1px] shadow-2xs" />
                          <span className="text-[7px] text-[#4f361c] mt-0.5">동파육</span>
                        </div>
                      </div>
                    )}

                    {food.id === 'food-malatang' && (
                      <div className="relative w-full h-full flex flex-col items-center justify-center">
                        <div className="w-10 h-7 rounded-b-full border-2 border-[#543b24] bg-[#eec5bc] flex flex-col items-center justify-center relative">
                          <div className="flex gap-0.5">
                            <span className="w-2 h-2 rounded-full bg-[#c0392b]" />
                            <span className="w-2 h-2 rounded-full bg-[#d35400]" />
                            <span className="w-2 h-2 rounded-xs bg-[#27ae60]" />
                          </div>
                        </div>
                      </div>
                    )}

                    {food.id === 'food-sausage' && (
                      <div className="relative w-full h-full flex flex-col items-center justify-center">
                        <div className="w-10 h-3 rounded-full bg-[#9e3a24] border-2 border-[#543b24] rotate-[-15deg] flex items-center justify-center shadow-2xs">
                          {/* Skewer stick */}
                          <div className="w-14 h-[2px] bg-[#66492d] absolute -left-2" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Original Child Pencil Label Replica */}
                  <span
                    className={`mt-1 px-1.5 py-0.2 rounded text-xs font-pen font-bold tracking-tight shadow-2xs whitespace-nowrap transition-colors ${
                      isHovered
                        ? 'bg-[#8a3318] text-[#fff6ea]'
                        : 'bg-[#faf4e6]/95 border border-[#8e6e4a] text-[#332214]'
                    }`}
                  >
                    {food.childLabel}
                  </span>
                </div>
              </div>
            );
          })}

        {/* -------------------- 3. THE THREE COMPANIONS (Positioned at the Bottom) -------------------- */}
        {(activeCategory === 'all' || activeCategory === 'people') && (
          <div
            className="absolute flex items-end justify-center gap-2 sm:gap-3.5 z-20"
            style={{
              left: '64%',
              bottom: '4%',
              transform: 'translateX(-50%)',
            }}
          >
            {SIBLING_COMPANIONS.map((companion) => {
              const isHovered = hoveredItemId === companion.id;

              return (
                <div
                  key={companion.id}
                  onClick={() => {
                    vintageAudio.playMusicBoxNote(4);
                    onSelectCompanion(companion);
                  }}
                  onMouseEnter={() => {
                    setHoveredItemId(companion.id);
                    vintageAudio.playQuillScratch();
                  }}
                  onMouseLeave={() => setHoveredItemId(null)}
                  className={`flex flex-col items-center transition-all duration-200 cursor-pointer group ${
                    isHovered ? 'scale-115 z-30' : 'hover:scale-105'
                  }`}
                >
                  {/* Antique Victorian Locket Portrait Frame */}
                  <div
                    className={`w-14 h-16 md:w-16 md:h-18 rounded-[50%] border-2 border-[#68492c] bg-[#faf3e3] p-1 flex items-center justify-center shadow-sm relative transition-all ${
                      isHovered ? 'ring-2 ring-[#c0824b] border-[#92421f]' : ''
                    }`}
                  >
                    {/* Companion Drawing */}
                    <div className="relative w-full h-full flex flex-col items-center justify-center">
                      {/* Sparkles on hover */}
                      <Sparkles className="w-3 h-3 text-[#c48d42] absolute -top-1 -right-1 opacity-80" />

                      {/* Head */}
                      <div className="w-9 h-9 rounded-full border-2 border-[#432d19] bg-[#faefe0] relative flex items-center justify-center">
                        {/* Features depending on role */}
                        {companion.role === '오빠' && (
                          <>
                            {/* Short curly/messy hair at top */}
                            <div className="absolute top-0 inset-x-2 h-1.5 bg-[#3d2715] rounded-t-full" />
                            {/* Round glasses with cute pupils */}
                            <div className="flex gap-1 items-center mt-1">
                              <span className="w-2.5 h-2.5 rounded-full border border-[#3d2715] bg-white flex items-center justify-center">
                                <span className="w-1 h-1 rounded-full bg-[#3d2715]" />
                              </span>
                              <span className="w-2.5 h-2.5 rounded-full border border-[#3d2715] bg-white flex items-center justify-center">
                                <span className="w-1 h-1 rounded-full bg-[#3d2715]" />
                              </span>
                            </div>
                            {/* Cheerful smile */}
                            <div className="w-2.5 h-1 border-b-2 border-[#3d2715] rounded-full mt-0.5" />
                          </>
                        )}

                        {companion.role === '언니' && (
                          <>
                            {/* Pretty bangs / bob hair */}
                            <div className="absolute top-0 inset-x-1.5 h-2.5 bg-[#3d2715] rounded-t-full" />
                            {/* Smiling eyes ^ ^ */}
                            <div className="flex gap-2 text-[9px] font-bold text-[#3d2715] mt-1.5 leading-none">
                              <span>^</span>
                              <span>^</span>
                            </div>
                            {/* Sweet smile */}
                            <div className="w-2.5 h-1 border-b-2 border-[#3d2715] rounded-full mt-0.5" />
                          </>
                        )}

                        {companion.role.includes('나') && (
                          <>
                            {/* Joyful eyes • • */}
                            <div className="flex gap-2 text-[9px] font-bold text-[#3d2715] mt-1">
                              <span>•</span>
                              <span>•</span>
                            </div>
                            {/* Open laughing happy mouth */}
                            <div className="w-3.5 h-2 bg-[#b84832] rounded-b-full border border-[#432d19] mt-0.5 shadow-2xs" />
                          </>
                        )}
                      </div>

                      {/* Torso */}
                      <div className="w-10 h-4 border-2 border-[#432d19] bg-[#e8d5b7] rounded-t-lg -mt-0.5" />
                    </div>
                  </div>

                  {/* Child Handwritten Tag */}
                  <span
                    className={`mt-1 px-1.5 py-0.2 rounded text-[10px] sm:text-[11px] font-pen font-bold transition-colors shadow-2xs whitespace-nowrap ${
                      isHovered
                        ? 'bg-[#89381c] text-[#fff5ea]'
                        : 'bg-[#fffbf0] border border-[#85633e] text-[#3d2919]'
                    }`}
                  >
                    {companion.role === '나 (일기 주인공)' ? '나 (주인공)' : companion.role}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* -------------------- 4. PHOTO BOOTH 3-CUT STRIP (Top Right) -------------------- */}
        {(activeCategory === 'all' || activeCategory === 'people') && (
          <div
            className="absolute top-4 right-6 group cursor-pointer transition-transform hover:scale-105 z-20"
            onClick={() => {
              vintageAudio.playMusicBoxNote(5);
            }}
            title={PHOTO_BOOTH_INFO.title}
          >
            <div className="border-2 border-[#5a3f28] bg-[#fbf5e6] p-1.5 rounded-[2px] shadow-sm flex flex-col gap-1 w-14 md:w-16">
              <div className="flex items-center justify-between text-[7px] font-batang text-[#735338] px-0.5">
                <span>타이베이</span>
                <span>★</span>
              </div>
              {/* 3 frames */}
              <div className="w-full h-8 border border-[#7a5b3f] bg-[#ede0c7] flex items-center justify-center text-[9px] font-pen font-bold text-[#453020]">
                언니 찰칵
              </div>
              <div className="w-full h-8 border border-[#7a5b3f] bg-[#ede0c7] flex items-center justify-center text-[9px] font-pen font-bold text-[#453020]">
                오빠 브이
              </div>
              <div className="w-full h-8 border border-[#7a5b3f] bg-[#ede0c7] flex items-center justify-center text-[9px] font-pen font-bold text-[#453020]">
                셋이 함께
              </div>
              <span className="text-[7px] text-center font-garamond text-[#836347]">2026.10.02</span>
            </div>
            <span className="block text-center mt-1 text-[10px] font-pen font-bold text-[#5c4028] bg-[#fffaf0] border border-[#a2825e] rounded px-1 shadow-2xs">
              즉석 네컷
            </span>
          </div>
        )}

        {/* -------------------- LOUPE (MAGNIFYING GLASS) EFFECT -------------------- */}
        {loupeActive && (
          <div
            className="absolute pointer-events-none rounded-full border-4 border-[#b6894d] shadow-2xl overflow-hidden z-50"
            style={{
              width: '160px',
              height: '160px',
              left: `${mousePos.x}%`,
              top: `${mousePos.y}%`,
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 0 2px #48311b, 0 10px 25px rgba(0,0,0,0.4)',
              background: '#fcf8ec',
            }}
          >
            {/* Magnified view using scale */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${DIARY_IMAGES.foodSketch})`,
                backgroundSize: '400%',
                backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                filter: 'contrast(1.15) sepia(0.2)',
              }}
            />
            {/* Brass lens glare highlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-1 right-1 text-[9px] font-garamond bg-black/60 text-amber-200 px-1 rounded">
              2.5× LOUPE
            </div>
          </div>
        )}
      </div>

      {/* Guide Bar beneath Canvas */}
      <div className="px-3 py-1.5 bg-[#f2e6cf] border-t border-[#bfa686] flex items-center justify-between text-[11px] font-batang text-[#694e36]">
        <div className="flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-[#8f3c1d]" />
          <span>각 음식과 인물, 101 타워를 클릭하면 앤틱 고서 설명과 추억을 감상할 수 있습니다.</span>
        </div>
        <span className="font-garamond italic text-[12px] text-[#8c6747]">Original Pencil Sketch to Vintage Lithograph</span>
      </div>
    </div>
  );
};
