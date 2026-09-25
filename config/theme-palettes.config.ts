/**
 * Every palette recommended during design review, the one currently live in
 * `globals.css` (Warm Minimal Graphite), and a full palette per employer
 * built around that company's real brand color. Used by `/theme-lab` to
 * preview and swap themes at runtime without touching code, and by
 * `ExperienceCard` to temporarily preview a company's palette on hover.
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
  /** Theme-lab grouping; omitted means one of the original palettes. */
  category?: "premium" | "company";
  swatch: { background: string; card: string; accent: string };
  vars: PaletteVars;
}

export const THEME_PALETTES: ThemePalette[] = [
  {
    id: "warm-graphite",
    name: "Warm Minimal Graphite",
    tagline: "Emil Kowalski-style restraint — warm near-black + amber. Currently live.",
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
    id: "true-monochrome",
    name: "True Monochrome",
    tagline: "Zero hue, zero color risk. Quiet and high-end.",
    swatch: { background: "#121212", card: "#1a1a1a", accent: "#ebebeb" },
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
    id: "chiang-mint",
    name: "Chiang-Inspired Navy + Mint",
    tagline: "Dark navy with a punchy mint accent — the direct-inspiration look.",
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

  // Premium & calm palettes — curated from luxury/brand color-psychology
  // research. All share one formula: a near-black canvas tinted with the
  // palette's own hue, and a single low-saturation accent, so every theme
  // keeps the same contrast and restraint.
  {
    id: "obsidian-champagne",
    name: "Obsidian + Champagne",
    tagline: "Black, gold and ivory — the classic luxury trio. Gold reads as value and craft; kept soft so it whispers, not shouts.",
    category: "premium",
    swatch: { background: "#131210", card: "#1d1b19", accent: "#d4b483" },
    vars: {
      background: "30 8% 7%",
      foreground: "30 8% 93%",
      card: "30 8% 11%",
      popover: "30 8% 10%",
      secondary: "30 4% 62%",
      muted: "30 6% 15%",
      mutedForeground: "30 4% 46%",
      accentSurface: "30 6% 19%",
      border: "30 6% 17%",
      ring: "36 49% 67%",
      chart2: "18 44% 61%",
      chart3: "50 44% 71%",
      chart4: "4 44% 55%",
      chart5: "64 44% 75%",
      glowPrimaryRgb: "212, 180, 131",
      pageGradientTop: "#1c1a17",
      pageGradientMid: "#131210",
      pageGradientBottom: "#0e0d0c",
    },
  },
  {
    id: "midnight-platinum",
    name: "Midnight Navy + Platinum",
    tagline: "Navy signals authority and trust (banks, law, consulting); platinum adds quiet polish without adding a hue.",
    category: "premium",
    swatch: { background: "#0c1017", card: "#131823", accent: "#c9d1dc" },
    vars: {
      background: "220 30% 7%",
      foreground: "220 20% 93%",
      card: "220 30% 11%",
      popover: "220 30% 10%",
      secondary: "220 15% 62%",
      muted: "220 24% 15%",
      mutedForeground: "220 15% 46%",
      accentSurface: "220 24% 19%",
      border: "220 24% 17%",
      ring: "215 21% 83%",
      chart2: "197 20% 77%",
      chart3: "229 20% 80%",
      chart4: "183 20% 71%",
      chart5: "243 20% 80%",
      glowPrimaryRgb: "201, 209, 220",
      pageGradientTop: "#121721",
      pageGradientMid: "#0c1017",
      pageGradientBottom: "#090b11",
    },
  },
  {
    id: "forest-brass",
    name: "Forest + Brass",
    tagline: "The Rolex pairing. Deep green reads as stability and heritage, brass as earned prestige.",
    category: "premium",
    swatch: { background: "#0e1613", card: "#15211c", accent: "#c8a45c" },
    vars: {
      background: "155 22% 7%",
      foreground: "155 20% 93%",
      card: "155 22% 11%",
      popover: "155 22% 10%",
      secondary: "155 11% 62%",
      muted: "155 18% 15%",
      mutedForeground: "155 11% 46%",
      accentSurface: "155 18% 19%",
      border: "155 18% 17%",
      ring: "40 50% 57%",
      chart2: "22 45% 51%",
      chart3: "54 45% 61%",
      chart4: "8 45% 45%",
      chart5: "68 45% 65%",
      glowPrimaryRgb: "200, 164, 92",
      pageGradientTop: "#141f1a",
      pageGradientMid: "#0e1613",
      pageGradientBottom: "#0a100d",
    },
  },
  {
    id: "sage-mist",
    name: "Sage Mist",
    tagline: "Desaturated green lowers visual stress — calm, balanced and restorative. Great for long reading.",
    category: "premium",
    swatch: { background: "#101311", card: "#191d1a", accent: "#9db8a0" },
    vars: {
      background: "140 8% 7%",
      foreground: "140 8% 93%",
      card: "140 8% 11%",
      popover: "140 8% 10%",
      secondary: "140 4% 62%",
      muted: "140 6% 15%",
      mutedForeground: "140 4% 46%",
      accentSurface: "140 6% 19%",
      border: "140 6% 17%",
      ring: "127 16% 67%",
      chart2: "109 20% 61%",
      chart3: "141 20% 71%",
      chart4: "95 20% 55%",
      chart5: "155 20% 75%",
      glowPrimaryRgb: "157, 184, 160",
      pageGradientTop: "#171c19",
      pageGradientMid: "#101311",
      pageGradientBottom: "#0c0e0c",
    },
  },
  {
    id: "ink-dusty-blue",
    name: "Ink + Dusty Blue",
    tagline: "Blue is the most trusted color across cultures; dusting it down removes the 'corporate SaaS' edge.",
    category: "premium",
    swatch: { background: "#0f1115", card: "#161a20", accent: "#8fb3d9" },
    vars: {
      background: "215 18% 7%",
      foreground: "215 18% 93%",
      card: "215 18% 11%",
      popover: "215 18% 10%",
      secondary: "215 9% 62%",
      muted: "215 14% 15%",
      mutedForeground: "215 9% 46%",
      accentSurface: "215 14% 19%",
      border: "215 14% 17%",
      ring: "211 49% 71%",
      chart2: "193 44% 65%",
      chart3: "225 44% 75%",
      chart4: "179 44% 59%",
      chart5: "239 44% 79%",
      glowPrimaryRgb: "143, 179, 217",
      pageGradientTop: "#15191e",
      pageGradientMid: "#0f1115",
      pageGradientBottom: "#0a0c0f",
    },
  },
  {
    id: "espresso-terracotta",
    name: "Espresso + Terracotta",
    tagline: "Earthy and human. Warm clay feels approachable and grounded — confident without being loud.",
    category: "premium",
    swatch: { background: "#14110f", card: "#1f1a17", accent: "#d08a6a" },
    vars: {
      background: "20 14% 7%",
      foreground: "20 14% 93%",
      card: "20 14% 11%",
      popover: "20 14% 10%",
      secondary: "20 7% 62%",
      muted: "20 11% 15%",
      mutedForeground: "20 7% 46%",
      accentSurface: "20 11% 19%",
      border: "20 11% 17%",
      ring: "19 52% 62%",
      chart2: "1 47% 56%",
      chart3: "33 47% 66%",
      chart4: "347 47% 50%",
      chart5: "47 47% 70%",
      glowPrimaryRgb: "208, 138, 106",
      pageGradientTop: "#1d1816",
      pageGradientMid: "#14110f",
      pageGradientBottom: "#0f0c0b",
    },
  },
  {
    id: "oxblood-rose-gold",
    name: "Oxblood + Rose Gold",
    tagline: "Deep berry with a rose-gold accent — refined warmth, the fashion-house take on luxury.",
    category: "premium",
    swatch: { background: "#150f10", card: "#201618", accent: "#e0a9a4" },
    vars: {
      background: "350 18% 7%",
      foreground: "350 18% 93%",
      card: "350 18% 11%",
      popover: "350 18% 10%",
      secondary: "350 9% 62%",
      muted: "350 14% 15%",
      mutedForeground: "350 9% 46%",
      accentSurface: "350 14% 19%",
      border: "350 14% 17%",
      ring: "5 49% 76%",
      chart2: "347 44% 70%",
      chart3: "19 44% 80%",
      chart4: "333 44% 64%",
      chart5: "33 44% 80%",
      glowPrimaryRgb: "224, 169, 164",
      pageGradientTop: "#1e1516",
      pageGradientMid: "#150f10",
      pageGradientBottom: "#0f0a0b",
    },
  },
  {
    id: "deep-teal-seafoam",
    name: "Deep Teal + Seafoam",
    tagline: "Teal blends blue's trust with green's calm; seafoam keeps it clear, fresh and focused.",
    category: "premium",
    swatch: { background: "#0d1516", card: "#141f21", accent: "#7fc4bc" },
    vars: {
      background: "190 25% 7%",
      foreground: "190 20% 93%",
      card: "190 25% 11%",
      popover: "190 25% 10%",
      secondary: "190 12% 62%",
      muted: "190 20% 15%",
      mutedForeground: "190 12% 46%",
      accentSurface: "190 20% 19%",
      border: "190 20% 17%",
      ring: "173 37% 63%",
      chart2: "155 32% 57%",
      chart3: "187 32% 67%",
      chart4: "141 32% 51%",
      chart5: "201 32% 71%",
      glowPrimaryRgb: "127, 196, 188",
      pageGradientTop: "#131e20",
      pageGradientMid: "#0d1516",
      pageGradientBottom: "#0a0f10",
    },
  },
  {
    id: "graphite-glacier",
    name: "Graphite + Glacier",
    tagline: "Near-neutral graphite with an icy accent — clean, precise, engineered. Apple-like coolness.",
    category: "premium",
    swatch: { background: "#111213", card: "#191b1c", accent: "#a8d0e6" },
    vars: {
      background: "210 6% 7%",
      foreground: "210 6% 93%",
      card: "210 6% 11%",
      popover: "210 6% 10%",
      secondary: "210 3% 62%",
      muted: "210 5% 15%",
      mutedForeground: "210 3% 46%",
      accentSurface: "210 5% 19%",
      border: "210 5% 17%",
      ring: "201 55% 78%",
      chart2: "183 50% 72%",
      chart3: "215 50% 80%",
      chart4: "169 50% 66%",
      chart5: "229 50% 80%",
      glowPrimaryRgb: "168, 208, 230",
      pageGradientTop: "#181a1b",
      pageGradientMid: "#111213",
      pageGradientBottom: "#0c0d0e",
    },
  },
  {
    id: "aubergine-mauve",
    name: "Aubergine + Mauve",
    tagline: "Purple has long meant rarity and creativity; muted mauve keeps it elegant rather than playful.",
    category: "premium",
    swatch: { background: "#140f15", card: "#1d171f", accent: "#c4a0c8" },
    vars: {
      background: "290 15% 7%",
      foreground: "290 15% 93%",
      card: "290 15% 11%",
      popover: "290 15% 10%",
      secondary: "290 8% 62%",
      muted: "290 12% 15%",
      mutedForeground: "290 8% 46%",
      accentSurface: "290 12% 19%",
      border: "290 12% 17%",
      ring: "294 27% 71%",
      chart2: "276 22% 65%",
      chart3: "308 22% 75%",
      chart4: "262 22% 59%",
      chart5: "322 22% 79%",
      glowPrimaryRgb: "196, 160, 200",
      pageGradientTop: "#1c161d",
      pageGradientMid: "#140f15",
      pageGradientBottom: "#0e0b0f",
    },
  },
  {
    id: "stone-olive",
    name: "Stone + Olive",
    tagline: "Warm stone neutrals with an olive accent — understated, architectural, quietly confident.",
    category: "premium",
    swatch: { background: "#131311", card: "#1c1c19", accent: "#b5b27a" },
    vars: {
      background: "60 6% 7%",
      foreground: "60 6% 93%",
      card: "60 6% 11%",
      popover: "60 6% 10%",
      secondary: "60 3% 62%",
      muted: "60 5% 15%",
      mutedForeground: "60 3% 46%",
      accentSurface: "60 5% 19%",
      border: "60 5% 17%",
      ring: "57 29% 59%",
      chart2: "39 24% 53%",
      chart3: "71 24% 63%",
      chart4: "25 24% 47%",
      chart5: "85 24% 67%",
      glowPrimaryRgb: "181, 178, 122",
      pageGradientTop: "#1b1b18",
      pageGradientMid: "#131311",
      pageGradientBottom: "#0e0e0c",
    },
  },
  {
    id: "nordic-frost",
    name: "Nordic Slate + Frost",
    tagline: "Inspired by the Nord palette — arctic, low-contrast accents that stay easy on the eyes for hours.",
    category: "premium",
    swatch: { background: "#0f1115", card: "#16191f", accent: "#88c0d0" },
    vars: {
      background: "220 16% 7%",
      foreground: "220 16% 93%",
      card: "220 16% 11%",
      popover: "220 16% 10%",
      secondary: "220 8% 62%",
      muted: "220 13% 15%",
      mutedForeground: "220 8% 46%",
      accentSurface: "220 13% 19%",
      border: "220 13% 17%",
      ring: "193 43% 67%",
      chart2: "175 38% 61%",
      chart3: "207 38% 71%",
      chart4: "161 38% 55%",
      chart5: "221 38% 75%",
      glowPrimaryRgb: "136, 192, 208",
      pageGradientTop: "#15181e",
      pageGradientMid: "#0f1115",
      pageGradientBottom: "#0b0c0f",
    },
  },
  {
    id: "carbon-copper",
    name: "Carbon + Copper",
    tagline: "Near-black carbon with a burnished copper accent — industrial craftsmanship, warm and premium.",
    category: "premium",
    swatch: { background: "#131211", card: "#1c1b19", accent: "#c98a5b" },
    vars: {
      background: "25 5% 7%",
      foreground: "25 5% 93%",
      card: "25 5% 11%",
      popover: "25 5% 10%",
      secondary: "25 2% 62%",
      muted: "25 4% 15%",
      mutedForeground: "25 2% 46%",
      accentSurface: "25 4% 19%",
      border: "25 4% 17%",
      ring: "26 50% 57%",
      chart2: "8 45% 51%",
      chart3: "40 45% 61%",
      chart4: "354 45% 45%",
      chart5: "54 45% 65%",
      glowPrimaryRgb: "201, 138, 91",
      pageGradientTop: "#1b1918",
      pageGradientMid: "#131211",
      pageGradientBottom: "#0d0d0c",
    },
  },
  {
    id: "moss-sand",
    name: "Moss + Sand",
    tagline: "Soft moss base with a sand accent — natural, serene, and grounded like a quiet studio.",
    category: "premium",
    swatch: { background: "#121410", card: "#1a1d18", accent: "#d6c3a1" },
    vars: {
      background: "95 10% 7%",
      foreground: "95 10% 93%",
      card: "95 10% 11%",
      popover: "95 10% 10%",
      secondary: "95 5% 62%",
      muted: "95 8% 15%",
      mutedForeground: "95 5% 46%",
      accentSurface: "95 8% 19%",
      border: "95 8% 17%",
      ring: "38 39% 74%",
      chart2: "20 34% 68%",
      chart3: "52 34% 78%",
      chart4: "6 34% 62%",
      chart5: "66 34% 80%",
      glowPrimaryRgb: "214, 195, 161",
      pageGradientTop: "#191c17",
      pageGradientMid: "#121410",
      pageGradientBottom: "#0d0e0b",
    },
  },
  {
    id: "twilight-periwinkle",
    name: "Twilight + Periwinkle",
    tagline: "Indigo evokes depth and intuition; periwinkle softens it into something calm and thoughtful.",
    category: "premium",
    swatch: { background: "#0e0f16", card: "#151621", accent: "#9fa8e8" },
    vars: {
      background: "235 22% 7%",
      foreground: "235 20% 93%",
      card: "235 22% 11%",
      popover: "235 22% 10%",
      secondary: "235 11% 62%",
      muted: "235 18% 15%",
      mutedForeground: "235 11% 46%",
      accentSurface: "235 18% 19%",
      border: "235 18% 17%",
      ring: "233 61% 77%",
      chart2: "215 56% 71%",
      chart3: "247 56% 80%",
      chart4: "201 56% 65%",
      chart5: "261 56% 80%",
      glowPrimaryRgb: "159, 168, 232",
      pageGradientTop: "#14151f",
      pageGradientMid: "#0e0f16",
      pageGradientBottom: "#0a0a10",
    },
  },
  {
    id: "rose-pine",
    name: "Rosé Pine",
    tagline: "Inspired by the beloved Rosé Pine theme — muted dusk tones with a soft blush accent. Gentle and warm.",
    category: "premium",
    swatch: { background: "#0f0e16", card: "#171521", accent: "#ebbcba" },
    vars: {
      background: "249 22% 7%",
      foreground: "249 20% 93%",
      card: "249 22% 11%",
      popover: "249 22% 10%",
      secondary: "249 11% 62%",
      muted: "249 18% 15%",
      mutedForeground: "249 11% 46%",
      accentSurface: "249 18% 19%",
      border: "249 18% 17%",
      ring: "2 55% 83%",
      chart2: "344 50% 77%",
      chart3: "16 50% 80%",
      chart4: "330 50% 71%",
      chart5: "30 50% 80%",
      glowPrimaryRgb: "235, 188, 186",
      pageGradientTop: "#16141f",
      pageGradientMid: "#0f0e16",
      pageGradientBottom: "#0b0a10",
    },
  },

  // Company palettes — id matches the experience's id in
  // experience-data.config.ts, built around that employer's real brand
  // color (sampled from their actual site/logo, not guessed). Selectable
  // in /theme-lab like any other palette, and previewed on hover over
  // that employer's ExperienceCard on the homepage.
  {
    id: "mlhuillier",
    name: "M Lhuillier Crimson",
    tagline: "M Lhuillier's signature red, deepened onto a wine-black canvas and softened into a warm crimson — unmistakably theirs, calmer on the eyes.",
    category: "company",
    swatch: { background: "#150f10", card: "#211819", accent: "#e1606b" },
    vars: {
      background: "352 16% 7%",
      foreground: "352 16% 93%",
      card: "352 16% 11%",
      popover: "352 16% 10%",
      secondary: "352 8% 62%",
      muted: "352 13% 15%",
      mutedForeground: "352 8% 46%",
      accentSurface: "352 13% 19%",
      border: "352 13% 17%",
      ring: "355 68% 63%",
      chart2: "337 63% 57%",
      chart3: "9 63% 67%",
      chart4: "323 63% 51%",
      chart5: "23 63% 71%",
      glowPrimaryRgb: "225, 96, 107",
      pageGradientTop: "#1e1517",
      pageGradientMid: "#150f10",
      pageGradientBottom: "#0f0b0b",
    },
  },
  {
    id: "accenture",
    name: "Accenture Violet",
    tagline: "Accenture's electric purple, eased into a luminous violet over a deep aubergine base — the brand's energy, with a premium hush.",
    category: "company",
    swatch: { background: "#120f15", card: "#1c1821", accent: "#c284eb" },
    vars: {
      background: "272 16% 7%",
      foreground: "272 16% 93%",
      card: "272 16% 11%",
      popover: "272 16% 10%",
      secondary: "272 8% 62%",
      muted: "272 13% 15%",
      mutedForeground: "272 8% 46%",
      accentSurface: "272 13% 19%",
      border: "272 13% 17%",
      ring: "276 72% 72%",
      chart2: "258 67% 66%",
      chart3: "290 67% 76%",
      chart4: "244 67% 60%",
      chart5: "304 67% 80%",
      glowPrimaryRgb: "194, 132, 235",
      pageGradientTop: "#1a151e",
      pageGradientMid: "#120f15",
      pageGradientBottom: "#0d0b0f",
    },
  },
  {
    id: "dna-micro",
    name: "DNA Micro Cornflower",
    tagline: "DNA Micro's brand blue, relaxed into a cornflower tone on midnight navy — trustworthy and clear without the glare.",
    category: "company",
    swatch: { background: "#0e1115", card: "#161a22", accent: "#7ba4ea" },
    vars: {
      background: "220 20% 7%",
      foreground: "220 20% 93%",
      card: "220 20% 11%",
      popover: "220 20% 10%",
      secondary: "220 10% 62%",
      muted: "220 16% 15%",
      mutedForeground: "220 10% 46%",
      accentSurface: "220 16% 19%",
      border: "220 16% 17%",
      ring: "218 72% 70%",
      chart2: "200 67% 64%",
      chart3: "232 67% 74%",
      chart4: "186 67% 58%",
      chart5: "246 67% 78%",
      glowPrimaryRgb: "123, 164, 234",
      pageGradientTop: "#14181f",
      pageGradientMid: "#0e1115",
      pageGradientBottom: "#0a0c0f",
    },
  },
  {
    id: "prince-retail",
    name: "Prince Retail Honey",
    tagline: "Prince Retail's bright yellow, mellowed into a honey gold over warm espresso — sunny and welcoming, never loud.",
    category: "company",
    swatch: { background: "#141310", card: "#1f1d19", accent: "#ebc55c" },
    vars: {
      background: "40 12% 7%",
      foreground: "40 12% 93%",
      card: "40 12% 11%",
      popover: "40 12% 10%",
      secondary: "40 6% 62%",
      muted: "40 10% 15%",
      mutedForeground: "40 6% 46%",
      accentSurface: "40 10% 19%",
      border: "40 10% 17%",
      ring: "44 78% 64%",
      chart2: "26 73% 58%",
      chart3: "58 73% 68%",
      chart4: "12 73% 52%",
      chart5: "72 73% 72%",
      glowPrimaryRgb: "235, 197, 92",
      pageGradientTop: "#1d1b16",
      pageGradientMid: "#141310",
      pageGradientBottom: "#0e0d0b",
    },
  },
];

export const DEFAULT_PALETTE_ID = "warm-graphite";

export const THEME_STORAGE_KEY = "portfolio-theme-vars";
export const THEME_PALETTE_ID_STORAGE_KEY = "portfolio-theme-palette-id";
/** Same id as the localStorage key, mirrored into a cookie so server-rendered
 * files (the favicon) can read the visitor's chosen palette too. */
export const THEME_COOKIE_NAME = "portfolio-theme-palette-id";

export function getPaletteById(id: string | null | undefined): ThemePalette {
  return (
    THEME_PALETTES.find((palette) => palette.id === id) ??
    THEME_PALETTES.find((palette) => palette.id === DEFAULT_PALETTE_ID) ??
    THEME_PALETTES[0]
  );
}

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
  // 1 year, readable by the icon/apple-icon routes so the favicon matches too.
  document.cookie = `${THEME_COOKIE_NAME}=${palette.id}; path=/; max-age=31536000; SameSite=Lax`;
}

