import React from 'react';
import { ArrowRight } from 'lucide-react';

type HeadingWithSubtextProps = {
  title: string;
  subtitle?: string;
  /** Use "span" when rendered inside a button, where headings aren't valid. */
  as?: 'h3' | 'span';
}

function HeadingWithSubtext({
  title,
  subtitle,
  as: Heading = 'h3',
}: HeadingWithSubtextProps) {
  // The span variant (used inside buttons) matches the prose h3 size and
  // lets long titles wrap, with the arrow trailing the last word.
  const isSpan = Heading === 'span';

  return (
    <>
      <Heading className={`mt-0 mb-0 w-fit ${isSpan ? 'block text-[1.25em] leading-[1.6] text-balance' : 'flex items-center gap-2'}`}>
        <strong className={`text-foreground relative mb-0 font-extrabold transition-colors duration-300 ease-out ${isSpan ? '' : 'text-nowrap'}`}>
          {title}
          <span className="absolute -bottom-[.2px] left-0 w-full h-[1px] bg-foreground origin-bottom-right scale-x-0 transition-[transform,background-color] duration-300 ease-in-out group-hover/card:origin-bottom-left group-hover/card:scale-x-100"></span>
        </strong>
        <ArrowRight className={`w-4 h-4 shrink-0 text-foreground transition-[transform,color] duration-300 ease-in-out group-hover/card:translate-x-2 ${isSpan ? 'ml-2 inline-block align-[-0.1em]' : ''}`} />
      </Heading>
      {subtitle && (
        <span className="mt-1 block text-secondary text-sm font-semibold transition-colors duration-300 ease-out">
          {subtitle}
        </span>
      )}
    </>
  );
}

export default HeadingWithSubtext;
