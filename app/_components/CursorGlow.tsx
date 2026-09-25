'use client'
import React, { useEffect, useRef } from 'react';

// A 600px pool of the palette's accent light that trails the pointer —
// the same spotlight idea as brittanychiang.com, eased so it glides.
const GLOW_SIZE = 1200;
const HALF_SIZE = GLOW_SIZE / 2;
const EASE = 0.12;

const CursorGlow: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canHover || reducedMotion) return;

    target.current = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.3 };
    current.current = { ...target.current };

    const node = glowRef.current;
    if (node) node.style.opacity = '1';

    const handlePointerMove = (event: PointerEvent) => {
      target.current = { x: event.clientX, y: event.clientY };
    };

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * EASE;
      current.current.y += (target.current.y - current.current.y) * EASE;

      if (node) {
        node.style.transform = `translate3d(${current.current.x - HALF_SIZE}px, ${
          current.current.y - HALF_SIZE
        }px, 0)`;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        ref={glowRef}
        className="absolute left-0 top-0 opacity-0 transition-opacity duration-700 ease-out will-change-transform"
        style={{
          width: GLOW_SIZE,
          height: GLOW_SIZE,
          background:
            'radial-gradient(600px circle at center, rgba(var(--glow-primary-rgb), 0.11), transparent 80%)',
        }}
      />
    </div>
  );
};

export default CursorGlow;
