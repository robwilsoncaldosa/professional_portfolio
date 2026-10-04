import type { Metadata } from "next";
import { Archivo, Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { THEME_INIT_SCRIPT } from "@/config/theme-palettes.config";
import { INTRO_INIT_SCRIPT } from "@/config/intro.config";
import ThemeSwitcher from "./_components/ThemeSwitcher";
import ThemeRandomizer from "./_components/ThemeRandomizer";
import IntroOverlay from "./_components/IntroOverlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["wdth"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-hud",
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
        className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: INTRO_INIT_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <noscript>
          <style>{`.intro-overlay{display:none}html[data-intro="active"]{overflow:auto}`}</style>
        </noscript>
        {children}
        <ThemeRandomizer />
        <ThemeSwitcher />
        <IntroOverlay />
      </body>
    </html>
  );
}
