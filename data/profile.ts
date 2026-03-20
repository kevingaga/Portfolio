export const profile = {
  name: "Gwenaël LIGER",
  title: "Data Analyst",
  tagline: "Every new horizon carries the breath of possibilities.",
  location: "Blagnac, France",
  email: "gwenael.liger@gmail.com",
  phone: "+33 6 78 26 39 15",
  linkedin: "www.linkedin.com/in/gwenaël-liger-217a2a1a4",
  github: "github.com/gwenael-liger",

  languages: [
    { lang: "Français", level: { en: "Native", fr: "Natif" } },
    { lang: "English",  level: { en: "Advanced (C1)", fr: "Avancé (C1)" } },
    { lang: "Español",  level: { en: "Intermediate (B2)", fr: "Intermédiaire (B2)" } },
  ],

  interests: {
    en: [
      "Data Governance",
      "AI-assisted automation",
      "Game Design",
      "D&D",
      "Neuroscience & cognitive science",
      "Poetry",
      "Rock",
    ],
    fr: [
      "Gouvernance data",
      "AI-assisted automation",
      "Game Design",
      "D&D",
      "Neurosciences & sciences cognitives",
      "Poésie",
      "Rock",
    ],
  },

  skills: [
    { name: "Python / Pandas",   level: 90 },
    { name: "SQL / PostgreSQL",  level: 85 },
    { name: "Power BI / ECharts",level: 85 },
    { name: "Next.js / React",   level: 75 },
    { name: "Java",              level: 70 },
    { name: "Playwright / RPA",  level: 70 },
    { name: { en: "Data Governance", fr: "Gouvernance Data" }, level: 80 },
  ],

  experiences: [
    {
      title: "Business Analyst / Java Developer (Hybrid)",
      company: "Air France",
      location: "Toulouse, France",
      period: "2023 — 2025",
      highlights: {
        en: [
          "BlueBiz corporate loyalty platform — 8 partner airlines (Delta, KLM, Virgin Atlantic)",
          "Eligibility logic based on spending thresholds (€5,000/year per company)",
          "Business/tech bridge in a ~10-person team",
          "Translation of functional requirements into actionable technical specifications",
        ],
        fr: [
          "Plateforme de fidélité corporate BlueBiz — 8 compagnies partenaires (Delta, KLM, Virgin Atlantic)",
          "Logique d'éligibilité basée sur des seuils de dépenses (€5 000/an par entreprise)",
          "Pont business/tech dans une équipe ~10 personnes",
          "Traduction des exigences fonctionnelles en spécifications techniques actionnables",
        ],
      },
    },
    {
      title: "SAP Support Analyst",
      company: "Decathlon",
      location: "Lille, France",
      period: "2022 — 2023",
      highlights: {
        en: [
          "20+ SAP Level 2 incidents managed per week (root cause → resolution)",
          "Automated monitoring dashboards for system KPI tracking",
          "SAP data extraction and analysis to visualize system behavior",
        ],
        fr: [
          "20+ incidents SAP Level 2 gérés par semaine (root cause → résolution)",
          "Dashboards de monitoring automatisés pour le suivi des KPIs système",
          "Extraction et analyse de données SAP pour visualiser le comportement système",
        ],
      },
    },
    {
      title: "Data Analyst / Coordination (Manufacturing & Quality)",
      company: "Sanofi",
      location: "Bordeaux, France",
      period: "2021 — 2022",
      highlights: {
        en: [
          "Quality data extraction and cleaning across 4+ industrial sites (France, Belgium, Canada)",
          "Power BI dashboards presented at C-Suite level (IT Director, Head of Digital Manufacturing)",
          "Full autonomous data pipeline: extraction → cleaning → visualization",
          "Python scripts for data extraction, cleaning and preparation",
        ],
        fr: [
          "Extraction et nettoyage de données qualité sur 4+ sites industriels (France, Belgique, Canada)",
          "Dashboards Power BI présentés au niveau C-Suite (IT Director, Head of Digital Manufacturing)",
          "Pipeline data complet en autonomie : extraction → nettoyage → visualisation",
          "Scripts Python pour extraction, nettoyage et préparation des données",
        ],
      },
    },
  ],
};

export type Lang = "en" | "fr";
