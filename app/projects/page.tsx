'use client'
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import HeadingWithSubtext from "@/components/shared/heading-with-subtext";
import AnimatedGlow from "../_components/animated-glow";
import { PROJECTS } from "../../config/project-data.config";

export default function ProjectsPage() {
  return (
    <main className="w-full min-h-screen relative">
      <AnimatedGlow />
      <div className="mx-auto max-w-7xl px-4 sm:px-6  py-12 relative z-10">
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-sm text-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="Back to home"
        >
          <span className="mr-2">←</span>
          <span>Back to home</span>
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
          All Projects
        </h1>
        <p className="text-secondary mb-8 max-w-2xl">
          A broader look at the products and experiences I&apos;ve built.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-separate border-spacing-y-3">
            <thead className="text-xs uppercase text-secondary">
              <tr>
                <th scope="col" className="py-2 pr-4 text-left font-medium">
                  Year
                </th>
                <th scope="col" className="py-2 pr-4 text-left font-medium">
                  Project
                </th>
                <th scope="col" className="py-2 pr-4 text-left font-medium">
                  Made at
                </th>
                <th
                  scope="col"
                  className="py-2 pr-4 text-left font-medium hidden md:table-cell"
                >
                  Built with
                </th>
                <th
                  scope="col"
                  className="py-2 text-left font-medium hidden md:table-cell"
                >
                  Link
                </th>
              </tr>
            </thead>
            <tbody>
              {PROJECTS.map((project) => {
                const hasLink = Boolean(project.href);
                const href = project.href;

                return (
                  <tr
                    key={`${project.year}-${project.name}`}
                    className={`group align-top border-b border-border/40 last:border-b-0 transition-colors duration-200 ${hasLink ? "cursor-pointer hover:bg-accent/5" : ""
                      }`}
                    onClick={
                      hasLink && href
                        ? () => window.open(href, "_blank")
                        : undefined
                    }
                    onKeyDown={
                      hasLink && href
                        ? (event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            window.open(href, "_blank");
                          }
                        }
                        : undefined
                    }
                    role={hasLink ? "link" : undefined}
                    tabIndex={hasLink ? 0 : undefined}
                    aria-label={
                      hasLink && href
                        ? `${project.name} – ${href}`
                        : project.name
                    }
                  >
                    <td className="py-3 sm:py-4 pr-4 text-secondary whitespace-nowrap">
                      {project.year}
                    </td>
                    <td className="py-3 sm:py-4 pr-4 text-foreground">
                      <div className="flex items-center justify-between gap-3">
                        <div className="group/card inline-flex flex-col gap-1">
                          <HeadingWithSubtext title={project.name} />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 pr-4 text-secondary whitespace-nowrap">
                      {project.madeAt}
                    </td>
                    <td className="py-3 sm:py-4 pr-4 hidden md:table-cell">
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((tech) => (
                          <Badge key={`${project.name}-${tech}`}>
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 text-secondary whitespace-nowrap hidden md:table-cell">
                      {hasLink && href ? (
                        <Link
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <span className="underline-offset-4 group-hover:underline">
                            {href.replace(/^https?:\/\//, "")}
                          </span>
                        </Link>
                      ) : (
                        <span className="opacity-60">Private</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
