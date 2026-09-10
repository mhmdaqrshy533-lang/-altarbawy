import React from 'react';
import OMRStudio from '../editor-omr/OMRStudio';

export default function BubbleSheets({ onBack }: { onBack: () => void }) {
  return <OMRStudio onBack={onBack} />;
}
