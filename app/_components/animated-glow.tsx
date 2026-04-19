import React, { useEffect, useState } from "react";

type AnimatedGlowProps = {
  /**
   * CSS color value used for the brightest part of the glow.
   * Example: "255, 255, 255" (r, g, b)
   */
  color?: string;
  /**
   * Secondary glow color used to add depth and richer tonal separation.
   */
  secondaryColor?: string;
  /**
   * Ambient glow color used for the broader atmospheric layer.
   */
  ambientColor?: string;
  /**
   * Controls the overall strength of the glow. Higher values increase opacity.
   */
  intensity?: number;
  /**
   * Duration in seconds for the glow position transition.
   */
  speed?: number;
};

const DEFAULT_COLOR = "var(--glow-primary-rgb)";
const DEFAULT_SECONDARY_COLOR = "var(--glow-secondary-rgb)";
const DEFAULT_AMBIENT_COLOR = "var(--glow-tertiary-rgb)";

const AnimatedGlow: React.FC<AnimatedGlowProps> = ({
  color = DEFAULT_COLOR,
  secondaryColor = DEFAULT_SECONDARY_COLOR,
  ambientColor = DEFAULT_AMBIENT_COLOR,
  intensity = 0.06,
  speed = 0.24,
}) => {
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setViewportSize({ width, height });
      setPointerPosition((current) => {
        if (current.x !== 0 || current.y !== 0) {
          return current;
        }

        return {
          x: width * 0.72,
          y: height * 0.22,
        };
      });
    };

    handleMotionPreference();
    updateViewport();

    mediaQuery.addEventListener("change", handleMotionPreference);

    window.addEventListener("resize", updateViewport);

    if (mediaQuery.matches) {
      return () => {
        mediaQuery.removeEventListener("change", handleMotionPreference);
        window.removeEventListener("resize", updateViewport);
      };
    }

    const handlePointerMove = (event: PointerEvent) => {
      setPointerPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      mediaQuery.removeEventListener("change", handleMotionPreference);
      window.removeEventListener("resize", updateViewport);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  const width = viewportSize.width || 1440;
  const height = viewportSize.height || 900;
  const glowSize = Math.max(320, Math.min(860, width * 0.58));
  const secondaryGlowSize = Math.max(480, Math.min(1040, width * 0.8));
  const ambientGlowSize = Math.max(620, Math.min(1320, width));

  const primaryOpacity = prefersReducedMotion ? intensity * 0.65 : intensity;
  const secondaryOpacity = primaryOpacity * 0.7;
  const tertiaryOpacity = primaryOpacity * 0.38;

  const primaryX = pointerPosition.x || width * 0.72;
  const primaryY = pointerPosition.y || height * 0.22;
  const secondaryX = Math.max(primaryX - width * 0.14, width * 0.15);
  const secondaryY = Math.max(primaryY - height * 0.08, height * 0.14);
  const ambientX = width * 0.5;
  const ambientY = Math.max(primaryY * 0.5, height * 0.28);

  const background = `radial-gradient(
    ${glowSize}px circle at ${primaryX}px ${primaryY}px,
    rgba(${color}, ${primaryOpacity}),
    rgba(${color}, ${secondaryOpacity}) 24%,
    transparent 68%
  ),
  radial-gradient(
    ${secondaryGlowSize}px circle at ${secondaryX}px ${secondaryY}px,
    rgba(${secondaryColor}, ${secondaryOpacity}),
    rgba(${secondaryColor}, ${tertiaryOpacity}) 30%,
    transparent 72%
  ),
  radial-gradient(
    ${ambientGlowSize}px circle at ${ambientX}px ${ambientY}px,
    rgba(${ambientColor}, ${tertiaryOpacity}),
    transparent 80%
  )`;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background,
        transition: prefersReducedMotion
          ? "none"
          : `background ${speed}s ease-out`,
        width: "100vw",
        height: "100vh",
        opacity: 0.82,
        mixBlendMode: "lighten",
      }}
    />
  );
};

export default AnimatedGlow;
