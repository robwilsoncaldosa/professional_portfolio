import { ImageResponse } from 'next/og';
import { cookies } from 'next/headers';
import { THEME_COOKIE_NAME, getPaletteById } from '@/config/theme-palettes.config';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function AppleIcon() {
  const cookieStore = await cookies();
  const palette = getPaletteById(cookieStore.get(THEME_COOKIE_NAME)?.value);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: palette.swatch.background,
        }}
      >
        <span
          style={{
            fontSize: 110,
            fontWeight: 800,
            color: palette.swatch.accent,
            fontFamily: 'sans-serif',
          }}
        >
          R
        </span>
      </div>
    ),
    { ...size }
  );
}
