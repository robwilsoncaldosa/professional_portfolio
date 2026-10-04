// Morphing glyphs shared by the intro, the theme shuffle and the small
// animated marks around the site.
//
// A glyph is a set of closed outlines: filled pieces ("outers", clockwise)
// and cut-outs ("holes", counter-clockwise, so the default nonzero fill
// punches them out). Every outline is resampled to the same number of
// points, so any two glyphs can be blended point-by-point. When one glyph
// has more pieces than the other, the missing ones grow out of (or shrink
// into) a single point at the matching piece's center, like the symbols in
// an anthology title card splitting apart and fusing back together.
//
// Coordinates live roughly in [-1, 1] with y pointing down (SVG space).

export type Point = [number, number];
export type Contour = Point[];

export interface Glyph {
  outers: Contour[];
  holes: Contour[];
}

export const POINTS = 96;

// ── Geometry helpers ───────────────────────────────────────────────

const signedArea = (contour: Point[]) => {
  let area = 0;
  contour.forEach(([x, y], i) => {
    const [nx, ny] = contour[(i + 1) % contour.length];
    area += x * ny - nx * y;
  });
  return area / 2;
};

const centroid = (contour: Point[]): Point => {
  const sum = contour.reduce<Point>((acc, [x, y]) => [acc[0] + x, acc[1] + y], [0, 0]);
  return [sum[0] / contour.length, sum[1] / contour.length];
};

/** Evenly spaced points along a closed outline, starting at its top. */
function resample(vertices: Point[], count = POINTS): Contour {
  const lengths = [0];
  for (let i = 0; i < vertices.length; i++) {
    const [x, y] = vertices[i];
    const [nx, ny] = vertices[(i + 1) % vertices.length];
    lengths.push(lengths[i] + Math.hypot(nx - x, ny - y));
  }
  const total = lengths[lengths.length - 1];
  const samples: Contour = [];
  let edge = 0;
  for (let k = 0; k < count; k++) {
    const target = (k / count) * total;
    while (lengths[edge + 1] < target) edge++;
    const [x, y] = vertices[edge];
    const [nx, ny] = vertices[(edge + 1) % vertices.length];
    const span = lengths[edge + 1] - lengths[edge] || 1;
    const t = (target - lengths[edge]) / span;
    samples.push([x + (nx - x) * t, y + (ny - y) * t]);
  }
  let start = 0;
  samples.forEach(([x, y], i) => {
    const [sx, sy] = samples[start];
    if (y < sy - 1e-6 || (Math.abs(y - sy) < 1e-6 && Math.abs(x) < Math.abs(sx))) start = i;
  });
  return [...samples.slice(start), ...samples.slice(0, start)];
}

const oriented = (contour: Point[], clockwise: boolean) =>
  signedArea(contour) > 0 === clockwise ? contour : [...contour].reverse();

const byArea = (a: Contour, b: Contour) => Math.abs(signedArea(b)) - Math.abs(signedArea(a));

/** Builds a glyph from raw outlines (any vertex count, any winding). */
export function glyph(outers: Point[][], holes: Point[][] = []): Glyph {
  return {
    outers: outers.map((c) => resample(oriented(c, true))).sort(byArea),
    holes: holes.map((c) => resample(oriented(c, false))).sort(byArea),
  };
}

const transform = (contour: Point[], scale = 1, dx = 0, dy = 0, angle = 0): Point[] => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return contour.map(([x, y]) => [(x * cos - y * sin) * scale + dx, (x * sin + y * cos) * scale + dy]);
};

/** Corner-cutting smoothing: turns a rough polygon into soft curves. */
function chaikin(points: Point[], iterations = 3): Point[] {
  let current = points;
  for (let n = 0; n < iterations; n++) {
    const next: Point[] = [];
    current.forEach(([x, y], i) => {
      const [nx, ny] = current[(i + 1) % current.length];
      next.push([x * 0.75 + nx * 0.25, y * 0.75 + ny * 0.25], [x * 0.25 + nx * 0.75, y * 0.25 + ny * 0.75]);
    });
    current = next;
  }
  return current;
}

const circle = (cx: number, cy: number, r: number, segments = 64): Point[] =>
  Array.from({ length: segments }, (_, i) => {
    const a = -Math.PI / 2 + (i / segments) * Math.PI * 2;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });

const rect = (x0: number, y0: number, x1: number, y1: number): Point[] => [
  [x0, y0],
  [x1, y0],
  [x1, y1],
  [x0, y1],
];

