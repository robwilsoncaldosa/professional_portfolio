'use client'
import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  DEFAULT_PALETTE_ID,
  applyUserPalette,
  pickRandomPalette,
  getStoredPaletteId,
} from '../../config/theme-palettes.config';
import {
  THEME_SYMBOLS,
  blendGlyphs,
  easeInOut,
  glyphContours,
  revealMetrics,
  toPath,
  type Contour,
  type Glyph,
} from '@/lib/symbol-morph';

// Theme shuffle, after the anthology title cards: a glyph in the corner.
// Clicking it shuffles through a couple of symbols (RGB-split glitching
// while it does), lands on a new one, and then that exact shape grows out
// of the button, rotating into place, to reveal the next palette (View
// Transitions API). Without View Transitions the glyph still morphs and
// the palette fades via the CSS-variable transitions in globals.css.

const GLYPH = 34; // px, rendered glyph size
const SHUFFLE_STEP_MS = 120;
const LAND_MS = 260;
const REVEAL_MS = 1100;
const REVEAL_FRAMES = 30;
const REVEAL_POINTS_STEP = 2; // every 2nd point is plenty for clip-path

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

const pickOther = (exclude: number[]) => {
  const pool = THEME_SYMBOLS.map((_, i) => i).filter((i) => !exclude.includes(i));
  return pool[Math.floor(Math.random() * pool.length)];
};

// Keyframes for `::view-transition-new(root)`: the landed glyph, its
// deepest point pinned to the button, growing from glyph size until even its
// thinnest part clears the farthest viewport corner, and unwinding a sixth
// of a turn as it goes. Multi-piece glyphs (</>, the gamepad) work too:
// clip-path path() takes several subpaths and keeps the holes.
function revealKeyframes(shape: Glyph, cx: number, cy: number) {
  const { anchor, clearance } = revealMetrics(shape);
  const reach = Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy));
  const start = GLYPH / 2 / 1.25;
  const end = (reach / Math.max(clearance, 0.02)) * 1.04;
  const contours = glyphContours(shape).map((contour) =>
    contour.filter((_, i) => i % REVEAL_POINTS_STEP === 0).map(([x, y]) => [x - anchor[0], y - anchor[1]])
  );

  return Array.from({ length: REVEAL_FRAMES }, (_, frame) => {
    const t = easeOutQuart(frame / (REVEAL_FRAMES - 1));
    const scale = start * Math.pow(end / start, t); // exponential growth reads as constant speed
    const angle = (1 - t) * (-Math.PI / 3);
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const d = contours
      .map(
        (contour) =>
          `M${contour
            .map(([x, y]) => `${(cx + (x * cos - y * sin) * scale).toFixed(1)} ${(cy + (x * sin + y * cos) * scale).toFixed(1)}`)
            .join('L')}Z`
      )
      .join('');
    return { clipPath: `path('${d}')` };
  });
}

