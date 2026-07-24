import React from 'react';
import { Mail } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const ContactContent: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col justify-between h-full relative z-10">
      <div className="max-w-[80%]">
        <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-card border border-border flex items-center justify-center text-text-main shadow-sm mb-2 sm:mb-4">
          <Mail size={18} className="sm:w-6 sm:h-6" strokeWidth={1.5} />
        </div>
        <h3 className="text-lg sm:text-2xl md:text-3xl font-semibold text-text-main mb-1 sm:mb-2 tracking-tight">
          {t('contactTitle')}
        </h3>
      </div>
      <div className="w-full">
        <a 
          href="mailto:giandelacruzlopez@gmail.com"
          className="flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-5 py-2.5 sm:py-4 rounded-[14px] sm:rounded-[20px] bg-card hover:bg-card-hover border border-border transition-all text-xs sm:text-sm group w-full shadow-sm hover:shadow-lg hover:border-primary/20 active:scale-[0.99]"
        >
          <span className="truncate font-medium text-text-muted group-hover:text-text-main transition-colors">{t('connectOnLinkedIn')}</span>
          <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md transition-all shrink-0 bg-border/50 text-text-muted group-hover:bg-primary group-hover:text-primary-fg">
            {t('open')}
          </span>
        </a>
      </div>
    </div>
  );
};
