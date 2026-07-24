import React from 'react';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const AboutContent: React.FC = () => {
  const { t } = useLanguage();
  
  // Parse the about phrase with styled spans
  const renderPhrase = () => {
    const phrase = t('aboutPhrase');
    const parts = phrase.split(/(<details>.*?<\/details>|<performance>.*?<\/performance>)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('<details>')) {
        const text = part.replace(/<\/?details>/g, '');
        return <span key={index} className="text-text-muted decoration-1 underline decoration-border underline-offset-4">{text}</span>;
      }
      if (part.startsWith('<performance>')) {
        const text = part.replace(/<\/?performance>/g, '');
        return <span key={index} className="text-text-muted decoration-1 underline decoration-border underline-offset-4">{text}</span>;
      }
      return part;
    });
  };

  return (
    <div className="h-full flex flex-col justify-end relative z-10">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl pointer-events-none"></div>
      <div className="space-y-2 sm:space-y-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-card flex items-center justify-center text-text-main border border-border shadow-sm">
          <Sparkles size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={1.5} />
        </div>
        <p className="text-base sm:text-xl md:text-2xl 3xl:text-3xl font-medium text-text-main leading-tight tracking-tight">
          {renderPhrase()}
        </p>
      </div>
    </div>
  );
};
