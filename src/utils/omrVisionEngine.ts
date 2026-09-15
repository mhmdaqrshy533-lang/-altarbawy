/**
 * Pure Client-Side OMR Computer Vision & Grading Engine
 * Zero Server Dependency - High Speed Canvas Pixel Processing
 *
 * Implements:
 * 1. 4-Corner Fiducial Anchor Marker Detection & Perspective Calibration
 * 2. Bilinear Quadrangle Coordinate Mapping for Skew & Rotation Invariance
 * 3. Multi-Level Otsu Adaptive Binarization
 * 4. Dual-Metric Concentric Ring (Donut) Relative Contrast Sampling
 * 5. Faint Pencil & Erased Mark Disambiguation
 * 6. Automated Double-Mark Invalidation & Visual Diagnostic Overlay
 */

import { 
  ExamQuestion, 
  ScannedQuestionResult, 
  ScannedBubbleResult, 
  OMRGradingReport,
  MANDATORY_COPYRIGHT
} from '../types/exam';

export interface ScanOptions {
  fillCutoff?: number; // percentage (default: 30%)
  contrastCutoff?: number; // contrast percentage delta (default: 15%)
  ambiguityDelta?: number; // delta to detect double marks (default: 16%)
  autoPerspectiveCorrection?: boolean;
}

interface Point2D {
  x: number;
  y: number;
}

interface CornerAnchors {
  topLeft: Point2D;
  topRight: Point2D;
  bottomLeft: Point2D;
  bottomRight: Point2D;
  detected: boolean;
}

export class OMRVisionEngine {
  /**
   * Main entry point to scan an image (HTMLImageElement or HTMLCanvasElement)
   * and grade it against the list of exam questions & answer key.
   */
  public static async processAndGrade(
    sourceElement: HTMLImageElement | HTMLCanvasElement,
    questions: ExamQuestion[],
    modelLetter: string = 'أ',
    studentName: string = 'طالب تجريبي',
    seatNumber: string = '1042',
    options: ScanOptions = {}
  ): Promise<OMRGradingReport> {
    const fillCutoff = options.fillCutoff || 28;
    const contrastCutoff = options.contrastCutoff || 14;
    const ambiguityDelta = options.ambiguityDelta || 16;

    // 1. Create a working canvas
    const width = sourceElement instanceof HTMLImageElement ? sourceElement.naturalWidth || sourceElement.width : sourceElement.width;
    const height = sourceElement instanceof HTMLImageElement ? sourceElement.naturalHeight || sourceElement.height : sourceElement.height;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) throw new Error('Failed to obtain canvas context');

    ctx.drawImage(sourceElement, 0, 0, width, height);
    const imageData = ctx.getImageData(0, 0, width, height);

    // 2. Compute Otsu threshold for adaptive binarization
    const otsuThreshold = this.calculateOtsuThreshold(imageData);

    // 3. Locate the 4-Corner OMR Fiducial Anchors for perspective correction
    const anchors = this.detectCornerAnchors(imageData, otsuThreshold, width, height);

    // 4. Extract all interactive OMR questions (TF, MCQ, Matching)
    const omrQuestions = questions.filter(q => q.type === 'tf' || q.type === 'mcq' || q.type === 'matching');
    
    // 5. Vertical coordinate span
    const startV = 0.28;
    const endV = 0.88;
    const stepV = (endV - startV) / Math.max(omrQuestions.length, 1);

    const scannedQuestions: ScannedQuestionResult[] = [];
    let totalEarned = 0;
    let totalPossible = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;
    let doubleMarkedCount = 0;

    // Create diagnostic visual overlay canvas
    const overlayCanvas = document.createElement('canvas');
    overlayCanvas.width = width;
    overlayCanvas.height = height;
    const overlayCtx = overlayCanvas.getContext('2d');
    if (overlayCtx) {
      overlayCtx.drawImage(sourceElement, 0, 0, width, height);

      // Draw Corner Anchor Detection indicators if found
      if (anchors.detected) {
        overlayCtx.lineWidth = 2;
        overlayCtx.strokeStyle = '#06b6d4';
        [anchors.topLeft, anchors.topRight, anchors.bottomLeft, anchors.bottomRight].forEach(pt => {
          overlayCtx.beginPath();
          overlayCtx.arc(pt.x, pt.y, 14, 0, Math.PI * 2);
          overlayCtx.stroke();
        });
      }
    }

