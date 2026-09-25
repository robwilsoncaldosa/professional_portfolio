import React from 'react';
import { ArrowUpRightIcon } from 'lucide-react';

const CONTACT_EMAIL = 'robwilsoncaldoza@gmail.com';

const ContactCTA: React.FC = () => {
  return (
    <a
      href={`mailto:${CONTACT_EMAIL}`}
      aria-label={`Email Rob at ${CONTACT_EMAIL}`}
      className="group relative mt-8 inline-flex w-fit items-center gap-2 rounded-sm py-1 text-xs font-bold uppercase tracking-widest !text-foreground transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-ring/70 after:transition-transform after:duration-300 after:ease-out-strong hover:after:scale-x-100"
    >
      Email Me
      <ArrowUpRightIcon className="h-3.5 w-3.5 text-secondary transition-[transform,color] duration-300 ease-out-strong group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ring group-focus-visible:text-ring" />
    </a>
  );
};

export default ContactCTA;
