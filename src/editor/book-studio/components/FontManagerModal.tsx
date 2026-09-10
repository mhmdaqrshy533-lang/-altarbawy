import React from 'react';
import { useBookStudioStore } from '../store/useBookStudioStore';
import { FontPickerModal, TypographyStyle } from '../../../components/FontPickerModal';

interface FontManagerModalProps {
  onClose: () => void;
}

export const FontManagerModal: React.FC<FontManagerModalProps> = ({ onClose }) => {
  const { currentProject, updateFontPairing } = useBookStudioStore();

  if (!currentProject) return null;

  const handleApplyStyle = (style: TypographyStyle) => {
    if (style.fontFamily) {
      updateFontPairing({
        id: `custom_${Date.now()}`,
        name: style.fontFamily.split(',')[0].replace(/['"]/g, ''),
        headingFont: style.fontFamily,
        bodyFont: style.fontFamily,
        captionFont: style.fontFamily
      });
    }
  };

  return (
    <FontPickerModal
      isOpen={true}
      onClose={onClose}
      title="مكتبة ومدير الخطوط لـ محرر الكتب والملازم"
      documentType="book"
      currentStyle={{
        fontFamily: currentProject.fontPairing.headingFont
      }}
      onApplyStyle={handleApplyStyle}
    />
  );
};