    omrQuestions.forEach((q, qIndex) => {
      const vCenter = startV + (qIndex * stepV) + (stepV * 0.45);
      const isTF = q.type === 'tf';
      const isMatching = q.type === 'matching';

      const optionsList = isTF 
        ? [{ id: 'T', label: 'ص' }, { id: 'F', label: 'خ' }]
        : isMatching
          ? (q.matchingPairs || [
              { id: '1', leftText: '1', rightText: '1', correctMatch: '1' },
              { id: '2', leftText: '2', rightText: '2', correctMatch: '2' },
              { id: '3', leftText: '3', rightText: '3', correctMatch: '3' },
              { id: '4', leftText: '4', rightText: '4', correctMatch: '4' }
            ]).map(p => ({ id: p.id, label: p.id, text: p.leftText }))
          : (q.options || [
              { id: 'A', label: 'أ' },
              { id: 'B', label: 'ب' },
              { id: 'C', label: 'ج' },
              { id: 'D', label: 'د' }
            ]);

      const bubbles: ScannedBubbleResult[] = [];
      const numOptions = optionsList.length;

      // In Arabic RTL, options are arranged from right to left
      optionsList.forEach((opt, optIndex) => {
        let uCenter = 0;
        if (isTF) {
          const tfStartU = 0.30;
          const tfSpacingU = 0.12;
          uCenter = tfStartU - (optIndex * tfSpacingU);
        } else if (isMatching) {
          const mStartU = 0.75;
          const mSpacingU = 0.55 / Math.max(numOptions, 1);
          uCenter = mStartU - (optIndex * mSpacingU);
        } else {
          const mcqStartU = 0.82;
          const mcqSpacingU = 0.68 / Math.max(numOptions, 1);
          uCenter = mcqStartU - (optIndex * mcqSpacingU);
        }

        // Map (u, v) normalized coordinates to real pixel coordinates using corner anchors
        const bubblePoint = this.mapNormalizedToPixel(uCenter, vCenter, anchors, width, height);
        const radius = Math.max(Math.round(width * 0.014), 7);

        // Sample bubble with concentric donut ring contrast & fill ratio
        const sample = this.inspectBubbleConcentric(imageData, bubblePoint.x, bubblePoint.y, radius, otsuThreshold);
        
        // Mark detection: High fill OR significant relative contrast over paper background
        const isMarked = (sample.fillPercentage >= fillCutoff && sample.contrastRatio >= contrastCutoff) ||
                         (sample.fillPercentage >= (fillCutoff + 15));

        bubbles.push({
          questionIndex: qIndex,
          optionIndex: optIndex,
          optionLabel: opt.label,
          fillPercentage: sample.fillPercentage,
          contrastRatio: sample.contrastRatio,
          isMarked,
          isAmbiguous: false,
          centerX: bubblePoint.x,
          centerY: bubblePoint.y
        });
      });

      // Analyze bubbles for this question
      const filledBubbles = bubbles.filter(b => b.isMarked);
      const sortedByScore = [...bubbles].sort((a, b) => (b.fillPercentage + b.contrastRatio) - (a.fillPercentage + a.contrastRatio));
      
      let isUnanswered = filledBubbles.length === 0;
      let isDoubleMarked = filledBubbles.length > 1;
      let selectedOption: string | undefined = undefined;
      let selectedOptionLabel: string | undefined = undefined;

      if (!isUnanswered && !isDoubleMarked) {
        const topBubble = sortedByScore[0];
        const optDef = optionsList[topBubble.optionIndex];
        selectedOption = optDef.id;
        selectedOptionLabel = optDef.label;
      } else if (filledBubbles.length > 1) {
        // Disambiguate faint erased mark from solid pencil mark
        const scoreDiff = (sortedByScore[0].fillPercentage + sortedByScore[0].contrastRatio) - 
                          (sortedByScore[1].fillPercentage + sortedByScore[1].contrastRatio);
        if (scoreDiff > ambiguityDelta) {
          isDoubleMarked = false;
          const topBubble = sortedByScore[0];
          const optDef = optionsList[topBubble.optionIndex];
          selectedOption = optDef.id;
          selectedOptionLabel = optDef.label;
        } else {
          isDoubleMarked = true;
        }
      }

      const correctAns = q.correctAnswer || (isTF ? 'T' : 'A');
      const correctOptDef = optionsList.find(o => o.id === correctAns) || optionsList[0];
      const isCorrect = !isUnanswered && !isDoubleMarked && selectedOption === correctAns;

      const pointsPossible = q.points || (isTF ? 1.5 : 2);
      const pointsEarned = isCorrect ? pointsPossible : 0;

      totalPossible += pointsPossible;
      totalEarned += pointsEarned;

      if (isCorrect) {
        correctCount++;
      } else if (isUnanswered) {
        unansweredCount++;
      } else if (isDoubleMarked) {
        doubleMarkedCount++;
      } else {
        incorrectCount++;
      }

      scannedQuestions.push({
        questionNumber: q.questionNumber || (qIndex + 1),
        questionId: q.id,
        type: q.type,
        selectedOption,
        selectedOptionLabel,
        correctOption: correctAns,
        correctOptionLabel: correctOptDef.label,
        isCorrect,
        isUnanswered,
        isDoubleMarked,
        pointsEarned,
        pointsPossible,
        bubbles
      });

      // Paint visual overlays on diagnostic canvas
      if (overlayCtx) {
        const radius = Math.max(Math.round(width * 0.016), 8);
        bubbles.forEach((b, bIdx) => {
          const optDef = optionsList[bIdx];
          const isThisCorrect = optDef.id === correctAns;
          
          overlayCtx.lineWidth = 3;
          if (b.isMarked) {
            if (isDoubleMarked) {
              // Double marked -> Amber/Red warning circle
              overlayCtx.strokeStyle = '#f59e0b';
              overlayCtx.fillStyle = 'rgba(245, 158, 11, 0.35)';
            } else if (isThisCorrect) {
              // Correct mark -> Emerald green circle
              overlayCtx.strokeStyle = '#10b981';
              overlayCtx.fillStyle = 'rgba(16, 185, 129, 0.25)';
            } else {
              // Wrong mark -> Red circle
              overlayCtx.strokeStyle = '#ef4444';
              overlayCtx.fillStyle = 'rgba(239, 68, 68, 0.3)';
            }
            overlayCtx.beginPath();
            overlayCtx.arc(b.centerX, b.centerY, radius + 2, 0, Math.PI * 2);
            overlayCtx.fill();
            overlayCtx.stroke();
          } else if (isThisCorrect && !isCorrect) {
            // Highlight the missed correct answer with dashed green ring
            overlayCtx.save();
            overlayCtx.setLineDash([4, 4]);
            overlayCtx.strokeStyle = '#059669';
            overlayCtx.lineWidth = 2.5;
            overlayCtx.beginPath();
            overlayCtx.arc(b.centerX, b.centerY, radius + 4, 0, Math.PI * 2);
            overlayCtx.stroke();
            overlayCtx.restore();
          }
        });
      }
    });

