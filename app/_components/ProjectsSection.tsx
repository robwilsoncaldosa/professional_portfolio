import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectsSection: React.FC = () => {
  return (
    <>
      <h4 className="font-bold">PROJECTS</h4>
      <ProjectCard 
        title="Portfolio Website"
        description="A modern, responsive portfolio website built with Next.js and Tailwind CSS. Features a clean design with dark mode support and component-based architecture."
        skills={["TypeScript", "Next.js", "React", "Tailwind CSS", "Shadcn UI"]}
      />
      <ProjectCard 
        title="E-commerce Platform"
        description="Developed a full-featured e-commerce platform with user authentication, product catalog, shopping cart, and payment processing integration."
        skills={["JavaScript", "React", "Node.js", "Express", "MongoDB", "Stripe API"]}
      />
    </>
  );
};

export default ProjectsSection;