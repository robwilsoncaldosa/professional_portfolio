import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

const ResumeButton: React.FC = () => {
  return (
    <Button
      effect="hoverUnderline"
      className="text-md ps-0 font-bold my-10"
      size={"lg"}
      icon={ArrowRightIcon}
      iconPlacement="right"
    >
      View Resume
    </Button>
  );
};

export default ResumeButton;