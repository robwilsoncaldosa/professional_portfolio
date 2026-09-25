import { ImageResponse } from 'next/og';
import { cookies } from 'next/headers';
import { THEME_COOKIE_NAME, getPaletteById } from '@/config/theme-palettes.config';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default async function Icon() {
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
          borderRadius: 7,
        }}
      >
        <span
          style={{
            fontSize: 20,
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
