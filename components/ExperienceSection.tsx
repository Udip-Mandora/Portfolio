"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

const workExperience = [
  {
    role: "Volunteer Web Developer",
    company: "Non-Profit Organization",
    period: "Dec 2023 — Present",
    type: "Volunteer",
    description:
      "Designed and maintained a responsive WordPress website ensuring smooth functionality and user experience. Diagnosed technical issues, collaborated with cross-functional teams, and took on leadership roles aligning web strategies with organizational goals.",
    tags: ["WordPress", "Web Development", "Leadership", "Cross-functional Teams"],
  },
  {
    role: "Co-Op Lead Web Developer",
    company: "Humber Institute of Technology",
    period: "May 2023 — Aug 2023",
    type: "Co-Op",
    description:
      "Redesigned website layout, increasing user engagement by 40% and improving navigation efficiency. Optimized performance, reducing page load time by 40% and bounce rate by 15%. Managed version control using Git.",
    tags: ["Git", "Performance Optimization", "UX", "Team Lead"],
  },
  {
    role: "Web Developer",
    company: "Olbuzz",
    period: "May 2021 — June 2022",
    type: "Full-time",
    description:
      "Developed full-stack web solutions, enhancing site responsiveness and user experience. Integrated APIs to optimize functionality and improve data retrieval efficiency. Contributed to a 10% increase in lead generation and expanded user base by 15%.",
    tags: ["Full-Stack", "API Integration", "React.js", "Node.js"],
  },
  {
    role: "AI Voice Assistant Developer",
    company: "MARK — Personal Project",
    period: "Jan 2021 — Present",
    type: "Personal Project",
    description:
      "Engineered an AI-powered voice assistant using Python and QT Designer (C++), integrating NLP and automation to execute over 40 PC tasks via voice commands. Implemented hexadecimal-based encryption with voice-activated decryption for secure access.",
    tags: ["Python", "C++", "NLP", "AI", "Encryption"],
  },
];

const education = [
  {
    degree: "PG Diploma — Project Management",
    school: "Humber College of Technology, Toronto, ON",
    period: "Sep 2023 — Apr 2024",
    description: "PMBOK Management 6th Edition Practices, Risk Analysis, Monte-Carlo Analysis. Capstone Project: Winning Team 2024.",
  },
  {
    degree: "PG Diploma — Web Development",
    school: "Humber College of Technology, Toronto, ON",
    period: "Sep 2022 — Aug 2023",
    description: "Node.js, React.js (MERN), JavaScript, C#, ASP.NET, HTML/CSS, PHP (Vanilla | Laravel), Database (SQL | NoSQL), Figma, Git.",
  },
  {
    degree: "Bachelor's Degree — Software Development",
    school: "Ganpat University, Ahmedabad, Gujarat",
    period: "Aug 2018 — June 2021",
    description: "Data Structures & Algorithms, DBMS, Advanced Java, .NET, Mobile Computing, AI & Machine Learning.",
  },
];

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Experience
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Career journey
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Work */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2 mb-8"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center">
                <Briefcase size={16} className="text-indigo-400" />
              </div>
              <h3 className="text-white font-bold text-lg">Work Experience</h3>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-white/8" />

              <div className="space-y-8">
                {workExperience.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 * i + 0.2 }}
                    className="relative pl-10"
                  >
                    {/* Dot */}
                    <div className="absolute left-[13px] top-2 w-3 h-3 rounded-full border-2 border-indigo-500 bg-[#0a0a0f]" />

                    <div className="p-5 rounded-xl bg-white/3 border border-white/8 hover:border-indigo-500/30 transition-colors">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-white font-semibold text-sm leading-snug">
                          {exp.role}
                        </h4>
                        <span className="shrink-0 text-xs text-slate-600 whitespace-nowrap">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-indigo-400 text-xs font-medium mb-3">
                        {exp.company} · {exp.type}
                      </p>
                      <p className="text-slate-500 text-xs leading-relaxed mb-3">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-xs rounded bg-white/5 text-slate-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2 mb-8"
            >
              <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center">
                <GraduationCap size={16} className="text-violet-400" />
              </div>
              <h3 className="text-white font-bold text-lg">Education & Certs</h3>
            </motion.div>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-white/8" />

              <div className="space-y-8">
                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 * i + 0.2 }}
                    className="relative pl-10"
                  >
                    <div className="absolute left-[13px] top-2 w-3 h-3 rounded-full border-2 border-violet-500 bg-[#0a0a0f]" />

                    <div className="p-5 rounded-xl bg-white/3 border border-white/8 hover:border-violet-500/30 transition-colors">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-white font-semibold text-sm leading-snug">
                          {edu.degree}
                        </h4>
                        <span className="shrink-0 text-xs text-slate-600 whitespace-nowrap">
                          {edu.period}
                        </span>
                      </div>
                      <p className="text-violet-400 text-xs font-medium mb-3">
                        {edu.school}
                      </p>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        {edu.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
