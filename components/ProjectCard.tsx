"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Project } from "@/data/projects";
import DataGovernanceBadge from "./DataGovernanceBadge";

type ProjectCardProps = {
  project: Project;
  index?: number;
};

function getCategoryAccent(category: string): string {
  switch (category) {
    case "Data & Visualisation":
      return "var(--accent)";
    case "Data Engineering":
      return "var(--accent2)";
    case "Automatisation & IA":
      return "var(--accent3)";
    case "Applications Métier":
      return "#f59e0b";
    default:
      return "var(--accent)";
  }
}

function getCategoryLabel(category: string): string {
  switch (category) {
    case "Data & Visualisation":
      return "Data & Viz";
    case "Data Engineering":
      return "Data Eng";
    case "Automatisation & IA":
      return "RPA / IA";
    case "Applications Métier":
      return "Métier";
    default:
      return category;
  }
}

function StatusBadge({ status }: { status: Project["status"] }) {
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

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const accentColor = getCategoryAccent(project.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link href={`/projects/${project.slug}`} className="block h-full group">
        <div
          className="h-full glass rounded-xl overflow-hidden relative transition-all duration-300 hover:-translate-y-1"
          style={{
            boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
          }}
        >
          {/* Left border accent line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{ background: accentColor }}
          />

          {/* Card glow on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
            style={{
              boxShadow: `inset 0 0 40px ${accentColor}08`,
            }}
          />

          <div className="p-6 flex flex-col h-full relative z-10">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span
                    className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded"
                    style={{
                      color: accentColor,
                      background: `${accentColor}18`,
                      border: `1px solid ${accentColor}30`,
                    }}
                  >
                    {getCategoryLabel(project.category)}
                  </span>
                  <StatusBadge status={project.status} />
                  <span className="text-[10px] font-mono text-[var(--muted)]">
                    {project.year}
                  </span>
                </div>
                <h3 className="font-epilogue font-bold text-[var(--text)] text-lg leading-tight group-hover:text-white transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-[var(--muted)] mt-1">
                  {project.subtitle}
                </p>
              </div>

              {/* Arrow */}
              <motion.span
                className="text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors duration-200 text-xl flex-shrink-0 mt-1"
                animate={{ x: 0, y: 0 }}
                whileHover={{ x: 2, y: -2 }}
              >
                ↗
              </motion.span>
            </div>

            {/* Description */}
            <p className="text-sm font-mono text-[var(--muted)] leading-relaxed mb-4 flex-1">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono px-2 py-0.5 rounded text-[var(--muted)]"
                  style={{
                    background: "rgba(30, 45, 64, 0.6)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Governance Badge */}
            {project.dataGovernance && (
              <DataGovernanceBadge
                data={project.dataGovernance}
                variant="compact"
              />
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
