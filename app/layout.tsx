import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { THEME_INIT_SCRIPT } from "@/config/theme-palettes.config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://robwilsoncaldosa.vercel.app";
const SITE_TITLE = "Rob Wilson Caldosa — Senior Software Developer";
const SITE_DESCRIPTION =
  "Senior Software Developer in Cebu building dependable web applications with React, Next.js, Node.js, and Google Cloud. Google Cloud certified Generative AI Leader who works with AI, not through it.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — Rob Wilson Caldosa",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Rob Wilson Caldosa",
    "Senior Software Developer",
    "Frontend Developer",
    "React",
    "Next.js",
    "Node.js",
    "Google Cloud",
    "Generative AI",
    "AI-assisted development",
    "Cebu",
    "Portfolio",
  ],
  authors: [{ name: "Rob Wilson Caldosa" }],
  creator: "Rob Wilson Caldosa",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_TITLE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        {children}
      </body>
    </html>
  );
}
