"use client";

import { motion } from "framer-motion";

type FloatingCardProps = {
  title: string;
  value: string;
  icon: string;
  delay?: number;
};

export default function FloatingCard({
  title,
  value,
  icon,
  delay = 0,
}: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 5 + delay * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.3,
        }}
        className="glass rounded-xl p-5 hover:border-[rgba(56,189,248,0.3)] transition-all duration-300 group relative overflow-hidden"
        style={{
          boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.03) inset",
        }}
      >
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[rgba(56,189,248,0.03)] to-transparent rounded-xl pointer-events-none" />

        <div className="flex items-start gap-4 relative z-10">
          <div className="text-2xl leading-none mt-0.5 flex-shrink-0">{icon}</div>
          <div className="min-w-0">
            <p className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest mb-1.5">
              {title}
            </p>
            <p className="text-sm font-mono text-[var(--text)] font-medium leading-snug">
              {value}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
