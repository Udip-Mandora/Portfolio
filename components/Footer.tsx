"use client";

import { Code2, ArrowUp } from "lucide-react";

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
          {/* Brand */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-md bg-indigo-600 group-hover:bg-indigo-500 flex items-center justify-center transition-colors">
              <Code2 size={13} className="text-white" />
            </div>
            <span className="text-white font-semibold text-sm">Udip Mandora</span>
          </a>

          {/* Quick nav */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {quickLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-500 hover:text-white text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-500 hover:text-white border border-white/8 hover:border-white/20 rounded-lg transition-all hover:-translate-y-0.5"
          >
            <ArrowUp size={12} />
            Back to top
          </button>
        </div>

        <div className="border-t border-white/5 pt-6">
          <p className="text-slate-600 text-sm text-center">
            © {new Date().getFullYear()} Udip Mandora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
