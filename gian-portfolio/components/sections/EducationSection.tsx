import React from 'react';
import { GraduationCap } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const EducationSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="px-5 sm:px-10 lg:px-16 3xl:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="mb-5 sm:mb-7 lg:mb-9 3xl:mb-16 text-center sm:text-left">
          <h1 className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.3em] mb-4 3xl:mb-6">
            {t('educationTitle')}
          </h1>
          <h2 id="section-title-education" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl font-black text-text-main leading-[0.9] tracking-tighter mb-5 3xl:mb-10">
            {t('academicBackground').split(' ')[0]}
            <br />
            <span className="text-text-muted/20">{t('academicBackground').split(' ')[1]}</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl 3xl:text-2xl text-text-muted leading-relaxed font-medium max-w-3xl">
            {t('educationDesc')}
          </p>
        </header>

        <div className="relative">
          {/* Main Degree */}
          <article className="group relative">
            <div className="flex flex-col md:flex-row md:items-start gap-6 sm:gap-8 lg:gap-10 3xl:gap-12">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[24px] bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:scale-105 transition-transform duration-500">
                <GraduationCap size={32} strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl 3xl:text-4xl font-black text-text-main tracking-tight group-hover:text-primary transition-colors duration-500">
                    {t('systemsEngineering')}
                  </h3>
                  <span className="text-xs font-black uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 w-fit">{t('inProgress')}</span>
                </div>
                <p className="text-lg sm:text-xl 3xl:text-2xl text-text-main font-bold mb-2">Universidad de San Martín de Porres</p>
                <p className="text-text-muted text-sm sm:text-base 3xl:text-lg font-medium">{t('professionalDegree')} • Lima, Perú</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
