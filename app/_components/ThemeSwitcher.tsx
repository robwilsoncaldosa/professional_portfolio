'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronLeftIcon, ChevronRightIcon, PaletteIcon, RotateCcwIcon } from 'lucide-react';
import {
  THEME_PALETTES,
  DEFAULT_PALETTE_ID,
  applyPalette,
  storePalette,
  clearStoredPalette,
  getStoredPaletteId,
  type ThemePalette,
} from '../../config/theme-palettes.config';

// Floating palette picker for comparing themes on the real page instead of
// bouncing between /theme-lab and home. Always on in development. In
// production it stays hidden unless this browser has been unlocked by
// visiting any page with `?themes=<NEXT_PUBLIC_THEME_SWITCHER_KEY>`
// (`?themes=off` locks it again).
const ENABLE_FLAG_KEY = 'portfolio-theme-switcher-enabled';
const UNLOCK_KEY = process.env.NEXT_PUBLIC_THEME_SWITCHER_KEY;

const GROUPS: { title: string; category: ThemePalette['category'] }[] = [
  { title: 'Espresso', category: 'espresso' },
  { title: 'Dark Blue-Violet', category: 'blue-violet' },
  { title: 'Your Own Glow', category: 'own' },
  { title: 'Signature Glow', category: 'signature' },
  { title: 'Dark & Masculine', category: 'dark' },
  { title: 'Premium & Calm', category: 'premium' },
  { title: 'Originals', category: undefined },
];

const ThemeSwitcher: React.FC = () => {
  const pathname = usePathname();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState(DEFAULT_PALETTE_ID);

  const groups = useMemo(
    () =>
      GROUPS.map((group) => ({
        ...group,
        palettes: THEME_PALETTES.filter((palette) => palette.category === group.category),
      })).filter((group) => group.palettes.length > 0),
    []
  );
  const ordered = useMemo(() => groups.flatMap((group) => group.palettes), [groups]);

  useEffect(() => {
    try {
      const param = new URLSearchParams(window.location.search).get('themes');
      if (param === 'off') localStorage.removeItem(ENABLE_FLAG_KEY);
      else if (UNLOCK_KEY && param === UNLOCK_KEY) localStorage.setItem(ENABLE_FLAG_KEY, '1');
      setIsEnabled(
        process.env.NODE_ENV === 'development' ||
          (!!UNLOCK_KEY && localStorage.getItem(ENABLE_FLAG_KEY) === '1')
      );
      setActiveId(getStoredPaletteId() || DEFAULT_PALETTE_ID);
    } catch {
      setIsEnabled(process.env.NODE_ENV === 'development');
    }
  }, []);

  const select = useCallback((palette: ThemePalette) => {
    applyPalette(palette);
    try {
      storePalette(palette);
    } catch {}
    setActiveId(palette.id);
  }, []);

  const step = useCallback(
    (direction: 1 | -1) => {
      const index = ordered.findIndex((palette) => palette.id === activeId);
      const next = ordered[(index + direction + ordered.length) % ordered.length];
      select(next);
    },
    [activeId, ordered, select]
  );

  useEffect(() => {
    if (!isEnabled) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('input, textarea, [contenteditable="true"]')) return;
      if (event.key === ']') step(1);
      else if (event.key === '[') step(-1);
      else if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEnabled, step]);

  if (!isEnabled || pathname.startsWith('/personal')) return null;

  const active = THEME_PALETTES.find((palette) => palette.id === activeId);

  const handleReset = () => {
    try {
      clearStoredPalette();
    } catch {}
    window.location.reload();
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-2 text-foreground">
      <div
        className={`max-h-[60vh] w-72 origin-bottom-right overflow-y-auto rounded-xl border border-border bg-card/95 p-2 shadow-2xl backdrop-blur transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none ${
          isOpen ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
        }`}
        aria-hidden={!isOpen}
      >
        {groups.map((group) => (
          <div key={group.title} className="mb-2 last:mb-0">
            <div className="px-2 pb-1 pt-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {group.title}
            </div>
            {group.palettes.map((palette) => (
              <button
                key={palette.id}
                type="button"
                tabIndex={isOpen ? 0 : -1}
                onClick={() => select(palette)}
                className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition-colors duration-150 ease-out [@media(hover:hover)]:hover:bg-accent/60 ${
                  palette.id === activeId ? 'bg-accent text-foreground' : 'text-secondary'
                }`}
              >
                <Swatches palette={palette} />
                <span className="truncate">{palette.name}</span>
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1 rounded-full border border-border bg-card/95 p-1 shadow-xl backdrop-blur">
        <IconButton label="Previous palette ( [ )" onClick={() => step(-1)}>
          <ChevronLeftIcon className="h-4 w-4" />
        </IconButton>
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          className="flex max-w-[11rem] items-center gap-2 rounded-full px-2 py-1 text-xs transition-transform duration-150 ease-out active:scale-[0.97] motion-reduce:transition-none"
        >
          {active ? <Swatches palette={active} /> : <PaletteIcon className="h-4 w-4" />}
          <span className="truncate">{active?.name ?? 'Palettes'}</span>
        </button>
        <IconButton label="Next palette ( ] )" onClick={() => step(1)}>
          <ChevronRightIcon className="h-4 w-4" />
        </IconButton>
        <IconButton label="Reset to default palette" onClick={handleReset}>
          <RotateCcwIcon className="h-3.5 w-3.5" />
        </IconButton>
      </div>
    </div>
  );
};

const Swatches: React.FC<{ palette: ThemePalette }> = ({ palette }) => (
  <span className="flex shrink-0 -space-x-1">
    {[palette.swatch.background, palette.swatch.card, palette.swatch.accent].map((color, index) => (
      <span
        key={index}
        className="h-3.5 w-3.5 rounded-full border border-white/15"
        style={{ backgroundColor: color }}
      />
    ))}
  </span>
);

const IconButton: React.FC<{
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ label, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    title={label}
    className="flex h-7 w-7 items-center justify-center rounded-full text-secondary transition-[color,transform] duration-150 ease-out active:scale-[0.92] motion-reduce:transition-none [@media(hover:hover)]:hover:text-foreground"
  >
    {children}
  </button>
);

export default ThemeSwitcher;
