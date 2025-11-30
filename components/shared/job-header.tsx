import React from 'react';

type JobHeaderProps = {
  title: string;
  company: string;
}

function JobHeader({ title, company }: JobHeaderProps) {
  return (
    <>
      <h3 className="mt-0 mb-0" >
        <strong className="text-foreground ">
          {title} <br />
        </strong>
      </h3>
      <span className="text-secondary text-sm font-semibold">
        {company}
      </span>
    </>
  );
}

export default JobHeader;
