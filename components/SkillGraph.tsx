"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { profile } from "@/data/profile";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type Category = "data" | "dev" | "automation";

const CATEGORY_META: Record<Category, { color: string; glow: string }> = {
  data: { color: "var(--accent)", glow: "rgba(56, 189, 248, 0.45)" },
  dev: { color: "var(--accent2)", glow: "rgba(129, 140, 248, 0.45)" },
  automation: { color: "var(--accent3)", glow: "rgba(52, 211, 153, 0.45)" },
};

// Node positions, in % of the canvas. Indices match profile.skills:
// 0 Python · 1 SQL · 2 Power BI · 3 Next.js · 4 Java · 5 Playwright/RPA · 6 Governance
const LAYOUT: { x: number; y: number }[] = [
  { x: 23, y: 22 }, // Python
  { x: 27, y: 54 }, // SQL
  { x: 22, y: 84 }, // Power BI
  { x: 83, y: 26 }, // Next.js
  { x: 88, y: 60 }, // Java
  { x: 50, y: 83 }, // Playwright / RPA
  { x: 55, y: 45 }, // Data Governance (central hub)
];

// Connections = how the skills are actually used together in real workflows.
const EDGES: [number, number][] = [
  [0, 1], // Python ↔ SQL — extraction + transformation
  [1, 2], // SQL ↔ Power BI — queries feed dashboards
  [0, 2], // Python ↔ Power BI — data prep → viz
  [0, 5], // Python ↔ Playwright/RPA — automation scripts
  [0, 6], // Python ↔ Governance — governed pipelines
  [1, 6], // SQL ↔ Governance — data quality & lineage
  [2, 6], // Power BI ↔ Governance — documented dashboards
  [5, 6], // RPA ↔ Governance — monitoring & lineage of extraction
  [0, 3], // Python ↔ Next.js — ETL output served by the app
  [3, 4], // Next.js ↔ Java — BlueBiz: Java logic + Next UI
];

// Level → bubble diameter (px). Levels cluster in 70–90, so amplify the band.
function bubbleSize(level: number): number {
  const min = 46;
  const max = 80;
  const clamped = Math.max(60, Math.min(95, level));
  return Math.round(min + ((clamped - 60) / 35) * (max - min));
}

export default function SkillGraph() {
  const { t, lang } = useLanguage();
  const categories = t.about.skill_categories;
  const skills = profile.skills as {
    name: string | { en: string; fr: string };
    level: number;
    category: Category;
  }[];

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [active, setActive] = useState<number | null>(null);

  const isEdgeActive = (a: number, b: number) =>
    active === null || active === a || active === b;

  return (
    <div ref={ref}>
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-6">
        {(Object.keys(CATEGORY_META) as Category[]).map((cat) => (
          <div key={cat} className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: CATEGORY_META[cat].color,
                boxShadow: `0 0 8px ${CATEGORY_META[cat].glow}`,
              }}
            />
            <span className="text-[11px] font-mono text-[var(--muted)] uppercase tracking-widest">
              {categories[cat]}
            </span>
          </div>
        ))}
      </div>

      {/* Graph canvas */}
      <div className="relative w-full h-[420px] sm:h-[460px]">
        {/* Edges */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="skill-edge"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2="100"
              y2="100"
            >
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="55%" stopColor="var(--accent2)" />
              <stop offset="100%" stopColor="var(--accent3)" />
            </linearGradient>
          </defs>
          {EDGES.map(([a, b], i) => {
            const pa = LAYOUT[a];
            const pb = LAYOUT[b];
            const on = isEdgeActive(a, b);
            return (
              <motion.line
                key={i}
                x1={pa.x}
                y1={pa.y}
                x2={pb.x}
                y2={pb.y}
                stroke="url(#skill-edge)"
                strokeWidth={active !== null && on ? 1.6 : 1}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                initial={{ opacity: 0 }}
                animate={
                  isInView
                    ? { opacity: on ? (active !== null ? 0.85 : 0.3) : 0.07 }
                    : { opacity: 0 }
                }
                transition={{ duration: 0.6, delay: 0.3 + i * 0.05 }}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {skills.map((skill, i) => {
          const pos = LAYOUT[i];
          const size = bubbleSize(skill.level);
          const { color, glow } = CATEGORY_META[skill.category];
          const name =
            typeof skill.name === "string" ? skill.name : skill.name[lang];
          const dimmed = active !== null && active !== i;

          return (
            <motion.div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${pos.x}%`, top: `${pos.y}%`, zIndex: dimmed ? 5 : 10 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={
                isInView
                  ? { opacity: dimmed ? 0.45 : 1, scale: 1 }
                  : { opacity: 0, scale: 0 }
              }
              transition={{
                duration: 0.5,
                delay: i * 0.07,
                type: "spring",
                bounce: 0.4,
              }}
              onHoverStart={() => setActive(i)}
              onHoverEnd={() => setActive(null)}
            >
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{
                  duration: 4 + i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.25,
                }}
                whileHover={{ scale: 1.12 }}
                className="relative rounded-full flex items-center justify-center cursor-default"
                style={{
                  width: size,
                  height: size,
                  background: `radial-gradient(circle at 35% 30%, ${color}40, ${color}12 70%)`,
                  border: `1.5px solid ${color}`,
                  boxShadow: `0 0 22px ${glow}, inset 0 1px 0 rgba(255,255,255,0.06)`,
                }}
              >
                <span
                  className="absolute inset-1.5 rounded-full opacity-40"
                  style={{ border: `1px solid ${color}66` }}
                />
              </motion.div>
              <span
                className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-mono text-center leading-tight"
                style={{
                  top: "100%",
                  marginTop: 6,
                  color: active === i ? color : "var(--muted)",
                }}
              >
                {name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
