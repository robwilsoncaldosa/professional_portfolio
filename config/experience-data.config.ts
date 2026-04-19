/**
 * Centralized configuration for all experience data used by `ExperienceSection`.
 *
 * Update process:
 * 1. Add or update an entry in `RAW_EXPERIENCES`.
 * 2. Use a stable `id` in kebab-case for each experience.
 * 3. Keep `skills` aligned with the technologies you want to display.
 * 4. Bump `EXPERIENCE_DATA_VERSION` and append an entry to `EXPERIENCE_DATA_CHANGELOG`.
 *
 * Validation:
 * - `validateExperiencesConfig` runs at module load and will throw if:
 *   - ids are duplicated
 *   - required fields are missing
 *   - `skills` is empty
 * This fails fast in development and during builds when the config is invalid.
 */

export interface ExperienceConfig {
  id: string;
  period: string;
  title: string;
  company: string;
  location?: string;
  caption?: string;
  description?: string;
  responsibilities?: string[];
  achievements?: string[];
  skills?: string[];
  href?: string;
}

export interface ExperienceChangelogEntry {
  version: string;
  date: string;
  summary: string;
}

export const EXPERIENCE_DATA_VERSION = "1.3.0";

export const EXPERIENCE_DATA_CHANGELOG: readonly ExperienceChangelogEntry[] = [
  {
    version: "1.3.0",
    date: "2026-04-19",
    summary:
      "Restored M Lhuillier as the current employer starting February 2026 and set Accenture to end in January 2026.",
  },
  {
    version: "1.2.0",
    date: "2026-04-19",
    summary:
      "Updated the current employer to Accenture, added shared location and caption fields, and simplified the latest experience entry.",
  },
  {
    version: "1.1.0",
    date: "2026-04-19",
    summary:
      "Updated current employment to Technology Group MLhuillier Financial Services, Inc. and added optional responsibilities and achievements fields.",
  },
  {
    version: "1.0.0",
    date: "2024-12-14",
    summary: "Initial experience data extracted into centralized config.",
  },
] as const;

const RAW_EXPERIENCES: ExperienceConfig[] = [
  {
    id: "mlhuillier",
    period: "FEB 2026 - PRESENT",
    title: "Senior Software Developer",
    company: "Technology Group M Lhuillier Financial Services, Inc.",
    location:
      "Cebu City, Cebu, Philippines",
    description:
      "Build and maintain financial services applications that support internal teams and customer-facing operations with a strong focus on reliability, maintainability, and delivery quality.",
    caption:
      "Developing dependable software that keeps critical financial operations efficient, stable, and ready to scale.",
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "Docker",
      "Google Cloud Platform",
      "Cloud Run",
    ],
  },
  {
    id: "accenture",
    period: "2025 - JAN 2026",
    title: "Package App Development Analyst",
    company: "Accenture",
    location: "eBloc 2 Tower, West Geonzon Street, Cebu IT Park, Apas, Cebu City, Cebu, Philippines",
    caption:
      "Delivering dependable solutions that move work forward faster and create clear business value.",
    description:
      "Developing and maintaining enterprise applications for clients across various industries. Collaborating with global teams to implement solutions that meet business requirements. Participating in the full software development lifecycle from requirements gathering to deployment.",
    skills: [
      "C#",
      "ASP.NET Core",
      "MS-SQL",
      "Waterfall",
      "Docker",
      "Microservices",
      "Azure",
      "Kafka",
    ],
    href: "https://www.accenture.com/ph-en",
  },
  {
    id: "dna-micro",
    period: "2024 - 2025",
    title: "Full Stack Developer",
    company: "DNA Micro Software Inc",
    location: "117 Gorordo Ave, Camputhaw, Cebu City, Cebu, Philippines",
    description:
      "Build and maintain critical components used in DNA Micro's frontend across all projects. Work closely with Business Analysts, cross-functional teams, including developers, designers, functional managers, and product managers.",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Tailwind",
      "Storybook",
    ],
    href: "https://www.dnamicro.com/",
  },
  {
    id: "prince-retail",
    period: "FEB - NOV 2023",
    title: "Full Stack Developer",
    company: "Prince Retail Group of Companies",
    location:
      "PRG Tower, P. Basubas Street, Brgy. Tipolo, Mandaue City, Cebu, Philippines",
    description:
      "Developed and styled interactive web apps for the company's infrastructure department data and marketing data with a focus on user experience and performance optimization. Collaborated with cross-functional teams to ensure seamless integration and functionality.",
    skills: ["C#", ".NET Core", "JavaScript", "JQuery", "Bootstrap"],
    href: "https://www.princeretail.com/",
  },
];

export const EXPERIENCES: readonly ExperienceConfig[] =
  validateExperiencesConfig(RAW_EXPERIENCES);

function validateExperiencesConfig(
  experiences: ExperienceConfig[]
): readonly ExperienceConfig[] {
  const seenIds = new Set<string>();

  experiences.forEach((experience) => {
    if (!experience.id) {
      throw new Error("experience-data.config: experience is missing id");
    }

    if (seenIds.has(experience.id)) {
      throw new Error(
        `experience-data.config: duplicate experience id "${experience.id}"`
      );
    }
    seenIds.add(experience.id);

    if (!experience.period) {
      throw new Error(
        `experience-data.config: experience "${experience.id}" is missing period`
      );
    }

    if (!experience.title) {
      throw new Error(
        `experience-data.config: experience "${experience.id}" is missing title`
      );
    }

    if (!experience.company) {
      throw new Error(
        `experience-data.config: experience "${experience.id}" is missing company`
      );
    }

    if (
      experience.responsibilities &&
      (!Array.isArray(experience.responsibilities) ||
        experience.responsibilities.length === 0)
    ) {
      throw new Error(
        `experience-data.config: experience "${experience.id}" responsibilities must be a non-empty array when provided`
      );
    }

    if (
      experience.achievements &&
      (!Array.isArray(experience.achievements) ||
        experience.achievements.length === 0)
    ) {
      throw new Error(
        `experience-data.config: experience "${experience.id}" achievements must be a non-empty array when provided`
      );
    }

    if (
      experience.skills &&
      (!Array.isArray(experience.skills) || experience.skills.length === 0)
    ) {
      throw new Error(
        `experience-data.config: experience "${experience.id}" skills must be a non-empty array when provided`
      );
    }
  });

  return experiences;
}
