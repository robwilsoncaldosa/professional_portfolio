'use client'
import { useState, useEffect } from "react";
import AboutSection from "./_components/AboutSection";
import ExperienceSection from "./_components/ExperienceSection";
import ProfileHeader from "./_components/ProfileHeader";
import ProjectsSection from "./_components/ProjectsSection";
import ResumeButton from "./_components/ResumeButton";
import CreditSection from "./_components/CreditSection";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY + window.scrollY
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const glowStyle = {
    background: `radial-gradient(
      700px circle at ${mousePosition.x}px ${mousePosition.y}px,
      rgba(255, 255, 255, 0.08),
      rgba(220, 220, 240, 0.05),
      rgba(200, 200, 220, 0.02),
      transparent 100%
    )`,
    transition: 'background 0.15s ease-in-out'
  };

  return (
    <main className="w-full min-h-screen relative">
      {/* Animated background glow */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          ...glowStyle,
          minHeight: '100vh',
          width: '100%'
        }}
      />
      <div className="grid md:grid-cols-[42%_58%] mx-auto min-h-screen prose md:max-w-screen-xl prose-headings:text-foreground py-12 sm:py-0 relative z-10">
        <ProfileHeader />
        <section title="right-section" className="text-secondary md:py-24">
          <AboutSection />
          <ExperienceSection />
          <ResumeButton />
          <ProjectsSection />
          <CreditSection/>
        </section>
      </div>
    </main>
  );
}