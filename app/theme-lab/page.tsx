'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import CursorGlow from '../_components/CursorGlow';
import {
  THEME_PALETTES,
  DEFAULT_PALETTE_ID,
  applyPalette,
  storePalette,
  clearStoredPalette,
  getStoredPaletteId,
  type ThemePalette,
} from '../../config/theme-palettes.config';

const DEFAULT_PALETTE =
  THEME_PALETTES.find((palette) => palette.id === DEFAULT_PALETTE_ID) ?? THEME_PALETTES[0];

export default function ThemeLabPage() {
  const [activeId, setActiveId] = useState<string>(DEFAULT_PALETTE_ID);

  useEffect(() => {
    setActiveId(getStoredPaletteId() || DEFAULT_PALETTE_ID);
  }, []);

  const handleSelect = (palette: ThemePalette) => {
    applyPalette(palette);
    storePalette(palette);
    setActiveId(palette.id);
  };

  const handleReset = () => {
    clearStoredPalette();
    window.location.reload();
  };

  return (
    <main className="w-full min-h-screen relative">
      <CursorGlow />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 relative z-10">
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-sm text-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="Back to home"
        >
          <span className="mr-2">←</span>
          <span>Back to home</span>
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Theme Lab</h1>
        <p className="text-secondary mb-10 max-w-xl">
          Every palette considered for this site, live. Pick one to preview it across the whole
          site instantly — it&apos;s saved only in this browser, nobody else sees it.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {THEME_PALETTES.map((palette) => {
            const isActive = palette.id === activeId;
            return (
              <button
                key={palette.id}
                type="button"
                onClick={() => handleSelect(palette)}
                className={`group relative rounded-xl border p-5 text-left transition-all duration-200 ease-out hover:border-ring/50 hover:bg-accent/20 ${
                  isActive ? 'border-ring bg-ring/5' : 'border-border bg-card/40'
                }`}
              >
                <div className="mb-4 flex items-center gap-2">
                  <span
                    className="h-6 w-6 rounded-full border border-white/10"
                    style={{ backgroundColor: palette.swatch.background }}
                  />
                  <span
                    className="h-6 w-6 rounded-full border border-white/10"
                    style={{ backgroundColor: palette.swatch.card }}
                  />
                  <span
                    className="h-6 w-6 rounded-full border border-white/10"
                    style={{ backgroundColor: palette.swatch.accent }}
                  />
                  {isActive && (
                    <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-ring/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ring">
                      <CheckIcon className="h-3 w-3" /> Applied
                    </span>
                  )}
                </div>
                <div className="text-sm font-bold text-foreground">{palette.name}</div>
                <p className="mt-1 text-xs text-secondary">{palette.tagline}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-10 rounded-xl border border-border bg-card/40 p-6">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-secondary">
            Live preview
          </p>
          <h2 className="text-2xl font-bold text-foreground">Rob Wilson</h2>
          <p className="mt-1 text-sm text-secondary">Senior Software Developer</p>
          <p className="mt-3 max-w-md text-sm text-secondary">
            This card uses the exact same tokens as the rest of the site, so whatever you pick
            above is exactly what visitors would see.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge>React</Badge>
            <Badge>Next.js</Badge>
            <Badge>Tailwind CSS</Badge>
          </div>
          <button
            type="button"
            className="mt-5 rounded-full border border-ring/40 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-foreground transition-all duration-200 ease-out hover:border-ring hover:bg-ring/10 active:scale-[0.97]"
          >
            Say Hello
          </button>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="mt-6 text-xs text-secondary underline underline-offset-4 hover:text-foreground"
        >
          Reset to default ({DEFAULT_PALETTE.name})
        </button>
      </div>
    </main>
  );
}
