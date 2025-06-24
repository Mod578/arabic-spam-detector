
import React from 'react';
import type { AnalysisResult, RiskLevel } from '../types';
import { 
    PiInfo, 
    PiFileText, 
    PiMegaphoneSimple, 
    PiSealQuestion, 
    PiChatTeardropText 
} from 'react-icons/pi';
import { getRiskStylesDefinition, type RiskStylesDefinition as SimpleRiskStyles } from './RiskStyles';

interface ResultSectionProps {
  title: string;
  content?: string;
  icon?: React.ElementType;
  titleColorClass?: string;
  isFirstSection?: boolean;
  sanitizeFn: (html: string) => string;
}

interface ResultCardProps {
  result: AnalysisResult;
  originalInput: string;
  onShowDisclaimerModal: () => void;
  sanitizeFn: (html: string) => string;
}

const ResultSection: React.FC<ResultSectionProps> = ({ title, content, icon: Icon, titleColorClass = "text-accent", isFirstSection = false, sanitizeFn }) => {
  if (!content || content.trim() === '-' || content.trim().toLowerCase() === 'غير محدد') return null;
  const sanitizedContent = sanitizeFn(content);

  return (
    <div className={`py-4 ${!isFirstSection ? 'border-t border-border-color/60' : ''}`}>
      <h3 className={`text-md font-semibold ${titleColorClass} mb-2.5 flex items-center`}>
        {Icon && <Icon className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 opacity-90" />}
        {title}
      </h3>
      <div 
        className="text-sm text-secondary-text leading-relaxed whitespace-pre-wrap prose max-w-none"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </div>
  );
};


export const ResultCard: React.FC<ResultCardProps> = ({ result, originalInput, onShowDisclaimerModal, sanitizeFn }) => {
  const { riskLevel, explanation, detectedScamType, actionableAdvice } = result;
  const styles: SimpleRiskStyles = getRiskStylesDefinition(riskLevel); 

  const showDetectedScamTypeAsMainReason = 
    detectedScamType && 
    detectedScamType.trim() !== '' &&
    detectedScamType.trim().toLowerCase() !== "غير محدد" && 
    (riskLevel === "مشبوه" || riskLevel === "خطير جداً");

  const sections = [
    { title: "شرح التقييم:", content: explanation, icon: PiChatTeardropText },
    ...(!showDetectedScamTypeAsMainReason && detectedScamType && detectedScamType.trim() !== '' && detectedScamType.trim().toLowerCase() !== "غير محدد"
        ? [{ title: "نوع الاحتيال المحتمل:", content: detectedScamType, icon: PiSealQuestion }] 
        : []),
    { title: "الإرشادات والنصائح:", content: actionableAdvice, icon: PiMegaphoneSimple },
  ].filter(sec => sec.content && sec.content.trim() !== '' && sec.content.trim() !== '-' && sec.content.trim().toLowerCase() !== 'غير محدد');


  return (
    <div 
        className={`bg-card-bg rounded-xl shadow-lg border ${styles.borderColor} overflow-hidden transition-colors duration-300`}
    >
      <div className={`flex flex-col sm:flex-row items-center p-4 ${styles.headerBgColor} border-b ${styles.borderColor}`}>
        <div className={`text-center sm:text-right rtl:sm:text-left flex-grow ${styles.textColor}`}>
          <h2 className={`text-xl sm:text-2xl font-bold`}>
             {styles.label}
          </h2>
           <p className={`text-sm opacity-80 mt-1`}>تقييم مستوى الخطورة</p>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        {originalInput && (
            <div className="py-2 px-3 bg-main-bg/70 rounded-lg border border-border-color">
                 <h4 className="text-sm font-semibold text-accent mb-1.5 flex items-center">
                    <PiFileText className="h-4 w-4 mr-1.5 rtl:ml-1.5 rtl:mr-0 opacity-80" />
                    النص المُدخل:
                </h4>
                <p className="text-xs text-secondary-text leading-relaxed max-h-28 overflow-y-auto pr-1 pb-1 custom-scrollbar">
                    {originalInput}
                </p>
            </div>
        )}

        {showDetectedScamTypeAsMainReason && detectedScamType && detectedScamType.trim().toLowerCase() !== "غير محدد" && (
          <div className={`p-3 rounded-md border-l-4 rtl:border-r-4 rtl:border-l-0 ${styles.headerBgColor} ${styles.borderColor}`}>
              <p className={`text-sm ${styles.textColor}`}>
              <strong className={`font-semibold`}>السبب الرئيسي المحتمل:</strong>{' '}
              {detectedScamType}
              </p>
          </div>
        )}
        
        <div className="space-y-0"> 
          {sections.map((sec, index) => (
            <ResultSection 
              key={sec.title}
              title={sec.title}
              content={sec.content}
              icon={sec.icon}
              titleColorClass="text-accent" 
              isFirstSection={index === 0 && !showDetectedScamTypeAsMainReason} 
              sanitizeFn={sanitizeFn}
            />
          ))}
        </div>
        
        {riskLevel !== "خطأ في التحليل" && ( 
          <div className="mt-6 pt-5 border-t border-border-color/60 flex justify-end">
            <button 
              onClick={onShowDisclaimerModal}
              className="inline-flex items-center gap-x-1.5 text-xs text-secondary-text hover:text-accent
                         py-2 px-4 rounded-md border border-border-color hover:border-accent
                         bg-card-bg hover:bg-main-bg/70
                         shadow-sm transition-colors duration-150 ease-in-out 
                         focus:outline-none focus-visible-ring"
            >
              <PiInfo className="h-4 w-4" />
              إخلاء المسؤولية
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
