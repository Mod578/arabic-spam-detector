import React from 'react';

interface ErrorNotificationProps {
  message: string;
  onClose?: () => void;
}

export const ErrorNotification: React.FC<ErrorNotificationProps> = ({ message, onClose }) => {
  return (
    <div 
      className="bg-beacon-surface border-l-4 border-beacon-warning text-beacon-text-primary p-4 rounded-xl shadow-lg flex items-start space-x-3 space-x-reverse animate-fadeInDownSmooth"
      role="alert"
    >
      <div className="flex-grow">
        <p className="font-semibold text-beacon-warning">خطأ في التحليل</p>
        <p className="text-sm text-beacon-text-primary/90">{message}</p>
      </div>
      {onClose && (
        <button 
          onClick={onClose} 
          className="ml-auto -mx-1.5 -my-1.5 bg-beacon-surface-alt text-beacon-warning rounded-lg focus:ring-2 focus:ring-beacon-warning/70 p-1.5 hover:bg-beacon-warning/20 inline-flex items-center justify-center h-8 w-8 transition-colors" 
          aria-label="إغلاق"
        >
          <span className="sr-only">إغلاق</span>
          <span className="text-xl leading-none" aria-hidden="true">&times;</span>
        </button>
      )}
    </div>
  );
};