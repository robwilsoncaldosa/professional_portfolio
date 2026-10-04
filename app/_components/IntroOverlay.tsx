'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { INTRO_AUDIO_SRC, INTRO_STORAGE_KEY } from '../../config/intro.config';
import { PERSONAL_RED } from '@/config/personal.config';
import { PERSONAL_SYMBOLS, SYMBOLS, blendGlyphs, easeInOut, toPath, type Glyph } from '@/lib/symbol-morph';

// A short, original title sting in the spirit of an anthology-show cold
// open: black screen, a hit, the name tearing in with RGB-split glitches,
// then a CRT-style cut to the page. The sound is synthesized live with the
// Web Audio API, so there is no audio file and nothing borrowed.
//
// Browsers only allow sound after a user gesture, so the intro waits on a
// black "choose an episode" screen: Professional (the main page) or
// Personal (/personal). Picking one is the gesture that unlocks sound.
// The Professional episode morphs code → AI → cloud → network → "+";
// Personal morphs coding, gaming, riding and fitness glyphs instead. It plays once per session and is
// skipped for reduced motion (see INTRO_INIT_SCRIPT in intro.config.ts).

type Phase = 'gate' | 'playing' | 'closing' | 'done';

const TITLE_LINE_ONE = 'ROB WILSON';
const TITLE_LINE_TWO = 'CALDOSA';
type Episode = 'professional' | 'personal';

const EPISODES: Record<Episode, { number: string; label: string; href: string; subtitle: string }> = {
  professional: { number: '01', label: 'Professional', href: '/', subtitle: 'Senior Software Developer' },
  personal: { number: '02', label: 'Personal', href: '/personal', subtitle: 'Off the clock' },
};


// ms after the gesture
const MORPH_START = 100;
const MORPH_CYCLE = 420; // hold + morph per symbol
const MORPH_TIME = 300;
const SYMBOL_COUNT = SYMBOLS.length; // both episodes use five glyphs
const T_LINE_ONE = 2150;
const T_PLUS = 2600;
const T_LINE_TWO = 2950;
const T_SUBTITLE = 3700;
const T_CLOSE = 4950;
const T_DONE = 5400;

// Samples the morph at `elapsed` ms. Between symbols the points blend with
// an eased curve; on each landing the shape gets a short scale kick.
function symbolAt(symbols: Glyph[], elapsed: number) {
  const count = symbols.length;
  const local = Math.max(0, elapsed - MORPH_START);
  const cycle = Math.min(Math.floor(local / MORPH_CYCLE), count - 1);
  const within = local - cycle * MORPH_CYCLE;
  const last = cycle >= count - 1;
  const amount = last ? 0 : within <= MORPH_CYCLE - MORPH_TIME ? 0 : easeInOut((within - (MORPH_CYCLE - MORPH_TIME)) / MORPH_TIME);
  const contours = blendGlyphs(symbols[cycle], symbols[Math.min(cycle + 1, count - 1)], amount);

  const sinceLanding = last ? local - (count - 1) * MORPH_CYCLE : within;
  const kick = cycle === 0 && local < MORPH_CYCLE - MORPH_TIME ? 0 : Math.max(0, 1 - sinceLanding / 160);
  return { d: toPath(contours), scale: 1 + 0.14 * kick * kick, pop: Math.min(1, elapsed / 90) };
}

// Set INTRO_AUDIO_SRC in config/intro.config.ts to a file you have the
// rights to (placed in /public) and it plays instead of the synth sting.

