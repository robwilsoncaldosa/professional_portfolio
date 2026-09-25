'use client'
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { AnimatedBackground } from '@/components/ui/animated-background';
import CursorGlow from '../_components/CursorGlow';
import { CertificationGridCard } from '../_components/certifications/CertificationCard';
import {
  CERTIFICATIONS,
  CERTIFICATION_CATEGORIES,
  type CertificationCategory,
} from '../../config/certification-data.config';

type Filter = 'All' | CertificationCategory;

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const GRID_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035 } },
  exit: { opacity: 0, transition: { duration: 0.12, ease: 'easeOut' as const } },
};

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: EASE_OUT } },
};

const FILTERS: readonly Filter[] = ['All', ...CERTIFICATION_CATEGORIES];

const countFor = (filter: Filter) =>
  filter === 'All'
    ? CERTIFICATIONS.length
    : CERTIFICATIONS.filter((certification) => certification.category === filter).length;

export default function CertificationsPage() {
  const [filter, setFilter] = useState<Filter>('All');

  const visible = useMemo(
    () =>
      filter === 'All'
        ? CERTIFICATIONS
        : CERTIFICATIONS.filter((certification) => certification.category === filter),
    [filter]
  );

  return (
    <main className="w-full min-h-screen relative">
      <CursorGlow />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 relative z-10">
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-sm text-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="Back to home"
        >
          <span className="mr-2">←</span>
          <span>Back to home</span>
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Certifications</h1>
        <p className="text-secondary mb-10 max-w-2xl">
          Credentials and courses I&apos;ve completed to keep sharpening my craft — from AI and cloud
          to frontend, backend and how teams ship.
        </p>

        <div
          role="tablist"
          aria-label="Filter certifications"
          className="mb-8 inline-flex max-w-full flex-wrap gap-1 rounded-full border border-border bg-card/40 p-1"
        >
          <AnimatedBackground
            defaultValue="All"
            onValueChange={(value) => value && setFilter(value as Filter)}
            className="rounded-full bg-accent"
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
          >
            {FILTERS.map((item) => (
              <button
                key={item}
                data-id={item}
                type="button"
                role="tab"
                aria-selected={filter === item}
                className="rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-secondary transition-colors duration-200 ease-out hover:text-foreground data-[checked=true]:text-foreground"
              >
                <span className="inline-flex items-center gap-2">
                  {item}
                  <span className="tabular-nums opacity-50">{countFor(item)}</span>
                </span>
              </button>
            ))}
          </AnimatedBackground>
        </div>

        {/* Swap the whole grid on filter change: the old set fades out quickly,
            the new one fades up with a light stagger. No scaling or re-flowing
            cards, so the change reads as one calm beat. */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={filter}
            className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={GRID_VARIANTS}
          >
            {visible.map((certification) => (
              <motion.li key={certification.id} variants={CARD_VARIANTS} className="m-0 p-0">
                <CertificationGridCard certification={certification} />
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </main>
  );
}
