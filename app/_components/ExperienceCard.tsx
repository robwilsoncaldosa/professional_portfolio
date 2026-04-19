import React from 'react';
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import HeadingWithSubtext from "@/components/shared/heading-with-subtext";

interface ExperienceCardProps {
  period: string;
  title: string;
  company: string;
  description?: string;
  responsibilities?: string[];
  achievements?: string[];
  skills?: string[];
  href?: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  period,
  title,
  company,
  description,
  responsibilities,
  achievements,
  skills,
  href
}) => {
  return (
    <Card
      tabIndex={0}
      className="exp-card group/card bg-transparent text-secondary shadow-none p-6 hover:bg-slate-100/5 hover:backdrop-blur-sm hover:shadow-lg border border-transparent hover:border-t-white/20 hover:cursor-pointer opacity-100 will-change-[opacity] transition-opacity duration-300 ease-in-out hover:!opacity-100 focus-within:!opacity-100 motion-reduce:transition-none [&_*>]:transition-opacity [&_*]:duration-300 [&_*]:ease-in-out motion-reduce:[&_*>]:transition-none"
    >
      <a
        href={href || undefined}
        target={href ? "_blank" : undefined}
        rel={href ? "noopener noreferrer" : undefined}
        aria-label={`${title} at ${company}`}
        className="block"
      >
        <CardTitle className="text-xs opacity-60 tracking-widest ">
          {period}
        </CardTitle>
        <CardDescription>
          <HeadingWithSubtext
            title={title}
            subtitle={company}
          />
        </CardDescription>
        <CardContent className="px-0 text-sm">
          {description && <p className="mt-3 font-normal">{description}</p>}
          {responsibilities && responsibilities.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-foreground/80">
                Responsibilities
              </p>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm">
                {responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {achievements && achievements.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-foreground/80">
                Achievements
              </p>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm">
                {achievements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {skills && skills.length > 0 && (
            <div className="flex gap-1 flex-wrap gap-y-2">
              {skills.map((skill, index) => (
                <Badge key={index}>
                  <span>{skill}</span>
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </a>
    </Card>
  );
};

export default ExperienceCard;
