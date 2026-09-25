'use client'
import React from 'react';
import { Badge } from '@/components/ui/badge';
import HeadingWithSubtext from '@/components/shared/heading-with-subtext';
import {
  MorphingDialog,
  MorphingDialogImage,
  MorphingDialogSubtitle,
  MorphingDialogTitle,
  MorphingDialogTrigger,
} from '@/components/ui/morphing-dialog';
import { formatCertificationDate, type CertificationConfig } from '@/config/certification-data.config';
import {
  CERTIFICATION_DIALOG_TRANSITION,
  CertificationDialogContent,
  IssuerMark,
  previewSizeOf,
} from './CertificationDialog';

interface CertificationCardProps {
  certification: CertificationConfig;
}

/**
 * Home page row — mirrors ProjectCard (thumbnail left, heading + badges
 * right, soft hover surface) so it sits naturally under Projects.
 */
export const FeaturedCertificationCard: React.FC<CertificationCardProps> = ({ certification }) => {
  const { title, issuer, partner, issuedAt, expiresAt, accreditation, skills, previewSrc } = certification;
  const { width, height } = previewSizeOf(certification);
  const highlight =
    certification.highlight ??
    (expiresAt
      ? `Valid through ${formatCertificationDate(expiresAt)}`
      : accreditation ?? (partner ? `With ${partner}` : undefined));

  return (
    <MorphingDialog transition={CERTIFICATION_DIALOG_TRANSITION}>
      <MorphingDialogTrigger
        aria-label={`View ${title} certificate`}
        style={{ borderRadius: 8 }}
        className="exp-card group/card relative block w-full p-6 text-left text-secondary opacity-100 transition-opacity duration-300 ease-in-out hover:!opacity-100 focus-within:!opacity-100 focus-visible:outline-none motion-reduce:transition-none"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-4 -inset-y-4 z-0 rounded-lg bg-foreground/[0.04] opacity-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-opacity duration-300 ease-out group-hover/card:opacity-100 group-hover/card:shadow-lg group-focus-visible/card:opacity-100 motion-reduce:transition-none"
        />
        <span className="relative z-10 flex flex-col items-start gap-4 md:grid md:grid-cols-[200px,1fr]">
          <span className="not-prose block w-full overflow-hidden rounded-md border border-foreground/10 bg-muted/40 p-1.5 transition-[border-color] duration-300 ease-out group-hover/card:border-foreground/20">
            <span className="block brightness-[0.88] transition-[filter] duration-300 ease-out group-hover/card:brightness-100 group-focus-visible/card:brightness-100">
              <MorphingDialogImage
                src={previewSrc}
                alt={`${title} certificate`}
                width={width}
                height={height}
                loading="lazy"
                className="h-auto w-full rounded-[4px]"
              />
            </span>
          </span>
          <span className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-widest opacity-60">
              {formatCertificationDate(issuedAt)}
            </span>
            <HeadingWithSubtext as="span" title={title} />
            <span className="mt-1 block text-sm font-semibold text-secondary">
              <IssuerMark issuer={issuer} />
            </span>
            {highlight && (
              <span className="mt-3 block text-xs font-bold uppercase tracking-wide text-ring">{highlight}</span>
            )}
            <span className="mt-3 flex flex-wrap gap-1 gap-y-2">
              {skills.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </span>
          </span>
        </span>
      </MorphingDialogTrigger>
      <CertificationDialogContent certification={certification} />
    </MorphingDialog>
  );
};

/**
 * Archive grid tile — the common "credential card" layout: certificate
 * preview on top, issuer + date, title, then skills.
 */
export const CertificationGridCard: React.FC<CertificationCardProps> = ({ certification }) => {
  const { title, issuer, issuedAt, skills, previewSrc } = certification;
  const { width, height } = previewSizeOf(certification);

  return (
    <MorphingDialog transition={CERTIFICATION_DIALOG_TRANSITION}>
      <MorphingDialogTrigger
        aria-label={`View ${title} certificate`}
        style={{ borderRadius: 12 }}
        className="group/card flex h-full w-full flex-col overflow-hidden border border-border bg-card/40 text-left text-secondary hover:border-ring/40 hover:bg-card/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <div className="overflow-hidden bg-muted/40 p-3">
          <div className="brightness-[0.88] transition-[transform,filter] duration-500 ease-out-strong group-hover/card:brightness-100 group-focus-visible/card:brightness-100 [@media(hover:hover)]:group-hover/card:scale-[1.02] motion-reduce:transition-none">
            <MorphingDialogImage
              src={previewSrc}
              alt={`${title} certificate`}
              width={width}
              height={height}
              loading="lazy"
              className="h-auto w-full rounded-md"
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-widest">
            <MorphingDialogSubtitle className="text-secondary">
              <IssuerMark issuer={issuer} />
            </MorphingDialogSubtitle>
            <span className="shrink-0 opacity-60">{formatCertificationDate(issuedAt)}</span>
          </div>
          <MorphingDialogTitle className="mt-3 text-sm font-bold leading-snug text-foreground">
            {title}
          </MorphingDialogTitle>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
            {skills.slice(0, 3).map((skill) => (
              <Badge key={skill} className="px-2.5 py-0.5">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </MorphingDialogTrigger>
      <CertificationDialogContent certification={certification} />
    </MorphingDialog>
  );
};
