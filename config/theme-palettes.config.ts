/**
 * Every palette recommended during design review, plus the one currently
 * live in `globals.css` (Chiang-Inspired Navy + Mint). Used by `/theme-lab`
 * to preview and swap themes at runtime without touching code.
 */

export interface PaletteVars {
  background: string;
  foreground: string;
  card: string;
  popover: string;
  secondary: string;
  muted: string;
  mutedForeground: string;
  accentSurface: string;
  border: string;
  ring: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
  glowPrimaryRgb: string;
  pageGradientTop: string;
  pageGradientMid: string;
  pageGradientBottom: string;
}

export interface ThemePalette {
  id: string;
  name: string;
  tagline: string;
  swatch: { background: string; card: string; accent: string };
  vars: PaletteVars;
}

export const THEME_PALETTES: ThemePalette[] = [
  {
    id: "chiang-mint",
    name: "Chiang-Inspired Navy + Mint",
    tagline: "Dark navy with a punchy mint accent. Currently live.",
    swatch: { background: "#0a0f18", card: "#0f1520", accent: "#5eead4" },
    vars: {
      background: "219 41% 7%",
      foreground: "217 20% 90%",
      card: "219 36% 9%",
      popover: "219 37% 8%",
      secondary: "220 14% 59%",
      muted: "219 25% 16%",
      mutedForeground: "219 15% 46%",
      accentSurface: "219 22% 20%",
      border: "219 25% 18%",
      ring: "171 77% 64%",
      chart2: "190 80% 55%",
      chart3: "160 70% 55%",
      chart4: "200 75% 60%",
      chart5: "150 60% 60%",
      glowPrimaryRgb: "94, 234, 212",
      pageGradientTop: "#10192a",
      pageGradientMid: "#0a0f18",
      pageGradientBottom: "#060a10",
    },
  },
  {
    id: "slate-indigo",
    name: "Slate + Electric Indigo",
    tagline: "Modern dev-tool look (Linear/Raycast).",
    swatch: { background: "#101114", card: "#17181c", accent: "#6366f1" },
    vars: {
      background: "225 11% 7%",
      foreground: "216 17% 94%",
      card: "228 10% 10%",
      popover: "228 10% 9%",
      secondary: "215 6% 60%",
      muted: "225 10% 16%",
      mutedForeground: "215 6% 46%",
      accentSurface: "225 10% 20%",
      border: "225 10% 18%",
      ring: "239 84% 67%",
      chart2: "199 89% 60%",
      chart3: "262 83% 68%",
      chart4: "217 91% 60%",
      chart5: "280 65% 65%",
      glowPrimaryRgb: "99, 102, 241",
      pageGradientTop: "#181a20",
      pageGradientMid: "#101114",
      pageGradientBottom: "#0b0c0e",
    },
  },
  {
    id: "charcoal-sky",
    name: "Charcoal + Sky Cyan",
    tagline: "The Stripe/Vercel look — crisp, techy, approachable.",
    swatch: { background: "#121316", card: "#1a1c1f", accent: "#38bdf8" },
    vars: {
      background: "225 10% 8%",
      foreground: "210 20% 95%",
      card: "216 9% 11%",
      popover: "216 9% 10%",
      secondary: "216 7% 60%",
      muted: "216 12% 17%",
      mutedForeground: "216 8% 46%",
      accentSurface: "216 12% 21%",
      border: "216 12% 18%",
      ring: "198 93% 60%",
      chart2: "210 90% 60%",
      chart3: "185 85% 55%",
      chart4: "220 85% 65%",
      chart5: "175 70% 55%",
      glowPrimaryRgb: "56, 189, 248",
      pageGradientTop: "#191c20",
      pageGradientMid: "#121316",
      pageGradientBottom: "#0c0d0f",
    },
  },
  {
    id: "true-monochrome",
    name: "True Monochrome",
    tagline: "Zero hue, zero color risk. Quiet and high-end.",
    swatch: { background: "#121212", card: "#1a1a1a", accent: "#ffffff" },
    vars: {
      background: "0 0% 7%",
      foreground: "0 0% 96%",
      card: "0 0% 10%",
      popover: "0 0% 9%",
      secondary: "0 0% 60%",
      muted: "0 0% 16%",
      mutedForeground: "0 0% 45%",
      accentSurface: "0 0% 20%",
      border: "0 0% 18%",
      ring: "0 0% 92%",
      chart2: "0 0% 75%",
      chart3: "0 0% 60%",
      chart4: "0 0% 45%",
      chart5: "0 0% 30%",
      glowPrimaryRgb: "255, 255, 255",
      pageGradientTop: "#191919",
      pageGradientMid: "#121212",
      pageGradientBottom: "#0d0d0d",
    },
  },
  {
    id: "graphite-emerald",
    name: "Graphite + Emerald",
    tagline: "Clean and fresh, a step away from the usual blue accent.",
    swatch: { background: "#121614", card: "#1a1f1c", accent: "#34d399" },
    vars: {
      background: "150 10% 8%",
      foreground: "135 8% 95%",
      card: "144 9% 11%",
      popover: "144 9% 10%",
      secondary: "145 6% 60%",
      muted: "144 12% 17%",
      mutedForeground: "145 6% 46%",
      accentSurface: "144 12% 21%",
      border: "144 12% 18%",
      ring: "158 64% 52%",
      chart2: "170 60% 55%",
      chart3: "140 55% 50%",
      chart4: "185 55% 55%",
      chart5: "120 45% 55%",
      glowPrimaryRgb: "52, 211, 153",
      pageGradientTop: "#191f1c",
      pageGradientMid: "#121614",
      pageGradientBottom: "#0d100e",
    },
  },
  {
    id: "warm-graphite",
    name: "Warm Minimal Graphite",
    tagline: "Emil Kowalski-style restraint — warm near-black + amber.",
    swatch: { background: "#141312", card: "#1c1a18", accent: "#e8a33d" },
    vars: {
      background: "30 6% 8%",
      foreground: "40 24% 93%",
      card: "30 7% 11%",
      popover: "30 7% 10%",
      secondary: "30 7% 62%",
      muted: "30 8% 16%",
      mutedForeground: "30 6% 46%",
      accentSurface: "30 9% 20%",
      border: "30 8% 18%",
      ring: "36 78% 58%",
      chart2: "15 65% 54%",
      chart3: "45 85% 60%",
      chart4: "25 55% 48%",
      chart5: "50 65% 64%",
      glowPrimaryRgb: "232, 163, 61",
      pageGradientTop: "#1c1a17",
      pageGradientMid: "#141312",
      pageGradientBottom: "#0f0e0d",
    },
  },
  {
    id: "blue-steel-navy",
    name: "Refined Blue-Steel Navy",
    tagline: "Deep navy-charcoal with a soft steel-blue accent.",
    swatch: { background: "#0b1016", card: "#10161d", accent: "#6ea8d8" },
    vars: {
      background: "213 33% 6%",
      foreground: "213 26% 92%",
      card: "212 29% 9%",
      popover: "212 30% 8%",
      secondary: "210 19% 63%",
      muted: "212 22% 16%",
      mutedForeground: "210 15% 46%",
      accentSurface: "212 20% 20%",
      border: "212 22% 18%",
      ring: "207 58% 64%",
      chart2: "199 70% 55%",
      chart3: "225 60% 60%",
      chart4: "190 55% 50%",
      chart5: "240 45% 65%",
      glowPrimaryRgb: "110, 168, 216",
      pageGradientTop: "#141c26",
      pageGradientMid: "#0b1016",
      pageGradientBottom: "#070a0e",
    },
  },
  {
    id: "terminal-green",
    name: "Terminal Green",
    tagline: "True black with a phosphor-green accent — the hacker/CRT look.",
    swatch: { background: "#0a0a0a", card: "#131313", accent: "#4ade80" },
    vars: {
      background: "0 0% 4%",
      foreground: "0 0% 94%",
      card: "0 0% 8%",
      popover: "0 0% 7%",
      secondary: "0 0% 58%",
      muted: "0 0% 14%",
      mutedForeground: "0 0% 42%",
      accentSurface: "0 0% 18%",
      border: "0 0% 16%",
      ring: "142 69% 58%",
      chart2: "130 60% 50%",
      chart3: "160 55% 55%",
      chart4: "100 50% 55%",
      chart5: "170 50% 50%",
      glowPrimaryRgb: "74, 222, 128",
      pageGradientTop: "#131313",
      pageGradientMid: "#0a0a0a",
      pageGradientBottom: "#060606",
    },
  },
  {
    id: "cool-gray-rose",
    name: "Cool Gray + Rose",
    tagline: "Neutral slate with a warm rose accent — fresh, uncommon in dev portfolios.",
    swatch: { background: "#111216", card: "#191b20", accent: "#fb7185" },
    vars: {
      background: "228 13% 8%",
      foreground: "220 15% 94%",
      card: "223 12% 11%",
      popover: "223 12% 10%",
      secondary: "220 8% 60%",
      muted: "223 12% 17%",
      mutedForeground: "220 8% 46%",
      accentSurface: "223 12% 21%",
      border: "223 12% 18%",
      ring: "351 95% 71%",
      chart2: "340 82% 65%",
      chart3: "10 85% 65%",
      chart4: "320 70% 65%",
      chart5: "0 70% 65%",
      glowPrimaryRgb: "251, 113, 133",
      pageGradientTop: "#191b20",
      pageGradientMid: "#111216",
      pageGradientBottom: "#0c0d10",
    },
  },
  {
    id: "deep-plum-lavender",
    name: "Deep Plum + Lavender",
    tagline: "Rich violet base with a soft lavender accent — elegant, premium.",
    swatch: { background: "#150f1c", card: "#1d1526", accent: "#a78bfa" },
    vars: {
      background: "268 30% 8%",
      foreground: "270 15% 94%",
      card: "268 29% 12%",
      popover: "268 29% 10%",
      secondary: "270 8% 60%",
      muted: "268 20% 18%",
      mutedForeground: "270 8% 46%",
      accentSurface: "268 20% 22%",
      border: "268 20% 19%",
      ring: "255 92% 76%",
      chart2: "280 75% 70%",
      chart3: "240 70% 70%",
      chart4: "300 65% 70%",
      chart5: "220 60% 65%",
      glowPrimaryRgb: "167, 139, 250",
      pageGradientTop: "#201830",
      pageGradientMid: "#150f1c",
      pageGradientBottom: "#100b15",
    },
  },
];

