
import React, { useState, useCallback } from 'react';
import { InputForm } from './components/InputForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { ErrorNotification } from './components/ErrorNotification';
import { HistoryDisplay } from './components/HistoryDisplay';
import type { AnalysisResult } from './types';

const App = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async (text: string) => {
    if (!text.trim()) {
      setError("الرجاء إدخال نص ليتم تحليله.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null); 

    try {
      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text_to_analyze: text }),
      });

      if (!response.ok) {
        let serverErrorMsg = `فشل الاتصال بالخادم المحلي. رمز الحالة: ${response.status}`;
        try {
            const errorData = await response.json();
            serverErrorMsg = errorData.detail || errorData.message || serverErrorMsg;
        } catch (e) {
            
        }
        throw new Error(serverErrorMsg);
      }

      const data = await response.json();
      const analysisText = data.analysis_report; 

      if (!analysisText) {
          throw new Error("لم يتمكن الخادم المحلي من إنشاء تحليل. قد تكون الاستجابة فارغة أو غير متوقعة.");
      }

      const newResult: AnalysisResult = {
        originalText: text,
        analysis: analysisText,
        timestamp: new Date().toLocaleString('ar-EG', { dateStyle: 'medium', timeStyle: 'short' }), 
      };
      setAnalysisResult(newResult);
      setAnalysisHistory(prevHistory => [newResult, ...prevHistory].slice(0, 5));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "حدث خطأ غير متوقع أثناء تحليل النص عبر الخادم المحلي.");
      } else {
        setError("حدث خطأ غير متوقع أثناء تحليل النص عبر الخادم المحلي.");
      }
      console.error("Analysis error via local server:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen text-beacon-text-primary bg-beacon-deep-bg flex flex-col items-center font-arabic">
      
      
      <div className="mt-16 sm:mt-20 mb-10 sm:mb-12 text-center w-full max-w-5xl z-10 px-4 sm:px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-beacon-text-primary mb-6">
            المحلل الذكي
        </h1>
        <p className="text-lg sm:text-xl text-beacon-text-secondary max-w-3xl mx-auto leading-relaxed">
          أداة تحليل نصوص ذكية لكشف الاحتيال وحماية بياناتك.
        </p> 
      </div>

      <main className="w-full max-w-5xl space-y-10 sm:space-y-12 z-10 px-4 sm:px-6 lg:px-0">
        <InputForm
          onSubmit={(text) => {
            setUserInput(text);
            handleAnalyze(text);
          }}
          isLoading={isLoading}
          initialText={userInput}
        />

        {isLoading && (
          <div className="bg-beacon-surface border border-beacon-border shadow-card rounded-2xl p-8 flex justify-center items-center">
            <p className="text-lg text-beacon-accent-primary animate-pulse">جاري التحليل الذكي للنص...</p>
          </div>
        )}

        {error && <ErrorNotification message={error} onClose={() => setError(null)} />}
        
        {analysisResult && !isLoading && <ResultsDisplay result={analysisResult} />}

        {analysisHistory.length > 0 && !isLoading && (
            <HistoryDisplay history={analysisHistory} />
        )}
      </main>

      <footer className="mt-16 sm:mt-20 text-center text-beacon-text-secondary/70 text-sm z-10 py-6">
         <p></p> 
      </footer>
    </div>
  );
};

export { App as default };
