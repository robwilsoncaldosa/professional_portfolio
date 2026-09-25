import React from 'react';
import ScrollReveal from './ScrollReveal';
import { FeaturedCertificationCard } from './certifications/CertificationCard';
import { FEATURED_CERTIFICATIONS } from '../../config/certification-data.config';

const CertificationsSection: React.FC = () => {
  return (
    <div id='Certifications' className=' md:mt-20'>
      <h4 className="font-bold sticky top-0 py-3 bg-transparent backdrop-blur-lg sm:hidden z-50 px-6">CERTIFICATIONS</h4>
      <article className="group [&:has(.exp-card:hover)_.exp-card:not(:hover)]:opacity-[var(--card-opacity)] [&:has(.exp-card:focus-visible)_.exp-card:not(:focus-visible)]:opacity-[var(--card-opacity)]">
        {FEATURED_CERTIFICATIONS.map((certification, index) => (
          <ScrollReveal key={certification.id} index={index}>
            <FeaturedCertificationCard certification={certification} />
          </ScrollReveal>
        ))}
      </article>
    </div>
  );
};

export default CertificationsSection;
