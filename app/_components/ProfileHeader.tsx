'use client'
import React, { useEffect, useState } from 'react';
import SocialLinks from './SocialLinks';

const ProfileHeader: React.FC = () => {
  const [activeSection, setActiveSection] = useState('About');

   // Alternative method using Intersection Observer (more performant)
   const useIntersectionObserver = () => {
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        {
          rootMargin: '-50% 0px -50% 0px', // Trigger when section reaches middle of viewport
          threshold: 0
        }
      );

      // Observe all sections
      const sections = document.querySelectorAll('#About, #Experience, #Projects');
      sections.forEach((section) => observer.observe(section));

      return () => observer.disconnect();
    }, []);
  };

  // Uncomment the line below to use Intersection Observer instead of scroll listener
  useIntersectionObserver();

  return (
    <section title="left-section" className="md:flex md:flex-col text-foreground px-6 md:px-0 md:max-h-screen md:py-24 md:sticky top-0">
      <h1 className="mb-0 md:text-5xl">
        Rob Caldosa <br className='sm:hidden' />
      </h1>
      <span className="text-xl font-medium md:mt-3 tracking-tight">Full Stack Developer</span>

      <p className="mt-4 text-secondary max-w-sm">
        I build and maintain accessible, user-friendly web applications.
      </p>

      <div className=" flex-col gap-4 mt-8 hidden md:flex">
        <div className="flex items-center gap-2">
          <div className={`h-[1px] bg-foreground transition-all duration-300 ${activeSection === 'About' ? 'w-16' : 'w-8'}`} />
          <a 
            href="#About"
            className={`uppercase text-sm tracking-wider ${activeSection === 'About' ? 'text-foreground' : 'text-secondary'}`}
          >
            ABOUT
          </a>
        </div>
        <div className="flex items-center gap-2">
          <div className={`h-[1px] bg-foreground transition-all duration-300 ${activeSection === 'Experience' ? 'w-16' : 'w-8'}`} />
          <a
            href="#Experience" 
            className={`uppercase text-sm tracking-wider ${activeSection === 'Experience' ? 'text-foreground' : 'text-secondary'}`}
          >
            EXPERIENCE
          </a>
        </div>
        <div className="flex items-center gap-2">
          <div className={`h-[1px] bg-foreground transition-all duration-300 ${activeSection === 'Projects' ? 'w-16' : 'w-8'}`} />
          <a
            href="#Projects"
            className={`uppercase text-sm tracking-wider ${activeSection === 'Projects' ? 'text-foreground' : 'text-secondary'}`}
          >
            PROJECTS
          </a>
        </div>
      </div>
      <SocialLinks />
    </section>
  );
};

export default ProfileHeader;