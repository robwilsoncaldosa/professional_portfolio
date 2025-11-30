'use client'
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

const ResumeButton: React.FC = () => {
  return (
    <Button
      effect={'hoverUnderline'}
      className="text-md ps-6 font-bold my-10 hover:bg-transparent bg-transparent group"
      size={"lg"}
      onClick={() => {
        window.open('/resume.pdf', '_blank');
      }}
    >
      <span className="transition-all duration-300">View Resume</span>
      <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
    </Button>
  );
};

export default ResumeButton;