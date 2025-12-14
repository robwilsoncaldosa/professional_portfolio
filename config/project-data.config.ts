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
    | "iras"
    | "barangay-konek"
    | "borak"
    | "linkhaus"
    | "aliplace"
    | "net-notify"
    | "shobi-portfolio"
    | "raf-portfolio"
    | "swiftpos"
    | "portfolio"
    | "lp4y-capstone"
    | "gorentals"
    | "platform-7"
    | "aim"
    | "lsm";

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
    createdBy?: string;
    createdAtIso?: string;
    isLatest?: boolean;
}

export interface ProjectChangelogEntry {
    version: string;
    date: string;
    summary: string;
}

const RAW_PROJECTS: ProjectConfig[] = [
    {
        id: "iras",
        year: 2025,
        name: "IRAS",
        madeAt: "Accenture Philippines",
        description:
            "Digital tax services and advisory work delivered in collaboration with Accenture Philippines.",
        skills: ["ASP.NET Core", "Docker", "Angular"],
        href: "",
        imageSrc: "/iras-landing-page.png",
        imageAlt: "IRAS homepage",
        isFeatured: false,
        createdBy: "Accenture Philippines",
        createdAtIso: "2025-12-14T00:00:00.000Z",
        isLatest: true,
    },
    {
        id: "barangay-konek",
        year: 2025,
        name: "Barangay Konek",
        madeAt: "",
        description:
            "Barangay Konek streamlines resident services, certificates, and operations with online requests, real-time tracking, chat support, and role-based dashboards.",
        skills: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Shadcn UI"],
        href: "https://barangay-konek-vercel.app",
        imageSrc: "/barangay-konek-landing-page.png",
        imageAlt: "Barangay Konek landing page",
        isFeatured: true,
    },
    {
        id: "borak",
        year: 2025,
        name: "Borak",
        madeAt: "",
        description:
            "Borak offers curated Cebu tour packages with van services, showcasing famous tourist spots and providing seamless booking for an unforgettable island experience.",
        skills: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Shadcn UI"],
        href: "https://borak.vercel.app",
        imageSrc: "/borak-landing-page.png",
        imageAlt: "Borak landing page",
        isFeatured: true,
    },
    {
        id: "linkhaus",
        year: 2025,
        name: "LinkHaus",
        madeAt: "",
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
        href: "https://linkthree-bice.vercel.app",
        imageSrc: "/linkhaus-landing-page.png",
        imageAlt: "LinkHaus landing page",
        isFeatured: true,
    },
    {
        id: "aliplace",
        year: 2025,
        name: "AliPlace",
        madeAt: "",
        description:
            "AliPlace helps people find their perfect property with interactive maps, detailed listings, and intuitive search filters, making it easy to explore neighborhoods and discover homes or investments that truly fit their lifestyle.",
        skills: ["Next.js", "React", "Tailwind CSS"],
        href: "https://aliplace.vercel.app/",
        imageSrc: "/aliplace-landing-page.webp",
        imageAlt: "AliPlace landing page",
        isFeatured: true,
    },
    {
        id: "net-notify",
        year: 2025,
        name: "Net Notify",
        madeAt: "",
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
    {
        id: "shobi-portfolio",
        year: 2025,
        name: "Shobi Portfolio",
        madeAt: "",
        description:
            "Personal portfolio highlighting UI/UX design, branding, and digital content work.",
        skills: ["UI/UX Design", "Branding", "Portfolio"],
        href: "https://shobi-portfolio-sigma.vercel.app/",
        imageSrc: "/shobi-portfolio-landing-page.png",
        imageAlt: "Shobi portfolio landing page",
        isFeatured: false,
    },
    {
        id: "raf-portfolio",
        year: 2025,
        name: "Raf Portfolio",
        madeAt: "",
        description:
            "Creative portfolio showcasing video editing, dance, and virtual assistant work.",
        skills: ["Video Editing", "Virtual Assistant", "Portfolio"],
        href: "https://raf-s-portfolio.vercel.app/",
        imageSrc: "/raf-portfolio-landing-page.png",
        imageAlt: "Raf portfolio landing page",
        isFeatured: false,
    },
    {
        id: "swiftpos",
        year: 2024,
        name: "SwiftPOS",
        madeAt: "",
        description:
            "Point-of-sale web application with secure authentication and streamlined checkout workflows.",
        skills: ["Next.js", "TypeScript", "Tailwind CSS"],
        href: "https://rjk-pos.vercel.app",
        imageSrc: "/swiftpos-landing-page.png",
        imageAlt: "SwiftPOS login page",
        isFeatured: false,
    },
    {
        id: "portfolio",
        year: 2024,
        name: "Portfolio (Legacy)",
        madeAt: "",
        description:
            "Earlier personal portfolio showcasing full stack projects, services, and experience.",
        skills: ["HTML", "CSS", "JavaScript"],
        href: "https://robwilsoncaldosa.github.io/Portfolio/",
        imageSrc: "/legacy-portfolio-landing-page.png",
        imageAlt: "Legacy portfolio landing page",
        isFeatured: false,
    },
    {
        id: "lp4y-capstone",
        year: 2024,
        name: "LP4Y Capstone",
        madeAt: "",
        description:
            "Capstone project built for LP4Y, supporting program coordination and participant management.",
        skills: ["Next.js", "TypeScript", "Tailwind CSS"],
        href: "",
        imageSrc: "/lp4y-capstone-landing-page.png",
        imageAlt: "LP4Y Capstone landing page",
        isFeatured: false,
    },
    {
        id: "gorentals",
        year: 2024,
        name: "Gorentals",
        madeAt: "DNA Micro Inc.",
        description:
            "Maintained and styled the MyGo Gorentals marketing site to improve performance and UI/UX.",
        skills: ["Next.js", "React", "Tailwind CSS"],
        href: "",
        imageSrc: "/mygo-gorentals-landing-page.png",
        imageAlt: "MyGo Gorentals landing page",
        isFeatured: false,
    },
    {
        id: "platform-7",
        year: 2024,
        name: "Platform",
        madeAt: "DNA Micro Inc.",
        description:
            "Project-level framework with reusable components and customizable branding for DNA Micro projects.",
        skills: ["React", "Next.js", "Component Library"],
        href: "",
        imageSrc: "/platform-7-landing-page.png",
        imageAlt: "Platform 7 dashboard",
        isFeatured: false,
    },
    {
        id: "aim",
        year: 2023,
        name: "AIM",
        madeAt: "Prince Retail HQ",
        description:
            "System for streamlined application management with hierarchical data and proactive notifications.",
        skills: ["C#", ".NET Core", "JavaScript"],
        href: "",
        imageSrc: "/aim-landing-page.png",
        imageAlt: "AIM application dashboard",
        isFeatured: false,
    },
    {
        id: "lsm",
        year: 2023,
        name: "LSM Toolbox",
        madeAt: "Prince Retail HQ",
        description:
            "Communication system for regional managers and headquarters with approval workflows.",
        skills: ["C#", ".NET Core", "JavaScript"],
        href: "",
        imageSrc: "/lsm-toolbox-landing-page.png",
        imageAlt: "LSM toolbox interface",
        isFeatured: false,
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

        if (project.href && !isValidHttpsUrl(project.href)) {
            throw new Error(
                `project-data.config: project "${project.id}" has invalid href "${project.href}"`
            );
        }

        if (project.createdAtIso && Number.isNaN(Date.parse(project.createdAtIso))) {
            throw new Error(
                `project-data.config: project "${project.id}" has invalid createdAtIso`
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

function isValidHttpsUrl(value: string): boolean {
    if (!value.startsWith("https://")) {
        return false;
    }

    try {
        const url = new URL(value);
        return url.protocol === "https:" && !!url.hostname;
    } catch {
        return false;
    }
}
