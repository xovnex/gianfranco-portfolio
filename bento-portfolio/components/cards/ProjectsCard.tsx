import React from 'react';
import { Code2 } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const ProjectsContent: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="h-full flex flex-col justify-end relative z-10 min-h-0">
      <div
        className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-primary/[0.08] via-transparent to-violet-500/[0.04] rounded-full blur-3xl pointer-events-none"
        aria-hidden
      />
      <div className="relative space-y-2 sm:space-y-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-card flex items-center justify-center text-text-main border border-border shadow-sm">
          <Code2 size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={1.5} aria-hidden />
        </div>
        <p className="text-base sm:text-lg md:text-xl 3xl:text-2xl font-medium text-text-main leading-[1.25] tracking-tight pr-6 sm:pr-8">
          {t('projectsCardHint')}
        </p>
        <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-text-muted">
          {t('academicProject')}
        </p>
      </div>
    </div>
  );
};
