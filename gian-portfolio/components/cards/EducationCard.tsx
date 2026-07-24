import React from 'react';
import { GraduationCap } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const EducationContent: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="h-full flex flex-col justify-end relative z-10">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 p-24 bg-gradient-to-br from-primary/5 to-purple-500/5 blur-[60px] rounded-full pointer-events-none z-0"></div>
      
      <div className="space-y-2 sm:space-y-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-card flex items-center justify-center text-text-main border border-border shadow-sm">
          <GraduationCap size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={1.5} />
        </div>
        
        <div className="space-y-1">
          <h3 className="text-base sm:text-xl md:text-2xl 3xl:text-3xl font-medium text-text-main leading-tight tracking-tight">
            {t('systemsEngineering')}
          </h3>
        </div>
      </div>
    </div>
  );
};
