/**
 * Centralized configuration for all certification data used by:
 * - Home page certifications section (`CertificationsSection`)
 * - Certifications archive (`app/certifications/page.tsx`)
 *
 * Update process:
 * 1. Drop the certificate PDF into `public/certifications/`.
 * 2. Render a preview: `pdftoppm -png -singlefile -scale-to-x 1400 -scale-to-y -1 <pdf> out`
 *    then `cwebp -q 82 out.png -o public/certifications/previews/<id>.webp`.
 * 3. Add an entry to `RAW_CERTIFICATIONS` with a stable kebab-case `id`.
 * 4. Set `isFeatured` to control whether it appears on the home page.
 *
 * Validation:
 * - `validateCertificationsConfig` runs at module load and will throw if:
 *   - ids are duplicated
 *   - required fields are missing
 *   - `skills` is empty
 *   - `issuedAt` is not an ISO date (YYYY-MM-DD)
 */

export type CertificationIssuer = "Google Cloud" | "LinkedIn Learning";

export type CertificationCategory = "AI & Cloud" | "Frontend" | "Backend" | "Delivery";

export interface CertificationConfig {
  id: string;
  title: string;
  issuer: CertificationIssuer;
  /** Partner behind the course, e.g. "Microsoft Press". */
  partner?: string;
  category: CertificationCategory;
  /** ISO date (YYYY-MM-DD). */
  issuedAt: string;
  /** ISO date (YYYY-MM-DD) for certifications that expire. */
  expiresAt?: string;
  credentialId: string;
  /** Continuing-education credit, e.g. "PMI · 1.25 PDUs". */
  accreditation?: string;
  duration?: string;
  skills: string[];
  /** Path under `public/` to the original PDF. */
  file: string;
  /** Path under `public/` to the rendered preview image. */
  previewSrc: string;
  isFeatured?: boolean;
}

