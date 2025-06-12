import React from 'react';
import ExperienceCard from './ExperienceCard';

const ExperienceSection: React.FC = () => {
  return (
    <div id='Experience' className=' md:mt-20'>
      <h4 className="font-bold sticky top-0 py-3 bg-transparent backdrop-blur-lg sm:hidden px-6 z-50">EXPERIENCE</h4>
      <article>
        <ExperienceCard 
          period="2025 - PRESENT"
          title="Package App Development Analyst"
          company="Accenture"
          description="Developing and maintaining enterprise applications for clients across various industries. Collaborating with global teams to implement solutions that meet business requirements. Participating in the full software development lifecycle from requirements gathering to deployment."
          skills={["C#", "ASP.NET Core", "JavaScript", "React", "SQL", "Waterfall"]}
        />

        <ExperienceCard 
          period="2024 - 2025"
          title="Full Stack Developer"
          company="DNA Micro Software Inc"
          description="Build and maintain critical components used in DNA Micro's frontend across all projects. Work closely with Business Analysts, cross-functional teams, including developers, designers, functional managers, and product managers."
          skills={["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Tailwind", "Storybook"]}
        />

        <ExperienceCard 
          period="FEB - NOV 2023"
          title="Full Stack Developer"
          company="Prince Retail Group of Companies"
          description="Developed and styled interactive web apps for the company's infrastructure department data and marketing data with a focus on user experience and performance optimization. Collaborated with cross-functional teams to ensure seamless integration and functionality."
          skills={["C#", ".NET Core", "JavaScript", "JQuery", "Bootstrap"]}
        />
      </article>
    </div>
  );
};

export default ExperienceSection;