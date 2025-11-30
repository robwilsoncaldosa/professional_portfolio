import React from 'react';
import { FacebookIcon, GithubIcon, LinkedinIcon } from "lucide-react";

const SOCIAL_LINKS = [
  { label: "GitHub", url: "https://github.com/robwilsoncaldosa", Icon: GithubIcon },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/rob-wilson-caldosa-25a6292b1/", Icon: LinkedinIcon },
  { label: "Facebook", url: "https://www.facebook.com/robwilson.caldoza", Icon: FacebookIcon },
] as const;

const SocialLinks: React.FC = () => {
  return (
    <article className="flex justify-start gap-8 text-secondary mt-auto">
      {SOCIAL_LINKS.map(({ label, url, Icon }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="group inline-flex items-center justify-center rounded-md border border-transparent p-1 transform-gpu transition-all duration-300 ease-in-out hover:text-foreground hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Icon className="transition-all duration-300 ease-in-out group-hover:fill-current group-hover:drop-shadow-md" />
        </a>
      ))}
    </article>
  );
};

export default SocialLinks;
