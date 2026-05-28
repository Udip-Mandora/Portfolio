import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://udipmandora.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Udip Mandora | Full-Stack Developer & Project Manager",
    template: "%s | Udip Mandora",
  },

  description:
    "Udip Mandora — Full-Stack Developer & Project Manager. React, Next.js, Node.js, Python. Available worldwide for remote freelance, consulting & full-time roles.",

  keywords: [
    // Branded
    "Udip Mandora",
    "Udip Mandora Developer",
    "Udip Mandora Portfolio",
    // Role — global (no location)
    "Full-Stack Developer",
    "Full-Stack Web Developer",
    "Project Manager",
    "Web Developer",
    "Software Developer",
    "Technical Project Manager",
    "Agile Project Manager",
    // Remote-first keywords — development
    "Remote Full-Stack Developer",
    "Remote Web Developer",
    "Remote React Developer",
    "Remote Next.js Developer",
    "Remote MERN Stack Developer",
    "Hire Remote Developer",
    "Hire Remote Full-Stack Developer",
    "Freelance Full-Stack Developer",
    "Freelance Web Developer",
    "Freelance React Developer",
    "Freelance Next.js Developer",
    "Freelance Developer for Hire",
    // Remote-first keywords — project management
    "Remote Project Manager",
    "Remote Agile Project Manager",
    "Remote Technical Project Manager",
    "Freelance Project Manager",
    "Freelance Agile Project Manager",
    "Hire Remote Project Manager",
    "Contract Project Manager",
    "Agile Scrum Master",
    "Remote Scrum Master",
    "IT Project Manager",
    "Remote IT Project Manager",
    "Digital Project Manager",
    "Software Project Manager",
    "Project Manager for Hire",
    // Role + Toronto / Canada (keep for local SEO)
    "Full-Stack Developer Toronto",
    "Full-Stack Web Developer Toronto",
    "Web Developer Toronto",
    "Project Manager Toronto",
    "Agile Project Manager Toronto",
    "IT Project Manager Toronto",
    "Freelance Web Developer Toronto",
    "Full-Stack Developer Canada",
    "Project Manager Canada",
    "Remote Developer Canada",
    // Tech stack — global
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Python Developer",
    "MERN Stack Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "React Next.js Developer",
    "Full-Stack JavaScript Developer",
    // Dual-role differentiator
    "Full-Stack Developer and Project Manager",
    "Developer with Project Management Experience",
    "Technical Lead Developer",
    "Full-Stack Developer Agile",
    // Skills
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Python",
    "PHP",
    "Laravel",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Agile",
    "Scrum",
    "PMBOK",
  ],

  alternates: {
    canonical: BASE_URL,
  },

  authors: [{ name: "Udip Mandora", url: BASE_URL }],
  creator: "Udip Mandora",
  publisher: "Udip Mandora",
  category: "technology",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_CA",
    url: BASE_URL,
    siteName: "Udip Mandora Portfolio",
    title: "Udip Mandora | Full-Stack Developer & Project Manager",
    description:
      "Full-Stack Web Developer and Project Manager based in Toronto, ON — available worldwide for remote work. Specializing in React, Next.js, Node.js, and end-to-end Agile project delivery.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Udip Mandora | Full-Stack Developer & Project Manager",
    description:
      "Full-Stack Developer & Project Manager. React · Next.js · Node.js · Python. Available worldwide for remote work.",
  },
};

// ── JSON-LD Structured Data ────────────────────────────────────────────────
// Three interlocking schemas: Person, WebSite, and ProfilePage.
// Google uses these to understand who this page is about and to generate
// rich results (knowledge panel, site links, etc.).
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE_URL}/#person`,
    name: "Udip Mandora",
    url: BASE_URL,
    image: `${BASE_URL}/opengraph-image`,
    jobTitle: ["Full-Stack Web Developer", "Project Manager"],
    description:
      "Full-Stack Web Developer and Project Manager based in Toronto, ON, Canada — available worldwide for remote work. Specializing in React, Next.js, Node.js, and end-to-end Agile project delivery.",
    email: "udipmandora42@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toronto",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    workLocation: {
      "@type": "VirtualLocation",
      name: "Remote — Available Worldwide",
    },
    seeks: {
      "@type": "Demand",
      name: "Remote freelance, consulting, and full-time opportunities worldwide",
    },
    sameAs: [
      "https://github.com/Udip-Mandora",
      "https://www.linkedin.com/in/udip-mandora/",
    ],
    knowsAbout: [
      "Full-Stack Web Development",
      "Project Management",
      "Agile Methodology",
      "Scrum",
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "JavaScript",
      "Python",
      "PHP",
      "Laravel",
      "C#",
      "ASP.NET Core",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "PMBOK",
      "Risk Analysis",
      "Monte-Carlo Analysis",
    ],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Humber College of Technology",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Toronto",
          addressRegion: "ON",
          addressCountry: "CA",
        },
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Ganpat University",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ahmedabad",
          addressRegion: "Gujarat",
          addressCountry: "IN",
        },
      },
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Post-Graduate Diploma in Project Management",
        credentialCategory: "PostGraduateDiploma",
        recognizedBy: {
          "@type": "CollegeOrUniversity",
          name: "Humber College of Technology",
        },
        dateCreated: "2024",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Post-Graduate Diploma in Web Development",
        credentialCategory: "PostGraduateDiploma",
        recognizedBy: {
          "@type": "CollegeOrUniversity",
          name: "Humber College of Technology",
        },
        dateCreated: "2023",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Bachelor of Science in Software Development",
        credentialCategory: "BachelorDegree",
        recognizedBy: {
          "@type": "CollegeOrUniversity",
          name: "Ganpat University",
        },
        dateCreated: "2021",
      },
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Full-Stack Web Developer",
      occupationLocation: {
        "@type": "City",
        name: "Toronto",
      },
      skills:
        "React, Next.js, Node.js, TypeScript, Python, PHP, Laravel, C#, ASP.NET Core, MongoDB, PostgreSQL, MySQL",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "Udip Mandora — Portfolio",
    description:
      "Portfolio of Udip Mandora, Full-Stack Web Developer and Project Manager based in Toronto, ON.",
    author: { "@id": `${BASE_URL}/#person` },
    inLanguage: "en-CA",
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${BASE_URL}/#profilepage`,
    url: BASE_URL,
    name: "Udip Mandora — Full-Stack Developer & Project Manager Portfolio",
    about: { "@id": `${BASE_URL}/#person` },
    mainEntity: { "@id": `${BASE_URL}/#person` },
    inLanguage: "en-CA",
    dateModified: "2026-05-28T00:00:00Z",
  },
];

// Escape < > & so the inline JSON can't break out of the <script> tag.
function safeJsonLd(obj: object): string {
  return JSON.stringify(obj)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#0a0a0f] text-slate-200">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
        />
      </body>
    </html>
  );
}
