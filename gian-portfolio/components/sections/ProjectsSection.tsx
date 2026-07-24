import React from 'react';
import { Code2 } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { projects } from '../../content/portfolio';
import type { TranslationKey } from '../../i18n/translations';

export const ProjectsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="px-5 sm:px-10 lg:px-16 3xl:px-24">
      <div className="max-w-4xl mx-auto">
        <header className="mb-5 sm:mb-7 lg:mb-9 3xl:mb-16 text-center sm:text-left">
          <h1 className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.3em] mb-3 3xl:mb-6">
            {t('projectsTitle')}
          </h1>
          <h2
            id="section-title-projects"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl font-black text-text-main leading-[0.9] tracking-tighter mb-4 3xl:mb-10"
          >
            {t('projectsHeadline')}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl 3xl:text-2xl text-text-muted leading-relaxed font-medium max-w-3xl">
            {t('projectsSectionDesc')}
          </p>
        </header>

        <div className="flex flex-col gap-5 sm:gap-6">
          {projects.map((p) => (
            <article
              key={p.id}
              className="relative rounded-[24px] sm:rounded-[32px] border border-border bg-card-hover/50 p-6 sm:p-8 lg:p-10 3xl:p-12"
            >
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 3xl:mb-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Code2 size={24} className="sm:w-7 sm:h-7" strokeWidth={1.5} aria-hidden />
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <h3 className="text-xl sm:text-2xl 3xl:text-3xl font-black text-text-main tracking-tight">
                    {t(p.titleKey as TranslationKey)}
                  </h3>
                  <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-primary bg-card px-4 py-1.5 rounded-full border border-border">
                    {t(p.tagKey as TranslationKey)}
                  </span>
                </div>
              </div>

              <p className="text-text-muted text-sm sm:text-base 3xl:text-lg leading-relaxed max-w-2xl mb-5 3xl:mb-6 font-medium">
                {t(p.descKey as TranslationKey)}
              </p>

              <div className="flex flex-wrap gap-2 mb-6 3xl:mb-8">
                {p.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full border border-border bg-card text-xs font-bold text-text-main"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                <a
                  href={p.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-card border border-border text-sm font-bold text-text-main hover:border-primary/30 hover:bg-card-hover transition-colors"
                >
                  {t(p.websiteLabelKey as TranslationKey)}
                </a>
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-card border border-border text-sm font-bold text-text-main hover:border-primary/30 hover:bg-card-hover transition-colors"
                >
                  {t(p.repoLabelKey as TranslationKey)}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