const ThemeRandomizer: React.FC = () => {
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const paths = useRef<(SVGPathElement | null)[]>([]);
  const shapeIndex = useRef(4); // starts on the "+"
  const busy = useRef(false);
  const currentId = useRef(DEFAULT_PALETTE_ID);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const frame = useRef(0);
  const [shuffling, setShuffling] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    // From here on theme swaps may fade; before this a saved theme must not.
    const raf = requestAnimationFrame(() => document.documentElement.classList.add('theme-anim'));
    try {
      currentId.current = getStoredPaletteId() || DEFAULT_PALETTE_ID;
    } catch {}
    const pending = timers.current;
    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(frame.current);
      pending.forEach(clearTimeout);
    };
  }, []);

  // The personal page has its own fixed look; the theme switcher belongs to the professional side.
  if (pathname.startsWith('/personal')) return null;

  const later = (ms: number, fn: () => void) => timers.current.push(setTimeout(fn, ms));
  const draw = (contours: Contour[]) => {
    const d = toPath(contours);
    paths.current.forEach((path) => path?.setAttribute('d', d));
  };

  // Morphs through `sequence` (indices into THEME_SYMBOLS): quick linear
  // hops for the shuffle, an eased landing on the last one.
  const shuffle = (sequence: number[], onDone: () => void) => {
    const segments = sequence.slice(1).map((to, i) => ({
      from: THEME_SYMBOLS[sequence[i]],
      to: THEME_SYMBOLS[to] as Glyph,
      duration: i === sequence.length - 2 ? LAND_MS : SHUFFLE_STEP_MS,
      eased: i === sequence.length - 2,
    }));
    let segment = 0;
    let segmentStart = performance.now();
    const tick = (now: number) => {
      const current = segments[segment];
      const progress = Math.min(1, (now - segmentStart) / current.duration);
      draw(blendGlyphs(current.from, current.to, current.eased ? easeInOut(progress) : progress));
      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
      } else if (segment < segments.length - 1) {
        segment += 1;
        segmentStart = now;
        frame.current = requestAnimationFrame(tick);
      } else {
        onDone();
      }
    };
    frame.current = requestAnimationFrame(tick);
  };

  const change = () => {
    if (busy.current) return;
    busy.current = true;

    const palette = pickRandomPalette(currentId.current);
    currentId.current = palette.id;
    const from = shapeIndex.current;
    const first = pickOther([from]);
    const second = pickOther([from, first]);
    const target = pickOther([from, first, second]);
    shapeIndex.current = target;

    const announce = () => {
      setLabel(palette.name);
      later(2800, () => setLabel(null));
    };

    if (prefersReducedMotion()) {
      draw(glyphContours(THEME_SYMBOLS[target]));
      applyUserPalette(palette);
      announce();
      busy.current = false;
      return;
    }

    setShuffling(true);
    shuffle([from, first, second, target], () => {
      setShuffling(false);
      const root = document.documentElement;
      const button = buttonRef.current;
      const commit = () => applyUserPalette(palette);

      if (button && typeof document.startViewTransition === 'function') {
        const rect = button.getBoundingClientRect();
        const keyframes = revealKeyframes(THEME_SYMBOLS[target], rect.left + rect.width / 2, rect.top + rect.height / 2);
        root.classList.add('theme-vt');
        const transition = document.startViewTransition(commit);
        transition.ready
          .then(() => {
            root.animate(keyframes, { duration: REVEAL_MS, easing: 'linear', pseudoElement: '::view-transition-new(root)' });
          })
          .catch(() => {});
        transition.finished.finally(() => {
          root.classList.remove('theme-vt');
          busy.current = false;
        });
      } else {
        commit();
        busy.current = false;
      }
      announce();
    });
  };

  const initial = toPath(glyphContours(THEME_SYMBOLS[4]));
  const layer = (index: number, className: string, color: string) => (
    <svg
      aria-hidden
      viewBox="-1.25 -1.25 2.5 2.5"
      className={`absolute inset-0 m-auto ${className}`}
      style={{ width: GLYPH, height: GLYPH, color, overflow: 'visible' }}
    >
      <path ref={(node) => { paths.current[index] = node; }} d={initial} fill="currentColor" />
    </svg>
  );

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 text-foreground">
      <span
        aria-live="polite"
        className={`pointer-events-none whitespace-nowrap rounded-full bg-card/90 px-3 py-1 font-hud text-[10px] uppercase tracking-[0.25em] text-secondary backdrop-blur transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
          label ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
        }`}
      >
        {label}
      </span>

      <button
        ref={buttonRef}
        type="button"
        onClick={change}
        aria-label="Shuffle the theme"
        title="Shuffle the theme"
        data-shuffling={shuffling}
        className="theme-glyph group relative block h-12 w-12 rounded-full outline-none transition-transform duration-150 ease-out active:scale-[0.92] focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span
          className="theme-glyph-inner absolute inset-0 block"
          style={{ filter: 'drop-shadow(0 0 10px hsl(var(--ring) / 0.6))' }}
        >
          {layer(1, 'theme-glyph-glitch intro-glitch-a', '#ff2d55')}
          {layer(2, 'theme-glyph-glitch intro-glitch-b', '#19e3ff')}
          {layer(0, '', 'hsl(var(--ring))')}
        </span>
      </button>
    </div>
  );
};

export default ThemeRandomizer;
