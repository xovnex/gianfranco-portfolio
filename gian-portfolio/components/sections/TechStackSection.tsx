import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { m } from 'framer-motion';

export const TechStackSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="px-5 sm:px-10 lg:px-16 3xl:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="mb-8 sm:mb-10 lg:mb-12 3xl:mb-20 text-center sm:text-left">
          <m.h1 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.3em] mb-4 3xl:mb-6"
          >
            {t('techStackTitle')}
          </m.h1>
          <m.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            id="section-title-stack" 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl font-black text-text-main leading-[0.9] tracking-tighter mb-5 3xl:mb-10"
          >
            {t('technicalArsenal')}
          </m.h2>
          <m.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl 3xl:text-2xl text-text-muted leading-relaxed font-medium max-w-3xl"
          >
            {t('technicalArsenalDesc')}
          </m.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 3xl:gap-20 pb-16">
          {/* Frontend */}
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.6)]"></div>
              {t('frontend')}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {[
                { name: 'React', color: '#61DAFB' },
                { name: 'Vite', color: '#646CFF' },
                { name: 'JavaScript', color: '#F7DF1E' },
                { name: 'HTML5', color: '#E34F26' },
                { name: 'CSS3', color: '#1572B6' },
              ].map(tech => (
                <TechTag key={tech.name} name={tech.name} color={tech.color} />
              ))}
            </div>
          </m.div>

          {/* Backend */}
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.6)]"></div>
              {t('backend')}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {[
                { name: 'Python', color: '#3776AB' },
                { name: 'FastAPI', color: '#009688' },
                { name: 'Pydantic', color: '#E92063' },
                { name: 'SQLAlchemy', color: '#D71F00' },
              ].map(tech => (
                <TechTag key={tech.name} name={tech.name} color={tech.color} />
              ))}
            </div>
          </m.div>

          {/* AI & Machine Learning */}
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.6)]"></div>
              {t('aiMl')}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {[
                { name: 'scikit-learn', color: '#F7931E' },
                { name: 'NumPy', color: '#4DABCF' },
                { name: 'NetworkX', color: '#11557C' },
                { name: 'pytest', color: '#0A9EDC' },
              ].map(tech => (
                <TechTag key={tech.name} name={tech.name} color={tech.color} />
              ))}
            </div>
          </m.div>

          {/* Database */}
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.6)]"></div>
              {t('database')}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {[
                { name: 'Git', color: '#F05032' },
                { name: 'GitHub Actions', color: '#2088FF' },
                { name: 'SQLite', color: '#003B57' },
                { name: 'Vercel', color: '#999999' },
                { name: 'Render', color: '#46E3B7' },
              ].map(tech => (
                <TechTag key={tech.name} name={tech.name} color={tech.color} />
              ))}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
};

const TechTag: React.FC<{ name: string; color: string }> = ({ name, color }) => (
  <m.span 
    whileHover={{ 
      scale: 1.05,
      color: color,
      borderColor: `${color}40`,
      boxShadow: `0 0 20px ${color}15`
    }}
    whileTap={{ scale: 0.95 }}
    className="px-4 py-2 rounded-xl bg-card-hover text-text-muted text-xs font-bold border border-border transition-all duration-200 cursor-default"
  >
    {name}
  </m.span>
);
