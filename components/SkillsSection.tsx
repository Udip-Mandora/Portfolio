"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const devTiers = [
  {
    tier: "Fluent",
    dot: "bg-indigo-400",
    label: "bg-indigo-500/15 border-indigo-500/20 text-indigo-300",
    tagClass: "bg-indigo-500/10 border-indigo-500/20 text-indigo-300",
    skills: ["JavaScript", "TypeScript", "Python", "React.js", "Next.js", "Node.js", "REST APIs", "Git"],
  },
  {
    tier: "Proficient",
    dot: "bg-blue-400",
    label: "bg-blue-500/15 border-blue-500/20 text-blue-300",
    tagClass: "bg-blue-500/10 border-blue-500/20 text-blue-300",
    skills: ["PHP", "Laravel", "C#", "ASP.NET Core", "MySQL", "PostgreSQL", "MongoDB", "TailwindCSS"],
  },
  {
    tier: "Familiar",
    dot: "bg-slate-500",
    label: "bg-white/5 border-white/10 text-slate-400",
    tagClass: "bg-white/5 border-white/10 text-slate-400",
    skills: ["C++", "Java", "Redis", "Docker", "Vercel", "Drizzle ORM"],
  },
];

const pmTiers = [
  {
    tier: "Fluent",
    dot: "bg-violet-400",
    label: "bg-violet-500/15 border-violet-500/20 text-violet-300",
    tagClass: "bg-violet-500/10 border-violet-500/20 text-violet-300",
    skills: ["Agile / Scrum", "Sprint Planning", "Jira", "Trello", "Team Leadership", "Stakeholder Mgmt"],
  },
  {
    tier: "Proficient",
    dot: "bg-purple-400",
    label: "bg-purple-500/15 border-purple-500/20 text-purple-300",
    tagClass: "bg-purple-500/10 border-purple-500/20 text-purple-300",
    skills: ["PMBOK 6th Ed.", "Risk Analysis", "Roadmap Planning", "Kanban", "Budget Management"],
  },
  {
    tier: "Familiar",
    dot: "bg-slate-500",
    label: "bg-white/5 border-white/10 text-slate-400",
    tagClass: "bg-white/5 border-white/10 text-slate-400",
    skills: ["Monte-Carlo Analysis", "Confluence", "OKR Frameworks", "MS Project"],
  },
];

const techTags = [
  "JavaScript", "Python", "C#.NET", "PHP", "C++", "Java",
  "React.js", "Next.js", "Node.js", "Express.js", "Laravel", "ASP.NET Core",
  "MySQL", "PostgreSQL", "MongoDB", "MS SQL Server", "MariaDB",
  "TailwindCSS", "ShadCN UI", "REST API", "MERN Stack",
  "Git", "Figma", "Vercel", "Postman", "Drizzle ORM",
];

const pmTags = [
  "Agile", "Scrum", "PMBOK 6th Ed.", "Risk Analysis",
  "Monte-Carlo Analysis", "Jira", "Trello", "MS Teams",
  "Slack", "Stakeholder Management", "Sprint Planning", "Kanban",
];

interface TierCardProps {
  tiers: typeof devTiers;
  title: string;
  accentDot: string;
  delay: number;
  isInView: boolean;
}

function TierCard({ tiers, title, accentDot, delay, isInView }: TierCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="p-8 rounded-2xl bg-white/3 border border-white/8 space-y-6"
    >
      <h3 className="text-white font-bold text-lg flex items-center gap-2">
        <span className={`w-3 h-3 rounded-sm ${accentDot} inline-block`} />
        {title}
      </h3>

      {tiers.map((tier) => (
        <div key={tier.tier}>
          <div className="flex items-center gap-2 mb-2.5">
            <span className={`w-1.5 h-1.5 rounded-full ${tier.dot}`} />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
              {tier.tier}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tier.skills.map((skill) => (
              <span
                key={skill}
                className={`px-2.5 py-1 text-xs rounded-lg border ${tier.tagClass} transition-colors cursor-default`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Skills & Expertise
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Technical & leadership toolkit
          </h2>
        </motion.div>

        {/* Tier cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <TierCard
            tiers={devTiers}
            title="Development"
            accentDot="bg-indigo-500"
            delay={0.1}
            isInView={isInView}
          />
          <TierCard
            tiers={pmTiers}
            title="Project Management"
            accentDot="bg-violet-500"
            delay={0.2}
            isInView={isInView}
          />
        </div>

        {/* Tag clouds */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <p className="text-slate-500 text-xs uppercase tracking-widest font-semibold mb-4">
              Full Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {techTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20 transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <p className="text-slate-500 text-xs uppercase tracking-widest font-semibold mb-4">
              PM Methodologies & Tools
            </p>
            <div className="flex flex-wrap gap-2">
              {pmTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 hover:bg-violet-500/20 transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
