
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-beacon-surface shadow-md z-20 py-4 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center">
          
          <span className="text-3xl text-beacon-accent-primary" role="img" aria-label="Beacon">💡</span>
          <h1 className="text-2xl font-bold text-beacon-text-primary ml-3">
            المحلل الذكي
          </h1>
        </div>
        
      </div>
    </header>
  );
};
