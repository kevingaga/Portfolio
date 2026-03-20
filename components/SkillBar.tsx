"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type SkillBarProps = {
  name: string;
  level: number;
};

function getLevelLabel(level: number): string {
  if (level >= 90) return "Expert";
  if (level >= 80) return "Avancé";
  if (level >= 70) return "Maîtrisé";
  if (level >= 60) return "Intermédiaire";
  return "Notions";
}

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

  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-1.5">
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
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: "rgba(30, 45, 64, 0.8)" }}
      >
        <motion.div
          className="h-full rounded-full origin-left"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          style={{
            width: `${level}%`,
            background: `linear-gradient(90deg, ${color}cc, ${color})`,
            boxShadow: `0 0 10px ${color}40`,
          }}
        />
      </div>
    </div>
  );
}
