"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Project } from "@/data/projects";
import StatBox from "./StatBox";
import DataGovernanceBadge from "./DataGovernanceBadge";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type ProjectDetailProps = {
  project: Project;
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

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const accentColor = getCategoryAccent(project.category);
  const { t } = useLanguage();
  const pd = t.project_detail;

  const statusMap = {
    deployed: { label: t.status.deployed, className: "badge-deployed" },
    wip: { label: t.status.wip, className: "badge-wip" },
    archived: { label: t.status.archived, className: "badge-archived" },
  };
  const { label: statusLabel, className: statusClass } = statusMap[project.status];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 mb-8 text-xs font-mono text-[var(--muted)]"
        >
          <Link href="/" className="hover:text-[var(--accent)] transition-colors">
            {pd.home}
          </Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-[var(--accent)] transition-colors">
            {pd.projects}
          </Link>
          <span>/</span>
          <span className="text-[var(--text)]">{project.title}</span>
        </motion.div>

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span
              className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded"
              style={{
                color: accentColor,
                background: `${accentColor}18`,
                border: `1px solid ${accentColor}30`,
              }}
            >
              {project.category}
            </span>
            <span className={`text-xs font-mono font-semibold uppercase tracking-widest px-3 py-1 rounded-full ${statusClass}`}>
              {statusLabel}
            </span>
            <span className="text-xs font-mono text-[var(--muted)]">
              {project.year}
            </span>
          </div>

          <h1 className="font-epilogue font-black text-3xl sm:text-4xl lg:text-5xl text-[var(--text)] leading-tight mb-3">
            {project.title}
          </h1>
          <p className="text-base font-mono text-[var(--muted)] mb-5">
            {project.subtitle}
          </p>
          <p
            className="text-lg font-mono leading-relaxed max-w-3xl"
            style={{ color: "rgba(226, 232, 240, 0.7)" }}
          >
            {project.description}
          </p>
        </motion.div>

        {/* Results Row */}
        {project.results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`grid grid-cols-2 ${project.results.length >= 4 ? "lg:grid-cols-4" : `lg:grid-cols-${project.results.length}`} gap-4 mb-12`}
          >
            {project.results.map((result, i) => (
              <StatBox key={i} value={result} label="" />
            ))}
          </motion.div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Content (2/3) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Context */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass rounded-xl p-6"
            >
              <h2 className="font-epilogue font-bold text-lg text-[var(--text)] mb-4 flex items-center gap-2">
                <span style={{ color: accentColor }}>◆</span> {pd.context}
              </h2>
              <p className="text-sm font-mono text-[var(--muted)] leading-relaxed">
                {project.context}
              </p>
            </motion.section>

            {/* Solution */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="glass rounded-xl p-6"
            >
              <h2 className="font-epilogue font-bold text-lg text-[var(--text)] mb-4 flex items-center gap-2">
                <span style={{ color: accentColor }}>◆</span> {pd.solution}
              </h2>
              <p className="text-sm font-mono text-[var(--muted)] leading-relaxed">
                {project.solution}
              </p>
            </motion.section>

            {/* Data Governance */}
            {project.dataGovernance && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="font-epilogue font-bold text-lg text-[var(--text)] mb-4 flex items-center gap-2">
                  <span className="text-[var(--accent3)]">◆</span>{" "}
                  {t.governance.label}
                </h2>
                <DataGovernanceBadge data={project.dataGovernance} variant="full" />
              </motion.section>
            )}

            {/* Challenges */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="glass rounded-xl p-6"
            >
              <h2 className="font-epilogue font-bold text-lg text-[var(--text)] mb-4 flex items-center gap-2">
                <span style={{ color: accentColor }}>◆</span> {pd.challenges}
              </h2>
              <ul className="space-y-3">
                {project.challenges.map((challenge, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    className="flex items-start gap-3 text-sm font-mono text-[var(--muted)] leading-relaxed"
                  >
                    <span className="flex-shrink-0 mt-0.5 font-bold" style={{ color: accentColor }}>
                      ▸
                    </span>
                    {challenge}
                  </motion.li>
                ))}
              </ul>
            </motion.section>
          </div>

          {/* Right: Sidebar (1/3) */}
          <div className="space-y-6">
            {/* Stack */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass rounded-xl p-6"
            >
              <h3 className="font-epilogue font-bold text-sm text-[var(--text)] mb-4 uppercase tracking-widest">
                {pd.stack}
              </h3>
              <div className="space-y-2.5">
                {project.stack.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2.5 border-b border-[var(--border)] last:border-0"
                  >
                    <span className="text-sm font-mono text-[var(--text)] font-medium">
                      {item.name}
                    </span>
                    <span
                      className="text-xs font-mono px-2 py-0.5 rounded"
                      style={{
                        color: accentColor,
                        background: `${accentColor}12`,
                        border: `1px solid ${accentColor}25`,
                      }}
                    >
                      {item.role}
                    </span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-3"
            >
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-mono font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: `${accentColor}18`,
                    border: `1px solid ${accentColor}40`,
                    color: accentColor,
                    boxShadow: `0 4px 20px ${accentColor}15`,
                  }}
                >
                  <span>↗</span> {pd.view_demo}
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-mono font-semibold text-sm text-[var(--muted)] hover:text-[var(--text)] transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "rgba(30, 45, 64, 0.4)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <span>⌥</span> {pd.source_code}
                </a>
              )}
              <Link
                href="/projects"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-mono text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200"
              >
                {pd.all_projects}
              </Link>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="glass rounded-xl p-5"
            >
              <h3 className="font-epilogue font-bold text-xs text-[var(--muted)] mb-3 uppercase tracking-widest">
                {pd.technologies}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-2.5 py-1 rounded-full text-[var(--muted)]"
                    style={{
                      background: "rgba(30, 45, 64, 0.6)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
