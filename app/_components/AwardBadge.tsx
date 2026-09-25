import React from 'react';
import { TrophyIcon } from 'lucide-react';

interface AwardBadgeProps {
  label: string;
  event?: string;
}

/** Gold pill for wins. The light sweep lives in globals.css (`.award-badge`). */
const AwardBadge: React.FC<AwardBadgeProps> = ({ label, event }) => (
  <span className="award-badge inline-flex items-center gap-1.5 rounded-full bg-amber-300/10 px-3 py-1 text-xs font-semibold leading-5 text-amber-300">
    <TrophyIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
    <span>
      <span className="sr-only">Award: </span>
      {label}
      {event && <span className="font-medium text-amber-300/70"> · {event}</span>}
    </span>
  </span>
);

export default AwardBadge;
