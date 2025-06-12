import React from 'react';
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

interface ExperienceCardProps {
  period: string;
  title: string;
  company: string;
  description: string;
  skills: string[];
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  period,
  title,
  company,
  description,
  skills,
}) => {
  return (
    <Card className="bg-transparent text-secondary shadow-none p-6 hover:bg-slate-100/5 hover:backdrop-blur-sm hover:shadow-lg border border-transparent hover:border-t-white/20">
      <CardTitle className="!text-xs opacity-60 tracking-widest ">
        {period}
      </CardTitle>
      <CardDescription>
        <h3 className="mt-0 mb-0">
          <strong className="text-foreground">
            {title} <br />
          </strong>
        </h3>
        <span className="text-secondary text-sm font-semibold">
          {company}
        </span>
      </CardDescription>
      <CardContent className="px-0 text-sm">
        <p className="mt-2">{description}</p>
        <div className="flex gap-1 flex-wrap gap-y-2">
          {skills.map((skill, index) => (
            <Badge key={index}>
              <span>{skill}</span>
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceCard;