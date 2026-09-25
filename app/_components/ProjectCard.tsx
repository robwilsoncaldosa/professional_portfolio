import React from 'react';
import { TrophyIcon } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import HeadingWithSubtext from "@/components/shared/heading-with-subtext";
import ProjectImageTilt from "./ProjectImageTilt";

interface ProjectCardProps {
  period?: string;
  title: string;
  description: string;
  outcome?: string;
  award?: string;
  skills: string[];
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  period,
  title,
  description,
  outcome,
  award,
  skills,
  href,
  imageSrc,
  imageAlt,
}) => {
  return (
    <Card
      tabIndex={0}
      className="exp-card group/card relative border-none bg-transparent text-secondary shadow-none p-6 opacity-100 transition-opacity duration-300 ease-in-out hover:!opacity-100 focus-within:!opacity-100 hover:cursor-pointer motion-reduce:transition-none"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-4 -inset-y-4 z-0 rounded-lg bg-foreground/[0.04] opacity-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-opacity duration-300 ease-out group-hover/card:opacity-100 group-hover/card:shadow-lg group-focus-within/card:opacity-100 group-focus-within/card:shadow-lg motion-reduce:transition-none"
      />
      <a
        href={href || undefined}
        target={href ? "_blank" : undefined}
        rel={href ? "noopener noreferrer" : undefined}
        aria-label={`${title}`}
        className="relative z-10 block"
      >
        {period && (
          <CardTitle className="!text-xs opacity-60 tracking-widest ">
            {period}
          </CardTitle>
        )}

        <div className="flex flex-col md:grid md:grid-cols-[200px,1fr] items-start gap-4">
          <ProjectImageTilt imageSrc={imageSrc} imageAlt={imageAlt} title={title} />
          <div>
            <CardDescription>
              <HeadingWithSubtext title={title} />
            </CardDescription>
            <CardContent className="px-0 text-sm">
              {award && (
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-foreground">
                  <TrophyIcon className="h-3.5 w-3.5 shrink-0 text-ring" aria-hidden />
                  {award}
                </p>
              )}
              {outcome && (
                <p className="mt-2 text-xs font-bold uppercase tracking-wide text-ring">
                  {outcome}
                </p>
              )}
              <p className="mt-2 font-normal">{description}</p>
              <div className="flex gap-1 flex-wrap gap-y-2">
                {skills.map((skill, index) => (
                  <Badge key={index}>
                    <span>{skill}</span>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </div>
        </div>
      </a>
    </Card>
  );
};

export default ProjectCard;
