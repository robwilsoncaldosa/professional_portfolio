import React from 'react';

const ABOUT_PARAGRAPHS = [
  "I build accessible, pixel-perfect experiences for the web. I specialize in frontend development, and I love working with React to create products that feel fast, simple, and easy to use.",
  "Right now, I help lead an internal project where I improve an older codebase, fix problem areas, and support the team in building better software. I care a lot about clean structure, good developer experience, and building systems that can scale well over time.",
  "I also work across full-stack development, and I enjoy turning real business needs into clear, reliable solutions. I make time every day to keep learning, improve how I build, and stay sharp with the tools I use.",
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
          <p
            key={paragraph}
            className={index === 0 ? '!mt-1 max-w-2xl' : 'max-w-2xl'}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