function playSting(ctx: AudioContext) {
  const t0 = ctx.currentTime + 0.02;

  const compressor = ctx.createDynamicsCompressor();
  const master = ctx.createGain();
  master.gain.value = 0.55;
  master.connect(compressor);
  compressor.connect(ctx.destination);

  const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const noiseData = noiseBuffer.getChannelData(0);
  for (let i = 0; i < noiseData.length; i++) noiseData[i] = Math.random() * 2 - 1;

  const noiseBurst = (at: number, length: number, from: number, to: number, peak: number) => {
    const source = ctx.createBufferSource();
    source.buffer = noiseBuffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.value = 1.4;
    filter.frequency.setValueAtTime(from, at);
    filter.frequency.exponentialRampToValueAtTime(to, at + length);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.exponentialRampToValueAtTime(peak, at + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + length);
    source.connect(filter).connect(gain).connect(master);
    source.start(at, Math.random());
    source.stop(at + length + 0.05);
  };

  // Riser into the first hit.
  const riser = ctx.createOscillator();
  riser.type = 'sawtooth';
  const riseAt = t0 + T_LINE_ONE / 1000 - 0.2;
  riser.frequency.setValueAtTime(60, riseAt);
  riser.frequency.exponentialRampToValueAtTime(700, riseAt + 0.18);
  const riserFilter = ctx.createBiquadFilter();
  riserFilter.type = 'lowpass';
  riserFilter.frequency.setValueAtTime(200, riseAt);
  riserFilter.frequency.exponentialRampToValueAtTime(5000, riseAt + 0.18);
  const riserGain = ctx.createGain();
  riserGain.gain.setValueAtTime(0.0001, riseAt);
  riserGain.gain.exponentialRampToValueAtTime(0.22, riseAt + 0.17);
  riserGain.gain.exponentialRampToValueAtTime(0.0001, riseAt + 0.2);
  riser.connect(riserFilter).connect(riserGain).connect(master);
  riser.start(riseAt);
  riser.stop(riseAt + 0.25);

  // A low drone that climbs under the symbols, with a tick on each landing.
  const drone = ctx.createOscillator();
  drone.type = 'sawtooth';
  drone.frequency.setValueAtTime(40, t0);
  drone.frequency.exponentialRampToValueAtTime(130, t0 + T_LINE_ONE / 1000);
  const droneFilter = ctx.createBiquadFilter();
  droneFilter.type = 'lowpass';
  droneFilter.frequency.value = 380;
  const droneGain = ctx.createGain();
  droneGain.gain.setValueAtTime(0.0001, t0);
  droneGain.gain.exponentialRampToValueAtTime(0.12, t0 + T_LINE_ONE / 1000 - 0.05);
  droneGain.gain.exponentialRampToValueAtTime(0.0001, t0 + T_LINE_ONE / 1000 + 0.05);
  drone.connect(droneFilter).connect(droneGain).connect(master);
  drone.start(t0);
  drone.stop(t0 + T_LINE_ONE / 1000 + 0.1);

  for (let k = 1; k < SYMBOL_COUNT; k++) {
    const at = t0 + (MORPH_START + k * MORPH_CYCLE) / 1000;
    const tick = ctx.createOscillator();
    tick.type = 'square';
    tick.frequency.setValueAtTime(900 + k * 260, at);
    tick.frequency.exponentialRampToValueAtTime(120, at + 0.09);
    const tickGain = ctx.createGain();
    tickGain.gain.setValueAtTime(0.0001, at);
    tickGain.gain.exponentialRampToValueAtTime(0.14, at + 0.005);
    tickGain.gain.exponentialRampToValueAtTime(0.0001, at + 0.11);
    tick.connect(tickGain).connect(master);
    tick.start(at);
    tick.stop(at + 0.12);
    noiseBurst(at, 0.08, 4000, 900, 0.2);
  }

  // Sub boom on the name.
  const boomAt = t0 + T_LINE_ONE / 1000;
  const boom = ctx.createOscillator();
  boom.type = 'sine';
  boom.frequency.setValueAtTime(110, boomAt);
  boom.frequency.exponentialRampToValueAtTime(36, boomAt + 0.9);
  const boomGain = ctx.createGain();
  boomGain.gain.setValueAtTime(0.0001, boomAt);
  boomGain.gain.exponentialRampToValueAtTime(1, boomAt + 0.015);
  boomGain.gain.exponentialRampToValueAtTime(0.0001, boomAt + 1.7);
  boom.connect(boomGain).connect(master);
  boom.start(boomAt);
  boom.stop(boomAt + 1.8);

  noiseBurst(boomAt, 0.35, 5000, 300, 0.5);

  // Glitch stutter while the title tears in.
  const stutter = ctx.createOscillator();
  stutter.type = 'square';
  const stutterGain = ctx.createGain();
  stutterGain.gain.value = 0.0001;
  stutter.connect(stutterGain).connect(master);
  const notes = [440, 220, 880, 110, 660, 330, 990, 165];
  for (let i = 0; i < 14; i++) {
    const at = boomAt + 0.1 + i * 0.045;
    stutter.frequency.setValueAtTime(notes[i % notes.length], at);
    stutterGain.gain.setValueAtTime(i % 3 === 2 ? 0.0001 : 0.05, at);
  }
  stutterGain.gain.setValueAtTime(0.0001, boomAt + 0.8);
  stutter.start(boomAt);
  stutter.stop(boomAt + 0.9);

  // The "+" slam.
  const plusAt = t0 + T_PLUS / 1000;
  const zap = ctx.createOscillator();
  zap.type = 'triangle';
  zap.frequency.setValueAtTime(1400, plusAt);
  zap.frequency.exponentialRampToValueAtTime(90, plusAt + 0.22);
  const zapGain = ctx.createGain();
  zapGain.gain.setValueAtTime(0.0001, plusAt);
  zapGain.gain.exponentialRampToValueAtTime(0.35, plusAt + 0.01);
  zapGain.gain.exponentialRampToValueAtTime(0.0001, plusAt + 0.3);
  zap.connect(zapGain).connect(master);
  zap.start(plusAt);
  zap.stop(plusAt + 0.35);
  noiseBurst(plusAt, 0.18, 3000, 600, 0.35);

  // Second hit as the surname lands.
  const hitAt = t0 + T_LINE_TWO / 1000;
  const hit = ctx.createOscillator();
  hit.type = 'sine';
  hit.frequency.setValueAtTime(90, hitAt);
  hit.frequency.exponentialRampToValueAtTime(32, hitAt + 0.7);
  const hitGain = ctx.createGain();
  hitGain.gain.setValueAtTime(0.0001, hitAt);
  hitGain.gain.exponentialRampToValueAtTime(0.9, hitAt + 0.012);
  hitGain.gain.exponentialRampToValueAtTime(0.0001, hitAt + 1.4);
  hit.connect(hitGain).connect(master);
  hit.start(hitAt);
  hit.stop(hitAt + 1.5);
  noiseBurst(hitAt, 0.28, 4200, 220, 0.45);

  // Low, detuned pad that swells under the subtitle and fades with the cut.
  const padAt = t0 + T_LINE_TWO / 1000 + 0.1;
  const padFilter = ctx.createBiquadFilter();
  padFilter.type = 'lowpass';
  padFilter.frequency.setValueAtTime(300, padAt);
  padFilter.frequency.exponentialRampToValueAtTime(1400, padAt + 1.4);
  const padGain = ctx.createGain();
  padGain.gain.setValueAtTime(0.0001, padAt);
  padGain.gain.exponentialRampToValueAtTime(0.16, padAt + 1.0);
  padGain.gain.exponentialRampToValueAtTime(0.0001, padAt + 2.3);
  padFilter.connect(padGain).connect(master);
  [55, 82.5, 110.7, 164.8].forEach((frequency, index) => {
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.value = frequency;
    osc.detune.value = index % 2 ? 9 : -9;
    osc.connect(padFilter);
    osc.start(padAt);
    osc.stop(padAt + 2.4);
  });

  // CRT power-down chirp on the cut.
  const offAt = t0 + T_CLOSE / 1000;
  const off = ctx.createOscillator();
  off.type = 'sine';
  off.frequency.setValueAtTime(2200, offAt);
  off.frequency.exponentialRampToValueAtTime(60, offAt + 0.3);
  const offGain = ctx.createGain();
  offGain.gain.setValueAtTime(0.0001, offAt);
  offGain.gain.exponentialRampToValueAtTime(0.12, offAt + 0.02);
  offGain.gain.exponentialRampToValueAtTime(0.0001, offAt + 0.35);
  off.connect(offGain).connect(master);
  off.start(offAt);
  off.stop(offAt + 0.4);
}