const polar = (radius: (angle: number) => number, segments = 240): Point[] =>
  Array.from({ length: segments }, (_, i) => {
    const theta = (i / segments) * Math.PI * 2 - Math.PI / 2;
    const r = radius(theta);
    return [r * Math.cos(theta), r * Math.sin(theta)];
  });

const starVertices = (points: number, outer: number, inner: number, cx = 0, cy = 0): Point[] =>
  Array.from({ length: points * 2 }, (_, i) => {
    const angle = -Math.PI / 2 + (i * Math.PI) / points;
    const r = i % 2 === 0 ? outer : inner;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  });

const regularVertices = (sides: number, radius: number): Point[] =>
  starVertices(sides, radius, radius).filter((_, i) => i % 2 === 0);

const plusVertices = (cx: number, cy: number, arm: number, half: number): Point[] => [
  [cx - half, cy - arm],
  [cx + half, cy - arm],
  [cx + half, cy - half],
  [cx + arm, cy - half],
  [cx + arm, cy + half],
  [cx + half, cy + half],
  [cx + half, cy + arm],
  [cx - half, cy + arm],
  [cx - half, cy + half],
  [cx - arm, cy + half],
  [cx - arm, cy - half],
  [cx - half, cy - half],
];

// A four-point "AI sparkle": concave curves between the tips.
const sparkle = (cx: number, cy: number, size: number): Point[] =>
  polar((t) => size / Math.pow(Math.abs(Math.cos(t)) ** 0.55 + Math.abs(Math.sin(t)) ** 0.55, 1 / 0.55)).map(
    ([x, y]) => [x + cx, y + cy]
  );

const heartOutline = (): Point[] => {
  const raw = Array.from({ length: 240 }, (_, i): Point => {
    const t = (i / 240) * Math.PI * 2;
    return [16 * Math.sin(t) ** 3, -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))];
  });
  const ys = raw.map((p) => p[1]);
  const mid = (Math.min(...ys) + Math.max(...ys)) / 2;
  return raw.map(([x, y]) => [x / 17, (y - mid) / 17]);
};

// ── The glyphs ─────────────────────────────────────────────────────

export const HEART = glyph([heartOutline()]);
export const SPARK = glyph([sparkle(0, 0, 1.05)]);
export const HEXAGON = glyph([regularVertices(6, 1)]);
export const CIRCLE = glyph([circle(0, 0, 0.9)]);
export const PLUS = glyph([plusVertices(0, 0, 0.95, 0.3)]);
export const TRIANGLE = glyph([transform(regularVertices(3, 1.1), 1, 0, 0.18)]);
export const DIAMOND = glyph([regularVertices(4, 1.05)]);
export const STAR5 = glyph([starVertices(5, 1.05, 0.45)]);
export const STAR8 = glyph([starVertices(8, 1, 0.72)]);

/** Coding: </> */
export const CODE = glyph([
  [[-0.42, -0.66], [-0.26, -0.5], [-0.68, 0], [-0.26, 0.5], [-0.42, 0.66], [-1, 0]],
  [[0.42, -0.66], [1, 0], [0.42, 0.66], [0.26, 0.5], [0.68, 0], [0.26, -0.5]],
  [[0.12, -0.74], [0.3, -0.74], [-0.12, 0.74], [-0.3, 0.74]],
]);

/** Gaming: a controller with a d-pad and two buttons cut out. */
export const GAMEPAD = glyph(
  [
    chaikin([
      [-0.5, -0.46], [0.5, -0.46], [0.86, -0.32], [1.02, 0.34], [0.86, 0.66], [0.6, 0.62], [0.38, 0.3],
      [-0.38, 0.3], [-0.6, 0.62], [-0.86, 0.66], [-1.02, 0.34], [-0.86, -0.32],
    ]),
  ],
  [plusVertices(-0.5, -0.06, 0.22, 0.075), circle(0.42, -0.16, 0.095, 32), circle(0.62, 0.04, 0.095, 32)]
);

/** Riding: a motorcycle in profile, wheels as rings. */
export const MOTORCYCLE = glyph(
  [
    circle(-0.6, 0.4, 0.36),
    circle(0.62, 0.4, 0.36),
    chaikin(
      [
        [-0.6, 0.36], [-0.94, -0.08], [-0.62, -0.14], [-0.2, -0.14], [0.0, -0.36], [0.32, -0.32], [0.38, -0.62],
        [0.68, -0.68], [0.68, -0.56], [0.52, -0.52], [0.7, 0.36], [0.56, 0.42], [0.3, 0.18], [0.0, 0.26],
        [-0.3, 0.2], [-0.5, 0.42],
      ],
      1
    ),
  ],
  [circle(-0.6, 0.4, 0.17, 40), circle(0.62, 0.4, 0.17, 40)]
);

