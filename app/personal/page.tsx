import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PERSONAL_RED } from '@/config/personal.config';
import { PERSONAL_SYMBOLS } from '@/lib/symbol-morph';
import MorphGlyph from '../_components/MorphGlyph';

export const metadata: Metadata = {
  title: 'Personal',
  description: 'The personal side of Rob Caldosa: coding, gaming, riding and fitness. In progress.',
};

// Episode 02. A fixed black-and-signal-red look, inspired by the anthology
// title cards, independent of the professional site's theme. The page is a
// placeholder for now: hero portrait and title only.

const GlitchText: React.FC<{ children: string }> = ({ children }) => (
  <span className="relative inline-block">
    {children}
    <span aria-hidden className="intro-glitch-a">
      {children}
    </span>
    <span aria-hidden className="intro-glitch-b">
      {children}
    </span>
  </span>
);

export default function PersonalPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <div aria-hidden className="intro-scanlines pointer-events-none fixed inset-0 z-20 opacity-40" />

      <header className="relative z-30 mx-auto flex max-w-screen-xl items-center justify-between px-6 py-6 font-hud text-[10px] uppercase tracking-[0.35em] text-white/50 md:px-12">
        <Link href="/" className="transition-colors duration-150 [@media(hover:hover)]:hover:text-white">
          ← <span className="hidden sm:inline">Ep. 01 · </span>Professional
        </Link>
        {/* The personal mark: coding → gaming → riding → fitness → "+" */}
        <MorphGlyph
          symbols={PERSONAL_SYMBOLS}
          color={PERSONAL_RED}
          glow={`${PERSONAL_RED}aa`}
          className="absolute left-1/2 h-8 w-8 -translate-x-1/2"
        />
        <span>Ep. 02<span className="hidden sm:inline"> · Personal</span></span>
      </header>

      <section className="relative z-10 mx-auto flex max-w-screen-xl flex-col items-center px-6 pb-16 md:px-12">
        {/* Red light bleeding out from behind the portrait. */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[12%] h-[70vh] w-[70vh] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${PERSONAL_RED}40, transparent 65%)` }}
        />

        <div className="relative w-full max-w-[min(24rem,58vh)]">
          <Image
            src="/personal/portrait.jpg"
            alt="Rob Caldosa, half photograph and half illustration of the things he loves: samurai and anime worlds, late-night coding, rides along the coast, playing in a band, his dog and cat, and pixel art."
            width={1024}
            height={1536}
            priority
            sizes="(max-width: 768px) 90vw, 24rem"
            className="relative h-auto w-full"
            style={{
              // Feather the edges into the black instead of framing the image.
              maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 60%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 60%, transparent 100%)',
            }}
          />
        </div>

        <h1 className="relative m-0 -mt-[18%] text-center font-display uppercase leading-[0.9] tracking-tight text-[clamp(1.8rem,8vw,4.4rem)]">
          <span className="intro-flicker block">
            <GlitchText>Code, Play</GlitchText>
          </span>
          <span className="flex items-center justify-center gap-[0.15em]">
            <span style={{ color: PERSONAL_RED, textShadow: `0 0 28px ${PERSONAL_RED}` }}>+</span>
            <GlitchText>Ride</GlitchText>
          </span>
        </h1>

        <p className="mt-8 flex items-center gap-3 font-hud text-[11px] uppercase tracking-[0.4em] text-white/60">
          <span
            aria-hidden
            className="intro-blink inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: PERSONAL_RED, boxShadow: `0 0 10px ${PERSONAL_RED}` }}
          />
          Episode in production
        </p>
      </section>
    </main>
  );
}
