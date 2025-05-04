import React from 'react';
import {
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
} from "lucide-react";

const SocialLinks: React.FC = () => {
  return (
    <article className="flex justify-start gap-8 mb-16 mt-6 text-secondary">
      <GithubIcon />
      <LinkedinIcon />
      <FacebookIcon />
    </article>
  );
};

export default SocialLinks;