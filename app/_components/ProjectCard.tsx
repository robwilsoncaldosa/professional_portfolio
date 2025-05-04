import React from 'react';
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

interface ProjectCardProps {
  title: string;
  description: string;
  skills: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  skills,
}) => {
  return (
    <Card className="bg-transparent text-secondary border-none shadow-none">
      <CardDescription>
        <h3 className="mt-0 mb-0">
          <strong className="text-foreground">
            {title} <br />
          </strong>
        </h3>
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

export default ProjectCard;