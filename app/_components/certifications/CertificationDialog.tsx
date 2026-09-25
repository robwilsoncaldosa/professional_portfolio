'use client'
import React, { useState } from 'react';
import type { Transition } from 'motion/react';
import { CheckIcon, CloudIcon, CopyIcon, FileTextIcon, LinkedinIcon, XIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogDescription,
  MorphingDialogImage,
  MorphingDialogSubtitle,
  MorphingDialogTitle,
} from '@/components/ui/morphing-dialog';
import {
  formatCertificationDate,
  type CertificationConfig,
  type CertificationIssuer,
} from '@/config/certification-data.config';

/** Shared by every certification dialog so cards and dialog morph identically. */
export const CERTIFICATION_DIALOG_TRANSITION: Transition = {
  type: 'spring',
  bounce: 0.05,
  duration: 0.35,
};

/** Rendered preview size (see certification-data.config). */
export const CERTIFICATE_PREVIEW_WIDTH = 1400;
export const CERTIFICATE_PREVIEW_HEIGHT = 1082;

const ISSUER_ICONS: Record<CertificationIssuer, React.ElementType> = {
  'Google Cloud': CloudIcon,
  'LinkedIn Learning': LinkedinIcon,
};

export function IssuerMark({ issuer, className }: { issuer: CertificationIssuer; className?: string }) {
  const Icon = ISSUER_ICONS[issuer];
  return (
    <span className={`inline-flex items-center gap-1.5 ${className ?? ''}`}>
      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
      {issuer}
    </span>
  );
}

// Content fades up slightly after the container starts morphing; exits
// faster than it enters so closing feels immediate.
const DETAIL_VARIANTS = {
  initial: { opacity: 0, y: 8, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.25, delay: 0.08 } },
  exit: { opacity: 0, y: 4, filter: 'blur(4px)', transition: { duration: 0.12 } },
};

const CLOSE_VARIANTS = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.2, delay: 0.1 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.1 } },
};

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border/60 py-2.5 last:border-b-0">
      <dt className="shrink-0 text-xs font-bold uppercase tracking-widest text-secondary">{label}</dt>
      <dd className="m-0 min-w-0 text-right text-sm text-foreground">{children}</dd>
    </div>
  );
}

function CredentialId({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard unavailable — the full ID is still selectable.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group inline-flex max-w-full items-center gap-2 font-mono text-xs text-secondary hover:text-foreground"
      aria-label={copied ? 'Credential ID copied' : 'Copy credential ID'}
    >
      <span className="truncate">{value.length > 20 ? `${value.slice(0, 10)}…${value.slice(-6)}` : value}</span>
      {copied ? (
        <CheckIcon className="h-3.5 w-3.5 shrink-0 text-ring" />
      ) : (
        <CopyIcon className="h-3.5 w-3.5 shrink-0" />
      )}
    </button>
  );
}

export function CertificationDialogContent({ certification }: { certification: CertificationConfig }) {
  const {
    title,
    issuer,
    partner,
    issuedAt,
    expiresAt,
    credentialId,
    accreditation,
    duration,
    skills,
    file,
    previewSrc,
  } = certification;

  return (
    <MorphingDialogContainer>
      <MorphingDialogContent
        style={{ borderRadius: 16 }}
        className="relative grid max-h-[90vh] w-full max-w-4xl overflow-y-auto border border-border bg-card text-secondary shadow-2xl md:grid-cols-[1.35fr_1fr] md:overflow-hidden"
      >
        <div className="bg-muted/40 p-3 md:p-4">
          <MorphingDialogImage
            src={previewSrc}
            alt={`${title} certificate`}
            width={CERTIFICATE_PREVIEW_WIDTH}
            height={CERTIFICATE_PREVIEW_HEIGHT}
            className="h-auto w-full rounded-lg"
          />
        </div>

        <div className="flex flex-col p-6 md:overflow-y-auto">
          <MorphingDialogSubtitle className="text-xs font-bold uppercase tracking-widest text-secondary">
            <IssuerMark issuer={issuer} />
          </MorphingDialogSubtitle>
          <MorphingDialogTitle className="mt-2 pr-8 text-xl font-bold leading-snug text-foreground">
            {title}
          </MorphingDialogTitle>

          <MorphingDialogDescription disableLayoutAnimation variants={DETAIL_VARIANTS} className="flex flex-1 flex-col">
            {partner && <p className="mt-1 text-sm">In partnership with {partner}</p>}

            <dl className="mb-0 mt-5">
              <DetailRow label="Issued">{formatCertificationDate(issuedAt)}</DetailRow>
              {expiresAt && <DetailRow label="Expires">{formatCertificationDate(expiresAt)}</DetailRow>}
              {duration && <DetailRow label="Duration">{duration}</DetailRow>}
              {accreditation && <DetailRow label="Credit">{accreditation}</DetailRow>}
              <DetailRow label="Credential">
                <CredentialId value={credentialId} />
              </DetailRow>
            </dl>

            <div className="mt-5 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 pt-2 md:mt-auto">
              <a
                href={encodeURI(file)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ring px-4 py-2.5 text-sm font-bold !text-background hover:bg-ring/90 active:scale-[0.97]"
              >
                <FileTextIcon className="h-4 w-4" />
                View original PDF
              </a>
            </div>
          </MorphingDialogDescription>
        </div>

        <MorphingDialogClose
          variants={CLOSE_VARIANTS}
          className="right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur-sm hover:bg-background active:scale-[0.95]"
        >
          <XIcon className="h-4 w-4" />
        </MorphingDialogClose>
      </MorphingDialogContent>
    </MorphingDialogContainer>
  );
}
