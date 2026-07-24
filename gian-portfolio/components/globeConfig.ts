import type { CSSProperties } from 'react';
import type { Theme } from '../types';

/**
 * Single source of truth for the 3D globe: Cobe “pulse” rings + layout/Tailwind styles.
 * Pulse rings are drawn via per-frame `markers` (no extra CSS for the rings).
 * Light theme tints the whole canvas with Tailwind `invert` + `brightness-105`.
 */

// ----- Pulse (expanding marker rings) -----

export const GLOBE_PULSE = {
  /** Lima, Peru */
  originLat: -12.0464,
  originLon: -77.0428,
  durationMs: 3000,
  /** RGB 0–1; Cobe uses one `markerColor` for center + ring dots */
  markerColor: [1, 1, 1] as [number, number, number],
  centerDotSize: 0.06,
  /** Base size for ring dots, multiplied by fade opacity */
  ringDotSize: 0.03,
  ripples: [{ maxScale: 24 }, { maxScale: 10 }] as const,
  dotCount: 50,
  minVisibleRadius: 0.2,
  minVisibleOpacity: 0.01,
} as const;

// ----- Cobe static render options (width/height/phi update at runtime) -----

export const GLOBE_COBE = {
  devicePixelRatio: 2,
  theta: 0.25,
  dark: 1,
  diffuse: 1.2,
  mapSamples: 16_000,
  mapBrightness: 6,
  baseColor: [0.15, 0.15, 0.15] as [number, number, number],
  glowColor: [0.15, 0.15, 0.15] as [number, number, number],
  opacity: 1,
} as const;

export const GLOBE_MOTION = {
  /** Radians per frame when not dragging */
  phiAutoplay: 0.002,
  /** `setR(delta / n)` for drag rotation */
  dragDeltaDivisor: 200,
} as const;

// ----- Layout: Tailwind class strings (map card + canvas shell) -----

export const GLOBE_UI = {
  globeContainer: 'absolute inset-0 flex items-center justify-center z-0 overflow-hidden',
  aspectSquare: 'relative flex items-center justify-center',
  mapRoot: 'relative w-full h-full overflow-hidden',
  globeLayer: 'absolute inset-0 z-0',
  /** Uses design token `card` (see index.css + tailwind.config) */
  bottomGradient:
    'absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card/90 to-transparent pointer-events-none z-10',
  bottomBar: 'absolute bottom-0 left-0 right-0 z-20 p-3 sm:p-4',
  bottomRow: 'flex items-center gap-3',
  locationIcon:
    'w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-page border border-border flex items-center justify-center text-text-main shrink-0 shadow-sm',
  mapPin: 'sm:w-5 sm:h-5',
  label: 'text-[9px] font-bold text-text-muted uppercase tracking-wider leading-tight mb-0.5',
  placeTitle: 'text-sm font-bold text-text-main leading-tight',
  time: 'text-xs font-mono font-bold text-text-muted mt-0.5 tabular-nums leading-tight',
} as const;

/** Whole-canvas light theme filter; applies to base map + glow + markers */
export function globeCanvasThemeClass(theme: Theme): string {
  return theme === 'light' ? 'invert brightness-105' : '';
}

export const GLOBE_CANVAS_STYLE: CSSProperties = {
  width: '100%',
  height: '100%',
  transition: 'opacity 0.5s ease-out, filter 0.7s ease-in-out',
  cursor: 'grab',
  touchAction: 'none',
};

export const GLOBE_ASPECT_WRAPPER_STYLE: CSSProperties = {
  height: '100%',
  aspectRatio: '1',
};
