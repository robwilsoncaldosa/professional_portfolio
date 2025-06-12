'use client'
import React, { useEffect, useState } from 'react';
import SocialLinks from './SocialLinks';

// Navigation configuration - easy to maintain and extend
const NAVIGATION_SECTIONS = [
  { id: 'About', label: 'ABOUT' },
  { id: 'Experience', label: 'EXPERIENCE' },
  { id: 'Projects', label: 'PROJECTS' }
] as const;

type SectionId = typeof NAVIGATION_SECTIONS[number]['id'];

const ProfileHeader: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('About');

  const useIntersectionObserver = () => {
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          // Find the entry with the highest intersection ratio
          const mostVisible = entries.reduce((prev, current) => 
            current.intersectionRatio > prev.intersectionRatio ? current : prev
          );

          if (mostVisible.isIntersecting && mostVisible.intersectionRatio > 0) {
            setActiveSection(mostVisible.target.id as SectionId);
          }
        },
        {
          rootMargin: '-20% 0px -20% 0px',
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
        }
      );

      // Observe all configured sections
      const sectionSelectors = NAVIGATION_SECTIONS.map(section => `#${section.id}`).join(', ');
      const sections = document.querySelectorAll(sectionSelectors);
      sections.forEach((section) => observer.observe(section));

      return () => observer.disconnect();
    }, []);
  };

  useIntersectionObserver();

  const handleSectionClick = (sectionId: SectionId) => {
    setActiveSection(sectionId);
    // Smooth scroll to section
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      title="left-section" 
      className="md:flex md:flex-col text-foreground px-6 md:px-0 md:max-h-screen md:py-24 md:sticky top-0"
    >
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="mb-0 md:text-5xl">
          Rob Wilson<br className='sm:hidden' />
        </h1>
        <span className="text-xl font-medium md:mt-10 leading-loose tracking-tight">
          Full Stack Developer
        </span>
        <p className="mt-4 text-secondary max-w-sm">
          I build and maintain accessible, user-friendly web applications.
        </p>
      </div>

      {/* Navigation Section */}
      <nav className="flex-col gap-4 mt-8 hidden md:flex" role="navigation" aria-label="Page sections">
        {NAVIGATION_SECTIONS.map((section) => {
          const isActive = activeSection === section.id;
          
          return (
            <div 
              key={section.id}
              className="flex items-center gap-2 group cursor-pointer"
              onClick={() => handleSectionClick(section.id)}
            >
              {/* Animated indicator line */}
              <div 
                className={`h-[1px] transition-all duration-300 ease-out ${
                  isActive 
                    ? 'w-16 bg-foreground' 
                    : 'w-8 bg-secondary group-hover:w-12 group-hover:bg-foreground/70'
                }`} 
              />
              
              {/* Section link */}
              <a 
                href={`#${section.id}`}
                className={`uppercase text-sm tracking-wider transition-colors duration-300 ease-out ${
                  isActive 
                    ? 'text-foreground' 
                    : '!text-secondary !group-hover:text-foreground/80'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleSectionClick(section.id);
                }}
                aria-current={isActive ? 'page' : undefined}
              >
                {section.label}
              </a>
            </div>
          );
        })}
      </nav>

      <SocialLinks />
    </section>
  );
};

export default ProfileHeader;