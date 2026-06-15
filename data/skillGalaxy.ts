// ── Skill Galaxy data ──────────────────────────────────────────────
// A stellar map of skills: six clusters (families), each a coloured
// nebula of planets. Planet size = mastery, links = real connections.
// Ported & enriched from the standalone "galaxie des compétences" HTML.
// Levels: 0 interest · 1 beginner · 2 intermediate · 3 expert.

import type { Lang } from "@/lib/i18n/translations";

export type FamilyId = "data" | "ia" | "sat" | "dev" | "sys" | "metier";

export type Family = {
  id: FamilyId;
  name: { en: string; fr: string };
  color: string; // CSS colour for planets/links of this family
  glow: string; // rgba used for halos/shadows
};

export type GalaxyNode = {
  id: string;
  fam: FamilyId;
  lvl: 0 | 1 | 2 | 3;
  label: { en: string; fr: string };
  d: { en: string; fr: string };
};

// idA, idB, weight 0–1 (link strength → opacity/thickness)
export type GalaxyEdge = [string, string, number];

export const FAMILIES: Record<FamilyId, Family> = {
  data: {
    id: "data",
    name: { en: "Data & Analytics", fr: "Data & Analytics" },
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.45)",
  },
  ia: {
    id: "ia",
    name: { en: "AI & Knowledge", fr: "IA & Connaissance" },
    color: "#ff6ea9",
    glow: "rgba(255,110,169,0.45)",
  },
  sat: {
    id: "sat",
    name: { en: "Interests", fr: "Centres d'intérêt" },
    color: "#aeb6d6",
    glow: "rgba(174,182,214,0.40)",
  },
  dev: {
    id: "dev",
    name: { en: "Dev & Web", fr: "Dév & Web" },
    color: "#818cf8",
    glow: "rgba(129,140,248,0.45)",
  },
  sys: {
    id: "sys",
    name: { en: "Tools & Systems", fr: "Outils & Systèmes" },
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.45)",
  },
  metier: {
    id: "metier",
    name: { en: "Functional / business", fr: "Fonctionnel / métier" },
    color: "#34d399",
    glow: "rgba(52,211,153,0.45)",
  },
};

// Order around the centre — neighbours = domains that are actually related.
export const ORDER: FamilyId[] = ["data", "ia", "sat", "dev", "sys", "metier"];

