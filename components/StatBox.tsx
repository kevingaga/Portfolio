"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type StatBoxProps = {
  value: string;
  label: string;
};

function extractNumber(value: string): { prefix: string; number: number; suffix: string } | null {
  const match = value.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  return {
    prefix: match[1] || "",
    number: parseFloat(match[2]),
    suffix: match[3] || "",
  };
}

export default function StatBox({ value, label }: StatBoxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(value);

  const parsed = extractNumber(value);

  useEffect(() => {
    if (!isInView || !parsed) return;

    const start = 0;
    const end = parsed.number;
    const duration = 1500;
    const startTime = performance.now();

    const isInteger = Number.isInteger(end);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;
      const formatted = isInteger
        ? Math.round(current).toString()
        : current.toFixed(1);
      setDisplayValue(`${parsed.prefix}${formatted}${parsed.suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={ref}
      className="glass rounded-xl p-5 text-center group hover:border-[rgba(56,189,248,0.3)] transition-all duration-300"
      style={{
        boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
      }}
    >
      <p
        className="text-2xl sm:text-3xl font-epilogue font-black mb-2 gradient-text leading-none"
        style={{
          textShadow: "0 0 30px rgba(56,189,248,0.3)",
        }}
      >
        {displayValue}
      </p>
      <p className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest leading-tight">
        {label}
      </p>
    </div>
  );
}
