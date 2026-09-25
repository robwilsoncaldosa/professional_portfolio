'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionTemplate, useSpring } from 'motion/react';

interface ProjectImageTiltProps {
  imageSrc?: string;
  imageAlt?: string;
  title: string;
}

const TILT_DEGREES = 8;
const SPRING = { stiffness: 220, damping: 24, mass: 0.4 };

const ProjectImageTilt: React.FC<ProjectImageTiltProps> = ({ imageSrc, imageAlt, title }) => {
  const [tiltEnabled, setTiltEnabled] = useState(false);

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTiltEnabled(canHover && !reducedMotion);
  }, []);

  const rotateX = useSpring(0, SPRING);
  const rotateY = useSpring(0, SPRING);
  const glowX = useSpring(50, SPRING);
  const glowY = useSpring(50, SPRING);
  const glowOpacity = useSpring(0, { stiffness: 200, damping: 30 });

  const background = useMotionTemplate`radial-gradient(220px circle at ${glowX}% ${glowY}%, rgba(255, 255, 255, 0.14), transparent 70%)`;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!tiltEnabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    rotateY.set((px - 0.5) * TILT_DEGREES * 2);
    rotateX.set((0.5 - py) * TILT_DEGREES * 2);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const handlePointerEnter = () => {
    if (!tiltEnabled) return;
    glowOpacity.set(1);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
    glowOpacity.set(0);
  };

  return (
    <motion.div
      className="w-full overflow-hidden rounded-lg"
      style={{ perspective: 800 }}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        className="relative"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        <Image
          src={imageSrc || '/placeholder.png'}
          alt={imageAlt || title}
          width={1000}
          height={1000}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background, opacity: glowOpacity }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ProjectImageTilt;
