"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type DataGovernanceData = {
  lineage?: string;
  freshness?: string;
  quality?: string;
  documentation?: string;
  monitoring?: string;
};

type DataGovernanceBadgeProps = {
  data: DataGovernanceData;
  variant?: "full" | "compact";
};

const governanceKeys = ["lineage", "freshness", "quality", "documentation", "monitoring"] as const;
const governanceIcons: Record<string, string> = {
  lineage: "⟶",
  freshness: "⟳",
  quality: "✓",
  documentation: "⊡",
  monitoring: "◎",
};

export default function DataGovernanceBadge({
  data,
  variant = "compact",
}: DataGovernanceBadgeProps) {
  const { t } = useLanguage();
  const g = t.governance;

  const presentKeys = governanceKeys.filter((k) => data[k]);

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-widest"
          style={{
            background: "rgba(52, 211, 153, 0.12)",
            color: "var(--accent3)",
            border: "1px solid rgba(52, 211, 153, 0.3)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent3)] animate-pulse" />
          {g.label}
        </span>
        <div className="flex items-center gap-1">
          {presentKeys.map((key) => (
            <span
              key={key}
              title={g.items[key]}
              className="text-[10px] font-mono px-1.5 py-0.5 rounded text-[var(--accent3)]"
              style={{
                background: "rgba(52, 211, 153, 0.08)",
                border: "1px solid rgba(52, 211, 153, 0.2)",
              }}
            >
              {governanceIcons[key]}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl overflow-hidden"
      style={{
        background: "rgba(52, 211, 153, 0.04)",
        border: "1px solid rgba(52, 211, 153, 0.25)",
        boxShadow: "0 0 30px rgba(52, 211, 153, 0.05)",
      }}
    >
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{
          background: "rgba(52, 211, 153, 0.08)",
          borderBottom: "1px solid rgba(52, 211, 153, 0.15)",
        }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
          style={{ background: "rgba(52, 211, 153, 0.15)" }}
        >
          🛡
        </div>
        <div>
          <h3
            className="text-xs font-mono font-bold uppercase tracking-widest"
            style={{ color: "var(--accent3)" }}
          >
            {g.label}
          </h3>
          <p className="text-xs text-[var(--muted)] font-mono mt-0.5">
            {g.dimensions(presentKeys.length)}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[var(--accent3)] animate-pulse" />
          <span
            className="text-[10px] font-mono font-semibold uppercase tracking-widest"
            style={{ color: "var(--accent3)" }}
          >
            {g.active}
          </span>
        </div>
      </div>

      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {governanceKeys.map((key, index) => {
          const value = data[key];
          if (!value) return null;
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className="flex items-start gap-3 p-3 rounded-lg"
              style={{ background: "rgba(52, 211, 153, 0.04)" }}
            >
              <div
                className="w-6 h-6 rounded flex items-center justify-center text-sm flex-shrink-0 mt-0.5"
                style={{
                  background: "rgba(52, 211, 153, 0.15)",
                  color: "var(--accent3)",
                  fontFamily: "monospace",
                }}
              >
                {governanceIcons[key]}
              </div>
              <div>
                <p
                  className="text-xs font-mono font-semibold uppercase tracking-wider mb-1"
                  style={{ color: "var(--accent3)" }}
                >
                  {g.items[key]}
                </p>
                <p className="text-xs font-mono text-[var(--muted)] leading-relaxed">
                  {value}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
