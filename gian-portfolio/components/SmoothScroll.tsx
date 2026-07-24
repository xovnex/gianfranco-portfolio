import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type LenisLike = Lenis | null;

interface SmoothScrollContextValue {
  lenis: LenisLike;
  /** Pause scroll (used by IntroLoader). */
  stop: () => void;
  /** Resume scroll. */
  start: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  stop: () => {},
  start: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProps {
  children: React.ReactNode;
}

/**
 * Provides a Lenis smooth-scroll instance wired to GSAP ScrollTrigger.
 * Respects prefers-reduced-motion by disabling smoothing entirely.
 */
export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const lenisRef = useRef<LenisLike>(null);
  const [lenisInstance, setLenisInstance] = useState<LenisLike>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      // Skip smooth scroll entirely for reduced-motion users.
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      allowNestedScroll: true,
      syncTouch: true,
      syncTouchLerp: 0.09,
      smoothWheel: true,
      touchMultiplier: 1.1,
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    const handleScroll = () => ScrollTrigger.update();
    lenis.on('scroll', handleScroll);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTriggers after fonts/images load shift layout.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('load', onLoad);
      lenis.off('scroll', handleScroll);
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  const value: SmoothScrollContextValue = {
    lenis: lenisInstance,
    stop: () => lenisRef.current?.stop(),
    start: () => lenisRef.current?.start(),
  };

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
};
