import React from 'react';
import { Layout, Zap } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="px-5 sm:px-10 lg:px-16 3xl:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="mb-4 sm:mb-6 lg:mb-8 3xl:mb-20">
          <h1 className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.3em] mb-3 3xl:mb-6 animate-fade-in">
            {t('aboutTitle')}
          </h1>
          <h2 id="section-title-about" className="text-4xl sm:text-5xl md:text-6xl 3xl:text-7xl font-black text-text-main leading-[0.9] tracking-tighter mb-4 3xl:mb-10">
            {t('systemsEngineering')}
            <br />
            <span className="text-text-muted/20">{t('scalableArchitect')}</span>
          </h2>
          <div className="h-px w-20 bg-primary mb-4 3xl:mb-10"></div>
          <p className="text-lg sm:text-xl 3xl:text-2xl text-text-muted leading-relaxed font-medium max-w-3xl">
            {t('bioText')}
          </p>
        </header>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 3xl:gap-20">
          <div>
            <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-text-muted/50 mb-6">{t('profile')}</h3>
            <div className="flex flex-wrap gap-3">
              {[t('proactive'), t('detailOriented'), t('problemSolver')].map(tag => (
                <span key={tag} className="px-5 py-2.5 rounded-full bg-card-hover border border-border text-text-main text-xs font-bold shadow-sm transition-transform hover:scale-105">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-text-muted/50 mb-6">{t('philosophy')}</h3>
            
            <div className="group">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/10 group-hover:scale-110 transition-transform">
                  <Layout size={20} />
                </div>
                <h4 className="text-text-main font-bold text-lg">{t('userCentricDesign')}</h4>
              </div>
              <p className="text-text-muted text-sm leading-relaxed pl-14">{t('userCentricDesignDesc')}</p>
            </div>

            <div className="group">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/10 group-hover:scale-110 transition-transform">
                  <Zap size={20} />
                </div>
                <h4 className="text-text-main font-bold text-lg">{t('performanceFirst')}</h4>
              </div>
              <p className="text-text-muted text-sm leading-relaxed pl-14">{t('performanceFirstDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
