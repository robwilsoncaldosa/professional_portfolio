'use client'
import React, { useState } from 'react';
import { MailIcon, CopyIcon, CheckIcon } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { SOCIAL_LINKS } from './SocialLinks';

const CONTACT_EMAIL = 'robwilsoncaldoza@gmail.com';

const ContactCTA: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — the email
      // app link below still works as a fallback.
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        className="group mt-8 w-fit gap-2 rounded-full border border-ring/40 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-foreground transition-all duration-200 ease-out hover:border-ring hover:bg-ring/10 active:scale-[0.97] focus-visible:outline-none"
        aria-label="Open contact card"
      >
        <MailIcon className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        Say Hello
      </DialogTrigger>

      <DialogContent className="w-[calc(100vw-2.5rem)] max-w-sm p-6">
        <DialogClose />
        <DialogHeader>
          <DialogTitle>Let&apos;s build something</DialogTitle>
          <DialogDescription>
            Open to new roles, freelance work, or just talking shop about frontend and systems design.
          </DialogDescription>
        </DialogHeader>

        <button
          type="button"
          onClick={handleCopy}
          className="group mt-5 flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3 text-left transition-colors duration-200 ease-out hover:border-ring/50 hover:bg-ring/5"
        >
          <span className="truncate text-sm font-medium text-foreground">{CONTACT_EMAIL}</span>
          <span className="shrink-0 text-secondary transition-colors duration-200 ease-out group-hover:text-foreground">
            {copied ? <CheckIcon className="h-4 w-4 text-ring" /> : <CopyIcon className="h-4 w-4" />}
          </span>
        </button>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-ring px-4 py-2.5 text-sm font-bold text-background transition-all duration-200 ease-out hover:bg-ring/90 active:scale-[0.97]"
        >
          Open email app
        </a>

        <div className="mt-6 flex items-center gap-6 border-t border-border pt-5">
          {SOCIAL_LINKS.map(({ label, url, Icon }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-secondary transition-all duration-200 ease-out hover:text-foreground hover:-translate-y-0.5"
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactCTA;
