'use client'
import React, { useEffect, useRef } from 'react';
import { glyphContours, loopingGlyphPath, toPath, type Glyph } from '@/lib/symbol-morph';

interface MorphGlyphProps {
  symbols: Glyph[];
  className?: string;
  color?: string;
  glow?: string;
  cycleMs?: number;
  morphMs?: number;
}

// A small mark that keeps morphing through `symbols`. It only animates while
// on screen, and holds the first glyph for reduced-motion visitors.
const MorphGlyph: React.FC<MorphGlyphProps> = ({ symbols, className, color = 'currentColor', glow, cycleMs, morphMs }) => {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let begin = 0;
    let running = false;
    const tick = (now: number) => {
      if (!begin) begin = now;
      path.setAttribute('d', loopingGlyphPath(symbols, now - begin, cycleMs, morphMs));
      frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        frame = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
    });
    observer.observe(path);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [symbols, cycleMs, morphMs]);

  return (
    <svg
      aria-hidden
      viewBox="-1.25 -1.25 2.5 2.5"
      className={className}
      style={{ overflow: 'visible', filter: glow ? `drop-shadow(0 0 0.35em ${glow})` : undefined }}
    >
      <path ref={pathRef} d={toPath(glyphContours(symbols[0]))} fill={color} />
    </svg>
  );
};

export default MorphGlyph;
