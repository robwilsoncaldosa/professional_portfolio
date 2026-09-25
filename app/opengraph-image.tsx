import { ImageResponse } from 'next/og';
import { cookies } from 'next/headers';
import { THEME_COOKIE_NAME, getPaletteById } from '@/config/theme-palettes.config';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Rob Wilson — Senior Software Developer';

export default async function OpengraphImage() {
  const cookieStore = await cookies();
  const palette = getPaletteById(cookieStore.get(THEME_COOKIE_NAME)?.value);
  const { background, accent } = palette.swatch;
  const foreground = `hsl(${palette.vars.foreground})`;
  const secondary = `hsl(${palette.vars.secondary})`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 96px',
          background: `radial-gradient(ellipse 80% 60% at 75% 20%, rgba(${palette.vars.glowPrimaryRgb},0.16), transparent 60%), linear-gradient(180deg, ${palette.vars.pageGradientTop} 0%, ${background} 45%, ${palette.vars.pageGradientBottom} 100%)`,
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 56,
            height: 4,
            background: accent,
            borderRadius: 2,
            marginBottom: 36,
          }}
        />
        <div
          style={{
            display: 'flex',
            fontSize: 96,
            fontWeight: 800,
            color: foreground,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          Rob Wilson
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 20,
            fontSize: 40,
            fontWeight: 600,
            color: accent,
          }}
        >
          Senior Software Developer
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 28,
            fontSize: 26,
            color: secondary,
            maxWidth: 820,
          }}
        >
          Thoughtful UI/UX, better developer experience, and systems that scale.
        </div>
      </div>
    ),
    { ...size }
  );
}
