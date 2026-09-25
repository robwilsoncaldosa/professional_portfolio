'use client'
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import AboutSection from "./_components/AboutSection";
import ExperienceSection from "./_components/ExperienceSection";
import ProfileHeader from "./_components/ProfileHeader";
import ProjectsSection from "./_components/ProjectsSection";
import CertificationsSection from "./_components/CertificationsSection";
import ResumeButton from "./_components/ResumeButton";
import CreditSection from "./_components/CreditSection";
import CursorGlow from "./_components/CursorGlow";

const ArchiveLinkButton = ({ href, label }: { href: string; label: string }) => {
  return (
    <Button
      asChild
      effect={"hoverUnderline"}
      className="text-md ps-6 font-bold my-10 hover:bg-transparent bg-transparent group"
      size={"lg"}
    >
      <Link href={href} aria-label={label} className="!text-foreground">
        <span className="transition-all duration-300">{label}</span>
        <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
      </Link>
    </Button>
  );
};

export default function Home() {
  return (
    <main className="w-full min-h-screen relative">
      <CursorGlow />
      <div className="grid md:grid-cols-[46%_54%] mx-auto min-h-screen prose md:max-w-screen-xl md:px-12 prose-headings:text-foreground py-12 sm:py-0 relative z-10">
        <ProfileHeader />
        <section aria-label="right-section" className="text-secondary md:py-24">
          <AboutSection />
          <ExperienceSection />
          <ResumeButton />
          <ProjectsSection />
          <ArchiveLinkButton href="/projects" label="View Projects" />
          <CertificationsSection />
          <ArchiveLinkButton href="/certifications" label="View All Certifications" />
          <CreditSection />
        </section>
      </div>
    </main>
  );
}