export const NODES: GalaxyNode[] = [
  // ── Data & Analytics ──
  {
    id: "power-bi",
    fam: "data",
    lvl: 3,
    label: { en: "Power BI", fr: "Power BI" },
    d: {
      en: "Building dashboards and executive-level data reporting, up to leadership level (Sanofi, C-level presentations).",
      fr: "Construction de dashboards et restitution exécutive de la donnée, jusqu'au niveau direction (Sanofi, présentations C-level).",
    },
  },
  {
    id: "python",
    fam: "data",
    lvl: 2,
    label: { en: "Python", fr: "Python" },
    d: {
      en: "pandas, extraction scripts and data preparation pipelines.",
      fr: "pandas, scripts d'extraction et pipelines de préparation de données.",
    },
  },
  {
    id: "sql",
    fam: "data",
    lvl: 2,
    label: { en: "SQL", fr: "SQL" },
    d: {
      en: "Querying relational databases, extraction for analysis.",
      fr: "Requêtage de bases relationnelles, extraction pour analyse.",
    },
  },
  {
    id: "data-cleaning",
    fam: "data",
    lvl: 3,
    label: { en: "Data cleaning", fr: "Data cleaning" },
    d: {
      en: "Extraction, cleaning and structuring of operational data (multi-site, multi-country).",
      fr: "Extraction, nettoyage et structuration de données opérationnelles (multi-sites, multi-pays).",
    },
  },
  {
    id: "kpi",
    fam: "data",
    lvl: 2,
    label: { en: "KPI", fr: "KPI" },
    d: {
      en: "Turning operations into readable, actionable indicators.",
      fr: "Traduire l'opérationnel en indicateurs lisibles et actionnables.",
    },
  },
  {
    id: "dataviz",
    fam: "data",
    lvl: 2,
    label: { en: "Data viz", fr: "Data viz" },
    d: {
      en: "Clear graphical representation, executive reading of data.",
      fr: "Représentation graphique claire, lecture exécutive de la donnée.",
    },
  },

  // ── AI & Knowledge ──
  {
    id: "llm-archi",
    fam: "ia",
    lvl: 1,
    label: { en: "LLM", fr: "LLM" },
    d: {
      en: "Understanding of language-model architectures.",
      fr: "Compréhension des architectures de modèles de langage.",
    },
  },
  {
    id: "world-models",
    fam: "ia",
    lvl: 1,
    label: { en: "World Models", fr: "World Models" },
    d: {
      en: "DreamerV3, model-based reinforcement learning.",
      fr: "DreamerV3, apprentissage par renforcement à base de modèles du monde.",
    },
  },
  {
    id: "rag-graphrag",
    fam: "ia",
    lvl: 1,
    label: { en: "RAG / GraphRAG", fr: "RAG / GraphRAG" },
    d: {
      en: "Retrieval-augmented generation, knowledge graphs for context.",
      fr: "Récupération augmentée, graphes de connaissance pour le contexte.",
    },
  },
  {
    id: "stack-ia",
    fam: "ia",
    lvl: 1,
    label: { en: "Local AI", fr: "IA locale" },
    d: {
      en: "ChromaDB, NetworkX, Ollama for local experimentation.",
      fr: "ChromaDB, NetworkX, Ollama pour expérimenter localement.",
    },
  },

  // ── Interests ──
  {
    id: "neurosciences",
    fam: "sat",
    lvl: 0,
    label: { en: "Neuroscience", fr: "Neurosciences" },
    d: {
      en: "Cognitive science, how the brain works.",
      fr: "Sciences cognitives, fonctionnement du cerveau.",
    },
  },
  {
    id: "bci-eeg",
    fam: "sat",
    lvl: 0,
    label: { en: "BCI / EEG", fr: "BCI / EEG" },
    d: {
      en: "Brain-computer interfaces, EEG signal analysis (master's research).",
      fr: "Interfaces cerveau-machine, analyse de signal EEG (recherche master).",
    },
  },
  {
    id: "game-design",
    fam: "sat",
    lvl: 0,
    label: { en: "Game design", fr: "Game design" },
    d: {
      en: "Game design, engagement mechanics (master's training).",
      fr: "Conception de jeux, mécaniques d'engagement (formation master).",
    },
  },
  {
    id: "musique",
    fam: "sat",
    lvl: 0,
    label: { en: "Music", fr: "Musique" },
    d: {
      en: "Music production, projects (e.g. « Frigost »).",
      fr: "Production musicale, projets (ex. « Frigost »).",
    },
  },
  {
    id: "poesie-rock",
    fam: "sat",
    lvl: 0,
    label: { en: "Poetry & rock", fr: "Poésie & rock" },
    d: {
      en: "Writing, a rock musical sensibility.",
      fr: "Écriture, sensibilité musicale rock.",
    },
  },
  {
    id: "jeux",
    fam: "sat",
    lvl: 0,
    label: { en: "Game", fr: "Games" },
    d: {
      en: "Dofus, D&D — narrative and systems.",
      fr: "Dofus, D&D — narration et systèmes.",
    },
  },

  // ── Dev & Web ──
  {
    id: "java",
    fam: "dev",
    lvl: 2,
    label: { en: "Java", fr: "Java" },
    d: {
      en: "Contributing to business applications (BlueBiz platform, Air France).",
      fr: "Contribution à des applications métier (plateforme BlueBiz, AirFrance).",
    },
  },
  {
    id: "web",
    fam: "dev",
    lvl: 2,
    label: { en: "HTML/CSS/JS", fr: "HTML/CSS/JS" },
    d: {
      en: "Self-contained single-file deliverables, deployable as-is.",
      fr: "Livrables single-file autonomes, déployables tels quels.",
    },
  },
  {
    id: "react",
    fam: "dev",
    lvl: 1,
    label: { en: "React", fr: "React" },
    d: {
      en: "Components and interactive interfaces.",
      fr: "Composants et interfaces interactives.",
    },
  },

  // ── Tools & Systems ──
  {
    id: "sap",
    fam: "sys",
    lvl: 2,
    label: { en: "SAP", fr: "SAP" },
    d: {
      en: "Level 2 support, system data extraction and analysis (Decathlon).",
      fr: "Support niveau 2, extraction et analyse de données système (Decathlon).",
    },
  },
  {
    id: "progbat",
    fam: "sys",
    lvl: 2,
    label: { en: "Progbat", fr: "Progbat" },
    d: {
      en: "Configuration of construction-industry software, e-invoicing compliance.",
      fr: "Configuration du logiciel BTP, mise en conformité e-facturation.",
    },
  },

  // ── Functional / business ──
  {
    id: "business-analysis",
    fam: "metier",
    lvl: 3,
    label: { en: "BA", fr: "BA" },
    d: {
      en: "Business ↔ tech bridge: turning needs into actionable specifications.",
      fr: "Pont business ↔ tech : traduire les besoins en spécifications actionnables.",
    },
  },
  {
    id: "gestion-projet",
    fam: "metier",
    lvl: 2,
    label: { en: "Project management", fr: "Gestion de projet" },
    d: {
      en: "Coordination, scoping, progress tracking.",
      fr: "Coordination, cadrage, suivi d'avancement.",
    },
  },
  {
    id: "domaine-pharma",
    fam: "metier",
    lvl: 2,
    label: { en: "Pharma", fr: "Pharma" },
    d: {
      en: "Quality & manufacturing, deviations/exceptions, GxP context.",
      fr: "Qualité & manufacturing, déviations/exceptions, contexte GxP.",
    },
  },
  {
    id: "comm-design",
    fam: "metier",
    lvl: 2,
    label: { en: "Comms & design", fr: "Comm & design" },
    d: {
      en: "Branding and social media (STS Événementiel).",
      fr: "Branding et réseaux sociaux (STS Événementiel).",
    },
  },
  {
    id: "veille-synthese",
    fam: "metier",
    lvl: 2,
    label: { en: "Research & synthesis", fr: "Veille & synthèse" },
    d: {
      en: "Research, monitoring and synthesis into shareable materials.",
      fr: "Recherche, veille et synthèse en supports partageables.",
    },
  },
];

