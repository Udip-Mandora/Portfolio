"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Mail, MapPin, Send, GitBranch, Briefcase, CheckCircle, Copy, Check, BookOpen } from "lucide-react";

const EMAIL = "udipmandora42@gmail.com";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", website: "" });
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to send");
      }
      setSent(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      setError(msg || "Something went wrong. Please try again or email me directly.");
    } finally {
      setLoading(false);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: do nothing silently
    }
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let&apos;s work together
          </h2>
          <p className="text-slate-500 max-w-md mx-auto">
            Have a project in mind or need a technical PM? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-white font-bold text-xl mb-4">Get in touch</h3>
              <p className="text-slate-400 leading-relaxed">
                Whether you need a senior developer, a project manager, or someone
                who can do both — I&apos;m available for freelance projects,
                consulting, and full-time opportunities.
              </p>
            </div>

            <address className="not-italic space-y-4">
              {/* Email row with copy button */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500 mb-0.5">Email</p>
                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${EMAIL}`}
                      className="text-white text-sm hover:text-indigo-400 transition-colors truncate"
                    >
                      {EMAIL}
                    </a>
                    <button
                      onClick={copyEmail}
                      aria-label="Copy email address"
                      className="shrink-0 p-1 rounded text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all"
                    >
                      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Location</p>
                  <p className="text-white text-sm">Toronto, ON, Canada — Remote Worldwide</p>
                </div>
              </div>
            </address>

            {/* Social */}
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-widest font-semibold mb-4">
                Find me online
              </p>
              <div className="flex gap-3">
                {[
                  { icon: GitBranch, label: "GitHub", href: "https://github.com/Udip-Mandora" },
                  { icon: Briefcase, label: "LinkedIn", href: "https://www.linkedin.com/in/udip-mandora/" },
                  { icon: BookOpen, label: "Medium", href: "https://medium.com/@dpschzgk" },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-indigo-500/15 border border-white/8 hover:border-indigo-500/30 flex items-center justify-center text-slate-400 hover:text-indigo-400 transition-all"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability card */}
            <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/15">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-sm font-semibold">Currently available</span>
              </div>
              <p className="text-slate-500 text-xs">
                Open to remote freelance, consulting, and full-time opportunities worldwide — available now.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 rounded-2xl bg-white/3 border border-white/8">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-emerald-400" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Message sent!</h3>
                <p className="text-slate-400 text-sm">
                  Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "", website: "" }); }}
                  className="mt-6 px-4 py-2 text-sm text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 rounded-lg transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-6 rounded-2xl bg-white/3 border border-white/8 space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 font-medium mb-1.5">Name</label>
                    <input
                      type="text"
                      required
                      maxLength={100}
                      disabled={loading}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-2.5 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 transition-colors disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 font-medium mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      maxLength={254}
                      disabled={loading}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-4 py-2.5 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 transition-colors disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 font-medium mb-1.5">Subject</label>
                  <input
                    type="text"
                    required
                    maxLength={150}
                    disabled={loading}
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Project inquiry, Consulting, etc."
                    className="w-full px-4 py-2.5 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 transition-colors disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 font-medium mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    maxLength={5000}
                    disabled={loading}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project or what you need help with..."
                    className="w-full px-4 py-2.5 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 transition-colors resize-none disabled:opacity-50"
                  />
                </div>

                {/* Honeypot — visually hidden, never filled by real users */}
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden", opacity: 0 }}
                />

                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-indigo-500/25"
                >
                  <Send size={16} />
                  {loading ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
