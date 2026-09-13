import React from 'react';
import ProjectCard from './ProjectCard';
import ScrollReveal from './ScrollReveal';
import { FEATURED_PROJECTS } from '../../config/project-data.config';

const ProjectsSection: React.FC = () => {
  return (
    <div id='Projects' className=' md:mt-20'>
      <h4 className="font-bold sticky top-0 py-3 bg-transparent backdrop-blur-lg sm:hidden z-50 px-6">PROJECTS</h4>
      <article className="group [&:has(.exp-card:hover)_.exp-card:not(:hover)]:opacity-[var(--card-opacity)] [&:has(.exp-card:focus-within)_.exp-card:not(:focus-within)]:opacity-[var(--card-opacity)]">
        {FEATURED_PROJECTS.map((project, index) => (
          <ScrollReveal key={project.id} index={index}>
            <ProjectCard
              title={project.name}
              description={project.description}
              outcome={project.outcome}
              skills={project.skills}
              href={project.href}
              imageSrc={project.imageSrc}
              imageAlt={project.imageAlt}
            />
          </ScrollReveal>
        ))}
      </article>
    </div>
  );
};

export default ProjectsSection;
