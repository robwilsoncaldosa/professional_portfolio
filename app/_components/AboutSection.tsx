import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <div id='About' className='*:px-6'>
      <h4 className="font-bold sticky top-0 bg-transparent backdrop-blur-lg py-3 sm:hidden z-50">ABOUT</h4>
      <p>
        I'm a developer passionate about creating simple, clean, and elegant
        interfaces that are accessible and user-friendly. I also prioritize{" "}
        performance and enjoy exploring and developing experiences that are
        both user-friendly and developer-friendly.
      </p>
      <p>
        Currently, I'm a <strong className="text-foreground">Package Development Analyst</strong> at{" "}
        <strong className="text-foreground">Accenture</strong>,
        where I build scalable features for enterprise applications using{" "}
        <strong className="text-foreground">.NET Core</strong>,{" "}
        <strong className="text-foreground">C#</strong>,{" "}
        <strong className="text-foreground">MS SQL</strong>, and{" "}
        <strong className="text-foreground">Azure</strong>. I create comprehensive unit tests using{" "}
        <strong className="text-foreground">xUnit with FakeItEasy</strong> for optimal code coverage, 
        collaborate with onshore developers and business analysts, and implement 
        bug fixes and performance optimizations while following strict{" "}
        <strong className="text-foreground">security protocols</strong> and best practices 
        for maintainable, scalable code development.
      </p>

      <p>
        Previously, I was a Full Stack Developer at{" "}
        <strong className="text-foreground">DNA Micro Inc</strong>,
        where I specialized in exploring tech and components, contributing to the
        creation and maintenance of{" "}
        <strong className="text-foreground">UI Components</strong> that powered
        DNA Micro's frontend while ensuring our platform met{" "}
        <strong className="text-foreground">
          web accessibility standards
        </strong>{" "}
        and best practices to deliver an inclusive user and developer
        experience.
      </p>

      <p>
        In the past, I've had the opportunity to develop software for a
        <strong className="text-foreground">
          {" "}
          non-governmental organization (NGO)
        </strong>{" "}
        that offers guesthouse booking services to fund their beneficiaries,
        and in my spare time, I work with clients on various projects,
        including professional and capstone projects. These experiences have
        exposed me to various languages such as{" "}
        <strong className="text-foreground">PHP</strong>,{" "}
        <strong className="text-foreground">C#</strong>, and
        <strong className="text-foreground"> JavaScript/TypeScript</strong>.
      </p>
      <p>
        Additionally, I am eager to learn and adapt quickly to new
        technologies and frameworks. I am flexible and open to exploring
        various ecosystems and other emerging technologies.
      </p>
    </div>
  );
};

export default AboutSection;