import React from 'react';
import type { AnalysisResult } from '../types';

interface ResultsDisplayProps {
  result: AnalysisResult;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  const renderAnalysisContent = (analysis: string) => {
    const lines = analysis.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith("## ")) {
        const title = line.substring(3).trim();
        let titleColor = "text-beacon-text-primary"; 

        if (title.includes("مستوى الخطورة")) {
           if (result.analysis.includes("مرتفع جداً") || result.analysis.includes("مرتفع")) {
                titleColor = "text-beacon-warning"; 
           } else if (result.analysis.includes("متوسط")) {
                titleColor = "text-beacon-notice"; 
           } else if (result.analysis.includes("منخفض")) {
                titleColor = "text-beacon-success"; 
           }
        } else if (title.includes("المؤشرات المثيرة للقلق")) {
            titleColor = "text-beacon-notice"; 
        } else if (title.includes("التوصيات والإجراءات")) {
            titleColor = "text-beacon-success"; 
        } else if (title.includes("شرح مفصل") || title.includes("التحليل التفصيلي")) {
            titleColor = "text-beacon-text-secondary"; 
        }

        return (
          <h3 key={`sub-${index}`} className={`text-xl font-semibold ${titleColor} mt-6 mb-3`}>
            {title}
          </h3>
        );
      }
      if (line.trim() !== "") {
        return (
          <p key={`p-${index}`} className="text-beacon-text-primary whitespace-pre-wrap leading-relaxed text-base mb-2 last:mb-0" dir="rtl">
            {line}
          </p>
        );
      }
      return null;
    });
  };


  return (
    <div className="bg-beacon-surface shadow-card rounded-2xl p-6 sm:p-8 space-y-6 animate-fadeInUpSmooth">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-beacon-text-primary">
          النص الأصلي:
        </h2>
        <div className="bg-beacon-surface-alt p-4 rounded-xl max-h-60 overflow-y-auto custom-scrollbar shadow-inner border border-beacon-border">
          <p className="text-beacon-text-secondary whitespace-pre-wrap leading-relaxed text-base" dir="rtl">{result.originalText}</p>
        </div>
      </div>
      
      <div className="border-t border-beacon-border my-6"></div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-beacon-text-primary">
          نتائج التحليل الذكي:
        </h2>
        <div className="bg-beacon-surface-alt p-4 rounded-xl space-y-1 custom-scrollbar max-h-[600px] overflow-y-auto shadow-inner border border-beacon-border">
          {renderAnalysisContent(result.analysis)}
          {result.analysis.trim() === "" && (
             <p className="text-beacon-text-secondary/70 italic" dir="rtl">لم يتمكن النظام من تقديم تقرير تحليل واضح هذه المرة.</p>
          )}
        </div>
      </div>

      <div className="border-t border-beacon-border my-6"></div>

      <div className="flex items-center text-sm text-beacon-text-secondary/80">
        <span>تاريخ التحليل: {result.timestamp}</span>
      </div>
    </div>
  );
};