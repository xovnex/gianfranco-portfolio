import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export const IntroContent: React.FC = () => {
  const { t } = useLanguage();
  
  // Data-driven approach for the title to make it easily upgradable
  const firstName = "Gianfranco";
  const lastName = "De La Cruz.";

  // Helper to render the bio with highlighted spans
  const renderBio = () => {
    const bioText = t('introBio');
    // Regex matches any tag-wrapped content for highlighting
    const parts = bioText.split(/(<[^>]+>.*?<\/[^>]+>)/g);
    
    return parts.map((part, index) => {
      const match = part.match(/<([^>]+)>(.*?)<\/\1>/);
      if (match) {
        return <span key={index} className="text-text-main font-semibold">{match[2]}</span>;
      }
      return part;
    });
  };

  return (
    <div className="relative h-full flex flex-col">
      {/* Decorative Background Blobs */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-[80px] animate-blob mix-blend-overlay pointer-events-none"></div>
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-500/5 rounded-full blur-[80px] animate-blob mix-blend-overlay pointer-events-none" style={{ animationDelay: '2s' }}></div>
      
      {/* Main Content: Name + Bio */}
      <div className="relative z-10 flex flex-col h-full justify-center">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
          <h1 className="flex flex-col text-4xl sm:text-6xl md:text-7xl 3xl:text-8xl font-black tracking-tighter leading-[0.8]">
            <span 
              className="text-text-main animate-fade-in-up"
              style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
            >
              {firstName}
            </span>
            <span 
              className="text-text-muted/20 animate-fade-in-up"
              style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
            >
              {lastName}
            </span>
          </h1>

          <div className="max-w-[220px] 3xl:max-w-[300px] sm:text-right pb-1">
            <p className="text-xs sm:text-sm 3xl:text-base text-text-muted font-medium leading-relaxed opacity-90">
              {renderBio()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
