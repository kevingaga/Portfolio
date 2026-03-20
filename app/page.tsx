"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import FloatingCard from "@/components/FloatingCard";
import ProjectCard from "@/components/ProjectCard";

const pillars = [
  {
    icon: "⬡",
    title: "Gouvernance Data",
    description:
      "Pipelines traçables, qualité mesurable, données fiables de bout en bout. Lineage, fraîcheur, documentation — rien n'est laissé au hasard.",
    accent: "var(--accent)",
  },
  {
    icon: "◈",
    title: "Visualisation & Insights",
    description:
      "Dashboards lisibles au niveau C-Suite. Pas de graphiques pour faire joli — des décisions rendues possibles.",
    accent: "var(--accent2)",
  },
  {
    icon: "⟳",
    title: "Automatisation",
    description:
      "Scripts RPA, agents Python, réduction des tâches manuelles répétitives. Chaque heure économisée est une heure réinvestie.",
    accent: "var(--accent3)",
  },
];

function SectionReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background radial glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(56,189,248,0.06) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 right-0 w-[400px] h-[400px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(129,140,248,0.05) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Left: Text content */}
            <div className="lg:col-span-3">
              {/* Label */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 mb-6"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[var(--accent3)] animate-pulse"
                />
                <span className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest">
                  {profile.title} · {profile.location}
                </span>
              </motion.div>

              {/* Main headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-epilogue font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--text)] leading-[1.05] tracking-tight mb-5"
              >
                Data Analyst —{" "}
                <span className="gradient-text">
                  de la donnée brute
                </span>{" "}
                aux décisions éclairées
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm font-mono text-[var(--muted)] mb-5 leading-relaxed"
              >
                Gouvernance data · Automatisation · Visualisation
                <span className="text-[var(--border)] mx-2">/</span>
                Ex{" "}
                <span className="text-[var(--accent)]">Air France</span> ·{" "}
                <span className="text-[var(--accent2)]">Sanofi</span> ·{" "}
                <span className="text-[var(--accent3)]">Decathlon</span>
              </motion.p>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-lora italic text-base text-[var(--muted)] mb-9 leading-relaxed"
                style={{ borderLeft: "2px solid var(--border)", paddingLeft: "1rem" }}
              >
                &ldquo;{profile.tagline}&rdquo;
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono font-semibold text-sm text-[var(--bg)] bg-[var(--accent)] hover:bg-[var(--accent)]/90 hover:-translate-y-0.5 transition-all duration-200"
                  style={{
                    boxShadow: "0 4px 20px rgba(56,189,248,0.3)",
                  }}
                >
                  Voir les projets
                  <span>→</span>
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono font-semibold text-sm text-[var(--text)] hover:text-[var(--accent)] hover:-translate-y-0.5 transition-all duration-200"
                  style={{
                    background: "rgba(30, 45, 64, 0.5)",
                    border: "1px solid var(--border)",
                  }}
                >
                  En savoir plus
                </Link>
              </motion.div>
            </div>

            {/* Right: Floating cards */}
            <div className="lg:col-span-2 space-y-4">
              <FloatingCard
                icon="✈"
                title="Dernière mission"
                value="Air France — BlueBiz Platform"
                delay={0.5}
              />
              <FloatingCard
                icon="⚡"
                title="Stack"
                value="Python · SQL · Next.js · Power BI"
                delay={0.65}
              />
              <FloatingCard
                icon="◎"
                title="Disponibilité"
                value="Immédiat · Blagnac / Remote"
                delay={0.8}
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-[var(--muted)] to-transparent"
          />
        </motion.div>
      </section>

      {/* ── What I build ── */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-14">
              <span className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest block mb-3">
                Expertise
              </span>
              <h2 className="font-epilogue font-black text-3xl sm:text-4xl text-[var(--text)] tracking-tight">
                Ce que je construis
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, index) => (
              <SectionReveal key={index} delay={index * 0.1}>
                <div
                  className="glass rounded-xl p-7 h-full group hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                  style={{
                    boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                  }}
                >
                  {/* Glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at top left, ${pillar.accent}08 0%, transparent 60%)`,
                    }}
                  />
                  {/* Left border */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: pillar.accent }}
                  />

                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-5 relative z-10"
                    style={{
                      background: `${pillar.accent}15`,
                      border: `1px solid ${pillar.accent}30`,
                      color: pillar.accent,
                    }}
                  >
                    {pillar.icon}
                  </div>
                  <h3
                    className="font-epilogue font-bold text-lg text-[var(--text)] mb-3 relative z-10"
                  >
                    {pillar.title}
                  </h3>
                  <p className="text-sm font-mono text-[var(--muted)] leading-relaxed relative z-10">
                    {pillar.description}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects preview ── */}
      <section className="py-24 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(56,189,248,0.03) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <div>
                <span className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest block mb-3">
                  Portfolio
                </span>
                <h2 className="font-epilogue font-black text-3xl sm:text-4xl text-[var(--text)] tracking-tight">
                  Projets sélectionnés
                </h2>
              </div>
              <Link
                href="/projects"
                className="text-sm font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors duration-200 flex items-center gap-1.5 underline-accent"
              >
                Tous les projets <span>→</span>
              </Link>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <div
              className="glass rounded-2xl p-10 sm:p-14 relative overflow-hidden"
              style={{
                boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
              }}
            >
              {/* Background glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(56,189,248,0.06) 0%, transparent 70%)",
                }}
              />

              <span className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest block mb-4 relative z-10">
                Contact
              </span>
              <h2 className="font-epilogue font-black text-3xl sm:text-4xl text-[var(--text)] tracking-tight mb-4 relative z-10">
                Travaillons ensemble
              </h2>
              <p className="text-sm font-mono text-[var(--muted)] mb-8 leading-relaxed relative z-10 max-w-lg mx-auto">
                Disponible immédiatement pour des missions en data analytics, gouvernance data, ou automatisation. Basé à Blagnac, ouvert au remote.
              </p>
              <div className="flex flex-wrap justify-center gap-4 relative z-10">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-mono font-semibold text-sm text-[var(--bg)] bg-[var(--accent)] hover:bg-[var(--accent)]/90 hover:-translate-y-0.5 transition-all duration-200"
                  style={{ boxShadow: "0 4px 20px rgba(56,189,248,0.3)" }}
                >
                  <span>✉</span> {profile.email}
                </a>
                <a
                  href={`https://${profile.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-mono font-semibold text-sm text-[var(--text)] hover:text-[var(--accent2)] hover:-translate-y-0.5 transition-all duration-200"
                  style={{
                    background: "rgba(30, 45, 64, 0.5)",
                    border: "1px solid var(--border)",
                  }}
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
