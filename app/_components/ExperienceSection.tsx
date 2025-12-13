import React from 'react';
import ExperienceCard from './ExperienceCard';
import { EXPERIENCES } from '../../config/experience-data.config';

const ExperienceSection: React.FC = () => {
  return (
    <div id='Experience' className=' md:mt-20'>
      <h4 className="font-bold sticky top-0 py-3 bg-transparent backdrop-blur-lg sm:hidden px-6 z-50">EXPERIENCE</h4>
      <article className="group [&:has(.exp-card:hover)>.exp-card:not(:hover)]:opacity-[var(--card-opacity)] [&:has(.exp-card:focus-within)>.exp-card:not(:focus-within)]:opacity-[var(--card-opacity)]">
        {EXPERIENCES.map(({ id, ...experience }) => (
          <ExperienceCard
            key={id}
            {...experience}
          />
        ))}
      </article>
    </div>
  );
};

export default ExperienceSection;