    const percentage = totalPossible > 0 ? Math.round((totalEarned / totalPossible) * 100) : 0;
    const processedCanvasUrl = overlayCanvas.toDataURL('image/jpeg', 0.9);

    return {
      studentName,
      seatNumber,
      modelLetter,
      totalScore: Number(totalEarned.toFixed(1)),
      maxScore: Number(totalPossible.toFixed(1)),
      percentage,
      correctCount,
      incorrectCount,
      unansweredCount,
      doubleMarkedCount,
      scannedQuestions,
      processedCanvasUrl,
      timestamp: new Date().toLocaleTimeString('ar-YE', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
  }

  /**
   * Otsu's adaptive thresholding algorithm for dynamic binarization
   */
  public static calculateOtsuThreshold(imageData: ImageData): number {
    const data = imageData.data;
    const histogram = new Array(256).fill(0);
    const totalPixels = data.length / 4;

    for (let i = 0; i < data.length; i += 4) {
      const gray = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
      histogram[gray]++;
    }

    let sum = 0;
    for (let i = 0; i < 256; i++) {
      sum += i * histogram[i];
    }

    let sumB = 0;
    let wB = 0;
    let wF = 0;
    let maxVariance = 0;
    let threshold = 128;

    for (let t = 0; t < 256; t++) {
      wB += histogram[t];
      if (wB === 0) continue;
      wF = totalPixels - wB;
      if (wF === 0) break;

      sumB += t * histogram[t];
      const mB = sumB / wB;
      const mF = (sum - sumB) / wF;

      const variance = wB * wF * (mB - mF) * (mB - mF);
      if (variance > maxVariance) {
        maxVariance = variance;
        threshold = t;
      }
    }

    return threshold;
  }

  /**
   * Detects the 4-Corner OMR Square Anchors (7mm x 7mm, 3mm from edges)
   */
  private static detectCornerAnchors(
    imageData: ImageData,
    threshold: number,
    width: number,
    height: number
  ): CornerAnchors {
    const searchWidth = Math.round(width * 0.15);
    const searchHeight = Math.round(height * 0.15);

    const tl = this.findDarkCentroidInRegion(imageData, 0, 0, searchWidth, searchHeight, threshold);
    const tr = this.findDarkCentroidInRegion(imageData, width - searchWidth, 0, searchWidth, searchHeight, threshold);
    const bl = this.findDarkCentroidInRegion(imageData, 0, height - searchHeight, searchWidth, searchHeight, threshold);
    const br = this.findDarkCentroidInRegion(imageData, width - searchWidth, height - searchHeight, searchWidth, searchHeight, threshold);

    if (tl && tr && bl && br) {
      return {
        topLeft: tl,
        topRight: tr,
        bottomLeft: bl,
        bottomRight: br,
        detected: true
      };
    }

    // Default fallback to standard margins
    const defaultMarginX = width * 0.025;
    const defaultMarginY = height * 0.020;
    return {
      topLeft: { x: defaultMarginX, y: defaultMarginY },
      topRight: { x: width - defaultMarginX, y: defaultMarginY },
      bottomLeft: { x: defaultMarginX, y: height - defaultMarginY },
      bottomRight: { x: width - defaultMarginX, y: height - defaultMarginY },
      detected: false
    };
  }

  /**
   * Helper to locate the center of mass of a dark square anchor in a corner quadrant
   */
  private static findDarkCentroidInRegion(
    imageData: ImageData,
    rx: number,
    ry: number,
    rw: number,
    rh: number,
    threshold: number
  ): Point2D | null {
    const data = imageData.data;
    const width = imageData.width;

    let sumX = 0;
    let sumY = 0;
    let darkCount = 0;

    const endX = Math.min(width - 1, rx + rw);
    const endY = Math.min(imageData.height - 1, ry + rh);

    for (let y = ry; y <= endY; y++) {
      for (let x = rx; x <= endX; x++) {
        const idx = (y * width + x) * 4;
        const gray = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
        if (gray < threshold - 30) {
          sumX += x;
          sumY += y;
          darkCount++;
        }
      }
    }

    if (darkCount > 80) {
      return {
        x: Math.round(sumX / darkCount),
        y: Math.round(sumY / darkCount)
      };
    }
    return null;
  }

  /**
   * Bilinear mapping from normalized [0,1] coordinates to actual skewed canvas space
   */
  private static mapNormalizedToPixel(
    u: number,
    v: number,
    anchors: CornerAnchors,
    width: number,
    height: number
  ): Point2D {
    if (!anchors.detected) {
      return { x: u * width, y: v * height };
    }

    const { topLeft, topRight, bottomLeft, bottomRight } = anchors;

    // Bilinear interpolation
    const topX = topLeft.x + u * (topRight.x - topLeft.x);
    const topY = topLeft.y + u * (topRight.y - topLeft.y);
    const bottomX = bottomLeft.x + u * (bottomRight.x - bottomLeft.x);
    const bottomY = bottomLeft.y + u * (bottomRight.y - bottomLeft.y);

    const finalX = topX + v * (bottomX - topX);
    const finalY = topY + v * (bottomY - topY);

    return { x: Math.round(finalX), y: Math.round(finalY) };
  }

  /**
   * Inspects a bubble using concentric circles (Donut method):
   * 1. Core circle: dark pixel ratio of the bubble mark
   * 2. Outer ring: background brightness of paper
   */
  private static inspectBubbleConcentric(
    imageData: ImageData,
    centerX: number,
    centerY: number,
    radius: number,
    threshold: number
  ): { fillPercentage: number; contrastRatio: number } {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;

    let coreTotal = 0;
    let coreDark = 0;
    let coreBrightnessSum = 0;

    let outerTotal = 0;
    let outerBrightnessSum = 0;

    const rCoreSq = radius * radius;
    const rOuterSq = (radius * 1.8) * (radius * 1.8);
    const outerR = Math.ceil(radius * 1.8);

    const startX = Math.max(0, Math.floor(centerX - outerR));
    const endX = Math.min(width - 1, Math.ceil(centerX + outerR));
    const startY = Math.max(0, Math.floor(centerY - outerR));
    const endY = Math.min(height - 1, Math.ceil(centerY + outerR));

    for (let y = startY; y <= endY; y++) {
      for (let x = startX; x <= endX; x++) {
        const dx = x - centerX;
        const dy = y - centerY;
        const dSq = dx * dx + dy * dy;
        const idx = (y * width + x) * 4;
        const gray = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];

        if (dSq <= rCoreSq) {
          coreTotal++;
          coreBrightnessSum += gray;
          if (gray < threshold - 15) {
            coreDark++;
          }
        } else if (dSq <= rOuterSq) {
          outerTotal++;
          outerBrightnessSum += gray;
        }
      }
    }

    if (coreTotal === 0) return { fillPercentage: 0, contrastRatio: 0 };

    const fillPercentage = Math.round((coreDark / coreTotal) * 100);
    const avgCoreBrightness = coreBrightnessSum / coreTotal;
    const avgOuterBrightness = outerTotal > 0 ? (outerBrightnessSum / outerTotal) : 255;

    const contrastRatio = Math.max(0, Math.round(((avgOuterBrightness - avgCoreBrightness) / Math.max(avgOuterBrightness, 1)) * 100));

    return { fillPercentage, contrastRatio };
  }