/** Fitness: a dumbbell, tilted for energy. */
export const DUMBBELL = glyph([
  transform(
    [
      [-1, -0.24], [-0.82, -0.24], [-0.82, -0.5], [-0.56, -0.5], [-0.56, -0.1], [0.56, -0.1], [0.56, -0.5],
      [0.82, -0.5], [0.82, -0.24], [1, -0.24], [1, 0.24], [0.82, 0.24], [0.82, 0.5], [0.56, 0.5], [0.56, 0.1],
      [-0.56, 0.1], [-0.56, 0.5], [-0.82, 0.5], [-0.82, 0.24], [-1, 0.24],
    ],
    1,
    0,
    0,
    -Math.PI / 6
  ),
]);

/** AI: the familiar sparkle trio. */
export const SPARKLES = glyph([sparkle(-0.2, 0.12, 0.78), sparkle(0.58, -0.58, 0.36), sparkle(0.64, 0.6, 0.24)]);

/** AI: a chip with pins. */
export const CHIP = glyph(
  [
    rect(-0.56, -0.56, 0.56, 0.56),
    ...[-0.28, 0.28].flatMap((o) => [
      rect(o - 0.08, -0.92, o + 0.08, -0.6),
      rect(o - 0.08, 0.6, o + 0.08, 0.92),
      rect(-0.92, o - 0.08, -0.6, o + 0.08),
      rect(0.6, o - 0.08, 0.92, o + 0.08),
    ]),
  ],
  [rect(-0.26, -0.26, 0.26, 0.26)]
);

/** AI: a small neural net, three nodes linked by a triangular band. */
const NET_NODES: Point[] = [[0, -0.62], [0.64, 0.48], [-0.64, 0.48]];
const NET_CENTER = centroid(NET_NODES);
export const NETWORK = glyph(
  [...NET_NODES.map(([x, y]) => circle(x, y, 0.3)), NET_NODES],
  [NET_NODES.map(([x, y]) => [NET_CENTER[0] + (x - NET_CENTER[0]) * 0.7, NET_CENTER[1] + (y - NET_CENTER[1]) * 0.7] as Point)]
);

/** Cloud: three puffs on a flat base (Google Cloud, Cloud Run). */
export const CLOUD = glyph([
  circle(0.02, -0.2, 0.5),
  circle(-0.48, 0.12, 0.36),
  circle(0.52, 0.1, 0.38),
  chaikin(rect(-0.66, 0.06, 0.72, 0.48), 2),
]);

/** Intro, professional: code → AI → cloud → connected systems → "+" */
export const SYMBOLS: Glyph[] = [CODE, SPARKLES, CLOUD, NETWORK, PLUS];

/** Intro + personal marks: coding → gaming → riding → fitness → "+" */
export const PERSONAL_SYMBOLS: Glyph[] = [CODE, GAMEPAD, MOTORCYCLE, DUMBBELL, PLUS];

/** The Generative AI Leader mark. */
export const AI_SYMBOLS: Glyph[] = [SPARK, SPARKLES, CHIP, NETWORK];

/** Everything the theme shuffle can land on. */
export const THEME_SYMBOLS: Glyph[] = [
  HEART, SPARK, HEXAGON, CIRCLE, PLUS, TRIANGLE, DIAMOND, STAR5, STAR8,
  CODE, GAMEPAD, MOTORCYCLE, DUMBBELL, SPARKLES, CHIP, CLOUD, NETWORK,
];

// ── Blending ───────────────────────────────────────────────────────

export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const collapsed = (at: Point): Contour => Array.from({ length: POINTS }, () => [at[0], at[1]] as Point);

/** Rotates `to` so its points line up with `from` (least total travel), which stops morphs from twisting. */
function align(from: Contour, to: Contour): Contour {
  let best = 0;
  let bestCost = Infinity;
  for (let shift = 0; shift < POINTS; shift += 2) {
    let cost = 0;
    for (let i = 0; i < POINTS; i += 3) {
      const [ax, ay] = from[i];
      const [bx, by] = to[(i + shift) % POINTS];
      cost += (ax - bx) ** 2 + (ay - by) ** 2;
      if (cost >= bestCost) break;
    }
    if (cost < bestCost) {
      bestCost = cost;
      best = shift;
    }
  }
  return best === 0 ? to : [...to.slice(best), ...to.slice(0, best)];
}

