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
  description: string;
  skills: string[];
  href?: string;
}

export interface ExperienceChangelogEntry {
  version: string;
  date: string;
  summary: string;
}

export const EXPERIENCE_DATA_VERSION = "1.0.0";

export const EXPERIENCE_DATA_CHANGELOG: readonly ExperienceChangelogEntry[] = [
  {
    version: "1.0.0",
    date: "2024-12-14",
    summary: "Initial experience data extracted into centralized config.",
  },
] as const;

const RAW_EXPERIENCES: ExperienceConfig[] = [
  {
    id: "accenture",
    period: "2025 - PRESENT",
    title: "Package App Development Analyst",
    company: "Accenture",
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

    if (!experience.description) {
      throw new Error(
        `experience-data.config: experience "${experience.id}" is missing description`
      );
    }

    if (
      !Array.isArray(experience.skills) ||
      experience.skills.length === 0
    ) {
      throw new Error(
        `experience-data.config: experience "${experience.id}" must have at least one skill`
      );
    }
  });

  return experiences;
}