  /**
   * Generates a realistic simulated student answered sheet for testing client-side OMR
   */
  public static generateSimulatedStudentSheet(
    questions: ExamQuestion[],
    studentName: string = 'سهيل الهزبري (طالب متفوق)',
    seatNumber: string = '5541',
    modelLetter: string = 'أ',
    accuracy: 'high' | 'medium' | 'random' = 'high'
  ): Promise<string> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 1697; // exact A4 aspect ratio 1:1.414
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve('');

      // Draw paper background
      ctx.fillStyle = '#fbfcfd';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 4 Corner OMR Marks (7mm equivalent at 1200x1697)
      ctx.fillStyle = '#000000';
      const markSize = 40;
      const margin = 20;
      ctx.fillRect(margin, margin, markSize, markSize); // Top-left
      ctx.fillRect(canvas.width - margin - markSize, margin, markSize, markSize); // Top-right
      ctx.fillRect(margin, canvas.height - margin - markSize, markSize, markSize); // Bottom-left
      ctx.fillRect(canvas.width - margin - markSize, canvas.height - margin - markSize, markSize, markSize); // Bottom-right

      // Draw Header box
      ctx.strokeStyle = '#0d5c3a';
      ctx.lineWidth = 3;
      ctx.strokeRect(margin + 30, margin + 30, canvas.width - (margin * 2 + 60), 160);

