import React from 'react';

interface BarcodeGeneratorProps {
  code: string;
  width?: number;
  height?: number;
  showText?: boolean;
}

export const BarcodeGenerator: React.FC<BarcodeGeneratorProps> = ({
  code = 'OMR-YEMEN-2026-9081',
  width = 180,
  height = 45,
  showText = true
}) => {
  // Vector SVG Code128 bar pattern renderer
  const generateBars = (str: string) => {
    const bars: { x: number; w: number; isBlack: boolean }[] = [];
    let currentX = 0;
    
    // Start code pattern
    bars.push({ x: currentX, w: 3, isBlack: true }); currentX += 3;
    bars.push({ x: currentX, w: 2, isBlack: false }); currentX += 2;

    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      const w1 = (charCode % 3) + 1;
      const w2 = ((charCode * 2) % 3) + 1;
      const w3 = ((charCode * 3) % 3) + 1;

      bars.push({ x: currentX, w: w1, isBlack: true }); currentX += w1;
      bars.push({ x: currentX, w: 1, isBlack: false }); currentX += 1;
      bars.push({ x: currentX, w: w2, isBlack: true }); currentX += w2;
      bars.push({ x: currentX, w: 1, isBlack: false }); currentX += 1;
      bars.push({ x: currentX, w: w3, isBlack: true }); currentX += w3;
      bars.push({ x: currentX, w: 2, isBlack: false }); currentX += 2;
    }

    // Stop pattern
    bars.push({ x: currentX, w: 4, isBlack: true }); currentX += 4;
    
    return { bars, totalWidth: currentX };
  };

  const { bars, totalWidth } = generateBars(code);
  const barHeight = showText ? height - 14 : height;

  return (
    <div className="flex flex-col items-center justify-center bg-white p-1 rounded border border-slate-200">
      <svg width={width} height={height} viewBox={`0 0 ${totalWidth} ${height}`} preserveAspectRatio="none">
        <rect x="0" y="0" width={totalWidth} height={height} fill="#ffffff" />
        {bars.map((bar, idx) =>
          bar.isBlack ? (
            <rect
              key={idx}
              x={bar.x}
              y={0}
              width={bar.w}
              height={barHeight}
              fill="#0f172a"
            />
          ) : null
        )}
      </svg>
      {showText && (
        <span className="text-[10px] font-extrabold tracking-widest text-slate-800 mt-0.5">
          {code}
        </span>
      )}
    </div>
  );
};
