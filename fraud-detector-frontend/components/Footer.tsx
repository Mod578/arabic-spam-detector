
import React from 'react';
import { PiCopyright } from 'react-icons/pi';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-main-bg text-secondary-text py-6 border-t border-border-color mt-auto transition-colors duration-300">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center items-center">
          <PiCopyright className="h-4 w-4 text-secondary-text mr-1 rtl:ml-1 rtl:mr-0" />
          <p className="text-xs text-main-text">
            حصين {new Date().getFullYear()}.
          </p>
        </div>
      </div>
    </footer>
  );
};