import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Rob Wilson — Senior Software Developer';

export default function OpengraphImage() {
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
          background:
            'radial-gradient(ellipse 80% 60% at 75% 20%, rgba(94,234,212,0.16), transparent 60%), linear-gradient(180deg, #10192a 0%, #0a0f18 45%, #060a10 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 56,
            height: 4,
            background: '#5eead4',
            borderRadius: 2,
            marginBottom: 36,
          }}
        />
        <div
          style={{
            display: 'flex',
            fontSize: 96,
            fontWeight: 800,
            color: '#e6ebf2',
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
            color: '#5eead4',
          }}
        >
          Senior Software Developer
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 28,
            fontSize: 26,
            color: '#8892a6',
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
