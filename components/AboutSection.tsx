"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Code2, BarChart3, Users, Zap } from "lucide-react";

const stats = [
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 10, suffix: "+", label: "Projects Delivered" },
  { value: 3, suffix: "", label: "Degrees & Diplomas" },
  { value: 40, suffix: "+", label: "PC Tasks Automated" },
];

const highlights = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    desc: "Building robust, scalable applications from frontend to backend with modern tech stacks.",
  },
  {
    icon: BarChart3,
    title: "Strategic Planning",
    desc: "Translating business goals into clear roadmaps, milestones, and actionable deliverables.",
  },
  {
    icon: Users,
    title: "Team Leadership",
    desc: "Managing cross-functional teams, fostering collaboration, and removing blockers.",
  },
  {
    icon: Zap,
    title: "Agile & Delivery",
    desc: "Driving on-time delivery through Agile methodologies, sprint planning, and risk management.",
  },
];

function useCountUp(target: number, isInView: boolean, duration = 1400) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;
    const steps = 40;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCount(Math.round((target * step) / steps));
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);
  return count;
}

function StatCard({ value, suffix, label, isInView, delay }: {
  value: number; suffix: string; label: string; isInView: boolean; delay: number;
}) {
  const count = useCountUp(value, isInView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="p-6 rounded-2xl bg-white/3 border border-white/8 hover:border-indigo-500/30 transition-colors text-center"
    >
      <div className="text-4xl font-extrabold text-indigo-400 mb-1 tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-sm text-slate-500">{label}</div>
    </motion.div>
  );
}

const codeLines = [
  { indent: 0, text: "const udip = {", color: "text-slate-300" },
  { indent: 1, text: 'role: ["Dev", "PM"],', color: "text-indigo-300" },
  { indent: 1, text: 'stack: "MERN + Next.js",', color: "text-violet-300" },
  { indent: 1, text: 'based: "Toronto, ON",', color: "text-emerald-300" },
  { indent: 1, text: "available: true,", color: "text-amber-300" },
  { indent: 1, text: 'degree: ["Humber x2", "Ganpat"],', color: "text-sky-300" },
  { indent: 0, text: "}", color: "text-slate-300" },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
            About Me
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Developer who manages. Manager who codes.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                Hi! I&apos;m <span className="text-white font-medium">Udip Mandora</span>, a full-stack
                web developer and project manager based in Toronto, ON. I hold
                two post-graduate diplomas from Humber College — one in Web
                Development and one in Project Management — plus a Bachelor&apos;s
                in Software Development from Ganpat University.
              </p>
              <p>
                On the development side, I specialize in full-stack applications
                using React, Next.js, Node.js, PHP (Laravel), and C# (ASP.NET).
                On the management side, I apply PMBOK practices, Agile
                methodologies, and hands-on leadership to keep projects on track
                and teams aligned.
              </p>
              <p>
                I also build personal AI projects — most notably MARK, an
                AI-powered voice assistant built with Python and C++ that
                automates over 40 PC tasks with voice-activated encrypted access.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Get in Touch
              </a>
              <a
                href="#projects"
                className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                View Projects
              </a>
            </div>
          </motion.div>

          {/* Right column: code card + stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            {/* Code card */}
            <div className="rounded-2xl border border-white/8 bg-white/3 overflow-hidden">
              {/* Window chrome */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
                <span className="ml-3 text-xs text-slate-600 font-mono">udip.ts</span>
              </div>
              {/* Code body */}
              <div className="px-5 py-4 font-mono text-sm leading-7">
                {codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.07 }}
                    className={`${line.color}`}
                    style={{ paddingLeft: `${line.indent * 16}px` }}
                  >
                    {line.text}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <StatCard
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  isInView={isInView}
                  delay={0.35 + i * 0.08}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Highlights grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i + 0.3 }}
              className="p-5 rounded-2xl bg-white/3 border border-white/8 hover:border-indigo-500/30 group transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                <item.icon size={20} className="text-indigo-400" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-2">
                {item.title}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
