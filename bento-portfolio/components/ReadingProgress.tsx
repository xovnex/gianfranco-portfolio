import React, { useEffect, useRef } from 'react';

/**
 * Thin fixed-top progress bar that fills as the user scrolls through the
 * current document. Purely DOM-driven (rAF, no re-renders) so it never causes
 * React reconciliation and plays well with Lenis smooth scrolling.
 */
export const ReadingProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let raf = 0;

    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = height > 0 ? Math.min(1, Math.max(0, scrollTop / height)) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 right-0 z-[115] h-[2px] bg-transparent"
    >
      <div
        ref={barRef}
        className="h-full w-full bg-text-main origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
};
