'use client'
import React from 'react';
import Link from 'next/link';
import { PERSONAL_RED } from '@/config/personal.config';
import { PERSONAL_SYMBOLS } from '@/lib/symbol-morph';
import MorphGlyph from './MorphGlyph';

// The door from the professional page to /personal, styled after the
// anthology title card: a mark that keeps morphing through what fills the
// off-hours (coding, gaming, riding, fitness) and a title that glitches on
// hover.
const TITLE = 'Get to know me';

const PersonalLink: React.FC = () => (
  <Link
    href="/personal"
    aria-label="Get to know me: the personal side, coding, gaming, riding and fitness"
    className="group !mt-10 flex w-fit items-center gap-4"
  >
    <MorphGlyph
      symbols={PERSONAL_SYMBOLS}
      color={PERSONAL_RED}
      glow={`${PERSONAL_RED}99`}
      className="h-11 w-11 shrink-0 transition-transform duration-300 ease-out [@media(hover:hover)]:group-hover:scale-110"
    />
    <span className="flex flex-col">
      <span className="font-hud text-[10px] uppercase tracking-[0.35em] text-secondary">Ep. 02 · Off the clock</span>
      <span className="relative mt-1 block text-lg font-display uppercase leading-none tracking-tight text-foreground">
        {TITLE}
        <span aria-hidden className="intro-glitch-a hidden [@media(hover:hover)]:group-hover:block group-focus-visible:block">
          {TITLE}
        </span>
        <span aria-hidden className="intro-glitch-b hidden [@media(hover:hover)]:group-hover:block group-focus-visible:block">
          {TITLE}
        </span>
      </span>
      <span className="mt-1.5 font-hud text-[10px] uppercase tracking-[0.25em] text-secondary">
        Code · Gaming · Rides <span style={{ color: PERSONAL_RED }}>+</span> Fitness
      </span>
    </span>
    <span
      aria-hidden
      className="text-lg text-secondary transition-transform duration-300 ease-out [@media(hover:hover)]:group-hover:translate-x-1.5"
    >
      →
    </span>
  </Link>
);

export default PersonalLink;
