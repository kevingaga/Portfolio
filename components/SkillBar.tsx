"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type SkillBarProps = {
  name: string;
  level: number;
};

function getBarColor(level: number): string {
  if (level >= 90) return "var(--accent3)";
  if (level >= 80) return "var(--accent)";
  if (level >= 70) return "var(--accent2)";
  return "var(--muted)";
}

export default function SkillBar({ name, level }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const color = getBarColor(level);
  const { t } = useLanguage();

  function getLevelLabel(l: number): string {
    const s = t.skill_levels;
    if (l >= 90) return s.expert;
    if (l >= 80) return s.advanced;
    if (l >= 70) return s.proficient;
    if (l >= 60) return s.intermediate;
    return s.beginner;
  }

  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-mono text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200">
          {name}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[var(--muted)]">
            {getLevelLabel(level)}
          </span>
          <span
            className="text-xs font-mono font-semibold tabular-nums"
            style={{ color }}
          >
            {level}%
          </span>
        </div>
      </div>
      {/* Track */}
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ background: "rgba(30, 45, 64, 0.8)" }}
      >
        <motion.div
          className="h-full rounded-full"
          initial={{ width: "0%" }}
          animate={isInView ? { width: `${level}%` } : { width: "0%" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          style={{
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            boxShadow: `0 0 10px ${color}40`,
          }}
        />
      </div>
    </div>
  );
}
