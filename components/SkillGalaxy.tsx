"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  DEFAULT_LAYOUT,
  EDGES,
  FAMILIES,
  NODES,
  ORDER,
  VIEW_H,
  VIEW_W,
  computeLayout,
  nebulaPath,
  nodeRadius,
  type FamilyId,
  type Point,
} from "@/data/skillGalaxy";

// ── small deterministic PRNG so the starfield is stable across SSR/CSR ──
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const STAR_DEF = (() => {
  const rnd = mulberry32(20260614);
  return Array.from({ length: 150 }, () => ({
    x: +(rnd() * VIEW_W).toFixed(1),
    y: +(rnd() * VIEW_H).toFixed(1),
    r: +(rnd() * 1.1 + 0.2).toFixed(2),
    o: +(rnd() * 0.5 + 0.08).toFixed(2),
  }));
})();

const stars = (lvl: number, n: number) => "★".repeat(n) + "☆".repeat(lvl - n);

// Central sigil — kept at the source PNG aspect ratio (494×802),
// scaled so its height ≈ 0.42 of the viewport's smaller side.
const LOGO_H = Math.min(VIEW_W, VIEW_H) * 0.42;
const LOGO_W = LOGO_H * (494 / 802);

type View = { x: number; y: number; k: number };

// Frame the whole constellation: fit the bounding box of all planet positions
// into the viewBox (with padding for labels), centred. With the group
// transform `translate(x,y) scale(k)`, a point P maps to x + k·P.
function fitView(pos: Record<string, Point>): View {
  const pts = Object.values(pos);
  if (pts.length === 0) return { x: 0, y: 0, k: 1 };
  const pad = 70; // room for node labels and family names
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  const minX = Math.min(...xs) - pad;
  const maxX = Math.max(...xs) + pad;
  const minY = Math.min(...ys) - pad;
  const maxY = Math.max(...ys) + pad;
  const k = Math.max(
    0.5,
    Math.min(2.6, (VIEW_W * 0.98) / (maxX - minX), (VIEW_H * 0.98) / (maxY - minY))
  );
  return {
    k,
    x: VIEW_W / 2 - k * ((minX + maxX) / 2),
    y: VIEW_H / 2 - k * ((minY + maxY) / 2),
  };
}

export type SkillGalaxyProps = {
  /** Distance of each family cluster from the galaxy core. */
  crownR?: number;
  /** Floor radius of a one-planet cluster. */
  clusterBase?: number;
  /** How far planets spread within a cluster. */
  nodeSpacing?: number;
  /**
   * Layout-editing mode (Storybook): drag whole clusters around and read the
   * resulting per-family offsets from the on-canvas panel.
   */
  editable?: boolean;
};