type Pair = { from: Contour; to: Contour }[];
const pairCache = new WeakMap<Glyph, WeakMap<Glyph, Pair>>();

const pairSlots = (from: Contour[], to: Contour[]): Pair =>
  Array.from({ length: Math.max(from.length, to.length) }, (_, i) => {
    const a = from[i] ?? collapsed(centroid(to[i]));
    const b = to[i] ?? collapsed(centroid(from[i]));
    return { from: a, to: align(a, b) };
  });

function pairsFor(a: Glyph, b: Glyph): Pair {
  let inner = pairCache.get(a);
  if (!inner) pairCache.set(a, (inner = new WeakMap()));
  let pair = inner.get(b);
  if (!pair) {
    pair = [...pairSlots(a.outers, b.outers), ...pairSlots(a.holes, b.holes)];
    inner.set(b, pair);
  }
  return pair;
}

/** Contours of `a` blended toward `b`; `amount` 0 → a, 1 → b. */
export function blendGlyphs(a: Glyph, b: Glyph, amount: number): Contour[] {
  if (amount <= 0) return [...a.outers, ...a.holes];
  return pairsFor(a, b).map(({ from, to }) =>
    from.map(([x, y], i): Point => [x + (to[i][0] - x) * amount, y + (to[i][1] - y) * amount])
  );
}

export const glyphContours = (g: Glyph): Contour[] => [...g.outers, ...g.holes];

export const toPath = (contours: Contour[], step = 1) =>
  contours
    .map((contour) => {
      const points = step > 1 ? contour.filter((_, i) => i % step === 0) : contour;
      return `M${points.map(([x, y]) => `${x.toFixed(3)} ${y.toFixed(3)}`).join('L')}Z`;
    })
    .join('');

/** Endless morph for small marks: hold each glyph, ease into the next, wrap. */
export function loopingGlyphPath(symbols: Glyph[], elapsed: number, cycleMs = 1600, morphMs = 480) {
  const cycle = Math.floor(elapsed / cycleMs);
  const within = elapsed - cycle * cycleMs;
  const from = symbols[cycle % symbols.length];
  const to = symbols[(cycle + 1) % symbols.length];
  const amount = within <= cycleMs - morphMs ? 0 : easeInOut((within - (cycleMs - morphMs)) / morphMs);
  return toPath(blendGlyphs(from, to, amount));
}

// ── Reveal metrics ─────────────────────────────────────────────────

const winding = (point: Point, contour: Contour) => {
  let wn = 0;
  const [px, py] = point;
  contour.forEach(([x, y], i) => {
    const [nx, ny] = contour[(i + 1) % contour.length];
    const cross = (nx - x) * (py - y) - (px - x) * (ny - y);
    if (y <= py && ny > py && cross > 0) wn++;
    else if (y > py && ny <= py && cross < 0) wn--;
  });
  return wn;
};

const segmentDistance = ([px, py]: Point, [ax, ay]: Point, [bx, by]: Point) => {
  const dx = bx - ax;
  const dy = by - ay;
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy || 1)));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
};

const metricsCache = new WeakMap<Glyph, { anchor: Point; clearance: number }>();

/**
 * The point deepest inside the glyph and how far it is from the nearest
 * edge. The theme reveal grows the glyph around this point, until that
 * clearance is larger than the viewport, so every glyph ends up covering
 * the screen, even ones with gaps or holes.
 */
export function revealMetrics(g: Glyph) {
  const cached = metricsCache.get(g);
  if (cached) return cached;
  const contours = glyphContours(g);
  let best = { anchor: [0, 0] as Point, clearance: 0 };
  for (let gx = -1.1; gx <= 1.1; gx += 0.05) {
    for (let gy = -1.1; gy <= 1.1; gy += 0.05) {
      const point: Point = [gx, gy];
      if (contours.reduce((sum, c) => sum + winding(point, c), 0) === 0) continue;
      let clearance = Infinity;
      contours.forEach((c) =>
        c.forEach((a, i) => {
          clearance = Math.min(clearance, segmentDistance(point, a, c[(i + 1) % c.length]));
        })
      );
      if (clearance > best.clearance) best = { anchor: point, clearance };
    }
  }
  metricsCache.set(g, best);
  return best;
}
