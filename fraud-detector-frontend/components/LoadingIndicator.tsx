
import React from 'react';
import { PiCircleNotch } from 'react-icons/pi';

interface LoadingIndicatorProps {
  message?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message = "جاري التحليل..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 my-4 w-full text-center">
      <PiCircleNotch className="animate-spin h-10 w-10 text-accent opacity-90" />
      <p className="mt-4 text-accent font-medium text-sm opacity-90">{message}</p>
    </div>
  );
};