export default function SkillGalaxy({
  crownR = DEFAULT_LAYOUT.crownR,
  clusterBase = DEFAULT_LAYOUT.clusterBase,
  nodeSpacing = DEFAULT_LAYOUT.nodeSpacing,
  editable = false,
}: SkillGalaxyProps = {}) {
  const { t, lang } = useLanguage();
  const g = t.about.galaxy;

  const svgRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: "-60px" });

  // ── layout edits (driven by drag in editable mode) ──
  const [famOffset, setFamOffset] = useState<Partial<Record<FamilyId, Point>>>(
    {}
  );
  const [nodeOverride, setNodeOverride] = useState<Record<string, Point>>({});

  // ── static derived data ──
  const layout = useMemo(
    () =>
      computeLayout({
        crownR,
        clusterBase,
        nodeSpacing,
        famOffset,
        nodeOverride,
      }),
    [crownR, clusterBase, nodeSpacing, famOffset, nodeOverride]
  );
  const byId = useMemo(
    () => Object.fromEntries(NODES.map((n) => [n.id, n])),
    []
  );
  const adj = useMemo(() => {
    const m: Record<string, { id: string; w: number }[]> = {};
    NODES.forEach((n) => (m[n.id] = []));
    EDGES.forEach(([a, b, w]) => {
      m[a].push({ id: b, w });
      m[b].push({ id: a, w });
    });
    return m;
  }, []);

  // The default/reset view that frames the current constellation.
  const fitted = useMemo(() => fitView(layout.pos), [layout]);

  // ── interactive state ──
  const [view, setView] = useState(fitted);
  const [selected, setSelected] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState<Set<FamilyId>>(new Set());
  const [labelPos, setLabelPos] = useState<Partial<Record<FamilyId, Point>>>({});

  const isFamVisible = (f: FamilyId) => !hidden.has(f);

  // nebula outline per visible family (recomputed only when filters change)
  const clouds = useMemo(() => {
    return ORDER.filter(isFamVisible).map((f) => {
      const ids = NODES.filter((n) => n.fam === f).map((n) => n.id);
      return {
        f,
        d: nebulaPath(ids, layout.pos, (id) => byId[id].lvl),
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hidden, layout, byId]);

  // ── coordinate helpers ──
  const clientToSvg = (cx: number, cy: number): Point => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = cx;
    pt.y = cy;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const p = pt.matrixTransform(ctm.inverse());
    return { x: p.x, y: p.y };
  };
  const toLocal = (cx: number, cy: number): Point => {
    const o = clientToSvg(cx, cy);
    return { x: (o.x - view.x) / view.k, y: (o.y - view.y) / view.k };
  };

  // ── drag (pan background / move a cluster label / move a whole cluster) ──
  const dragRef = useRef<{
    mode: "pan" | "label" | "cluster" | "node";
    fam?: FamilyId;
    nodeId?: string;
    start: Point;
    startLocal?: Point;
    startOffset?: Point;
    startView: Point;
    moved: boolean;
  } | null>(null);

  const onBgPointerDown = (e: React.PointerEvent) => {
    dragRef.current = {
      mode: "pan",
      start: { x: e.clientX, y: e.clientY },
      startView: { x: view.x, y: view.y },
      moved: false,
    };
    svgRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    if (d.mode === "label" && d.fam) {
      setLabelPos((prev) => ({ ...prev, [d.fam!]: toLocal(e.clientX, e.clientY) }));
      return;
    }
    if (d.mode === "cluster" && d.fam) {
      const cur = toLocal(e.clientX, e.clientY);
      const dx = cur.x - d.startLocal!.x;
      const dy = cur.y - d.startLocal!.y;
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) d.moved = true;
      setFamOffset((prev) => ({
        ...prev,
        [d.fam!]: {
          x: Math.round(d.startOffset!.x + dx),
          y: Math.round(d.startOffset!.y + dy),
        },
      }));
      return;
    }
    if (d.mode === "node" && d.nodeId) {
      const cur = toLocal(e.clientX, e.clientY);
      const dx = cur.x - d.startLocal!.x;
      const dy = cur.y - d.startLocal!.y;
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) d.moved = true;
      setNodeOverride((prev) => ({
        ...prev,
        [d.nodeId!]: {
          x: Math.round(d.startOffset!.x + dx),
          y: Math.round(d.startOffset!.y + dy),
        },
      }));
      return;
    }
    const s0 = clientToSvg(d.start.x, d.start.y);
    const s1 = clientToSvg(e.clientX, e.clientY);
    if (Math.abs(e.clientX - d.start.x) > 3 || Math.abs(e.clientY - d.start.y) > 3)
      d.moved = true;
    setView((v) => ({
      ...v,
      x: d.startView.x + (s1.x - s0.x),
      y: d.startView.y + (s1.y - s0.y),
    }));
  };

  const onPointerUp = () => {
    const d = dragRef.current;
    if (d && d.mode === "pan" && !d.moved) setSelected(null);
    // A node/cluster drag that didn't move is just a tap → select the planet.
    if (d && (d.mode === "node" || d.mode === "cluster") && !d.moved && d.nodeId)
      setSelected(d.nodeId);
    dragRef.current = null;
  };

  // Drag a single planet to an absolute position (editable mode); it still
  // selects on tap. startOffset = the node's current position.
  const startNodeDrag = (e: React.PointerEvent, nodeId: string) => {
    e.stopPropagation();
    dragRef.current = {
      mode: "node",
      nodeId,
      start: { x: e.clientX, y: e.clientY },
      startLocal: toLocal(e.clientX, e.clientY),
      startOffset: layout.pos[nodeId],
      startView: { x: view.x, y: view.y },
      moved: false,
    };
    svgRef.current?.setPointerCapture(e.pointerId);
  };

  // Drag a family name to move the whole cluster (editable mode).
  const startClusterDrag = (e: React.PointerEvent, fam: FamilyId) => {
    e.stopPropagation();
    dragRef.current = {
      mode: "cluster",
      fam,
      start: { x: e.clientX, y: e.clientY },
      startLocal: toLocal(e.clientX, e.clientY),
      startOffset: famOffset[fam] ?? { x: 0, y: 0 },
      startView: { x: view.x, y: view.y },
      moved: false,
    };
    svgRef.current?.setPointerCapture(e.pointerId);
  };

  const onLabelPointerDown = (e: React.PointerEvent, fam: FamilyId) => {
    if (editable) {
      startClusterDrag(e, fam);
      return;
    }
    e.stopPropagation();
    dragRef.current = {
      mode: "label",
      fam,
      start: { x: e.clientX, y: e.clientY },
      startView: { x: view.x, y: view.y },
      moved: false,
    };
    svgRef.current?.setPointerCapture(e.pointerId);
  };

  // ── zoom (non-passive wheel so the page doesn't scroll) ──
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const f = e.deltaY < 0 ? 1.1 : 0.9;
      setView((v) => ({ ...v, k: Math.min(2.6, Math.max(0.5, v.k * f)) }));
    };
    svg.addEventListener("wheel", onWheel, { passive: false });
    return () => svg.removeEventListener("wheel", onWheel);
  }, []);

  const resetView = () => setView(fitted);

  // ── selection-derived sets ──
  const neighbours = useMemo(() => {
    if (!selected) return null;
    const s = new Set(adj[selected].map((x) => x.id));
    s.add(selected);
    return s;
  }, [selected, adj]);

  const selNode = selected ? byId[selected] : null;
  const selFamColor = selNode ? FAMILIES[selNode.fam].color : "";

  const labelXY = (f: FamilyId): Point => {
    if (labelPos[f]) return labelPos[f]!;
    const fl = layout.fam[f];
    // Sit the cluster name just inside its nebula, on the core-facing edge.
    return {
      x: fl.cx - fl.dir.x * (fl.cR + 14),
      y: fl.cy - fl.dir.y * (fl.cR + 14),
    };
  };

  const toggleFamily = (f: FamilyId) =>
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(f)) next.delete(f);
      else next.add(f);
      return next;
    });

  // Paste-ready snippet of the current layout (editable mode): the tuning
  // knobs plus an absolute position for every planet, so the whole set can be
  // baked back into computeLayout / DEFAULT_LAYOUT.
  const layoutSnippet = useMemo(() => {
    const off = ORDER.filter((f) => famOffset[f])
      .map((f) => `    ${f}: { x: ${famOffset[f]!.x}, y: ${famOffset[f]!.y} },`)
      .join("\n");
    const nodes = NODES.map((n) => {
      const p = layout.pos[n.id];
      return `    "${n.id}": { x: ${Math.round(p.x)}, y: ${Math.round(p.y)} },`;
    }).join("\n");
    return [
      "computeLayout({",
      `  crownR: ${crownR},`,
      `  clusterBase: ${clusterBase},`,
      `  nodeSpacing: ${nodeSpacing},`,
      ...(off ? ["  famOffset: {", off, "  },"] : []),
      "  nodeOverride: {",
      nodes,
      "  },",
      "})",
    ].join("\n");
  }, [crownR, clusterBase, nodeSpacing, famOffset, layout]);

  return (
    <div ref={wrapRef}>
      {/* Stage — the nebula fills the whole space; the legend lives in the menu */}
      <div className="relative w-full h-[600px] sm:h-[680px] lg:h-[580px] rounded-xl overflow-hidden border border-[var(--border)]">
        <motion.svg
          ref={svgRef}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 w-full h-full select-none touch-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          onPointerDown={onBgPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onDoubleClick={() => {
            resetView();
            setSelected(null);
          }}
        >
          <defs>
            <radialGradient id="gx-vig" cx="50%" cy="48%" r="75%">
              <stop offset="0%" stopColor="#0c1224" />
              <stop offset="100%" stopColor="var(--bg)" />
            </radialGradient>
            <radialGradient id="gx-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
              <stop offset="40%" stopColor="#dfe6ff" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#dfe6ff" stopOpacity="0" />
            </radialGradient>
            <filter id="gx-neb" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="24" />
            </filter>
            <filter id="gx-halo" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="9" />
            </filter>
          </defs>

          {/* vignette + starfield (outside the pan/zoom group) */}
          <rect width={VIEW_W} height={VIEW_H} fill="url(#gx-vig)" />
          <g>
            {STAR_DEF.map((s, i) => (
              <circle
                key={i}
                cx={s.x}
                cy={s.y}
                r={s.r}
                fill="#cfd6f5"
                opacity={s.o}
              />
            ))}
          </g>

          {/* pan + zoom group */}
          <g transform={`translate(${view.x},${view.y}) scale(${view.k})`}>
            {/* nebula clouds */}
            <g style={{ mixBlendMode: "screen" }} className="pointer-events-none">
              {clouds.map(({ f, d }) => (
                <path
                  key={f}
                  d={d}
                  fill={FAMILIES[f].color}
                  fillOpacity={0.17}
                  filter="url(#gx-neb)"
                />
              ))}
            </g>

            {/* links */}
            <g className="pointer-events-none">
              {EDGES.map(([a, b, w], i) => {
                const pa = layout.pos[a];
                const pb = layout.pos[b];
                if (hidden.has(byId[a].fam) || hidden.has(byId[b].fam)) return null;
                const hot = selected === a || selected === b;
                const opacity = selected
                  ? hot
                    ? 0.85
                    : 0.05
                  : 0.22 + w * 0.4 - 0.12;
                return (
                  <line
                    key={i}
                    x1={pa.x}
                    y1={pa.y}
                    x2={pb.x}
                    y2={pb.y}
                    stroke={hot ? selFamColor : "rgba(180,190,220,0.5)"}
                    strokeWidth={hot ? 1.6 : 1}
                    strokeLinecap="round"
                    opacity={opacity}
                    style={{ transition: "opacity .2s, stroke .2s, stroke-width .2s" }}
                  />
                );
              })}
            </g>

            {/* central sigil — light-painting: screen blend drops the
                dark, only the luminous lines remain */}
            <g
              className="pointer-events-none"
              style={{ mixBlendMode: "screen" }}
            >
              <circle
                cx={VIEW_W / 2}
                cy={VIEW_H / 2 + 14}
                r={LOGO_H * 0.62}
                fill="url(#gx-core)"
              />
              {/* soft bloom around the sigil */}
              <image
                href="/logo_astral.png"
                x={VIEW_W / 2 - LOGO_W / 2}
                y={VIEW_H / 2 + 14 - LOGO_H / 2}
                width={LOGO_W}
                height={LOGO_H}
                preserveAspectRatio="xMidYMid meet"
                opacity={0.55}
                filter="url(#gx-halo)"
              />
              {/* crisp luminous sigil */}
              <image
                href="/logo_astral.png"
                x={VIEW_W / 2 - LOGO_W / 2}
                y={VIEW_H / 2 + 14 - LOGO_H / 2}
                width={LOGO_W}
                height={LOGO_H}
                preserveAspectRatio="xMidYMid meet"
              />
            </g>

            {/* nodes */}
            <g>
              {NODES.map((n) => {
                if (hidden.has(n.fam)) return null;
                const p = layout.pos[n.id];
                const r = nodeRadius(n.lvl);
                const col = FAMILIES[n.fam].color;
                const dimmed =
                  neighbours !== null && !neighbours.has(n.id);
                const isSat = n.fam === "sat";
                return (
                  <g
                    key={n.id}
                    className={editable ? "cursor-move" : "cursor-pointer"}
                    style={{
                      opacity: dimmed ? 0.12 : 1,
                      transition: "opacity .25s",
                    }}
                    onPointerDown={(e) => {
                      if (editable) {
                        startNodeDrag(e, n.id);
                        return;
                      }
                      e.stopPropagation();
                      setSelected(n.id);
                    }}
                  >
                    {/* halo */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={r * 2.6}
                      fill={col}
                      opacity={n.lvl === 0 ? 0.05 : 0.12}
                      style={{ filter: "blur(4px)" }}
                    />
                    {/* ring */}
                    {n.lvl !== 0 && (
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={r + 4}
                        fill="none"
                        stroke={col}
                        strokeWidth={n.lvl === 3 ? 1.6 : 1}
                        opacity={0.45}
                      />
                    )}
                    {/* core */}
                    <circle cx={p.x} cy={p.y} r={r} fill={col} />
                    {/* hit target (bigger than the planet) */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={r + 10}
                      fill="transparent"
                    />
                    {/* label */}
                    <text
                      x={p.x}
                      y={p.y - r - 8}
                      textAnchor="middle"
                      className="font-mono"
                      style={{
                        fontSize: isSat ? 13 : 14.5,
                        fill: isSat ? "var(--muted)" : "var(--text)",
                        paintOrder: "stroke",
                        stroke: "var(--bg)",
                        strokeWidth: 2,
                      }}
                    >
                      {n.label[lang]}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* draggable cluster labels */}
            <g>
              {ORDER.filter(isFamVisible).map((f) => {
                const pos = labelXY(f);
                return (
                  <text
                    key={f}
                    x={pos.x}
                    y={pos.y}
                    textAnchor="middle"
                    className="font-lora cursor-move"
                    onPointerDown={(e) => onLabelPointerDown(e, f)}
                    style={{
                      fontStyle: "italic",
                      fontSize: 22,
                      letterSpacing: "0.06em",
                      fill: FAMILIES[f].color,
                      paintOrder: "stroke",
                      stroke: "var(--bg)",
                      strokeWidth: 2.5,
                    }}
                  >
                    {FAMILIES[f].name[lang]}
                  </text>
                );
              })}
            </g>
          </g>
        </motion.svg>

        {/* ── discreet sandwich menu : legend + guide ── */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={g.menu}
          aria-expanded={menuOpen}
          className="absolute top-3 left-3 z-20 flex flex-col items-center justify-center gap-[3px] w-8 h-8 rounded-lg border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          style={{ background: "rgba(15,21,32,0.7)", backdropFilter: "blur(6px)" }}
        >
          <span
            className="block w-3.5 h-px bg-current transition-transform duration-300"
            style={menuOpen ? { transform: "translateY(4px) rotate(45deg)" } : undefined}
          />
          <span
            className="block w-3.5 h-px bg-current transition-opacity duration-200"
            style={menuOpen ? { opacity: 0 } : undefined}
          />
          <span
            className="block w-3.5 h-px bg-current transition-transform duration-300"
            style={menuOpen ? { transform: "translateY(-4px) rotate(-45deg)" } : undefined}
          />
        </button>

        {/* legend panel */}
        <div
          className="absolute top-14 left-3 z-20 w-[248px] glass-strong rounded-xl border border-[var(--border)] p-4 flex flex-col gap-3.5 origin-top-left"
          style={{
            transform: menuOpen ? "scale(1)" : "scale(0.92)",
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? "auto" : "none",
            transition: "transform .22s cubic-bezier(.6,.2,.1,1), opacity .22s",
          }}
        >
          <div className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-[var(--muted)]">
            {g.legend_title}
          </div>

          {/* clusters — click to toggle visibility */}
          <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-[var(--muted)] opacity-70">
            {g.clusters_label}
          </div>
          <div className="flex flex-col gap-1 -mt-1">
            {ORDER.map((f) => {
              const fam = FAMILIES[f];
              const off = hidden.has(f);
              return (
                <button
                  key={f}
                  onClick={() => toggleFamily(f)}
                  className="flex items-center gap-2.5 py-1 text-left text-[12px] font-mono transition-opacity duration-200"
                  style={{ color: off ? "var(--muted)" : "var(--text)", opacity: off ? 0.45 : 1 }}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{
                      background: off ? "transparent" : fam.color,
                      border: `1px solid ${fam.color}`,
                      boxShadow: off ? "none" : `0 0 6px ${fam.glow}`,
                    }}
                  />
                  {fam.name[lang]}
                </button>
              );
            })}
          </div>

          {/* planet size = mastery */}
          <div className="border-t border-[var(--border)] pt-3 flex flex-col gap-2">
            <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-[var(--muted)] opacity-70">
              {g.sizes_label}
            </div>
            <div className="flex items-end justify-between gap-1">
              {([0, 1, 2, 3] as const).map((lvl) => {
                const d = nodeRadius(lvl);
                return (
                  <div key={lvl} className="flex flex-col items-center gap-1.5">
                    <span
                      className="rounded-full bg-[var(--muted)]"
                      style={{ width: d * 1.7, height: d * 1.7 }}
                    />
                    <span className="text-[9px] font-mono text-[var(--muted)] text-center leading-tight">
                      {g.levels[`lvl${lvl}` as keyof typeof g.levels]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* interaction guide */}
          <div className="border-t border-[var(--border)] pt-3 text-[10.5px] font-mono text-[var(--muted)] leading-relaxed">
            {g.hint}
          </div>
        </div>

        {/* reset view */}
        {(view.k !== fitted.k || view.x !== fitted.x || view.y !== fitted.y) && (
          <button
            onClick={resetView}
            className="absolute bottom-3 right-3 text-[10px] font-mono px-2.5 py-1 rounded-full border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] transition-colors"
            style={{ background: "rgba(15,21,32,0.7)" }}
          >
            ⟲ {g.reset}
          </button>
        )}

        {/* ── layout-editing readout (Storybook) ── */}
        {editable && (
          <div
            className="absolute bottom-3 left-3 z-20 w-[270px] glass-strong rounded-xl border border-[var(--border)] p-3.5 flex flex-col gap-2.5 font-mono"
            style={{ background: "rgba(8,12,16,0.86)" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                Layout · drag planets / names
              </span>
              <button
                onClick={() => {
                  setNodeOverride({});
                  setFamOffset({});
                }}
                className="text-[10px] px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] transition-colors"
              >
                reset
              </button>
            </div>
            <pre className="max-h-[40vh] overflow-auto text-[10.5px] leading-relaxed text-slate-300 whitespace-pre-wrap break-words m-0">
              {layoutSnippet}
            </pre>
            <button
              onClick={() => navigator.clipboard?.writeText(layoutSnippet)}
              className="text-[10px] px-2.5 py-1 rounded-lg border border-[var(--border)] text-[var(--accent)] hover:bg-[rgba(56,189,248,0.08)] transition-colors"
            >
              ⧉ Copy layout snippet
            </button>
          </div>
        )}

        {/* side panel */}
        <aside
          className="absolute top-0 right-0 h-full w-[min(340px,86%)] glass-strong border-l border-[var(--border)] p-6 overflow-y-auto flex flex-col gap-3.5"
          style={{
            transform: selNode ? "translateX(0)" : "translateX(102%)",
            transition: "transform .34s cubic-bezier(.6,.2,.1,1)",
          }}
        >
          {selNode && (
            <>
              <button
                onClick={() => setSelected(null)}
                aria-label={g.close}
                className="absolute top-3.5 right-4 text-xl leading-none text-[var(--muted)] hover:text-[var(--text)]"
              >
                ×
              </button>
              <div
                className="text-[11px] font-mono uppercase tracking-[0.22em]"
                style={{ color: FAMILIES[selNode.fam].color }}
              >
                {FAMILIES[selNode.fam].name[lang]}
              </div>
              <h3 className="font-lora text-2xl text-[var(--text)] leading-tight m-0">
                {selNode.label[lang]}
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                {selNode.lvl > 0 && (
                  <span
                    className="text-sm tracking-[2px]"
                    style={{ color: FAMILIES[selNode.fam].color }}
                  >
                    {stars(3, selNode.lvl)}
                  </span>
                )}
                <span
                  className="text-[10.5px] font-mono px-2.5 py-0.5 rounded-full border border-[var(--border)] text-[var(--muted)]"
                >
                  {g.levels[`lvl${selNode.lvl}` as keyof typeof g.levels]}
                </span>
              </div>
              <p className="text-sm font-mono text-slate-300 leading-relaxed m-0">
                {selNode.d[lang]}
              </p>

              <div className="text-[10.5px] font-mono uppercase tracking-[0.2em] text-[var(--muted)] mt-1.5 border-t border-[var(--border)] pt-3">
                {g.links_title}
              </div>
              <div className="flex flex-col">
                {[...adj[selNode.id]]
                  .sort((a, b) => b.w - a.w)
                  .map(({ id, w }) => {
                    const m = byId[id];
                    return (
                      <button
                        key={id}
                        onClick={() => setSelected(id)}
                        className="flex justify-between items-center gap-2 py-1.5 border-b border-[var(--border)] text-left group"
                      >
                        <span className="text-[13.5px] font-mono text-[var(--text)]">
                          <b
                            className="font-semibold group-hover:opacity-100"
                            style={{ color: FAMILIES[m.fam].color }}
                          >
                            {m.label[lang]}
                          </b>{" "}
                          <span className="text-[var(--muted)]">
                            · {FAMILIES[m.fam].name[lang]}
                          </span>
                        </span>
                        <span className="text-[10px] font-mono text-[var(--muted)] tabular-nums">
                          {Math.round(w * 100)}%
                        </span>
                      </button>
                    );
                  })}
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
