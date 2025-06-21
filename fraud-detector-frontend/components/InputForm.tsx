import React, { useState } from 'react';

interface InputFormProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
  initialText?: string;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading, initialText = '' }) => {
  const [text, setText] = useState<string>(initialText);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(text);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-beacon-surface shadow-card rounded-2xl p-8 sm:p-10 space-y-8" 
    >
      <div>
        <label htmlFor="textInput" className="block text-xl font-medium text-beacon-text-primary mb-4">
          ضع النص المراد تحليله هنا:
        </label>
        <textarea
          id="textInput"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className="w-full p-4 bg-beacon-surface-alt border border-beacon-border rounded-xl text-beacon-text-primary placeholder-beacon-text-secondary 
                     focus:ring-2 focus:ring-beacon-accent-primary focus:border-beacon-accent-primary 
                     transition-all duration-200 ease-in-out resize-y min-h-[180px] text-base shadow-sm leading-relaxed custom-scrollbar"
          placeholder="مثال: تحذير أمني! تم رصد نشاط غير معتاد على حسابك. يرجى تأكيد هويتك فوراً عبر الرابط: [رابط مشبوه]"
          disabled={isLoading}
          dir="rtl" 
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !text.trim()}
        className="w-full flex items-center justify-center py-3.5 px-6 text-lg font-semibold text-beacon-deep-bg rounded-lg shadow-md 
                   bg-beacon-accent-primary
                   hover:bg-opacity-90 active:bg-opacity-80
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-beacon-surface focus:ring-beacon-accent-primary
                   disabled:bg-beacon-surface-alt disabled:text-beacon-text-secondary/70 disabled:cursor-not-allowed disabled:shadow-none
                   transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin rtl:-mr-1 ltr:-ml-1 rtl:ml-3 ltr:mr-3 h-5 w-5 text-beacon-deep-bg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            جاري التحليل...
          </>
        ) : (
          'تحليل النص الآن'
        )}
      </button>
    </form>
  );
};