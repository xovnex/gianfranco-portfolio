import React from 'react';
import { Rocket, FileText } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const ExperienceContent: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="mt-auto space-y-2 sm:space-y-4">
      <div className="flex items-center gap-2.5 sm:gap-4 group">
        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-card border border-border flex items-center justify-center text-text-main group-hover:border-primary/20 transition-colors shadow-sm shrink-0">
          <Rocket size={16} className="sm:w-5 sm:h-5" strokeWidth={1.5} />
        </div>
        <div>
          <p className="font-black text-sm sm:text-base md:text-lg leading-none mb-0.5 sm:mb-1 text-primary">{t('focusHeadline')}</p>
          <p className="text-text-muted text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-wide">{t('focusStack')}</p>
        </div>
      </div>
      <div className="w-full h-px bg-border"></div>
      <div className="flex items-center gap-2.5 sm:gap-4 opacity-50 hover:opacity-100 transition-opacity">
        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-card border border-border flex items-center justify-center text-text-main shrink-0">
          <FileText size={16} className="sm:w-5 sm:h-5" strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-text-main font-bold text-sm sm:text-base md:text-lg leading-none mb-0.5 sm:mb-1">{t('focusDocsTitle')}</p>
          <p className="text-text-muted text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-wide">{t('focusDocsDesc')}</p>
        </div>
      </div>
    </div>
  );
};
