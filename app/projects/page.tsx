"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";

type Category = "Tous" | "Data & Visualisation" | "Data Engineering" | "Automatisation & IA" | "Applications Métier";

const categories: Category[] = [
  "Tous",
  "Data & Visualisation",
  "Data Engineering",
  "Automatisation & IA",
  "Applications Métier",
];

const categoryLabels: Record<string, string> = {
  "Tous": "Tous",
  "Data & Visualisation": "Data & Viz",
  "Data Engineering": "Data Engineering",
  "Automatisation & IA": "Automatisation",
  "Applications Métier": "Apps Métier",
};

function getCategoryAccent(category: string): string {
  switch (category) {
    case "Data & Visualisation": return "var(--accent)";
    case "Data Engineering": return "var(--accent2)";
    case "Automatisation & IA": return "var(--accent3)";
    case "Applications Métier": return "#f59e0b";
    default: return "var(--accent)";
  }
}

function StatusBadge({ status }: { status: "deployed" | "wip" | "archived" }) {
  const map = {
    deployed: { label: "Déployé", className: "badge-deployed" },
    wip: { label: "En cours", className: "badge-wip" },
    archived: { label: "Archivé", className: "badge-archived" },
  };
  const { label, className } = map[status];
  return (
    <span className={`text-[10px] font-mono font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full ${className}`}>
      {label}
    </span>
  );
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("Tous");

  const filtered = projects.filter(
    (p) => activeCategory === "Tous" || p.category === activeCategory
  );

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest block mb-3">
            Portfolio
          </span>
          <h1 className="font-epilogue font-black text-4xl sm:text-5xl text-[var(--text)] tracking-tight mb-4">
            Projets
          </h1>
          <p className="text-sm font-mono text-[var(--muted)] max-w-xl leading-relaxed">
            {projects.length} projets couvrant la gouvernance data, le data engineering, l&apos;automatisation et les applications métier.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const accent = cat === "Tous" ? "var(--accent)" : getCategoryAccent(cat);
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="relative px-4 py-2 rounded-lg text-sm font-mono transition-all duration-200"
                style={{
                  color: isActive ? accent : "var(--muted)",
                  background: isActive ? `${accent}12` : "transparent",
                  border: isActive ? `1px solid ${accent}35` : "1px solid var(--border)",
                }}
              >
                {categoryLabels[cat]}
                {isActive && cat !== "Tous" && (
                  <motion.span
                    layoutId="filter-indicator"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: `${accent}08`,
                      border: `1px solid ${accent}30`,
                    }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </button>
            );
          })}
          <span className="ml-auto text-xs font-mono text-[var(--muted)] self-center">
            {filtered.length} projet{filtered.length > 1 ? "s" : ""}
          </span>
        </motion.div>

        {/* Table — desktop */}
        <div className="hidden md:block">
          <div
            className="glass rounded-xl overflow-hidden"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}
          >
            {/* Table header */}
            <div
              className="grid grid-cols-[3rem_1fr_auto_auto_auto_auto] gap-4 px-6 py-3 border-b border-[var(--border)]"
              style={{ background: "rgba(15, 21, 32, 0.6)" }}
            >
              {["N°", "Titre", "Catégorie", "Tags", "Gouvernance", "Statut"].map((h) => (
                <span key={h} className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-widest">
                  {h}
                </span>
              ))}
            </div>

            {/* Rows */}
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => {
                const accent = getCategoryAccent(project.category);
                return (
                  <motion.div
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      href={`/projects/${project.slug}`}
                      className="grid grid-cols-[3rem_1fr_auto_auto_auto_auto] gap-4 px-6 py-4 border-b border-[var(--border)] last:border-0 hover:bg-[rgba(56,189,248,0.03)] group transition-colors duration-200 items-center"
                    >
                      {/* N° */}
                      <span className="text-xs font-mono text-[var(--muted)] tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {/* Title */}
                      <div>
                        <p className="text-sm font-mono font-medium text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200">
                          {project.title}
                        </p>
                        <p className="text-xs font-mono text-[var(--muted)] mt-0.5">
                          {project.subtitle}
                        </p>
                      </div>

                      {/* Category */}
                      <span
                        className="text-xs font-mono px-2.5 py-1 rounded whitespace-nowrap"
                        style={{
                          color: accent,
                          background: `${accent}12`,
                          border: `1px solid ${accent}25`,
                        }}
                      >
                        {categoryLabels[project.category] || project.category}
                      </span>

                      {/* Tags */}
                      <div className="flex items-center gap-1 flex-wrap max-w-[180px]">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono px-1.5 py-0.5 rounded text-[var(--muted)]"
                            style={{
                              background: "rgba(30, 45, 64, 0.5)",
                              border: "1px solid var(--border)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="text-[10px] font-mono text-[var(--muted)]">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Gouvernance */}
                      <div className="flex justify-center">
                        {project.dataGovernance ? (
                          <span
                            className="text-xs font-mono font-semibold"
                            style={{ color: "var(--accent3)" }}
                            title="Gouvernance Data incluse"
                          >
                            ✓
                          </span>
                        ) : (
                          <span className="text-xs font-mono text-[var(--border)]">—</span>
                        )}
                      </div>

                      {/* Status */}
                      <div className="flex items-center justify-end gap-2">
                        <StatusBadge status={project.status} />
                        <span className="text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors duration-200 text-sm">
                          ↗
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Cards — mobile */}
        <div className="md:hidden space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => {
              const accent = getCategoryAccent(project.category);
              return (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                >
                  <Link href={`/projects/${project.slug}`} className="block">
                    <div
                      className="glass rounded-xl p-5 hover:border-[rgba(56,189,248,0.25)] transition-all duration-200 group relative overflow-hidden"
                    >
                      <div
                        className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ background: accent }}
                      />
                      <div className="flex items-start justify-between mb-3 relative z-10">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className="text-[10px] font-mono px-2 py-0.5 rounded"
                            style={{
                              color: accent,
                              background: `${accent}12`,
                              border: `1px solid ${accent}25`,
                            }}
                          >
                            {categoryLabels[project.category]}
                          </span>
                          <StatusBadge status={project.status} />
                        </div>
                        <span className="text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors text-lg">
                          ↗
                        </span>
                      </div>
                      <h3 className="font-epilogue font-bold text-[var(--text)] mb-1 relative z-10">
                        {project.title}
                      </h3>
                      <p className="text-xs font-mono text-[var(--muted)] mb-3 relative z-10">
                        {project.subtitle}
                      </p>
                      <div className="flex flex-wrap gap-1.5 relative z-10">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono px-2 py-0.5 rounded text-[var(--muted)]"
                            style={{
                              background: "rgba(30, 45, 64, 0.5)",
                              border: "1px solid var(--border)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                        {project.dataGovernance && (
                          <span
                            className="text-[10px] font-mono px-2 py-0.5 rounded font-semibold"
                            style={{
                              color: "var(--accent3)",
                              background: "rgba(52,211,153,0.1)",
                              border: "1px solid rgba(52,211,153,0.25)",
                            }}
                          >
                            ✓ Gouvernance
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-sm font-mono text-[var(--muted)]">
              Aucun projet dans cette catégorie.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
