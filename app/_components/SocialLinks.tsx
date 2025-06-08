import React from 'react';
import {
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
} from "lucide-react";

const SocialLinks: React.FC = () => {
  return (
    <article className="flex justify-start gap-8   text-secondary mt-auto">
      <GithubIcon />
      <LinkedinIcon />
      <FacebookIcon />
    </article>
  );
};

export default SocialLinks;