export const DEFAULT_PALETTE_ID = "chiang-mint";

export const THEME_STORAGE_KEY = "portfolio-theme-vars";
export const THEME_PALETTE_ID_STORAGE_KEY = "portfolio-theme-palette-id";

/** Maps a palette's short-hand vars to the real CSS custom property names. */
export function resolvePaletteVars(vars: PaletteVars): Record<string, string> {
  return {
    "--background": vars.background,
    "--primary": vars.background,
    "--foreground": vars.foreground,
    "--primary-foreground": vars.foreground,
    "--card": vars.card,
    "--card-foreground": vars.foreground,
    "--popover": vars.popover,
    "--popover-foreground": vars.foreground,
    "--secondary": vars.secondary,
    "--secondary-foreground": vars.foreground,
    "--muted": vars.muted,
    "--muted-foreground": vars.mutedForeground,
    "--accent": vars.accentSurface,
    "--accent-foreground": vars.foreground,
    "--border": vars.border,
    "--input": vars.border,
    "--ring": vars.ring,
    "--chart-1": vars.ring,
    "--chart-2": vars.chart2,
    "--chart-3": vars.chart3,
    "--chart-4": vars.chart4,
    "--chart-5": vars.chart5,
    "--glow-primary-rgb": vars.glowPrimaryRgb,
    "--page-gradient-top": vars.pageGradientTop,
    "--page-gradient-mid": vars.pageGradientMid,
    "--page-gradient-bottom": vars.pageGradientBottom,
  };
}

export function applyResolvedVars(resolved: Record<string, string>) {
  const root = document.documentElement;
  Object.entries(resolved).forEach(([name, value]) => {
    root.style.setProperty(name, value);
  });
}

export function applyPalette(palette: ThemePalette) {
  applyResolvedVars(resolvePaletteVars(palette.vars));
}

export function storePalette(palette: ThemePalette) {
  const resolved = resolvePaletteVars(palette.vars);
  localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(resolved));
  localStorage.setItem(THEME_PALETTE_ID_STORAGE_KEY, palette.id);
}

export function clearStoredPalette() {
  localStorage.removeItem(THEME_STORAGE_KEY);
  localStorage.removeItem(THEME_PALETTE_ID_STORAGE_KEY);
}

export function getStoredPaletteId(): string | null {
  return localStorage.getItem(THEME_PALETTE_ID_STORAGE_KEY);
}

/**
 * Inlined into the very top of <body> so a previously chosen theme applies
 * before first paint — no flash of the default palette on reload.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var raw=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY
)});if(!raw)return;var vars=JSON.parse(raw);var root=document.documentElement;for(var name in vars){root.style.setProperty(name,vars[name]);}}catch(e){}})();`;
