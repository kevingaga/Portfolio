export type Project = {
  slug: string;
  priority: number;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  status: "deployed" | "wip" | "archived";
  year: string;
  description: string;
  context: string;
  solution: string;
  dataGovernance?: {
    lineage?: string;
    freshness?: string;
    quality?: string;
    documentation?: string;
    monitoring?: string;
  };
  challenges: string[];
  results: string[];
  stack: { name: string; role: string }[];
  demoUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "dashboard-data-gouvernance",
    priority: 1,
    title: "Dashboard Gouvernance Data",
    subtitle: "Open Data · data.gouv.fr",
    category: "Data & Visualisation",
    tags: ["Next.js", "Python", "ECharts", "ETL", "PostgreSQL"],
    status: "deployed",
    year: "2025",
    description:
      "Tableau de bord interactif exploitant des datasets open data pour visualiser et piloter la qualité des données. Conçu pour démontrer une approche de gouvernance : traçabilité, fraîcheur, complétude.",
    context:
      "Les données publiques sont riches mais inexploitables sans pipeline structuré. L'objectif : construire un système de bout en bout qui illustre les principes de gouvernance data — pas seulement la visualisation, mais la fiabilité et la traçabilité.",
    solution:
      "Pipeline ETL Python (Pandas) qui ingère, nettoie et valide les données chaque semaine via GitHub Actions. API Next.js pour servir les données. Frontend avec ECharts pour cartes choroplèthes et séries temporelles. Dashboard de monitoring de la qualité des données inclus.",
    dataGovernance: {
      lineage: "Traçabilité complète source → transformation → output",
      freshness: "Refresh automatique hebdomadaire (cron GitHub Actions)",
      quality: "Score de complétude et de cohérence calculé à chaque ingestion",
      documentation: "Dictionnaire de données auto-généré",
    },
    challenges: [
      "Nettoyage de datasets hétérogènes (formats changeants entre millésimes)",
      "Carte SVG France choroplèthe avec données dynamiques par département",
      "Agrégation de 500k+ lignes en < 200ms (PostgreSQL + index)",
      "Scheduling ETL robuste avec alerting en cas d'échec",
    ],
    results: [
      "500k+ lignes traitées",
      "Refresh hebdo automatique",
      "< 200ms queries",
      "Score qualité data affiché",
    ],
    stack: [
      { name: "Next.js 14", role: "Frontend" },
      { name: "Python + Pandas", role: "ETL" },
      { name: "PostgreSQL", role: "Stockage" },
      { name: "ECharts", role: "Visualisation" },
      { name: "GitHub Actions", role: "Scheduling" },
    ],
  },
  {
    slug: "pipeline-sanofi-like",
    priority: 2,
    title: "Pipeline Qualité Industrielle",
    subtitle: "Reproduction projet Sanofi — données fictives",
    category: "Data Engineering",
    tags: ["Python", "Power BI", "Pandas", "ETL", "Manufacturing"],
    status: "deployed",
    year: "2025",
    description:
      "Reproduction pédagogique du pipeline data construit chez Sanofi : extraction d'exceptions qualité sur plusieurs sites industriels, nettoyage, visualisation à destination du management.",
    context:
      "Chez Sanofi, j'ai construit en autonomie un pipeline data couvrant 4+ sites industriels (France, Belgique, Canada). Ce projet en reproduit la structure avec des données fictives réalistes pour démontrer la méthodologie.",
    solution:
      "Script Python d'extraction et nettoyage (données CSV simulées multi-sites). Transformations Pandas avec règles de validation. Dashboard Power BI embarqué (iframe) + version Next.js. Documentation complète du pipeline.",
    dataGovernance: {
      lineage: "Multi-sources → normalisation → output unique",
      quality: "Règles de validation par type d'exception",
      documentation: "README pipeline + dictionnaire données",
    },
    challenges: [
      "Normalisation de données hétérogènes issues de 4 contextes industriels différents",
      "Règles de validation métier spécifiques à la qualité pharmaceutique",
      "Visualisation adaptée au niveau C-Suite (clarté > exhaustivité)",
      "Reproductibilité : pipeline documenté, exécutable en 1 commande",
    ],
    results: [
      "4 sites simulés",
      "Pipeline documenté",
      "Prêt à présenter en entretien",
    ],
    stack: [
      { name: "Python 3.12", role: "Core" },
      { name: "Pandas", role: "Transformation" },
      { name: "Power BI", role: "Viz C-level" },
      { name: "Next.js", role: "Frontend" },
    ],
  },
  {
    slug: "agent-rpa-automatisation",
    priority: 3,
    title: "Agent RPA — Automatisation Web",
    subtitle: "Python · Playwright · Scheduling",
    category: "Automatisation & IA",
    tags: ["Python", "Playwright", "RPA", "Scheduling", "Logs"],
    status: "deployed",
    year: "2025",
    description:
      "Agent d'automatisation de tâches répétitives en environnement web : login, navigation, extraction de données structurées, export CSV. Robuste, loggué, schedulé.",
    context:
      "Tâche manuelle chronophage : copier des données depuis un portail web vers un tableur de suivi, chaque semaine. L'automatisation RPA divise ce temps par 10 et élimine les erreurs de saisie.",
    solution:
      "Bot Playwright qui s'authentifie, navigue, extrait et structure les données. Gestion des erreurs, retry automatique, logs structurés (Loguru). Scheduling via cron. Dashboard de monitoring des exécutions.",
    dataGovernance: {
      lineage: "Source web → extraction → validation → export structuré",
      quality: "Validation des données extraites avant export",
      monitoring: "Dashboard logs : succès/échecs, dernière exécution, alerting",
    },
    challenges: [
      "Gestion des sessions et re-login automatique",
      "Sélecteurs robustes résistants aux mises à jour UI",
      "Rate limiting et comportement respectueux du serveur cible",
      "Dashboard de monitoring : succès/échecs, last run, alerting",
    ],
    results: [
      "~2h/semaine économisées",
      "0 erreur de saisie",
      "99% uptime",
      "Logs complets",
    ],
    stack: [
      { name: "Python 3.12", role: "Core" },
      { name: "Playwright", role: "Automatisation" },
      { name: "Loguru", role: "Logs" },
      { name: "Cron", role: "Scheduling" },
    ],
  },
  {
    slug: "bluebiz-replica",
    priority: 4,
    title: "Moteur d'Éligibilité Corporate",
    subtitle: "Reproduction logique BlueBiz — Air France",
    category: "Applications Métier",
    tags: ["Java", "Next.js", "Business Logic", "Testing"],
    status: "deployed",
    year: "2025",
    description:
      "Reproduction pédagogique du moteur d'éligibilité corporate de la plateforme BlueBiz (Air France) : logique de seuils de dépenses, gestion multi-partenaires, traduction fonctionnel → technique.",
    context:
      "Chez Air France, j'ai travaillé sur la logique d'éligibilité de BlueBiz (seuil €5 000/an par entreprise, 8 compagnies partenaires). Ce projet illustre ma capacité à modéliser et implémenter des règles métier complexes.",
    solution:
      "Moteur de règles en Java (spring-like) + interface Next.js pour tester les scénarios d'éligibilité. Documentation fonctionnelle → technique incluse. Tests unitaires couvrant les cas limites.",
    challenges: [
      "Modélisation des règles métier multi-partenaires (8 compagnies, règles d'agrégation)",
      "Gestion des cas limites (entreprises à cheval sur plusieurs exercices fiscaux)",
      "Documentation du pont fonctionnel/technique",
      "Interface de test visuelle pour valider les scénarios",
    ],
    results: [
      "Logique métier documentée",
      "Tests unitaires",
      "Interface démo interactive",
    ],
    stack: [
      { name: "Java", role: "Business Logic" },
      { name: "Next.js", role: "Interface démo" },
      { name: "JUnit", role: "Tests" },
    ],
  },
  {
    slug: "clash-game",
    priority: 5,
    title: "Clash Game",
    subtitle: "Idle Tower Defense — React · Vite",
    category: "Jeux",
    tags: ["React", "Vite", "Game Loop", "requestAnimationFrame", "SVG"],
    status: "wip",
    year: "2025",
    description:
      "Jeu idle tower defense en React : un axolotl archer défend son château contre des vagues de squelettes. Game loop à 60fps via requestAnimationFrame, système d'upgrades, format mobile paysage.",
    context:
      "Projet de game dev expérimental pour explorer les mécaniques de jeu idle en React pur — sans moteur, sans canvas. Objectif : boucle de gameplay fluide à 60fps, layout mobile-first.",
    solution:
      "Architecture basée sur des refs React pour le state temps-réel (évite les re-renders du game loop), rendu SVG pour les personnages, positionnement en coordonnées virtuelles (800 unités) converties en %. Upgrades avec coûts exponentiels.",
    challenges: [
      "Game loop à 60fps sans canvas — requestAnimationFrame + refs mutables",
      "Positionnement responsive : système de coordonnées virtuelles → %",
      "Gestion des collisions arrow/ennemi dans un rendu React",
      "Layout plein-écran mobile paysage (100dvw × 100dvh)",
    ],
    results: [
      "60fps stable",
      "4 upgrades actives",
      "Format mobile paysage",
      "Axolotl SVG custom",
    ],
    stack: [
      { name: "React 19", role: "UI + Game Loop" },
      { name: "Vite", role: "Build" },
      { name: "SVG", role: "Sprites" },
      { name: "requestAnimationFrame", role: "60fps loop" },
    ],
    demoUrl: "https://clash-game-kevingaga-2956s-projects.vercel.app",
    githubUrl: "https://github.com/kevingaga/clash-game",
  },
];