const RAW_CERTIFICATIONS: CertificationConfig[] = [
  {
    id: "generative-ai-leader",
    title: "Generative AI Leader",
    issuer: "Google Cloud",
    category: "AI & Cloud",
    issuedAt: "2026-07-15",
    expiresAt: "2029-07-15",
    credentialId: "52c740016ac34586a25f17827774a75a",
    skills: ["Generative AI", "Google Cloud", "AI Strategy"],
    file: "/certifications/GenerativeAILeader.pdf",
    previewSrc: "/certifications/previews/generative-ai-leader.webp",
    isFeatured: true,
  },
  {
    id: "github-copilot",
    title: "Complete Guide to GitHub Copilot for Developers",
    issuer: "LinkedIn Learning",
    partner: "Microsoft Press",
    category: "AI & Cloud",
    issuedAt: "2026-03-06",
    credentialId: "ff1b1923139137503eb97fa476f345c4bf32832151e157c4dc85e34e3a1fa1e3",
    duration: "4h 57m",
    skills: ["GitHub Copilot", "AI-Assisted Development"],
    file: "/certifications/CertificateOfCompletion_Complete Guide to GitHub Copilot for Developers by Microsoft Press.pdf",
    previewSrc: "/certifications/previews/github-copilot.webp",
    isFeatured: true,
  },
  {
    id: "devops-foundations",
    title: "DevOps Foundations",
    issuer: "LinkedIn Learning",
    category: "Delivery",
    issuedAt: "2026-04-15",
    credentialId: "07a61fcdefed83836f16f4322fc1fed4cf36f584762cf9ae32be7e38ce551919",
    accreditation: "CompTIA · 3.00 CEUs",
    skills: ["DevOps"],
    file: "/certifications/CertificateOfCompletion_DevOps Foundations.pdf",
    previewSrc: "/certifications/previews/devops-foundations.webp",
    isFeatured: true,
  },
  {
    id: "object-oriented-design",
    title: "Programming Foundations: Object-Oriented Design",
    issuer: "LinkedIn Learning",
    category: "Backend",
    issuedAt: "2026-04-15",
    credentialId: "9561381a948226247334269a167c08515cedd1b0af72dc9d13d0207a40117b0c",
    duration: "3h 41m",
    skills: ["Software Design Patterns", "Object-Oriented Programming"],
    file: "/certifications/CertificateOfCompletion_Programming Foundations ObjectOriented Design.pdf",
    previewSrc: "/certifications/previews/object-oriented-design.webp",
  },
  {
    id: "mysql-essential-training",
    title: "MySQL Essential Training",
    issuer: "LinkedIn Learning",
    category: "Backend",
    issuedAt: "2026-04-15",
    credentialId: "f99c889e873615d0d3840d5563e8b24f39aaba34cff38ae3084e1b056e74b0a9",
    duration: "1h 58m",
    skills: ["MySQL"],
    file: "/certifications/CertificateOfCompletion_MySQL Essential Training.pdf",
    previewSrc: "/certifications/previews/mysql-essential-training.webp",
  },
  {
    id: "nodejs-essential-training",
    title: "Node.js Essential Training",
    issuer: "LinkedIn Learning",
    category: "Backend",
    issuedAt: "2026-04-13",
    credentialId: "273a6e79e826a96c5405e97ffd3baa726ad7b7039d7f15ec08bf73db891a3f2f",
    duration: "1h 19m",
    skills: ["Node.js"],
    file: "/certifications/CertificateOfCompletion_Node.js Essential Training.pdf",
    previewSrc: "/certifications/previews/nodejs-essential-training.webp",
  },
  {
    id: "react-native-essential-training",
    title: "React Native Essential Training",
    issuer: "LinkedIn Learning",
    category: "Frontend",
    issuedAt: "2026-04-13",
    credentialId: "0dbe72cc4482205247c4044f97b6b987eb1786073768af9bc6de8ded427892f9",
    duration: "4h 20m",
    skills: ["React Native"],
    file: "/certifications/CertificateOfCompletion_React Native Essential Training.pdf",
    previewSrc: "/certifications/previews/react-native-essential-training.webp",
  },
  {
    id: "react-essential-training",
    title: "React Essential Training",
    issuer: "LinkedIn Learning",
    category: "Frontend",
    issuedAt: "2026-04-08",
    credentialId: "dc107399ddf9fd2bd7b189ce89f2678c28bee25224c2440fa376dfae03fbc095",
    duration: "1h 45m",
    skills: ["React.js", "Front-End Development", "Web Development"],
    file: "/certifications/CertificateOfCompletion_React Essential Training.pdf",
    previewSrc: "/certifications/previews/react-essential-training.webp",
  },
  {
    id: "typescript-essential-training",
    title: "TypeScript Essential Training",
    issuer: "LinkedIn Learning",
    category: "Frontend",
    issuedAt: "2026-04-04",
    credentialId: "0064ac8f5dbe84f5a77f2fb58778e638fc0b44fd02e3bb9ef167ff0740291882",
    duration: "2h 18m",
    skills: ["TypeScript"],
    file: "/certifications/CertificateOfCompletion_TypeScript Essential Training.pdf",
    previewSrc: "/certifications/previews/typescript-essential-training.webp",
  },
  {
    id: "javascript-essential-training",
    title: "JavaScript Essential Training",
    issuer: "LinkedIn Learning",
    category: "Frontend",
    issuedAt: "2026-03-21",
    credentialId: "d48dd51dc4db89727bae246a2c43d3f0e37c00788405695f13943f82733a608e",
    duration: "6h 14m",
    skills: ["JavaScript"],
    file: "/certifications/CertificateOfCompletion_JavaScript Essential Training.pdf",
    previewSrc: "/certifications/previews/javascript-essential-training.webp",
  },
  {
    id: "html-essential-training",
    title: "HTML Essential Training",
    issuer: "LinkedIn Learning",
    category: "Frontend",
    issuedAt: "2026-03-13",
    credentialId: "adab5d7f2b03414e32e7833b7b8f578e8294f47072b00e6404c6f87aac71475a",
    duration: "2h 45m",
    skills: ["HTML"],
    file: "/certifications/CertificateOfCompletion_HTML Essential Training 2020.pdf",
    previewSrc: "/certifications/previews/html-essential-training.webp",
  },
  {
    id: "learning-jira-software",
    title: "Learning Jira Software",
    issuer: "LinkedIn Learning",
    category: "Delivery",
    issuedAt: "2026-02-27",
    credentialId: "cf4c5fae7f12e2dd178eb5854514430ec444006d6f311d697b63224366734a0a",
    accreditation: "CompTIA · 2.00 CEUs",
    skills: ["Jira"],
    file: "/certifications/CertificateOfCompletion_Learning Jira Software.pdf",
    previewSrc: "/certifications/previews/learning-jira-software.webp",
  },
  {
    id: "scrum-for-developers",
    title: "Agile Software Development: Scrum for Developers",
    issuer: "LinkedIn Learning",
    category: "Delivery",
    issuedAt: "2026-02-26",
    credentialId: "830ecf9e69d4f70323961e8c112523159479279a503a29a5f9aa8f5ef74b1f4b",
    accreditation: "PMI · 1.25 PDUs",
    skills: ["Agile Software Development", "Scrum"],
    file: "/certifications/CertificateOfCompletion_Agile Software Development Scrum for Developers.pdf",
    previewSrc: "/certifications/previews/scrum-for-developers.webp",
  },
  {
    id: "agile-foundations",
    title: "Agile Foundations",
    issuer: "LinkedIn Learning",
    category: "Delivery",
    issuedAt: "2026-02-26",
    credentialId: "99d0895895eae51f7c14d90f0df86250b1b2f55cb09a6852753e6c123a5929f3",
    accreditation: "IIBA · 2.00 CDUs",
    skills: ["Agile Methodologies", "Agile Project Management"],
    file: "/certifications/CertificateOfCompletion_Agile Foundations.pdf",
    previewSrc: "/certifications/previews/agile-foundations.webp",
  },
];

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function validateCertificationsConfig(certifications: CertificationConfig[]) {
  const ids = new Set<string>();

  for (const certification of certifications) {
    if (!certification.id) {
      throw new Error("certification-data.config: certification is missing id");
    }
    if (ids.has(certification.id)) {
      throw new Error(`certification-data.config: duplicate id "${certification.id}"`);
    }
    ids.add(certification.id);

    for (const field of ["title", "issuer", "credentialId", "file", "previewSrc"] as const) {
      if (!certification[field]) {
        throw new Error(`certification-data.config: "${certification.id}" is missing ${field}`);
      }
    }
    if (certification.skills.length === 0) {
      throw new Error(`certification-data.config: "${certification.id}" has no skills`);
    }
    for (const date of [certification.issuedAt, certification.expiresAt]) {
      if (date !== undefined && !ISO_DATE.test(date)) {
        throw new Error(`certification-data.config: "${certification.id}" has invalid date "${date}"`);
      }
    }
  }
}

validateCertificationsConfig(RAW_CERTIFICATIONS);

/** Newest first. */
export const CERTIFICATIONS: readonly CertificationConfig[] = [...RAW_CERTIFICATIONS].sort((a, b) =>
  b.issuedAt.localeCompare(a.issuedAt)
);

export const FEATURED_CERTIFICATIONS = CERTIFICATIONS.filter((certification) => certification.isFeatured);

export const CERTIFICATION_CATEGORIES: readonly CertificationCategory[] = [
  "AI & Cloud",
  "Frontend",
  "Backend",
  "Delivery",
];

export function formatCertificationDate(isoDate: string) {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
