"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { profile } from "@/data/profile";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type Experience = (typeof profile.experiences)[number];

function TimelineItem({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="relative pl-8 pb-8 last:pb-0 group"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-[var(--border)] group-last:hidden" />

      {/* Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
        className="absolute left-0 top-1.5 w-2 h-2 rounded-full -translate-x-[calc(50%-0.5px)] border-2 border-[var(--accent)] bg-[var(--bg)]"
        style={{ boxShadow: "0 0 8px rgba(56,189,248,0.4)" }}
      />

      {/* Content */}
      <div className="glass rounded-xl p-5 hover:border-[rgba(56,189,248,0.2)] transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
          <div>
            <h3 className="font-epilogue font-semibold text-[var(--text)] text-sm leading-tight mb-1">
              {experience.title}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-mono font-medium text-[var(--accent)]">
                {experience.company}
              </span>
              <span className="text-[var(--border)]">·</span>
              <span className="text-xs font-mono text-[var(--muted)]">
                {experience.location}
              </span>
            </div>
          </div>
          <span
            className="text-xs font-mono px-3 py-1 rounded-full flex-shrink-0 self-start"
            style={{
              background: "rgba(56, 189, 248, 0.08)",
              color: "var(--muted)",
              border: "1px solid rgba(56, 189, 248, 0.15)",
            }}
          >
            {experience.period}
          </span>
        </div>

        <ul className="space-y-1.5">
          {experience.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-2 text-xs font-mono text-[var(--muted)] leading-relaxed">
              <span className="text-[var(--accent3)] flex-shrink-0 mt-0.5">▸</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function ExperienceTimeline() {
  const { t } = useLanguage();

  return (
    <div className="relative">
      {profile.experiences.map((exp, index) => (
        <TimelineItem key={index} experience={exp} index={index} />
      ))}

      {/* Education entry */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: profile.experiences.length * 0.1 }}
        className="relative pl-8 group"
      >
        <div
          className="absolute left-0 top-1.5 w-2 h-2 rounded-full -translate-x-[calc(50%-0.5px)] border-2 border-[var(--accent2)] bg-[var(--bg)]"
          style={{ boxShadow: "0 0 8px rgba(129,140,248,0.4)" }}
        />
        <div className="glass rounded-xl p-5 hover:border-[rgba(129,140,248,0.2)] transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <h3 className="font-epilogue font-semibold text-[var(--text)] text-sm leading-tight mb-1">
                {t.about.education_title}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono font-medium text-[var(--accent2)]">
                  {t.about.education_school}
                </span>
                <span className="text-[var(--border)]">·</span>
                <span className="text-xs font-mono text-[var(--muted)]">
                  {t.about.education_location}
                </span>
              </div>
            </div>
            <span
              className="text-xs font-mono px-3 py-1 rounded-full flex-shrink-0 self-start"
              style={{
                background: "rgba(129, 140, 248, 0.08)",
                color: "var(--muted)",
                border: "1px solid rgba(129, 140, 248, 0.15)",
              }}
            >
              2019 — 2021
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
