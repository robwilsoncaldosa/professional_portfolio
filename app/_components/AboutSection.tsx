import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <>
      <h4 className="font-bold">ABOUT</h4>
      <p>
        I'm a developer passionate about creating simple, clean, and elegant
        interfaces that are accessible and user-friendly. I also prioritize{" "}
        performance and enjoy exploring and developing experiences that are
        both user-friendly and developer-friendly.
      </p>
      <p>
        Currently, I'm a Full Stack Developer at{" "}
        <strong className="text-foreground">DNA Micro Inc</strong>,
        specializing in exploring tech and components. I contribute to the
        creation and maintenance of{" "}
        <strong className="text-foreground">UI Components</strong> that power
        DNA Micro's frontend, ensuring our platform meets{" "}
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
        including professional and capstone projects. This role exposes me to
        various languages such as{" "}
        <strong className="text-foreground">PHP</strong>,{" "}
        <strong className="text-foreground">C#</strong>, and
        <strong className="text-foreground"> JavaScript/TypeScript</strong>.
      </p>
      <p>
        Additionally, I am eager to learn and adapt quickly to new
        technologies and frameworks. I am flexible and open to exploring
        various ecosystems and other emerging technologies.
      </p>
    </>
  );
};

export default AboutSection;