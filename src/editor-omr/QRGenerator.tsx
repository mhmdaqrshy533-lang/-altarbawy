import React from 'react';

interface QRGeneratorProps {
  value: string;
  size?: number;
  fgColor?: string;
  bgColor?: string;
}

export const QRGenerator: React.FC<QRGeneratorProps> = ({
  value = 'RAQIM-OMR-2026-VAL',
  size = 80,
  fgColor = '#0f172a',
  bgColor = '#ffffff'
}) => {
  // Simple deterministic 2D vector QR matrix simulation for high precision printing
  const generateMatrix = (str: string) => {
    const matrixSize = 21; // 21x21 QR Version 1
    const matrix: boolean[][] = Array.from({ length: matrixSize }, () => Array(matrixSize).fill(false));

    // Helper to draw alignment finder patterns
    const drawFinder = (top: number, left: number) => {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          if (
            r === 0 || r === 6 || c === 0 || c === 6 ||
            (r >= 2 && r <= 4 && c >= 2 && c <= 4)
          ) {
            matrix[top + r][left + c] = true;
          }
        }
      }
    };

    // Draw 3 Finders
    drawFinder(0, 0);
    drawFinder(0, 14);
    drawFinder(14, 0);

    // Hash string into data modules
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }

    // Fill data grid
    for (let r = 0; r < matrixSize; r++) {
      for (let c = 0; c < matrixSize; c++) {
        // Skip finder areas
        if (
          (r < 8 && c < 8) ||
          (r < 8 && c >= 13) ||
          (r >= 13 && c < 8)
        ) {
          continue;
        }

        const seed = (r * 31 + c * 17 + Math.abs(hash)) % 100;
        matrix[r][c] = seed > 45;
      }
    }

    return matrix;
  };

  const matrix = generateMatrix(value);
  const matrixSize = matrix.length;
  const cellSize = size / matrixSize;

  return (
    <div className="flex flex-col items-center justify-center inline-block" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <rect x="0" y="0" width={size} height={size} fill={bgColor} />
        {matrix.map((row, r) =>
          row.map((cell, c) =>
            cell ? (
              <rect
                key={`${r}-${c}`}
                x={c * cellSize}
                y={r * cellSize}
                width={cellSize + 0.2}
                height={cellSize + 0.2}
                fill={fgColor}
              />
            ) : null
          )
        )}
      </svg>
    </div>
  );
};
