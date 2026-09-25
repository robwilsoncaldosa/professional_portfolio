import { ViewTransition } from 'react';

/**
 * Next.js re-mounts a template on every navigation (unlike a layout), so
 * the outgoing page runs its `exit` and the incoming page its `enter`
 * inside one browser view transition. Route navigations are React
 * transitions, so this activates automatically. Animations live in
 * globals.css under `::view-transition-*(.page-*)`.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
