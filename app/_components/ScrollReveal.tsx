'use client'
import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  index?: number;
  className?: string;
}

const MAX_STAGGER_STEPS = 6;
const STAGGER_STEP_MS = 130;

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, index = 0, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-visible={isVisible}
      className={`reveal-on-scroll${className ? ` ${className}` : ''}`}
      style={{ transitionDelay: `${Math.min(index, MAX_STAGGER_STEPS) * STAGGER_STEP_MS}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