export const EDGES: GalaxyEdge[] = [
  // ── Data & Analytics ──
  ["python", "data-cleaning", 0.9],
  ["python", "sql", 0.7],
  ["python", "dataviz", 0.6],
  ["python", "power-bi", 0.5],
  ["sql", "data-cleaning", 0.8],
  ["sql", "power-bi", 0.6],
  ["power-bi", "kpi", 0.8],
  ["power-bi", "dataviz", 0.8],
  ["data-cleaning", "kpi", 0.6],
  ["kpi", "dataviz", 0.5],
  ["power-bi", "domaine-pharma", 0.7],
  ["power-bi", "business-analysis", 0.6],
  ["data-cleaning", "domaine-pharma", 0.6],
  ["kpi", "business-analysis", 0.5],
  // ── Dev & Web ──
  ["web", "react", 0.7],
  ["java", "business-analysis", 0.6],
  ["web", "comm-design", 0.5],
  // ── Tools & Systems ──
  ["sap", "business-analysis", 0.6],
  ["sap", "data-cleaning", 0.6],
  ["sap", "domaine-pharma", 0.3],
  ["sap", "progbat", 0.4],
  // ── AI & Knowledge ──
  ["llm-archi", "world-models", 0.7],
  ["llm-archi", "rag-graphrag", 0.7],
  ["world-models", "rag-graphrag", 0.5],
  ["world-models", "stack-ia", 0.5],
  ["rag-graphrag", "stack-ia", 0.7],
  ["stack-ia", "python", 0.6],
  ["llm-archi", "neurosciences", 0.6],
  ["world-models", "neurosciences", 0.5],
  // ── Functional / business ──
  ["business-analysis", "gestion-projet", 0.6],
  ["business-analysis", "veille-synthese", 0.5],
  ["domaine-pharma", "gestion-projet", 0.5],
  // ── Interests ──
  ["neurosciences", "bci-eeg", 0.8],
  ["bci-eeg", "game-design", 0.5],
  ["game-design", "jeux", 0.6],
  ["game-design", "musique", 0.4],
  ["musique", "poesie-rock", 0.6],
];

