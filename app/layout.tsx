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

export const metadata: Metadata = {
  title: "Udip Mandora | Web Developer & Project Manager",
  description:
    "Portfolio of Udip Mandora — Full-Stack Web Developer and Project Manager specializing in building scalable web applications and leading high-performing teams.",
  metadataBase: new URL("https://udipmandora.com"),
  openGraph: {
    type: "website",
    url: "https://udipmandora.com",
    title: "Udip Mandora | Web Developer & Project Manager",
    description:
      "Full-Stack Web Developer and Project Manager based in Toronto, ON. Specializing in React, Next.js, Node.js, and end-to-end project delivery.",
    siteName: "Udip Mandora Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Udip Mandora | Web Developer & Project Manager",
    description:
      "Full-Stack Web Developer and Project Manager based in Toronto, ON. Specializing in React, Next.js, Node.js, and end-to-end project delivery.",
  },
  keywords: [
    "Udip Mandora", "Full-Stack Developer", "Project Manager", "Web Developer",
    "React", "Next.js", "Node.js", "Toronto", "Portfolio",
  ],
  authors: [{ name: "Udip Mandora", url: "https://udipmandora.com" }],
  robots: { index: true, follow: true },
};

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
      </body>
    </html>
  );
}
