
import React from 'react';
import { PiX, PiInfo } from 'react-icons/pi'; 

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  htmlContent: string;
  sanitizeFn: (html: string) => string;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onClose, title, htmlContent, sanitizeFn }) => {
  if (!isOpen) return null;

  const sanitizedContent = sanitizeFn(htmlContent);

  const renderDisclaimerItems = (htmlString: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
  
    const itemsContainer = tempDiv.querySelector('.disclaimer-items-container');
    const titleElement = tempDiv.querySelector('h3');

    return (
      <div className="text-secondary-text">
        {titleElement && (
           <h3 className="text-lg font-semibold text-main-text mb-5 text-center"
              dangerouslySetInnerHTML={{ __html: titleElement.innerHTML }} />
        )}
        {itemsContainer && (
          <div className="space-y-3">
            {Array.from(itemsContainer.children).map((item, index) => {
              if (item.classList.contains('disclaimer-item-wrapper') && item.querySelector('p')) {
                return (
                    <div 
                      key={`disclaimer-item-${index}`}
                      className="flex items-start gap-x-3 bg-main-bg/80 p-3.5 rounded-lg border border-border-color/70"
                    >
                      <PiInfo className="flex-shrink-0 mt-1 w-4 h-4 text-accent" />
                      <p className="prose text-sm max-w-none text-secondary-text"
                         dangerouslySetInnerHTML={{ __html: item.querySelector('p')!.innerHTML }} />
                    </div>
                );
              }
              return null; 
            })}
          </div>
        )}
      </div>
    );
  };


  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out" 
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-card-bg rounded-xl shadow-2xl p-0 w-full max-w-lg max-h-[85vh] flex flex-col border border-border-color transition-colors duration-300" 
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-border-color sticky top-0 bg-card-bg z-10 rounded-t-xl">
          <h2 className="text-lg font-semibold text-main-text flex items-center gap-x-2">
            <PiInfo className={`w-5 h-5 text-accent`} /> 
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-secondary-text hover:text-danger rounded-md p-1.5 focus:outline-none focus-visible-ring"
            aria-label="إغلاق النافذة"
          >
            <PiX className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto px-6 py-6 custom-scrollbar">
           {renderDisclaimerItems(sanitizedContent)}
        </div>

        <div className="mt-auto px-6 py-4 border-t border-border-color flex justify-end sticky bottom-0 bg-card-bg z-10 rounded-b-xl">
          <button
            onClick={onClose}
            className="bg-accent hover:bg-accent-hover text-accent-content font-semibold py-2.5 px-6 rounded-lg shadow-md transition-all duration-150 ease-in-out focus:outline-none focus-visible-ring btn-accent-glow text-sm"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
