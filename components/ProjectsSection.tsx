"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { ExternalLink, GitBranch, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

const projects = [
  {
    title: "MARK Voice Assistant",
    category: "dev",
    description:
      "AI-powered voice assistant built with Python and QT Designer (C++). Integrates NLP and automation to execute 40+ PC tasks via voice commands, with hexadecimal-based encrypted access restricted to the authorized user's voice.",
    tags: ["Python", "C++", "NLP", "QT Designer", "Encryption", "AI"],
    impact: "40+ automated PC tasks via voice",
    github: null,
    live: null,
    gradient: "from-indigo-500/20 to-blue-500/10",
    border: "hover:border-indigo-500/40",
  },
  {
    title: "LEGO Smart City System",
    category: "both",
    description:
      "A LEGO Smart City integrating Pixelate, Radio, GPS, and Colors systems using PHP (Laravel) for the back-end API, React.js for the front-end, MySQL for data storage, and Raspberry Pi for hardware control.",
    tags: ["PHP", "Laravel", "React.js", "MySQL", "Raspberry Pi", "REST API"],
    impact: "Multi-system smart city integration",
    github: "https://github.com/Udip-Mandora/lego_front",
    live: null,
    gradient: "from-emerald-500/20 to-teal-500/10",
    border: "hover:border-emerald-500/40",
  },
  {
    title: "Mental Health Passion Project",
    category: "dev",
    description:
      "A mental health-focused web application with full CRUD functionality. Users can create, track, and manage mental health exercises and issues with tailored suggestions and dynamic engagement features.",
    tags: ["JavaScript", "C#", "HTML/CSS", "CRUD"],
    impact: "Full CRUD mental health tracker",
    github: "https://github.com/Udip-Mandora/PassionProject1",
    live: null,
    gradient: "from-violet-500/20 to-purple-500/10",
    border: "hover:border-violet-500/40",
  },
  {
    title: "NASA & SpaceX API Project",
    category: "dev",
    description:
      "An API-driven web app displaying dynamic data from NASA and SpaceX APIs. Cross-API configuration merges NASA rover images with SpaceX Tesla Roadster updates into a unique interactive experience.",
    tags: ["JavaScript", "React.js", "HTML/CSS", "Bootstrap", "REST API"],
    impact: "Cross-API data fusion experience",
    github: "https://github.com/Udip-Mandora/API_Project_Call",
    live: null,
    gradient: "from-sky-500/20 to-cyan-500/10",
    border: "hover:border-sky-500/40",
  },
];

const filters = [
  { label: "All", value: "all" },
  { label: "Development", value: "dev" },
  { label: "Project Management", value: "pm" },
  { label: "Both", value: "both" },
];

const CLAMP_LENGTH = 110;

function ProjectCard({ project, delay, isInView }: {
  project: typeof projects[number];
  delay: number;
  isInView: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const isLong = project.description.length > CLAMP_LENGTH;
  const displayDesc = isLong && !expanded
    ? project.description.slice(0, CLAMP_LENGTH).trimEnd() + "…"
    : project.description;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className={`group relative p-6 rounded-2xl bg-gradient-to-br ${project.gradient} border border-white/8 ${project.border} transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 flex flex-col`}
    >
      {/* Category badge */}
      <span
        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mb-4 ${
          project.category === "dev"
            ? "bg-indigo-500/15 text-indigo-300"
            : project.category === "pm"
            ? "bg-violet-500/15 text-violet-300"
            : "bg-emerald-500/15 text-emerald-300"
        }`}
      >
        {project.category === "dev"
          ? "Development"
          : project.category === "pm"
          ? "PM"
          : "Dev + PM"}
      </span>

      <h3 className="text-white font-bold text-lg mb-2">{project.title}</h3>

      {/* Description with expand toggle */}
      <div className="mb-1">
        <p className="text-slate-400 text-sm leading-relaxed">{displayDesc}</p>
        {isLong && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-1 flex items-center gap-0.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            {expanded ? (
              <><ChevronUp size={12} /> Show less</>
            ) : (
              <><ChevronDown size={12} /> Show more</>
            )}
          </button>
        )}
      </div>

      {/* Impact */}
      <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-3 mb-4">
        <ArrowRight size={12} />
        {project.impact}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded text-xs bg-white/5 text-slate-400 border border-white/8"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-3">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <GitBranch size={14} /> Code
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ExternalLink size={14} /> Live Demo
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  const [active, setActive] = useState("all");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filtered =
    active === "all"
      ? projects
      : projects.filter((p) => p.category === active || p.category === "both");

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Projects
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Things I&apos;ve built & shipped
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            A selection of projects spanning full-stack development and end-to-end project delivery.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === f.value
                  ? "bg-indigo-600 text-white"
                  : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        {filtered.length === 0 && (
          <p className="text-center text-slate-500 py-16">No projects in this category yet.</p>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              delay={0.05 * i + 0.3}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
