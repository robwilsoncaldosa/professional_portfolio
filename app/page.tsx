import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import AboutSection from "./_components/AboutSection";
import ExperienceSection from "./_components/ExperienceSection";
import ProfileHeader from "./_components/ProfileHeader";
import ProjectsSection from "./_components/ProjectsSection";
import ResumeButton from "./_components/ResumeButton";
export default function Home() {
  return (
    <main className="grid  min-h-screen prose  prose-headings:text-foreground px-6 py-12 bg-primary">
      <ProfileHeader />
      <section title="right-section" className="text-secondary">
        <AboutSection />
        <ExperienceSection />
        <ResumeButton />
        <ProjectsSection />
      </section>
    </main>
  );
}
