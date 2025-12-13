import React, { useEffect, useState } from "react";

type AnimatedGlowProps = {
  /**
   * CSS color value used for the brightest part of the glow.
   * Example: "255, 255, 255" (r, g, b)
   */
  color?: string;
  /**
   * Controls the overall strength of the glow. Higher values increase opacity.
   */
  intensity?: number;
  /**
   * Duration in seconds for the glow position transition.
   */
  speed?: number;
};
const DEFAULT_COLOR = "120,120,120";
const AnimatedGlow: React.FC<AnimatedGlowProps> = ({
  color = DEFAULT_COLOR,
  intensity = 0.08,
  speed = 0.15,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY + window.scrollY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const primaryOpacity = intensity;
  const secondaryOpacity = intensity * 0.6;
  const tertiaryOpacity = intensity * 0.3;

  const background = `radial-gradient(
    700px circle at ${mousePosition.x}px ${mousePosition.y}px,
    rgba(${color}, ${primaryOpacity}),
    rgba(${color}, ${secondaryOpacity}),
    rgba(${color}, ${tertiaryOpacity}),
    transparent 100%
  )`;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        background,
        transition: `background ${speed}s ease-in-out`,
        minHeight: "100vh",
        width: "100%",
      }}
    />
  );
};

export default AnimatedGlow;