export function clearStoredPalette() {
  localStorage.removeItem(THEME_STORAGE_KEY);
  localStorage.removeItem(THEME_PALETTE_ID_STORAGE_KEY);
  document.cookie = `${THEME_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
}

export function getStoredPaletteId(): string | null {
  return localStorage.getItem(THEME_PALETTE_ID_STORAGE_KEY);
}

const ALL_RESOLVED_VAR_NAMES = Object.keys(resolvePaletteVars(THEME_PALETTES[0].vars));

let previewSnapshot: Record<string, string> | null = null;
let previewDepth = 0;

/**
 * Temporary, unsaved full-palette swap used when hovering an experience
 * card (or a company card in /theme-lab). Unlike `applyPalette`, this never
 * touches localStorage or cookies — `clearPalettePreview` restores exactly
 * whatever was active before the hover, however it got there.
 */
export function previewPalette(palette: ThemePalette) {
  if (typeof window === "undefined") return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  if (previewDepth === 0) {
    const computed = getComputedStyle(document.documentElement);
    previewSnapshot = {};
    ALL_RESOLVED_VAR_NAMES.forEach((name) => {
      previewSnapshot![name] = computed.getPropertyValue(name).trim();
    });
  }
  previewDepth += 1;
  applyPalette(palette);
}

export function clearPalettePreview() {
  if (typeof window === "undefined") return;

  previewDepth = Math.max(0, previewDepth - 1);
  if (previewDepth === 0 && previewSnapshot) {
    applyResolvedVars(previewSnapshot);
    previewSnapshot = null;
  }
}

/**
 * Inlined into the very top of <body> so a previously chosen theme applies
 * before first paint — no flash of the default palette on reload.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var raw=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY
)});if(!raw)return;var vars=JSON.parse(raw);var root=document.documentElement;for(var name in vars){root.style.setProperty(name,vars[name]);}}catch(e){}})();`;
