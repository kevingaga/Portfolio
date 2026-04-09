export type Lang = "en" | "fr";

export const translations = {
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      about: "About",
      contact: "Contact",
    },
    hero: {
      label: "Data Analyst",
      headline_1: "Data Analyst —",
      headline_accent: "from raw data",
      headline_2: "to informed decisions",
      subtitle: "Data Governance · Automation · Visualization",
      subtitle_ex: "Ex",
      cta_projects: "View projects",
      cta_about: "Learn more",
      scroll: "Scroll",
    },
    floating: {
      last_mission: "Last position",
      stack: "Stack",
      availability: "Availability",
      availability_value: "Everywhere",
    },
    pillars: {
      section_label: "Expertise",
      section_title: "What I build",
      governance: {
        title: "Data Governance",
        description:
          "Traceable pipelines, measurable quality, reliable data end-to-end. Lineage, freshness, documentation — nothing left to chance.",
      },
      visualization: {
        title: "Visualization & Insights",
        description:
          "Dashboards readable at C-Suite level. Not charts for decoration — decisions made possible.",
      },
      automation: {
        title: "Automation",
        description:
          "RPA scripts, Python agents, reduction of repetitive manual tasks. Every hour saved is an hour reinvested.",
      },
    },
    projects_section: {
      label: "Portfolio",
      title: "Selected Projects",
      all: "All projects",
    },
    cta_section: {
      label: "Contact",
      title: "Let's work together",
      description:
        "Immediately available for data analytics, data governance, or automation missions. Based in Blagnac, open to remote.",
      linkedin: "LinkedIn",
    },
    projects_page: {
      label: "Portfolio",
      title: "Projects",
      description: (n: number) =>
        `${n} projects covering data governance, data engineering, automation and business applications.`,
      count: (n: number) => `${n} project${n > 1 ? "s" : ""}`,
      no_results: "No projects in this category.",
      table_headers: ["N°", "Title", "Category", "Tags", "Governance", "Status"],
      category_labels: {
        all: "All",
        "Data & Visualisation": "Data & Viz",
        "Data Engineering": "Data Engineering",
        "Automatisation & IA": "Automation",
        "Applications Métier": "Business Apps",
        "Jeux": "Jeux",
      },
    },
    status: {
      deployed: "Deployed",
      wip: "In progress",
      archived: "Archived",
    },
    governance: {
      label: "Data Governance",
      active: "Active",
      dimensions: (n: number) => `${n} dimension${n > 1 ? "s" : ""} covered`,
      items: {
        lineage: "Lineage",
        freshness: "Freshness",
        quality: "Quality",
        documentation: "Documentation",
        monitoring: "Monitoring",
      },
    },
    project_detail: {
      home: "Home",
      projects: "Projects",
      context: "Context",
      solution: "Solution",
      challenges: "Technical Challenges",
      stack: "Tech Stack",
      view_demo: "View demo",
      source_code: "Source code",
      all_projects: "← All projects",
      technologies: "Technologies",
    },
    about: {
      label: "About",
      page_title: "Gwenaël LIGER",
      headline_1: "Data Analyst.",
      headline_2: "Developer.",
      headline_3: "Complex systems explorer.",
      bio1: "Data Analyst with 4+ years of experience in demanding environments — from Air France's corporate loyalty platform to Sanofi's quality pipelines. I build end-to-end data systems: ingestion, cleaning, validation, visualization.",
      bio2: "My signature: data governance. Not just charts — traceable, documented, reliable data. Data without lineage is an opinion.",
      bio3: "A natural bridge between business and technical teams, I translate functional requirements into actionable specifications, and insights into decisions.",
      languages_label: "Languages",
      interests_label: "Interests",
      contact_label: "Contact",
      download_cv: "Download CV (PDF)",
      career_label: "Professional Background",
      skills_label: "Technical Skills",
      education_title: "Master — Business Intelligence & Management",
      education_school: "Université Champollion",
      education_location: "Albi, France",
    },
    skill_levels: {
      expert: "Expert",
      advanced: "Advanced",
      proficient: "Proficient",
      intermediate: "Intermediate",
      beginner: "Beginner",
    },
    footer: {
      tagline: "Data Analyst · Governance · Automation",
      navigation: "Navigation",
      contact: "Contact",
      rights: "All rights reserved",
      built_with: "Built with",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      projects: "Projets",
      about: "À Propos",
      contact: "Contact",
    },
    hero: {
      label: "Data Analyst",
      headline_1: "Data Analyst —",
      headline_accent: "de la donnée brute",
      headline_2: "aux décisions éclairées",
      subtitle: "Gouvernance data · Automatisation · Visualisation",
      subtitle_ex: "Ex",
      cta_projects: "Voir les projets",
      cta_about: "En savoir plus",
      scroll: "Scroll",
    },
    floating: {
      last_mission: "Dernière mission",
      stack: "Stack",
      availability: "Disponibilité",
      availability_value: "Everywhere",
    },
    pillars: {
      section_label: "Expertise",
      section_title: "Ce que je construis",
      governance: {
        title: "Gouvernance Data",
        description:
          "Pipelines traçables, qualité mesurable, données fiables de bout en bout. Lineage, fraîcheur, documentation — rien n'est laissé au hasard.",
      },
      visualization: {
        title: "Visualisation & Insights",
        description:
          "Dashboards lisibles au niveau C-Suite. Pas de graphiques pour faire joli — des décisions rendues possibles.",
      },
      automation: {
        title: "Automatisation",
        description:
          "Scripts RPA, agents Python, réduction des tâches manuelles répétitives. Chaque heure économisée est une heure réinvestie.",
      },
    },
    projects_section: {
      label: "Portfolio",
      title: "Projets sélectionnés",
      all: "Tous les projets",
    },
    cta_section: {
      label: "Contact",
      title: "Travaillons ensemble",
      description:
        "Disponible immédiatement pour des missions en data analytics, gouvernance data, ou automatisation. Basé à Blagnac, ouvert au remote.",
      linkedin: "LinkedIn",
    },
    projects_page: {
      label: "Portfolio",
      title: "Projets",
      description: (n: number) =>
        `${n} projets couvrant la gouvernance data, le data engineering, l'automatisation et les applications métier.`,
      count: (n: number) => `${n} projet${n > 1 ? "s" : ""}`,
      no_results: "Aucun projet dans cette catégorie.",
      table_headers: ["N°", "Titre", "Catégorie", "Tags", "Gouvernance", "Statut"],
      category_labels: {
        all: "Tous",
        "Data & Visualisation": "Data & Viz",
        "Data Engineering": "Data Engineering",
        "Automatisation & IA": "Automatisation",
        "Applications Métier": "Apps Métier",
        "Jeux": "Jeux",
      },
    },
    status: {
      deployed: "Déployé",
      wip: "En cours",
      archived: "Archivé",
    },
    governance: {
      label: "Gouvernance Data",
      active: "Actif",
      dimensions: (n: number) =>
        `${n} dimension${n > 1 ? "s" : ""} couverte${n > 1 ? "s" : ""}`,
      items: {
        lineage: "Lineage",
        freshness: "Fraîcheur",
        quality: "Qualité",
        documentation: "Documentation",
        monitoring: "Monitoring",
      },
    },
    project_detail: {
      home: "Accueil",
      projects: "Projets",
      context: "Contexte",
      solution: "Solution",
      challenges: "Défis techniques",
      stack: "Stack Technique",
      view_demo: "Voir la démo",
      source_code: "Code source",
      all_projects: "← Tous les projets",
      technologies: "Technologies",
    },
    about: {
      label: "À Propos",
      page_title: "Gwenaël LIGER",
      headline_1: "Analyste de données.",
      headline_2: "Développeur.",
      headline_3: "Explorateur de systèmes complexes.",
      bio1: "Data Analyst avec 4+ années d'expérience dans des environnements exigeants — de la plateforme de fidélité corporate d'Air France aux pipelines qualité de Sanofi. Je construis des systèmes data de bout en bout : ingestion, nettoyage, validation, visualisation.",
      bio2: "Ma signature : la gouvernance data. Pas seulement des graphiques — des données traçables, documentées, fiables. Une donnée sans lineage est une opinion.",
      bio3: "Pont naturel entre les équipes métier et techniques, je traduis les exigences fonctionnelles en spécifications actionnables, et les insights en décisions.",
      languages_label: "Langues",
      interests_label: "Intérêts",
      contact_label: "Contact",
      download_cv: "Télécharger le CV (PDF)",
      career_label: "Parcours professionnel",
      skills_label: "Compétences techniques",
      education_title: "Master — Intelligence Économique & Management",
      education_school: "Université Champollion",
      education_location: "Albi, France",
    },
    skill_levels: {
      expert: "Expert",
      advanced: "Avancé",
      proficient: "Maîtrisé",
      intermediate: "Intermédiaire",
      beginner: "Notions",
    },
    footer: {
      tagline: "Data Analyst · Gouvernance · Automatisation",
      navigation: "Navigation",
      contact: "Contact",
      rights: "Tous droits réservés",
      built_with: "Construit avec",
    },
  },
} as const;

export type Translations = (typeof translations)[Lang];
