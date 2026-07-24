import React from 'react';

/**
 * Fixed, full-viewport SVG grain overlay.
 * Uses feTurbulence so we don't ship a raster asset. Blends with the page
 * via mix-blend-overlay so it adapts to both light and dark themes.
 */
export const Grain: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[180] opacity-[0.14] dark:opacity-[0.08] mix-blend-overlay"
    >
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-noise)" />
      </svg>
    </div>
  );
};
