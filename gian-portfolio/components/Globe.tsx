import React, { useState, useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { MapPin } from 'lucide-react';
import type { GlobeProps, MapContentProps } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

/**
 * Globe “pulse” = expanding Cobe marker rings. There is no separate CSS for the rings;
 * color/size come from Cobe (`markerColor` + per-frame `size`). The `<canvas>` uses
 * `invert brightness-105` in light mode only — that filter applies to the whole globe
 * (base + glow + markers), not ring-only.
 */
const GLOBE_PULSE = {
  originLat: -12.0464,
  originLon: -77.0428,
  durationMs: 3000,
  /** RGB 0–1; single color for center dot and all ring dots (Cobe API) */
  markerColor: [1, 1, 1] as [number, number, number],
  centerDotSize: 0.06,
  /** Multiplied by fade opacity for ring dots */
  ringDotSize: 0.03,
  ripples: [{ maxScale: 24 }, { maxScale: 10 }] as const,
  dotCount: 50,
  minVisibleRadius: 0.2,
  minVisibleOpacity: 0.01,
} as const;

// ----- GLOBE COMPONENT -----

export const Globe: React.FC<GlobeProps> = ({ theme, scale = 1.2 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const phiRef = useRef(4.7);
  const thetaRef = useRef(0.25);
  const sizeRef = useRef(0);

  // Drag state — all refs so we don't re-render on every pixel.
  const isDragging = useRef(false);
  const lastPointer = useRef<{ x: number; y: number } | null>(null);
  const velocity = useRef<{ phi: number; theta: number }>({ phi: 0, theta: 0 });
  const lastMoveTime = useRef(0);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    let size = 0;

    if (containerRef.current) {
      size = containerRef.current.offsetHeight;
      sizeRef.current = size;
    }

    const onResize = () => {
      if (containerRef.current) {
        size = containerRef.current.offsetHeight;
        sizeRef.current = size;
      }
    };

    window.addEventListener('resize', onResize);
    setTimeout(onResize, 100);

    if (!canvasRef.current) return;

    // Clamp vertical tilt so the user can't flip the globe inside-out.
    const THETA_MIN = -Math.PI / 2 + 0.1;
    const THETA_MAX = Math.PI / 2 - 0.1;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: size * 2 || 100,
      height: size * 2 || 100,
      phi: phiRef.current,
      theta: thetaRef.current,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.15, 0.15, 0.15],
      markerColor: GLOBE_PULSE.markerColor,
      glowColor: [0.15, 0.15, 0.15],
      opacity: 1,
      markers: [],
      onRender: (state) => {
        if (sizeRef.current > 0) {
          state.width = sizeRef.current * 2;
          state.height = sizeRef.current * 2;
        }

        if (isDragging.current) {
          // Velocity is applied directly in the pointer-move handler.
          // Decay it here to zero so release doesn't snap.
          velocity.current.phi *= 0.9;
          velocity.current.theta *= 0.9;
        } else {
          // Inertial spin from the last flick, then settle into the idle drift.
          phiRef.current += velocity.current.phi;
          thetaRef.current += velocity.current.theta;
          velocity.current.phi *= 0.95;
          velocity.current.theta *= 0.95;

          // Gentle auto-rotation once the flick has decayed.
          const idleSpin = 0.002;
          phiRef.current += idleSpin;

          // Ease theta back toward a comfortable tilt when user lets go.
          thetaRef.current += (0.25 - thetaRef.current) * 0.01;
        }

        thetaRef.current = Math.max(THETA_MIN, Math.min(THETA_MAX, thetaRef.current));

        state.phi = phiRef.current;
        state.theta = thetaRef.current;

        const cx = GLOBE_PULSE.originLat;
        const cy = GLOBE_PULSE.originLon;

        const now = Date.now();
        const progress = (now % GLOBE_PULSE.durationMs) / GLOBE_PULSE.durationMs;

        const lat1Rad = cx * Math.PI / 180;
        const lon1Rad = cy * Math.PI / 180;
        const sinLat1 = Math.sin(lat1Rad);
        const cosLat1 = Math.cos(lat1Rad);

        const markers: { location: [number, number]; size: number }[] = [
          { location: [cx, cy], size: GLOBE_PULSE.centerDotSize },
        ];

        GLOBE_PULSE.ripples.forEach((config) => {
          const currentRadius = progress * config.maxScale;
          const opacity = 1 - progress;

          if (currentRadius > GLOBE_PULSE.minVisibleRadius && opacity > GLOBE_PULSE.minVisibleOpacity) {
            const dRad = (currentRadius * Math.PI) / 180;
            const sinD = Math.sin(dRad);
            const cosD = Math.cos(dRad);

            for (let i = 0; i < GLOBE_PULSE.dotCount; i++) {
              const bearing = (i / GLOBE_PULSE.dotCount) * 2 * Math.PI;
              const sinBearing = Math.sin(bearing);
              const cosBearing = Math.cos(bearing);

              const lat2Rad = Math.asin(sinLat1 * cosD + cosLat1 * sinD * cosBearing);
              const lon2Rad =
                lon1Rad +
                Math.atan2(
                  sinBearing * sinD * cosLat1,
                  cosD - sinLat1 * Math.sin(lat2Rad)
                );

              let lat2 = (lat2Rad * 180) / Math.PI;
              let lon2 = (lon2Rad * 180) / Math.PI;

              if (lon2 < -180) lon2 += 360;
              if (lon2 > 180) lon2 -= 360;

              markers.push({
                location: [lat2, lon2],
                size: GLOBE_PULSE.ringDotSize * opacity,
              });
            }
          }
        });

        state.markers = markers;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, []); 

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center z-0 overflow-hidden">
      {/* Square wrapper sized by container height to keep consistent zoom */}
      <div 
        className="relative flex items-center justify-center"
        style={{ 
          height: '100%',
          aspectRatio: '1',
        }}
      >
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            isDragging.current = true;
            lastPointer.current = { x: e.clientX, y: e.clientY };
            lastMoveTime.current = performance.now();
            velocity.current = { phi: 0, theta: 0 };
            e.currentTarget.setPointerCapture(e.pointerId);
            if (containerRef.current) containerRef.current.style.cursor = 'grabbing';
          }}
          onPointerMove={(e) => {
            if (!isDragging.current || !lastPointer.current) return;

            const dx = e.clientX - lastPointer.current.x;
            const dy = e.clientY - lastPointer.current.y;
            lastPointer.current = { x: e.clientX, y: e.clientY };

            // Pointer movement → angular velocity. Scale tuned to feel like
            // 1 screen-width ≈ one full rotation on a mid-sized globe.
            // Google-Earth "grab the globe" feel: point under the cursor tracks
            // with the cursor.
            const phiDelta = dx * 0.005;
            const thetaDelta = dy * 0.005;

            phiRef.current += phiDelta;
            thetaRef.current += thetaDelta;

            // Track velocity so release carries momentum.
            const now = performance.now();
            const dt = Math.max(1, now - lastMoveTime.current);
            lastMoveTime.current = now;
            // Frame-normalized velocity (~16ms/frame baseline).
            velocity.current.phi = (phiDelta / dt) * 16;
            velocity.current.theta = (thetaDelta / dt) * 16;
          }}
          onPointerUp={(e) => {
            isDragging.current = false;
            lastPointer.current = null;
            try {
              e.currentTarget.releasePointerCapture(e.pointerId);
            } catch { /* no capture */ }
            if (containerRef.current) containerRef.current.style.cursor = 'grab';
          }}
          onPointerCancel={() => {
            isDragging.current = false;
            lastPointer.current = null;
            velocity.current = { phi: 0, theta: 0 };
            if (containerRef.current) containerRef.current.style.cursor = 'grab';
          }}
          onPointerLeave={() => {
            if (!isDragging.current && containerRef.current) {
              containerRef.current.style.cursor = 'grab';
            }
          }}
          style={{
            width: '100%',
            height: '100%',
            transform: `scale(${scale})`,
            opacity: isReady ? 1 : 0,
            // Deliberately NOT transitioning `filter`. Animating a filter on a
            // WebGL canvas makes the compositor rasterize it to a static
            // snapshot for the duration, which visibly freezes the globe mid-spin
            // on every theme toggle. A static filter composites per-frame and is fine.
            transition: 'opacity 0.5s ease-out',
            cursor: 'grab',
            touchAction: 'none',
            userSelect: 'none',
          }}
          className={`${theme === 'light' ? 'invert brightness-105' : ''}`}
        />
      </div>
    </div>
  );
};