// ── Geometry helpers (pure, framework-agnostic) ─────────────────────

export const VIEW_W = 1000;
export const VIEW_H = 1000;

export type Point = { x: number; y: number };

export const nodeRadius = (lvl: number): number =>
  lvl === 0 ? 5 : 4 + lvl * 3.2;

export type LayoutResult = {
  pos: Record<string, Point>;
  // per-family centre, inward direction, packing radius
  fam: Record<FamilyId, { cx: number; cy: number; dir: Point; cR: number }>;
};

// ── Layout tuning ───────────────────────────────────────────────────
// Tunable knobs for computeLayout. Exposed so Storybook can drive them with
// sliders; the app uses DEFAULT_LAYOUT, so production rendering is unchanged.
export type LayoutOptions = {
  // crownR: distance of each family centre from the galaxy core. Adjacent
  // families sit 60° apart, so their centres are crownR apart — sizing the
  // clusters so neighbours almost touch makes their nebulae overlap and the
  // proximity between domains read at a glance.
  crownR: number;
  clusterBase: number; // floor radius for a 1-planet cluster
  nodeSpacing: number; // how far apart planets spread within a cluster
  // Optional per-family nudge (in viewBox units) applied to a whole cluster.
  // Drag a cluster name in Storybook to find these, then paste them here.
  famOffset?: Partial<Record<FamilyId, Point>>;
  // Optional absolute position (viewBox units) for individual planets. Wins
  // over the computed layout. Drag planets in Storybook to capture these.
  nodeOverride?: Record<string, Point>;
};

export const DEFAULT_LAYOUT: LayoutOptions = {
  crownR: 268,
  clusterBase: 33,
  nodeSpacing: 22,
  // Hand-placed cluster nudges (drive the family name positions).
  famOffset: {
    ia: { x: 23, y: 11 },
    sat: { x: 16, y: 27 },
    dev: { x: 9, y: 31 },
  },
  // Hand-placed absolute positions for every planet (Storybook Playground).
  nodeOverride: {
    "power-bi": { x: 463, y: 235 },
    python: { x: 605, y: 263 },
    sql: { x: 571, y: 309 },
    "data-cleaning": { x: 471, y: 299 },
    kpi: { x: 392, y: 218 },
    dataviz: { x: 598, y: 210 },
    "llm-archi": { x: 729, y: 490 },
    "world-models": { x: 816, y: 405 },
    "rag-graphrag": { x: 672, y: 375 },
    "stack-ia": { x: 714, y: 308 },
    neurosciences: { x: 738, y: 698 },
    "bci-eeg": { x: 735, y: 634 },
    "game-design": { x: 797, y: 703 },
    musique: { x: 683, y: 690 },
    "poesie-rock": { x: 791, y: 613 },
    jeux: { x: 759, y: 757 },
    java: { x: 434, y: 777 },
    web: { x: 572, y: 779 },
    react: { x: 502, y: 817 },
    sap: { x: 247, y: 624 },
    progbat: { x: 323, y: 654 },
    "business-analysis": { x: 275, y: 355 },
    "gestion-projet": { x: 288, y: 420 },
    "domaine-pharma": { x: 214, y: 359 },
    "comm-design": { x: 332, y: 355 },
    "veille-synthese": { x: 233, y: 450 },
  },
};

