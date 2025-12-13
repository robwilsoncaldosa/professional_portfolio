import React from 'react';
import { ArrowRight } from 'lucide-react';

type HeadingWithSubtextProps = {
  title: string;
  subtitle?: string;
}

function HeadingWithSubtext({ title, subtitle }: HeadingWithSubtextProps) {
  return (
    <>
      <h3 className="mt-0 mb-0 flex items-center gap-2 w-fit">
        <strong className="text-foreground relative mb-0 font-extrabold text-nowrap">
          {title}
          <span className="absolute -bottom-[.2px] left-0 w-full h-[1px] bg-foreground origin-bottom-right scale-x-0 transition-transform duration-300 ease-in-out group-hover/card:origin-bottom-left group-hover/card:scale-x-100"></span>
        </strong>
        <ArrowRight className="w-4 h-4 text-foreground transition-transform duration-300 ease-in-out group-hover/card:translate-x-2" />
      </h3>
      {subtitle && (
        <span className="text-secondary text-sm font-semibold">
          {subtitle}
        </span>
      )}
    </>
  );
}

export default HeadingWithSubtext;