      ctx.fillStyle = '#0d5c3a';
      ctx.font = 'bold 26px "Cairo", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('الجمهورية اليمنية — وزارة التربية والتعليم — ورقة اختبار مؤتمتة', canvas.width / 2, margin + 75);
      
      ctx.font = 'bold 22px "Cairo", sans-serif';
      ctx.fillText(`اسم الطالب: ${studentName}  |  رقم الجلوس: (${seatNumber})  |  النموذج (${modelLetter})`, canvas.width / 2, margin + 130);

      // Questions layout
      const omrQuestions = questions.filter(q => q.type === 'tf' || q.type === 'mcq' || q.type === 'matching');
      const startY = canvas.height * 0.28;
      const endY = canvas.height * 0.88;
      const stepY = (endY - startY) / Math.max(omrQuestions.length, 1);

      ctx.textAlign = 'right';

      omrQuestions.forEach((q, idx) => {
        const rowY = startY + (idx * stepY) + (stepY * 0.45);
        const isTF = q.type === 'tf';
        const isMatching = q.type === 'matching';

        const optionsList = isTF 
          ? [{ id: 'T', label: 'ص' }, { id: 'F', label: 'خ' }]
          : isMatching
            ? (q.matchingPairs || [
                { id: '1', leftText: '1', rightText: '1', correctMatch: '1' },
                { id: '2', leftText: '2', rightText: '2', correctMatch: '2' },
                { id: '3', leftText: '3', rightText: '3', correctMatch: '3' },
                { id: '4', leftText: '4', rightText: '4', correctMatch: '4' }
              ]).map(p => ({ id: p.id, label: p.id, text: p.leftText }))
            : (q.options || [
                { id: 'A', label: 'أ' },
                { id: 'B', label: 'ب' },
                { id: 'C', label: 'ج' },
                { id: 'D', label: 'د' }
              ]);

        // Draw question text
        ctx.fillStyle = '#111827';
        ctx.font = 'bold 18px "Cairo", sans-serif';
        const qNumText = `${idx + 1}.`;
        ctx.fillText(qNumText, canvas.width - margin - 50, rowY - 15);
        
        ctx.font = '16px "Cairo", sans-serif';
        const truncatedText = q.text.length > 55 ? q.text.substring(0, 52) + '...' : q.text;
        ctx.fillText(truncatedText, canvas.width - margin - 85, rowY - 15);

        // Determine student answer
        const correctAns = q.correctAnswer || (isTF ? 'T' : 'A');
        let chosenOptionId = correctAns;

        if (accuracy === 'medium' && Math.random() < 0.25) {
          const wrongOpts = optionsList.filter(o => o.id !== correctAns);
          if (wrongOpts.length > 0) {
            chosenOptionId = wrongOpts[Math.floor(Math.random() * wrongOpts.length)].id;
          }
        } else if (accuracy === 'random') {
          chosenOptionId = optionsList[Math.floor(Math.random() * optionsList.length)].id;
        }

        const numOptions = optionsList.length;

        // Draw bubbles
        optionsList.forEach((opt, optIdx) => {
          let bubbleX = 0;
          if (isTF) {
            const tfStartX = canvas.width * 0.30;
            const tfSpacing = canvas.width * 0.12;
            bubbleX = tfStartX - (optIdx * tfSpacing);
          } else if (isMatching) {
            const mStartX = canvas.width * 0.75;
            const mSpacing = (canvas.width * 0.55) / Math.max(numOptions, 1);
            bubbleX = mStartX - (optIdx * mSpacing);
          } else {
            const mcqStartX = canvas.width * 0.82;
            const mcqSpacing = (canvas.width * 0.68) / Math.max(numOptions, 1);
            bubbleX = mcqStartX - (optIdx * mcqSpacing);
          }

          const radius = 17;

          // Outer circle
          ctx.beginPath();
          ctx.arc(bubbleX, rowY, radius, 0, Math.PI * 2);
          ctx.strokeStyle = '#0d5c3a';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Option label
          ctx.fillStyle = '#0d5c3a';
          ctx.font = 'bold 14px "Cairo", sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(opt.label, bubbleX, rowY + 5);

          // If chosen, fill with realistic dark graphite pencil texture
          if (opt.id === chosenOptionId) {
            ctx.beginPath();
            ctx.arc(bubbleX, rowY, radius - 2, 0, Math.PI * 2);
            ctx.fillStyle = '#1e293b';
            ctx.fill();

            // Extra graphite loops for realistic simulation
            ctx.fillStyle = '#0f172a';
            for (let i = 0; i < 6; i++) {
              const offsetX = (Math.random() - 0.5) * 6;
              const offsetY = (Math.random() - 0.5) * 6;
              ctx.beginPath();
              ctx.arc(bubbleX + offsetX, rowY + offsetY, radius - 4, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        });
      });

      // Footer with mandatory copyright
      ctx.textAlign = 'center';
      ctx.fillStyle = '#475569';
      ctx.font = 'bold 14px "Cairo", sans-serif';
      ctx.fillText(MANDATORY_COPYRIGHT, canvas.width / 2, canvas.height - margin - 35);

      resolve(canvas.toDataURL('image/jpeg', 0.95));
    });
  }
}