const IntroOverlay: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('gate');
  const [step, setStep] = useState(0); // 1 line one, 2 plus, 3 line two, 4 subtitle
  const [flash, setFlash] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const audio = useRef<AudioContext | null>(null);

  const finish = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    document.documentElement.dataset.intro = 'done';
    try {
      sessionStorage.setItem(INTRO_STORAGE_KEY, '1');
    } catch {}
    setPhase('done');
    const ctx = audio.current;
    if (ctx) setTimeout(() => ctx.close().catch(() => {}), 2500);
  }, []);

  const started = useRef(false);
  const router = useRouter();
  const pathname = usePathname();
  const [episode, setEpisode] = useState<Episode>('professional');

  const start = useCallback((chosen: Episode) => {
    if (started.current) return;
    started.current = true;
    setEpisode(chosen);
    setPhase('playing');

    // Load the chosen page underneath while the title plays.
    const target = EPISODES[chosen].href;
    const onPersonal = pathname.startsWith('/personal');
    if ((chosen === 'personal') !== onPersonal) router.prefetch(target);

    try {
      const Context =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (INTRO_AUDIO_SRC) {
        void new Audio(INTRO_AUDIO_SRC).play().catch(() => {});
      } else if (Context) {
        const ctx = new Context();
        audio.current = ctx;
        void ctx.resume().then(() => playSting(ctx));
      }
    } catch {}

    const at = (ms: number, fn: () => void) => timers.current.push(setTimeout(fn, ms));
    const blink = (ms: number) => {
      setFlash(true);
      timers.current.push(setTimeout(() => setFlash(false), ms));
    };
    at(0, () => blink(70));
    at(T_LINE_ONE, () => setStep(1));
    at(T_PLUS, () => {
      setStep(2);
      blink(60);
    });
    at(T_LINE_TWO, () => {
      setStep(3);
      blink(80);
      if ((chosen === 'personal') !== onPersonal) router.push(target, { scroll: true });
    });
    at(T_SUBTITLE, () => setStep(4));
    at(T_CLOSE, () => setPhase('closing'));
    at(T_DONE, finish);
  }, [finish, pathname, router]);

  useEffect(() => {
    if (document.documentElement.dataset.intro === 'skip') {
      setPhase('done');
      return;
    }
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase === 'done') return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') finish();
      else if (phase === 'gate' && event.key === '1') start('professional');
      else if (phase === 'gate' && event.key === '2') start('personal');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, start, finish]);

  if (phase === 'done') return null;

  const accent = episode === 'personal' ? PERSONAL_RED : 'hsl(var(--ring))';

  return (
    <div
      role="dialog"
      aria-label="Intro"
      className="intro-overlay fixed inset-0 z-[100] flex select-none items-center justify-center overflow-hidden bg-black text-white"
      style={{
        // CRT power-off: the frame collapses to a bright line, then a dot.
        transform: phase === 'closing' ? 'scaleY(0.004)' : 'scaleY(1)',
        filter: phase === 'closing' ? 'brightness(2.2)' : 'none',
        opacity: phase === 'closing' ? 0 : 1,
        transition:
          phase === 'closing'
            ? 'transform 300ms cubic-bezier(0.7, 0, 0.84, 0), filter 300ms ease-out, opacity 140ms ease-out 310ms'
            : 'none',
      }}
    >
      <div className="intro-scanlines pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-white transition-opacity duration-75"
        style={{ opacity: flash ? 0.85 : 0 }}
      />

      {phase === 'gate' && (
        <>
          <div className="flex flex-col items-center px-6">
            <p
              className="intro-blink m-0 font-hud text-[11px] uppercase tracking-[0.42em] text-white/60"
              style={{ textIndent: '0.42em' }}
            >
              Choose an episode
            </p>
            <div className="mt-10 flex flex-col items-center gap-8 sm:flex-row sm:gap-16">
              {(Object.keys(EPISODES) as Episode[]).map((key, index) => (
                <EpisodeButton
                  key={key}
                  autoFocus={index === 0}
                  number={EPISODES[key].number}
                  label={EPISODES[key].label}
                  accent={key === 'personal' ? PERSONAL_RED : 'hsl(var(--ring))'}
                  onClick={() => start(key)}
                />
              ))}
            </div>
          </div>
          <p className="absolute bottom-16 font-hud text-[10px] uppercase tracking-[0.3em] text-white/30">
            Sound on
          </p>
        </>
      )}

      {phase === 'playing' && step === 0 && <SymbolMorph accent={accent} symbols={episode === 'personal' ? PERSONAL_SYMBOLS : SYMBOLS} />}

      {phase !== 'gate' && (
        <div className="relative px-6 text-center">
          <div className="intro-flicker m-0 flex flex-col items-center font-display uppercase leading-[0.9] tracking-tight text-[clamp(1.9rem,8.6vw,6.2rem)]">
            <GlitchLine on={step >= 1}>{TITLE_LINE_ONE}</GlitchLine>
            <span className="flex items-center gap-[0.12em]">
              <span
                className="inline-block transition-[opacity,transform] duration-100 ease-out"
                style={{
                  color: accent,
                  opacity: step >= 2 ? 1 : 0,
                  transform: step >= 2 ? 'scale(1)' : 'scale(2.4)',
                  textShadow: `0 0 28px ${accent}`,
                }}
              >
                +
              </span>
              <GlitchLine on={step >= 3}>{TITLE_LINE_TWO}</GlitchLine>
            </span>
          </div>
          <p
            className="mt-6 font-hud text-[11px] uppercase tracking-[0.5em] text-white/60 transition-opacity duration-500 sm:text-xs"
            style={{ opacity: step >= 4 ? 1 : 0, textIndent: '0.5em' }}
          >
            {EPISODES[episode].subtitle}
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={finish}
        className="absolute bottom-6 right-6 font-hud text-[10px] uppercase tracking-[0.3em] text-white/40 transition-colors duration-150 [@media(hover:hover)]:hover:text-white"
      >
        Skip
      </button>
    </div>
  );
};

const EpisodeButton: React.FC<{
  number: string;
  label: string;
  accent: string;
  autoFocus?: boolean;
  onClick: () => void;
}> = ({ number, label, accent, autoFocus, onClick }) => (
  <button
    type="button"
    autoFocus={autoFocus}
    onClick={onClick}
    className="group flex flex-col items-center gap-2 outline-none"
  >
    <span className="font-hud text-[10px] uppercase tracking-[0.4em] text-white/40 transition-colors duration-150 group-focus-visible:text-white/80 [@media(hover:hover)]:group-hover:text-white/80">
      Ep. {number}
    </span>
    <span className="relative block text-2xl font-display uppercase tracking-tight sm:text-3xl">
      {label}
      <span aria-hidden className="intro-glitch-a hidden group-focus-visible:block [@media(hover:hover)]:group-hover:block">
        {label}
      </span>
      <span aria-hidden className="intro-glitch-b hidden group-focus-visible:block [@media(hover:hover)]:group-hover:block">
        {label}
      </span>
    </span>
    <span
      aria-hidden
      className="h-[2px] w-full origin-left scale-x-0 transition-transform duration-200 ease-out group-focus-visible:scale-x-100 [@media(hover:hover)]:group-hover:scale-x-100"
      style={{ backgroundColor: accent, boxShadow: `0 0 12px ${accent}` }}
    />
  </button>
);

const SymbolMorph: React.FC<{ accent: string; symbols: Glyph[] }> = ({ accent, symbols }) => {
  const paths = useRef<(SVGPathElement | null)[]>([]);
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const begin = performance.now();
    let frame = 0;
    const tick = () => {
      const { d, scale, pop } = symbolAt(symbols, performance.now() - begin);
      paths.current.forEach((path) => path?.setAttribute('d', d));
      if (wrapper.current) {
        wrapper.current.style.transform = `scale(${(scale * pop).toFixed(3)})`;
        wrapper.current.style.opacity = String(pop);
      }
      frame = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(frame);
  }, [symbols]);

  const layer = (className: string, index: number, fill: string) => (
    <svg
      key={index}
      aria-hidden
      viewBox="-1.25 -1.25 2.5 2.5"
      className={`${className} h-full w-full`}
      style={{ color: fill, overflow: 'visible' }}
    >
      <path ref={(node) => { paths.current[index] = node; }} fill="currentColor" />
    </svg>
  );

  return (
    <div
      aria-hidden
      className="absolute left-1/2 top-1/2 h-[min(46vw,46vh,22rem)] w-[min(46vw,46vh,22rem)] -translate-x-1/2 -translate-y-1/2"
      style={{ filter: `drop-shadow(0 0 34px color-mix(in srgb, ${accent} 55%, transparent))` }}
    >
      <div ref={wrapper} className="relative h-full w-full">
        {layer('absolute inset-0', 0, accent)}
        {layer('intro-glitch-a', 1, '#ff2d55')}
        {layer('intro-glitch-b', 2, '#19e3ff')}
      </div>
    </div>
  );
};

const GlitchLine: React.FC<{ on: boolean; children: string }> = ({ on, children }) => (
  <span
    className="relative block"
    style={{
      opacity: on ? 1 : 0,
      transform: on ? 'scale(1)' : 'scale(1.18)',
      filter: on ? 'none' : 'blur(6px)',
      transition: 'opacity 90ms ease-out, transform 160ms cubic-bezier(0.23, 1, 0.32, 1), filter 160ms ease-out',
    }}
  >
    {children}
    <span aria-hidden className="intro-glitch-a">
      {children}
    </span>
    <span aria-hidden className="intro-glitch-b">
      {children}
    </span>
  </span>
);

export default IntroOverlay;
