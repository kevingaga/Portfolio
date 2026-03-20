import Link from "next/link";
import { profile } from "@/data/profile";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] flex items-center justify-center font-epilogue font-black text-xs text-[var(--bg)]">
                GL
              </div>
              <span className="font-epilogue font-semibold text-[var(--text)]">
                Gwenaël LIGER
              </span>
            </div>
            <p className="text-sm text-[var(--muted)] font-mono leading-relaxed">
              Data Analyst · Gouvernance · Automatisation
            </p>
            <p className="text-xs text-[var(--muted)] font-mono mt-1">
              {profile.location}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest mb-3">
              Navigation
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { href: "/", label: "Accueil" },
                { href: "/projects", label: "Projets" },
                { href: "/about", label: "À Propos" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors duration-200 w-fit underline-accent"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest mb-3">
              Contact
            </h3>
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${profile.email}`}
                className="text-sm font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors duration-200 w-fit underline-accent"
              >
                {profile.email}
              </a>
              <a
                href={`https://${profile.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono text-[var(--muted)] hover:text-[var(--accent2)] transition-colors duration-200 w-fit underline-accent"
              >
                LinkedIn ↗
              </a>
              <a
                href={`https://${profile.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono text-[var(--muted)] hover:text-[var(--accent3)] transition-colors duration-200 w-fit underline-accent"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-mono text-[var(--muted)]">
            © {year} Gwenaël LIGER — Tous droits réservés
          </p>
          <p className="text-xs font-mono text-[var(--muted)]">
            Construit avec{" "}
            <span className="text-[var(--accent)]">Next.js 14</span> ·{" "}
            <span className="text-[var(--accent2)]">Tailwind CSS</span> ·{" "}
            <span className="text-[var(--accent3)]">Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
