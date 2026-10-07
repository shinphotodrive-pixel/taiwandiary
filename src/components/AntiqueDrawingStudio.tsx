import React, { useRef, useState, useEffect } from 'react';
import { vintageAudio } from '../utils/audio';
import { VintagePostageStamp } from './VintagePostageStamp';
import {
  PenTool,
  Eraser,
  RotateCcw,
  Download,
  Stamp,
  Check,
} from 'lucide-react';

export const AntiqueDrawingStudio: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [inkColor, setInkColor] = useState<string>('#3d2b1f'); // Antique Sepia
  const [brushSize, setBrushSize] = useState<number>(2.5);
  const [tool, setTool] = useState<'pen' | 'eraser' | 'stamp'>('pen');
  const [selectedStamp, setSelectedStamp] = useState<string>('wax-rain');
  const [saveFeedback, setSaveFeedback] = useState(false);

  const colors = [
    { name: '앤틱 세피아', hex: '#3d2b1f' },
    { name: '먹빛 흑연', hex: '#1c1815' },
    { name: '프러시안 블루', hex: '#1b3b5a' },
    { name: '주홍 인주', hex: '#8c2d1b' },
    { name: '올리브 녹청', hex: '#314e35' },
    { name: '황동 금분', hex: '#8b6938' },
  ];

  const stamps = [
    { id: 'wax-rain', name: '우천 인장', text: '雨 10.02' },
    { id: 'stamp-101', name: '101 타워', text: 'TAIPEI 101' },
    { id: 'stamp-food', name: '미식 인장', text: '臺灣美食' },
    { id: 'stamp-best', name: '최고! 인주', text: '最高!' },
  ];

  // Initialize canvas with parchment tint
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 600;

    // Fill with warm parchment tone
    ctx.fillStyle = '#faf4e4';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw delicate antique margin guidelines
    ctx.strokeStyle = '#dfcca9';
    ctx.lineWidth = 1;
    ctx.strokeRect(16, 16, canvas.width - 32, canvas.height - 32);
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Faint grid lines for drawing guidance
    ctx.strokeStyle = 'rgba(210, 190, 160, 0.25)';
    ctx.lineWidth = 0.5;
    for (let x = 50; x < canvas.width - 40; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 30);
      ctx.lineTo(x, canvas.height - 30);
      ctx.stroke();
    }
    for (let y = 50; y < canvas.height - 40; y += 50) {
      ctx.beginPath();
      ctx.moveTo(30, y);
      ctx.lineTo(canvas.width - 30, y);
      ctx.stroke();
    }

    // Top Header: Date & Weather Placeholder
    ctx.font = 'bold 16px "Gowun Batang", serif';
    ctx.fillStyle = '#7a5a3c';
    ctx.fillText('10월 2일 금요일  [ 날씨: 비 🌧️ ]', 35, 48);

    // Bottom Manuscript Grid Guideline
    ctx.strokeStyle = '#c87964';
    ctx.lineWidth = 1;
    const gridStartY = canvas.height - 110;
    const cellSize = 36;
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 10; c++) {
        const cx = 35 + c * (cellSize + 2);
        const cy = gridStartY + r * (cellSize + 2);
        ctx.strokeRect(cx, cy, cellSize, cellSize);
      }
    }
    ctx.font = '12px "Gowun Batang", serif';
    ctx.fillStyle = '#a65b32';
    ctx.fillText('원고지 칸 (여기에 글을 적어보세요)', 35, gridStartY - 8);
  }, []);

  const getCanvasCoords = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const handleStart = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoords(clientX, clientY);

    if (tool === 'stamp') {
      applyStamp(x, y);
      return;
    }

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);

    if (tool === 'eraser') {
      ctx.strokeStyle = '#faf4e4';
      ctx.lineWidth = brushSize * 4;
    } else {
      ctx.strokeStyle = inkColor;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }

    vintageAudio.playQuillScratch();
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoords(clientX, clientY);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleStop = () => {
    setIsDrawing(false);
  };

  const applyStamp = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const stampObj = stamps.find((s) => s.id === selectedStamp);
    if (!stampObj) return;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((Math.random() - 0.5) * 0.15);

    ctx.strokeStyle = '#8c2d1b';
    ctx.fillStyle = 'rgba(235, 90, 60, 0.08)';
    ctx.lineWidth = 2.5;

    ctx.beginPath();
    ctx.arc(0, 0, 34, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, 0, 30, 0, Math.PI * 2);
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = 'bold 12px "Cinzel", "Gowun Batang", serif';
    ctx.fillStyle = '#8c2d1b';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(stampObj.text, 0, 0);

    ctx.restore();
    vintageAudio.playMusicBoxNote(0);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#faf4e4';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    vintageAudio.playPageTurn();
  };

  const exportCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `antique_taipei_diary_1002.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    setSaveFeedback(true);
    vintageAudio.playMusicBoxNote(4);
    setTimeout(() => setSaveFeedback(false), 2500);
  };

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-6 pb-20 sm:pb-6">
      {/* Intro Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 border-b border-[#8c704f]/40 pb-3">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-garamond uppercase tracking-widest text-[#9e4624]">
            <PenTool className="w-3.5 h-3.5" />
            <span>Mobile Drawing Atelier</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-batang font-bold text-[#f2e2cb] mt-0.5">
            앤틱 그림일기 공방
          </h2>
          <p className="text-xs sm:text-sm font-batang text-[#c7af96] mt-0.5 leading-relaxed">
            스마트폰 화면에서 손가락이나 펜으로 직접 그리고 앤틱 인장을 찍어보세요.
          </p>
        </div>

        {/* Action Controls & Stamp */}
        <div className="flex items-center gap-2">
          <button
            onClick={clearCanvas}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xs bg-[#2e2319] hover:bg-[#3d3023] text-[#dbbe9e] text-xs font-batang border border-[#5a432f] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>지우기</span>
          </button>
          <button
            onClick={exportCanvas}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xs bg-[#5c3e25] hover:bg-[#432b17] active:scale-95 text-[#fbf6ec] text-xs font-batang font-bold shadow-sm transition-all cursor-pointer"
          >
            {saveFeedback ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>저장 완료!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>그림 저장</span>
              </>
            )}
          </button>
          <VintagePostageStamp size="sm" variant="gold" postmarkDate="10.02" denomination="1 SEN" label="圖畵 郵便" rotate="rotate-[3deg]" className="hidden sm:inline-block" />
        </div>
      </div>

      {/* Atelier Tools Ribbon (Mobile Thumb Friendly) */}
      <div className="bg-[#241a13] border border-[#523b28] p-2.5 sm:p-3 rounded-xs shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs font-batang text-[#efe2cd]">
        {/* Tool Selector */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              setTool('pen');
              vintageAudio.playQuillScratch();
            }}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xs transition-colors cursor-pointer min-h-[36px] ${
              tool === 'pen'
                ? 'bg-[#5c3e25] text-[#fbf6ea] shadow-xs'
                : 'bg-[#33261a] hover:bg-[#423223]'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>만년필</span>
          </button>
          <button
            onClick={() => {
              setTool('stamp');
              vintageAudio.playMusicBoxNote(1);
            }}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xs transition-colors cursor-pointer min-h-[36px] ${
              tool === 'stamp'
                ? 'bg-[#5c3e25] text-[#fbf6ea] shadow-xs'
                : 'bg-[#33261a] hover:bg-[#423223]'
            }`}
          >
            <Stamp className="w-3.5 h-3.5" />
            <span>인장</span>
          </button>
          <button
            onClick={() => {
              setTool('eraser');
              vintageAudio.playPageTurn();
            }}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xs transition-colors cursor-pointer min-h-[36px] ${
              tool === 'eraser'
                ? 'bg-[#5c3e25] text-[#fbf6ea] shadow-xs'
                : 'bg-[#33261a] hover:bg-[#423223]'
            }`}
          >
            <Eraser className="w-3.5 h-3.5" />
            <span>지우개</span>
          </button>
        </div>

        {/* Color Palette / Stamp Selector */}
        {tool === 'pen' ? (
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            {colors.map((c) => (
              <button
                key={c.hex}
                onClick={() => {
                  setInkColor(c.hex);
                  vintageAudio.playQuillScratch();
                }}
                className={`min-w-[28px] min-h-[28px] rounded-full border-2 transition-transform cursor-pointer ${
                  inkColor === c.hex
                    ? 'scale-115 border-white shadow-md ring-2 ring-[#a88258]'
                    : 'border-white/50 hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        ) : tool === 'stamp' ? (
          <div className="flex items-center gap-1 overflow-x-auto py-0.5">
            {stamps.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedStamp(s.id);
                  vintageAudio.playClockTick();
                }}
                className={`px-2 py-1 text-[11px] rounded-xs border transition-colors cursor-pointer whitespace-nowrap min-h-[34px] ${
                  selectedStamp === s.id
                    ? 'bg-[#8c2d1b] border-[#5e190b] text-[#fbf6ea] font-bold'
                    : 'bg-[#33261a] border-[#523b28] text-[#d4bd9f]'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        ) : null}

        {/* Brush Size */}
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="text-[11px] text-[#baa187]">굵기</span>
          <input
            type="range"
            min="1"
            max="8"
            step="0.5"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-16 sm:w-20 accent-[#dfa45c] cursor-pointer"
          />
        </div>
      </div>

      {/* Canvas Frame Container (Touch Drawing Enabled) */}
      <div className="relative w-full overflow-hidden border-2 sm:border-4 border-[#6e5033] rounded-xs shadow-2xl bg-[#faf4e4] p-0.5 touch-none">
        <canvas
          ref={canvasRef}
          onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
          onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
          onMouseUp={handleStop}
          onMouseLeave={handleStop}
          onTouchStart={(e) => {
            const touch = e.touches[0];
            if (touch) handleStart(touch.clientX, touch.clientY);
          }}
          onTouchMove={(e) => {
            const touch = e.touches[0];
            if (touch) handleMove(touch.clientX, touch.clientY);
          }}
          onTouchEnd={handleStop}
          className="w-full max-w-full h-auto cursor-crosshair select-none block"
          style={{
            touchAction: 'none',
            boxShadow: 'inset 0 0 30px rgba(110, 80, 50, 0.12)',
          }}
        />
      </div>
    </div>
  );
};
