/**
 * Centralized configuration for all project data used by:
 * - Home page projects section (`ProjectsSection`)
 * - Projects archive table (`app/projects/page.tsx`)
 *
 * Update process:
 * 1. Add or update an entry in `RAW_PROJECTS`.
 * 2. Use a stable `id` in kebab-case for each project.
 * 3. Keep `skills` aligned with the technologies you want to display.
 * 4. Set `isFeatured` to control whether the project appears on the home page.
 * 5. Bump `PROJECT_DATA_VERSION` and append an entry to `PROJECT_DATA_CHANGELOG`.
 *
 * Validation:
 * - `validateProjectsConfig` runs at module load and will throw if:
 *   - ids or names are duplicated
 *   - required fields are missing
 *   - `skills` is empty
 * This fails fast in development and during builds when the config is invalid.
 */

export type ProjectId =
    | "barangay-konek"
    | "borak"
    | "linkhaus"
    | "aliplace"
    | "net-notify";

export interface ProjectConfig {
    id: ProjectId;
    year: number;
    name: string;
    madeAt: string;
    description: string;
    skills: string[];
    href?: string;
    imageSrc: string;
    imageAlt: string;
    isFeatured: boolean;
}

export interface ProjectChangelogEntry {
    version: string;
    date: string;
    summary: string;
}

export const PROJECT_DATA_VERSION = "1.0.0";

export const PROJECT_DATA_CHANGELOG: readonly ProjectChangelogEntry[] = [
    {
        version: "1.0.0",
        date: "2024-12-14",
        summary: "Initial project data extracted into centralized config.",
    },
] as const;

const RAW_PROJECTS: ProjectConfig[] = [
    {
        id: "barangay-konek",
        year: 2024,
        name: "Barangay Konek",
        madeAt: "Independent",
        description:
            "Barangay Konek streamlines resident services, certificates, and operations with online requests, real-time tracking, chat support, and role-based dashboards.",
        skills: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Shadcn UI"],
        href: "https://barangay-konek.example",
        imageSrc: "/barangay-konek-landing-page.png",
        imageAlt: "Barangay Konek landing page",
        isFeatured: true,
    },
    {
        id: "borak",
        year: 2024,
        name: "Borak",
        madeAt: "Independent",
        description:
            "Borak offers curated Cebu tour packages with van services, showcasing famous tourist spots and providing seamless booking for an unforgettable island experience.",
        skills: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Shadcn UI"],
        href: "https://borak.example",
        imageSrc: "/borak-landing-page.png",
        imageAlt: "Borak landing page",
        isFeatured: true,
    },
    {
        id: "linkhaus",
        year: 2024,
        name: "LinkHaus",
        madeAt: "Independent",
        description:
            "LinkHaus empowers creators to monetize content, grow their brand, and get paid from a single bio link, while giving brands instant visibility through seamless native ad placements across top creators’ pages.",
        skills: [
            "Next.js",
            "React",
            "Tailwind CSS",
            "T3 Stack",
            "Supabase",
            "Prisma",
        ],
        href: "https://linkhaus.example",
        imageSrc: "/linkhaus-landing-page.png",
        imageAlt: "LinkHaus landing page",
        isFeatured: true,
    },
    {
        id: "aliplace",
        year: 2024,
        name: "AliPlace",
        madeAt: "Independent",
        description:
            "AliPlace helps people find their perfect property with interactive maps, detailed listings, and intuitive search filters, making it easy to explore neighborhoods and discover homes or investments that truly fit their lifestyle.",
        skills: ["Next.js", "React", "Tailwind CSS"],
        href: "https://aliplace.example",
        imageSrc: "/aliplace-landing-page.webp",
        imageAlt: "AliPlace landing page",
        isFeatured: true,
    },
    {
        id: "net-notify",
        year: 2024,
        name: "Net Notify",
        madeAt: "Independent",
        description:
            "Automated monthly billing SMS notifications with personalized templates and delivery tracking.",
        skills: [
            "Next.js",
            "TypeScript",
            "React",
            "Tailwind CSS",
            "SMS Automation",
            "Scheduling",
        ],
        imageSrc: "/net-notify-landing-page.png",
        imageAlt: "Net Notify landing page",
        isFeatured: true,
    },
];

export const PROJECTS: readonly ProjectConfig[] =
    validateProjectsConfig(RAW_PROJECTS);

export const FEATURED_PROJECTS: readonly ProjectConfig[] = PROJECTS.filter(
    (project) => project.isFeatured
);

function validateProjectsConfig(
    projects: ProjectConfig[]
): readonly ProjectConfig[] {
    const seenIds = new Set<string>();
    const seenNames = new Set<string>();

    projects.forEach((project) => {
        if (!project.id) {
            throw new Error("project-data.config: project is missing id");
        }
        if (seenIds.has(project.id)) {
            throw new Error(
                `project-data.config: duplicate project id "${project.id}"`
            );
        }
        seenIds.add(project.id);

        if (!project.name) {
            throw new Error(
                `project-data.config: project "${project.id}" is missing name`
            );
        }
        if (seenNames.has(project.name)) {
            throw new Error(
                `project-data.config: duplicate project name "${project.name}"`
            );
        }
        seenNames.add(project.name);

        if (!Number.isInteger(project.year)) {
            throw new Error(
                `project-data.config: project "${project.id}" has invalid year`
            );
        }

        if (!project.madeAt) {
            throw new Error(
                `project-data.config: project "${project.id}" is missing madeAt`
            );
        }

        if (!project.description) {
            throw new Error(
                `project-data.config: project "${project.id}" is missing description`
            );
        }

        if (!Array.isArray(project.skills) || project.skills.length === 0) {
            throw new Error(
                `project-data.config: project "${project.id}" must have at least one skill`
            );
        }

        if (!project.imageSrc) {
            throw new Error(
                `project-data.config: project "${project.id}" is missing imageSrc`
            );
        }

        if (!project.imageAlt) {
            throw new Error(
                `project-data.config: project "${project.id}" is missing imageAlt`
            );
        }
    });

    return projects;
}

