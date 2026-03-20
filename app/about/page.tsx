"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import SkillBar from "@/components/SkillBar";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function AboutPage() {
  const { t, lang } = useLanguage();
  const a = t.about;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest block mb-3">
            {a.label}
          </span>
          <h1 className="font-epilogue font-black text-4xl sm:text-5xl text-[var(--text)] tracking-tight">
            {a.page_title}
          </h1>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* ── Left column ── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Avatar + Identity */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass rounded-xl p-7"
            >
              {/* Avatar */}
              <div className="mb-6">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center font-epilogue font-black text-2xl mb-4"
                  style={{
                    background: "linear-gradient(135deg, var(--accent), var(--accent2))",
                    color: "var(--bg)",
                    boxShadow: "0 0 30px rgba(56,189,248,0.25)",
                  }}
                >
                  GL
                </div>
                <h2 className="font-epilogue font-bold text-xl text-[var(--text)] leading-tight mb-2">
                  {a.headline_1}
                  <br />
                  {a.headline_2}
                  <br />
                  {a.headline_3}
                </h2>
                <p className="text-xs font-mono text-[var(--muted)]">
                  {profile.location}
                </p>
              </div>

              {/* Bio */}
              <div className="space-y-4 mb-5">
                {/* Bio paragraph 1 — highlight Air France, Sanofi, end-to-end */}
                <p className="text-sm font-mono text-slate-300 leading-relaxed">
                  {lang === "en" ? (
                    <>
                      Data Analyst with{" "}
                      <span className="text-[var(--accent)] font-semibold">4+ years</span>{" "}
                      of experience in demanding environments — from{" "}
                      <span className="text-[var(--accent)] font-semibold">Air France</span>
                      &apos;s corporate loyalty platform to{" "}
                      <span className="text-[var(--accent2)] font-semibold">Sanofi</span>
                      &apos;s quality pipelines. I build{" "}
                      <span className="text-[var(--text)] font-semibold">end-to-end data systems</span>
                      : ingestion, cleaning, validation, visualization.
                    </>
                  ) : (
                    <>
                      Data Analyst avec{" "}
                      <span className="text-[var(--accent)] font-semibold">4+ années</span>{" "}
                      d&apos;expérience dans des environnements exigeants — de la plateforme de fidélité corporate d&apos;
                      <span className="text-[var(--accent)] font-semibold">Air France</span>{" "}
                      aux pipelines qualité de{" "}
                      <span className="text-[var(--accent2)] font-semibold">Sanofi</span>
                      . Je construis des{" "}
                      <span className="text-[var(--text)] font-semibold">systèmes data de bout en bout</span>
                      {" "}: ingestion, nettoyage, validation, visualisation.
                    </>
                  )}
                </p>

                {/* Bio paragraph 2 — highlight data governance */}
                <p className="text-sm font-mono text-slate-300 leading-relaxed">
                  {lang === "en" ? (
                    <>
                      My signature:{" "}
                      <span className="text-[var(--accent3)] font-semibold">data governance</span>
                      . Not just charts — traceable, documented, reliable data.{" "}
                      <span className="text-[var(--text)] italic">Data without lineage is an opinion.</span>
                    </>
                  ) : (
                    <>
                      Ma signature :{" "}
                      <span className="text-[var(--accent3)] font-semibold">la gouvernance data</span>
                      . Pas seulement des graphiques — des données traçables, documentées, fiables.{" "}
                      <span className="text-[var(--text)] italic">Une donnée sans lineage est une opinion.</span>
                    </>
                  )}
                </p>

                {/* Bio paragraph 3 — highlight bridge role */}
                <p className="text-sm font-mono text-slate-300 leading-relaxed">
                  {lang === "en" ? (
                    <>
                      A natural{" "}
                      <span className="text-[var(--accent2)] font-semibold">bridge between business and technical teams</span>
                      , I translate functional requirements into actionable specifications, and insights into decisions.
                    </>
                  ) : (
                    <>
                      Pont naturel entre les{" "}
                      <span className="text-[var(--accent2)] font-semibold">équipes métier et techniques</span>
                      , je traduis les exigences fonctionnelles en spécifications actionnables, et les insights en décisions.
                    </>
                  )}
                </p>
              </div>

              {/* Tagline */}
              <div
                className="py-3 px-4 rounded-lg"
                style={{
                  background: "rgba(56, 189, 248, 0.05)",
                  borderLeft: "2px solid var(--accent)",
                }}
              >
                <p className="font-lora italic text-sm text-slate-400 leading-relaxed">
                  &ldquo;{profile.tagline}&rdquo;
                </p>
              </div>
            </motion.div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass rounded-xl p-6"
            >
              <h3 className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest mb-4">
                {a.languages_label}
              </h3>
              <div className="space-y-3">
                {profile.languages.map((lang, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm font-mono text-[var(--text)] font-medium">
                      {lang.lang}
                    </span>
                    <span
                      className="text-xs font-mono px-2.5 py-0.5 rounded-full"
                      style={{
                        background: "rgba(56, 189, 248, 0.08)",
                        color: "var(--accent)",
                        border: "1px solid rgba(56, 189, 248, 0.2)",
                      }}
                    >
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Interests */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="glass rounded-xl p-6"
            >
              <h3 className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest mb-4">
                {a.interests_label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono px-3 py-1.5 rounded-full text-slate-300 hover:text-[var(--text)] transition-colors duration-200"
                    style={{
                      background: "rgba(30, 45, 64, 0.6)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass rounded-xl p-6"
            >
              <h3 className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest mb-4">
                {a.contact_label}
              </h3>
              <div className="space-y-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 text-sm font-mono text-slate-300 hover:text-[var(--accent)] transition-colors duration-200 group"
                >
                  <span className="text-[var(--accent)] group-hover:scale-110 transition-transform">✉</span>
                  {profile.email}
                </a>
                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center gap-3 text-sm font-mono text-slate-300 hover:text-[var(--text)] transition-colors duration-200 group"
                >
                  <span className="text-[var(--muted)] group-hover:scale-110 transition-transform">☎</span>
                  {profile.phone}
                </a>
                <a
                  href={`https://${profile.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-mono text-slate-300 hover:text-[var(--accent2)] transition-colors duration-200 group"
                >
                  <span className="text-[var(--accent2)] group-hover:scale-110 transition-transform">⊕</span>
                  LinkedIn ↗
                </a>
                <a
                  href={`https://${profile.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-mono text-slate-300 hover:text-[var(--accent3)] transition-colors duration-200 group"
                >
                  <span className="text-[var(--accent3)] group-hover:scale-110 transition-transform">⌥</span>
                  GitHub ↗
                </a>
              </div>

              <div className="mt-5 pt-5 border-t border-[var(--border)]">
                <a
                  href="/cv-gwenael-liger.pdf"
                  download
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-mono font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: "rgba(56, 189, 248, 0.08)",
                    border: "1px solid rgba(56, 189, 248, 0.25)",
                    color: "var(--accent)",
                    boxShadow: "0 4px 20px rgba(56,189,248,0.08)",
                  }}
                >
                  <span>↓</span> {a.download_cv}
                </a>
              </div>
            </motion.div>
          </div>

          {/* ── Right column ── */}
          <div className="lg:col-span-3 space-y-10">
            {/* Experience Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <h2 className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest mb-6">
                {a.career_label}
              </h2>
              <ExperienceTimeline />
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass rounded-xl p-7"
            >
              <h2 className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest mb-6">
                {a.skills_label}
              </h2>
              <div className="space-y-5">
                {profile.skills.map((skill, i) => (
                  <SkillBar key={i} name={skill.name} level={skill.level} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
