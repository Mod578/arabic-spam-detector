import React from 'react';
import type { AnalysisResult } from '../types';

interface HistoryDisplayProps {
  history: AnalysisResult[];
}

export const HistoryDisplay: React.FC<HistoryDisplayProps> = ({ history }) => {
  if (!history || history.length === 0) {
    return null; 
  }

  const getRiskIndicatorClasses = (analysisText: string): { border: string; textClass?: string; textLabel?: string; shadow?: string } => {
    if (analysisText.includes("مرتفع جداً")) return { border: "border-beacon-warning", textClass: "text-beacon-warning", textLabel: "خطر مرتفع جداً", shadow: "shadow-card" };
    if (analysisText.includes("مرتفع")) return { border: "border-beacon-warning", textClass: "text-beacon-warning/90", textLabel: "خطر مرتفع", shadow: "shadow-card" };
    if (analysisText.includes("متوسط")) return { border: "border-beacon-notice", textClass: "text-beacon-notice", textLabel: "خطر متوسط", shadow: "shadow-card" };
    if (analysisText.includes("منخفض")) return { border: "border-beacon-success", textClass: "text-beacon-success", textLabel: "خطر منخفض", shadow: "shadow-card" };
    return { border: "border-beacon-border", shadow: "shadow-md" }; 
  };


  return (
    <div className="bg-beacon-surface shadow-card rounded-2xl p-6 sm:p-8 space-y-6 animate-fadeInUpSmooth">
      <h2 className="text-2xl font-semibold text-beacon-text-primary mb-6">
        أرشيف التحليلات:
      </h2>
      <div className="space-y-6 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
        {history.map((item, index) => {
          const riskClasses = getRiskIndicatorClasses(item.analysis);
          return (
            <div 
              key={index} 
              className={`bg-beacon-surface-alt p-4 rounded-xl ${riskClasses.shadow} space-y-3 border-l-4 ${riskClasses.border} transition-all duration-300 hover:shadow-card-hover`}
            >
              <div className="flex items-center text-xs text-beacon-text-secondary justify-between">
                <span>{item.timestamp}</span>
                {riskClasses.textLabel && <span className={`text-xs font-semibold ${riskClasses.textClass}`}>{riskClasses.textLabel}</span>}
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-beacon-text-primary/80 mb-1">
                  النص الأصلي:
                </h3>
                <div className="max-h-32 overflow-y-auto custom-scrollbar bg-beacon-deep-bg p-3 rounded-lg shadow-inner border border-beacon-border/50"> 
                  <p className="text-beacon-text-secondary whitespace-pre-wrap text-sm leading-relaxed" dir="rtl">
                    {item.originalText}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-beacon-text-primary/80 mb-1">
                  ملخص التحليل:
                </h3>
                <div className="max-h-40 overflow-y-auto custom-scrollbar bg-beacon-deep-bg p-3 rounded-lg shadow-inner border border-beacon-border/50"> 
                   {item.analysis.split("## تقييم مستوى الخطورة الإجمالي:")[1]?.split("##")[0]?.trim().split('\n').slice(0,2).map((line, pIdx) => (
                      <p key={`risk-${pIdx}`} className="text-beacon-text-secondary whitespace-pre-wrap text-sm leading-relaxed mb-1 last:mb-0" dir="rtl">
                          {line}
                      </p>
                   ))}
                   {item.analysis.split("## المؤشرات المثيرة للقلق:")[1]?.split("##")[0]?.trim().split('\n').slice(0,2).map((line, pIdx) => (
                      <p key={`indic-${pIdx}`} className="text-beacon-text-secondary/80 whitespace-pre-wrap text-xs leading-relaxed mt-1" dir="rtl">
                          {line.length > 100 ? line.substring(0, 100) + "..." : line}
                      </p>
                   ))}
                    {(!item.analysis.includes("## تقييم مستوى الخطورة الإجمالي:") && !item.analysis.includes("## المؤشرات المثيرة للقلق:")) && item.analysis.split('\n').slice(0,3).map((line, pIdx) => (
                       <p key={`generic-${pIdx}`} className="text-beacon-text-secondary/80 whitespace-pre-wrap text-xs leading-relaxed mt-1" dir="rtl">
                          {line.length > 100 ? line.substring(0, 100) + "..." : line}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {history.length === 0 && (
        <p className="text-beacon-text-secondary/70 text-center py-4">لا توجد تحليلات محفوظة بعد.</p>
      )}
    </div>
  );
};