import React from 'react';
import SocialLinks from './SocialLinks';

const ProfileHeader: React.FC = () => {
  return (
    <section title="left-section" className="text-foreground">
      <h1 className="mb-0">
        Rob Caldosa <br />
        <span className="text-lg font-medium">Full Stack Developer</span>
      </h1>
      <p className="mt-4 text-secondary">
        I build and maintain accessible, user-friendly web applications.
      </p>
      <SocialLinks />
    </section>
  );
};

export default ProfileHeader;