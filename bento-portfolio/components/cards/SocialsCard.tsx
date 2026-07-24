import React, { useState } from 'react';
import { Github, ArrowUpRight, Copy, Check } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const SocialsContent: React.FC = () => {
  const { t } = useLanguage();
  const [copyFeedback, setCopyFeedback] = useState<'idle' | 'copied' | 'error'>('idle');

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(t('emailAddress'));
      setCopyFeedback('copied');
      setTimeout(() => setCopyFeedback('idle'), 2000);
    } catch {
      setCopyFeedback('error');
      setTimeout(() => setCopyFeedback('idle'), 4000);
    }
  };

  return (
    <div className="flex flex-col h-full gap-2 sm:gap-3 w-full">
      {/* Platforms */}
      <div className="flex-1 min-h-0">
        <a 
          href="https://github.com/xovnex" 
          target="_blank" 
          rel="noreferrer"
          aria-label={t('ariaGithubProfile')}
          className="relative flex flex-col items-center justify-center h-full w-full rounded-[16px] sm:rounded-[24px] bg-card-hover border border-border group/social overflow-hidden transition-all duration-300 hover:border-text-main/20 hover:bg-text-main"
        >
          <Github size={28} className="sm:w-10 sm:h-10 text-text-main transition-all duration-300 group-hover/social:text-page group-hover/social:scale-110" />
        </a>
      </div>

      <div className="flex items-center gap-2 min-h-0">
        <span className="text-[10px] sm:text-xs text-text-muted truncate font-medium flex-1" title={t('emailAddress')}>
          {t('emailAddress')}
        </span>
        <button
          type="button"
          onClick={copyEmail}
          className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg border border-border bg-card-hover text-text-main hover:bg-card transition-colors"
          aria-label={t('copy')}
        >
          {copyFeedback === 'copied' ? <Check size={14} strokeWidth={2.5} className="text-text-main" /> : <Copy size={14} strokeWidth={2} />}
        </button>
      </div>
      {copyFeedback === 'error' && (
        <p className="text-[10px] sm:text-xs text-red-600 dark:text-red-400 font-medium leading-tight" role="status">
          {t('copyFailed')}
        </p>
      )}

      {/* Contact Action */}
      <a 
        href="mailto:giandelacruzlopez@gmail.com"
        className="relative h-14 sm:h-16 w-full bg-text-main rounded-[16px] sm:rounded-[24px] flex items-center justify-between px-6 sm:px-8 gap-2 text-page font-bold shadow-md transition-all overflow-hidden group hover:shadow-xl active:scale-[0.98] cursor-pointer"
      >
        <div className="flex flex-col items-start">
          <span className="text-[10px] uppercase tracking-[0.2em] opacity-50 leading-none mb-1">{t('letsConnect')}</span>
          <span className="text-sm sm:text-base tracking-tight">{t('letsTalk')}</span>
        </div>
        <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-page/10 group-hover:bg-page/20 transition-colors">
          <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </a>
    </div>
  );
};
