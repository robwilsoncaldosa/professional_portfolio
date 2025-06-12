import React from 'react';

// Configuration for easy maintenance
const PROFILE_DATA = {
  intro: "I build elegant software that just works. From accessible frontends to secure enterprise backends, I craft solutions that users love and businesses depend on.",
  
  currentRole: {
    title: "Package Development Analyst",
    company: "Accenture",
    description: "architecting enterprise applications with .NET Core, C#, and Azure. I deliver robust, tested solutions that scale under pressure while meeting strict security standards."
  },
  
  previousRole: {
    title: "Full Stack Developer", 
    company: "DNA Micro Inc",
    description: "creating inclusive web experiences through accessible UI design and development."
  },
  
  additionalExperience: "Beyond my corporate roles, I've built solutions for NGOs and diverse clients, mastering PHP, C#, and the JavaScript ecosystem along the way.",
  
  mindset: "I thrive on solving complex problems with simple, elegant code. Always learning, always improving."
};

const TECH_STACK = {
  backend: [".NET Core", "C#", "Azure"],
  testing: ["tested solutions"],
  frontend: ["UI design", "accessible"],
  languages: ["PHP", "C#", "JavaScript"],
  concepts: ["security standards", "scale"]
};

const AboutSection: React.FC = () => {
  const renderHighlightedText = (text: string, techCategories: string[][] = []) => {
    let result = text;
    const allTechTerms = techCategories.flat();
    
    allTechTerms.forEach(term => {
      // Escape special characters in the term
      const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      
      // Handle special cases for C# and .NET Core
      if (term === "C#") {
        const csharpRegex = new RegExp(`C#`, 'g');
        result = result.replace(csharpRegex, `<strong class="text-foreground">C#</strong>`);
      } else if (term === ".NET Core") {
        const dotnetRegex = new RegExp(`\\.NET Core\\b`, 'g');
        result = result.replace(dotnetRegex, `<strong class="text-foreground">.NET Core</strong>`);
      } else {
        const regex = new RegExp(`\\b${escapedTerm}\\b`, 'gi');
        result = result.replace(regex, `<strong class="text-foreground">${term}</strong>`);
      }
    });
    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <section id='About' className='*:px-6' aria-labelledby="about-heading">
      <h4 
        id="about-heading"
        className="font-bold sticky top-0 bg-transparent backdrop-blur-lg py-3 sm:hidden z-50"
      >
        ABOUT
      </h4>
      
      <div className="space-y-4 text-secondary leading-relaxed">
        <p className='!mt-1'>{PROFILE_DATA.intro}</p>
        
        <p>
          Currently <strong className="text-foreground">{PROFILE_DATA.currentRole.title}</strong> at{" "}
          <strong className="text-foreground">{PROFILE_DATA.currentRole.company}</strong>, {" "}
          {renderHighlightedText(
            PROFILE_DATA.currentRole.description, 
            [TECH_STACK.backend, TECH_STACK.testing, TECH_STACK.concepts]
          )}
        </p>

        <p>
          Previously at <strong className="text-foreground">{PROFILE_DATA.previousRole.company}</strong> as a{" "}
          <strong className="text-foreground">{PROFILE_DATA.previousRole.title}</strong>, {" "}
          {renderHighlightedText(
            PROFILE_DATA.previousRole.description,
            [TECH_STACK.frontend]
          )}
        </p>

        <p>
          {renderHighlightedText(
            PROFILE_DATA.additionalExperience,
            [TECH_STACK.languages]
          )}
        </p>

        <p className="text-foreground font-medium">{PROFILE_DATA.mindset}</p>
      </div>
    </section>
  );
};

export default AboutSection;