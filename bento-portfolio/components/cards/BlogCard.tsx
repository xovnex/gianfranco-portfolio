import React from 'react';
import { BookOpen } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const BlogContent: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="h-full flex flex-col justify-end relative z-10">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-2xl pointer-events-none"></div>
      <div className="space-y-2 sm:space-y-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-card flex items-center justify-center text-amber-500 border border-border shadow-sm">
          <BookOpen size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={1.5} />
        </div>
        <p className="text-base sm:text-xl md:text-2xl 3xl:text-3xl font-medium text-text-main leading-tight tracking-tight">
          {t('readArticles')}
        </p>
      </div>
    </div>
  );
};