// ----- MAP CONTENT COMPONENT -----

export const MapContent: React.FC<MapContentProps> = ({ theme }) => {
  const { t, language } = useLanguage();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Globe Layer */}
      <div className="absolute inset-0 z-0">
        <Globe theme={theme} scale={1.35} />
      </div>
      
      {/* Subtle gradient at bottom for legibility */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card/90 to-transparent pointer-events-none z-10"></div>

      {/* Bottom bar - Location & Time info */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-3 sm:p-4">
        <div className="flex items-center gap-3">
          {/* Location Icon - Solid Background */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-page border border-border flex items-center justify-center text-text-main shrink-0 shadow-sm">
            <MapPin size={16} className="sm:w-5 sm:h-5" strokeWidth={1.5} />
          </div>
          
          {/* Text Info */}
          <div className="flex flex-col justify-center">
            <p className="text-[9px] font-bold text-text-muted uppercase tracking-wider leading-tight mb-0.5">
              {t('basedIn')}
            </p>
            <h3 className="text-sm font-bold text-text-main leading-tight">
              {t('location')}
            </h3>
            <p className="text-xs font-mono font-bold text-text-muted mt-0.5 tabular-nums leading-tight">
              {time.toLocaleTimeString(language === 'es' ? 'es-PE' : 'en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Lima' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
