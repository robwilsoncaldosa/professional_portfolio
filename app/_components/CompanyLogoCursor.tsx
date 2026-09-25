'use client'
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue } from 'motion/react';

interface CompanyLogoCursorProps {
  visible: boolean;
  logoSrc: string;
}

/**
 * Adapted from Motion Primitives' Cursor component, but portaled to
 * `document.body` instead of using its `attachToParent` mode. That mode
 * relies on `position: fixed` staying anchored to the viewport, which
 * breaks the moment the cursor is nested inside any ancestor with a
 * `transform`/`translate` value (e.g. this card's scroll-reveal wrapper) —
 * such an ancestor becomes the fixed element's containing block instead of
 * the viewport. Portaling sidesteps that entirely.
 */
const CompanyLogoCursor: React.FC<CompanyLogoCursorProps> = ({ visible, logoSrc }) => {
  const [mounted, setMounted] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    setMounted(true);
    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, [x, y]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-50"
          style={{ x, y, translateX: '-50%', translateY: '-50%' }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          <div className="flex h-14 items-center justify-center rounded-2xl bg-white px-4 shadow-xl shadow-black/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} alt="" className="h-8 w-auto max-w-[120px] object-contain" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CompanyLogoCursor;
