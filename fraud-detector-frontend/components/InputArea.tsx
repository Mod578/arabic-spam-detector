
import React from 'react';
import { 
  PiCircleNotch,
  PiMagicWand,
} from 'react-icons/pi';

interface InputAreaProps {
  textValue: string;
  onTextChange: (value: string) => void;
  onAnalyze: () => void;
  isLoading: boolean; 
}

const placeholderText = "أدخل النص أو الرابط أو البريد الإلكتروني هنا للتحليل...";

export const InputArea: React.FC<InputAreaProps> = ({ 
  textValue, 
  onTextChange, 
  onAnalyze, 
  isLoading,
}) => {

  const isAnalyzeDisabled = isLoading || !textValue.trim();

  return (
    <div className="space-y-4 mb-6">
      <textarea
        value={textValue}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder={placeholderText}
        rows={6} 
        className="w-full p-3 border border-border-color 
                   bg-card-bg text-main-text placeholder-secondary-text/70
                   focus:ring-2 focus:ring-accent focus:border-accent
                   rounded-lg 
                   disabled:opacity-60 disabled:cursor-not-allowed
                   text-base resize-none shadow-md transition-colors duration-300"
        disabled={isLoading}
        dir="rtl" 
        aria-label="منطقة إدخال النص للتحليل"
      />

      <button
        onClick={onAnalyze}
        disabled={isAnalyzeDisabled}
        className={`w-full bg-accent hover:bg-accent-hover active:bg-accent
                   text-accent-content 
                   font-semibold py-3.5 px-6 rounded-lg shadow-md
                   transition-all duration-200 ease-in-out 
                   focus:outline-none focus-visible-ring
                   disabled:bg-border-color disabled:text-secondary-text
                   disabled:cursor-not-allowed disabled:shadow-none
                   flex items-center justify-center text-md group
                   ${isLoading ? 'opacity-80 cursor-wait' : 'btn-accent-glow'}`}
      >
        {isLoading ? ( 
          <>
            <PiCircleNotch className="animate-spin h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" />
            جاري التحليل...
          </>
        ) : (
          <>
            <PiMagicWand className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" />
            تحليل النص
          </>
        )}
      </button>
    </div>
  );
};