// Sectorised layout: each family owns a slice of a crown around the core.
// Planets are packed via phyllotaxis (even disc packing); higher-mastery
// skills are placed first so they land near each cluster's bright centre.
export function computeLayout(opts: Partial<LayoutOptions> = {}): LayoutResult {
  const { crownR, clusterBase, nodeSpacing, famOffset, nodeOverride } = {
    ...DEFAULT_LAYOUT,
    ...opts,
  };

  // A cluster's packing radius grows with √(members) so density stays even.
  const clusterRadius = (m: number): number =>
    clusterBase + nodeSpacing * Math.sqrt(Math.max(m, 1));

  const cx = VIEW_W / 2;
  const cy = VIEW_H / 2 + 14;
  const R = crownR;

  const pos: Record<string, Point> = {};
  const fam = {} as LayoutResult["fam"];

  ORDER.forEach((k, i) => {
    const ang = ((-90 + i * 60) * Math.PI) / 180;
    const dir = { x: Math.cos(ang), y: Math.sin(ang) };
    const off = famOffset?.[k] ?? { x: 0, y: 0 };
    const kx = cx + dir.x * R + off.x;
    const ky = cy + dir.y * R + off.y;
    // Strongest skills first → they pack toward the cluster core.
    const members = NODES.filter((n) => n.fam === k)
      .slice()
      .sort((a, b) => b.lvl - a.lvl);
    const cR = clusterRadius(members.length);
    members.forEach((n, j) => {
      const rr = cR * Math.sqrt((j + 0.5) / members.length);
      const th = j * 2.399963267 + i; // golden angle, phase-shifted per family
      pos[n.id] = { x: kx + rr * Math.cos(th), y: ky + rr * Math.sin(th) };
    });
    fam[k] = { cx: kx, cy: ky, dir, cR };
  });

  // Per-node absolute overrides win over the computed positions.
  if (nodeOverride) {
    for (const id of Object.keys(nodeOverride)) {
      if (pos[id]) pos[id] = nodeOverride[id];
    }
  }

  return { pos, fam };
}

// Andrew's monotone chain convex hull.
export function convexHull(pts: Point[]): Point[] {
  if (pts.length < 3) return pts.slice();
  const p = pts.slice().sort((a, b) => a.x - b.x || a.y - b.y);
  const cross = (o: Point, a: Point, b: Point) =>
    (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  const lo: Point[] = [];
  for (const q of p) {
    while (lo.length >= 2 && cross(lo[lo.length - 2], lo[lo.length - 1], q) <= 0)
      lo.pop();
    lo.push(q);
  }
  const hi: Point[] = [];
  for (let i = p.length - 1; i >= 0; i--) {
    const q = p[i];
    while (hi.length >= 2 && cross(hi[hi.length - 2], hi[hi.length - 1], q) <= 0)
      hi.pop();
    hi.push(q);
  }
  lo.pop();
  hi.pop();
  return lo.concat(hi);
}

// Closed Catmull-Rom-style smoothing → nebula outline path.
export function smoothClosed(pts: Point[], cx = VIEW_W / 2, cy = VIEW_H / 2): string {
  if (pts.length < 3) {
    const c = pts[0] || { x: cx, y: cy };
    const r = 50;
    return `M ${c.x - r} ${c.y} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0 Z`;
  }
  let d = `M ${pts[0].x} ${pts[0].y} `;
  const n = pts.length;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    d += `C ${p1.x + (p2.x - p0.x) / 6} ${p1.y + (p2.y - p0.y) / 6} ${p2.x - (p3.x - p1.x) / 6} ${p2.y - (p3.y - p1.y) / 6} ${p2.x} ${p2.y} `;
  }
  return d + "Z";
}

// Nebula outline for one family from its (visible) member positions.
export function nebulaPath(memberIds: string[], pos: Record<string, Point>, lvlOf: (id: string) => number): string {
  const samples: Point[] = [];
  for (const id of memberIds) {
    const p = pos[id];
    if (!p) continue;
    const pad = nodeRadius(lvlOf(id)) + 40;
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
      samples.push({ x: p.x + Math.cos(a) * pad, y: p.y + Math.sin(a) * pad });
    }
  }
  return smoothClosed(convexHull(samples));
}

export const localizedLabel = (n: GalaxyNode, lang: Lang) => n.label[lang];
export const localizedDesc = (n: GalaxyNode, lang: Lang) => n.d[lang];
