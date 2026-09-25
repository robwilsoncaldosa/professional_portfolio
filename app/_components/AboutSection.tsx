import React from 'react';
import ScrollReveal from './ScrollReveal';

const ABOUT_PARAGRAPHS = [
  "I'm Rob, a Senior Software Developer in Cebu. I build dependable web applications, specializing in React and Next.js, with solid footing across Node.js, .NET, Docker, and Google Cloud.",
  "Today I build financial applications at M Lhuillier, where reliability isn't optional. Before that, I delivered enterprise systems at Accenture and built the shared frontend components DNA Micro ran on.",
  "AI is a tool, and I use it exceptionally well. Claude Code, Gemini CLI, and Codex help me learn codebases faster and ship more, while the architecture, review, and craft stay mine. I'm a Google Cloud certified Generative AI Leader, now preparing for Associate Cloud Engineer.",
] as const;

const AboutSection: React.FC = () => {
  return (
    <section id='About' className='*:px-6' aria-labelledby="about-heading">
      <h4
        id="about-heading"
        className="font-bold sticky top-0 bg-transparent backdrop-blur-lg py-3 sm:hidden z-50"
      >
        ABOUT
      </h4>

      <div className="space-y-4 text-secondary leading-relaxed">
        {ABOUT_PARAGRAPHS.map((paragraph, index) => (
          <ScrollReveal key={paragraph} index={index}>
            <p className={index === 0 ? '!mt-1 max-w-2xl' : 'max-w-2xl'}>
              {paragraph}
            </p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
