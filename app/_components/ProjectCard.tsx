import React from 'react';
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import HeadingWithSubtext from "@/components/shared/heading-with-subtext";

interface ProjectCardProps {
  period?: string;
  title: string;
  description: string;
  skills: string[];
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  period,
  title,
  description,
  skills,
  href,
  imageSrc,
  imageAlt,
}) => {
  return (
    <Card
      tabIndex={0}
      className="exp-card group/card bg-transparent text-secondary shadow-none hover:bg-slate-100/5 hover:backdrop-blur-sm hover:shadow-lg border border-transparent hover:border-t-white/20 hover:cursor-pointer opacity-100 will-change-[opacity] transition-opacity duration-300 ease-in-out hover:!opacity-100 focus-within:!opacity-100 motion-reduce:transition-none [&_*>]:transition-opacity [&_*]:duration-300 [&_*]:ease-in-out motion-reduce:[&_*>]:transition-none p-6"
    >
      <a
        href={href || undefined}
        target={href ? "_blank" : undefined}
        rel={href ? "noopener noreferrer" : undefined}
        aria-label={`${title}`}
        className="block"
      >
        {period && (
          <CardTitle className="!text-xs opacity-60 tracking-widest ">
            {period}
          </CardTitle>
        )}

        <div className="flex flex-col md:grid md:grid-cols-[200px,1fr] items-start gap-4">
          <div className="w-full">
            <Image
              src={imageSrc || "/placeholder.png"}
              alt={imageAlt || title}
              width={1000}
              height={1000}
            />

          </div>
          <div>
            <CardDescription>
              <HeadingWithSubtext title={title} />
            </CardDescription>
            <CardContent className="px-0 text-sm">
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
