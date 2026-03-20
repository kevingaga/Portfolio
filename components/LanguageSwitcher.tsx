"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className="flex items-center gap-0.5 rounded-lg p-0.5"
      style={{
        background: "rgba(30, 45, 64, 0.5)",
        border: "1px solid var(--border)",
      }}
    >
      {(["en", "fr"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className="px-2.5 py-1 rounded text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-200"
          style={{
            color: lang === l ? "var(--bg)" : "var(--muted)",
            background:
              lang === l
                ? "var(--accent)"
                : "transparent",
          }}
          aria-label={`Switch to ${l === "en" ? "English" : "French"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
