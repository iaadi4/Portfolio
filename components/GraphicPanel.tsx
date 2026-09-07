"use client";

import type { ComponentProps, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CAPABILITIES, PAGES, SOCIALS } from "@/lib/data";
import { useIntro } from "@/components/IntroContext";
import { cn } from "@/lib/utils";

const MONO = "var(--font-jetbrains), ui-monospace, monospace";
const ORANGE = "#ff5f2e";
const IX = 0.92;
const IZ = 0.5;
const SCHEMATIC = "mx-auto h-[min(32vh,260px)] w-full max-h-full text-fg";

function iso(x: number, y: number, z: number, ox: number, oy: number) {
  return {
    x: ox + (x - z) * IX,
    y: oy - y + (x + z) * IZ,
  };
}

function pts(points: { x: number; y: number }[]) {
  return points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
}

export function GraphicPanel() {
  const { active, setActive } = useIntro();
  const layer = CAPABILITIES[active] ?? CAPABILITIES[0];

  return (
    <aside className="flex flex-col border-b border-line lg:sticky lg:top-14 lg:h-[calc(100svh-3.5rem)] lg:border-l">
      <div className="relative flex min-h-[340px] flex-1 flex-col bg-blueprint sm:min-h-[380px] lg:min-h-0">
        <div className="absolute inset-0 bg-stipple opacity-40" />

        <div className="relative flex min-h-0 flex-1 flex-col justify-center gap-5 px-3 py-6 md:px-5">
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
            {String(active + 1).padStart(2, "0")} / {String(CAPABILITIES.length).padStart(2, "0")}
          </p>

          <div className="relative mx-auto flex w-full max-w-[520px] items-center justify-center">
            <AnimatePresence initial={false}>
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                className="flex w-full items-center justify-center"
              >
                {layer.title === "Infrastructure" ? (
                  <InfraSchematic />
                ) : layer.title === "Agentic AI" ? (
                  <AgentSchematic />
                ) : (
                  <FullStackSchematic />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="shrink-0">
            <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-orange">
              {layer.title}
            </p>

            <div className="mt-3 flex justify-center gap-2">
            {CAPABILITIES.map((item, index) => {
              const selected = active === index;
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActive(index)}
                  className={cn(
                    "flex h-10 min-w-11 items-center justify-center border px-3 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors",
                    selected
                      ? "border-orange bg-orange text-[#121212]"
                      : "border-line text-muted hover:border-fg hover:text-fg"
                  )}
                  aria-label={item.title}
                  aria-pressed={selected}
                >
                  {item.index}
                </button>
              );
            })}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden grid-cols-2 border-t border-line lg:grid">
        <div className="border-r border-line px-6 py-6">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Pages</p>
          <ul className="space-y-2">
            {PAGES.map((page) => (
              <li key={page.href}>
                <a href={page.href} className="text-sm text-fg/80 transition-colors hover:text-orange">
                  {page.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-6 py-6">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Social</p>
          <ul className="space-y-2">
            {SOCIALS.slice(0, 4).map((social) => (
              <li key={social.id}>
                <a
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="text-sm text-fg/80 transition-colors hover:text-orange"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

function FullStackSchematic() {
  return (
    <svg viewBox="0 0 420 300" className={SCHEMATIC} fill="none" aria-hidden>
      <line x1="168" y1="18" x2="168" y2="262" stroke={ORANGE} strokeOpacity="0.28" />
      <polygon points="164,22 168,16 172,22" fill={ORANGE} />
      <polygon points="164,258 168,264 172,258" fill={ORANGE} />
      <Label x="178" y="24" fill={ORANGE}>
        REQ
      </Label>
      <Label x="178" y="266" fill={ORANGE}>
        RES
      </Label>

      <IconSlab cx={168} cy={58} w={86} h={18} depth={20} delay={0.06}>
        <circle cx="132" cy="50" r="2" fill={ORANGE} />
        <circle cx="142" cy="50" r="2" fill={ORANGE} />
        <circle cx="152" cy="50" r="2" fill={ORANGE} />
        <polygon points="128,58 208,58 188,72 148,72" stroke={ORANGE} />
      </IconSlab>
      <Leader from={{ x: 254, y: 58 }} to={{ x: 292, y: 58 }} />
      <Callout x={300} y={58} title="NEXT" sub="REACT" />

      <IconSlab cx={168} cy={132} w={64} h={14} depth={14} delay={0.16}>
        <line x1="140" y1="126" x2="196" y2="126" stroke={ORANGE} />
        <line x1="144" y1="132" x2="192" y2="132" stroke={ORANGE} />
        <line x1="148" y1="138" x2="188" y2="138" stroke={ORANGE} />
      </IconSlab>
      <Leader from={{ x: 232, y: 132 }} to={{ x: 292, y: 132 }} />
      <Callout x={300} y={132} title="TS" />

      <IconSlab cx={168} cy={208} w={48} h={26} depth={22} delay={0.26}>
        <rect x="186" y="198" width="10" height="6" stroke={ORANGE} />
        <rect x="186" y="208" width="10" height="6" stroke={ORANGE} />
        <rect x="186" y="218" width="10" height="6" stroke={ORANGE} />
      </IconSlab>
      <Leader from={{ x: 216, y: 208 }} to={{ x: 292, y: 208 }} />
      <Callout x={300} y={208} title="API" sub="HONO" />
    </svg>
  );
}

function InfraSchematic() {
  const ox = 188;
  const oy = 176;
  const aws = iso(80, 90, -60, ox, oy);
  const k8s = iso(70, 40, -50, ox, oy);
  const docker = iso(-70, 18, 48, ox, oy);
  const redis = iso(-86, 16, 0, ox, oy);
  const prom = iso(86, 40, 8, ox, oy);
  const core = iso(0, 26, 0, ox, oy);
  const origin = iso(0, 0, 0, ox, oy);
  const axis = iso(0, 96, 0, ox, oy);

  const pods = ([-54, 12, 78] as const).map((angle, index) => {
    const rad = ((angle - 20) * Math.PI) / 180;
    const bx = Math.cos(rad) * 58 - 8;
    const bz = Math.sin(rad) * 58 - 8;
    return { angle, index, bx, bz, p: iso(bx + 8, 17, bz + 8, ox, oy) };
  });

  const hex = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return iso(Math.cos(a) * 62, 20, Math.sin(a) * 62, ox, oy);
  });

  const envelope = [
    iso(-88, 0, -64, ox, oy),
    iso(88, 0, -64, ox, oy),
    iso(88, 96, -64, ox, oy),
    iso(-88, 96, -64, ox, oy),
    iso(-88, 96, 68, ox, oy),
    iso(88, 96, 68, ox, oy),
    iso(88, 0, 68, ox, oy),
    iso(-88, 0, 68, ox, oy),
  ];

  return (
    <svg viewBox="0 0 420 300" className={SCHEMATIC} fill="none" aria-hidden>
      <IsoBox x={-88} y={0} z={-64} w={176} h={96} d={132} ox={ox} oy={oy} dashed delay={0} stroke="currentColor" strokeOpacity={0.5} fillOpacity={0} />
      {envelope.map((point, i) => (
        <Node key={`env-${i}`} x={point.x} y={point.y} muted />
      ))}

      <DrawLine x1={origin.x} y1={origin.y} x2={axis.x} y2={axis.y} stroke={ORANGE} strokeOpacity={0.28} delay={0.08} />
      <Node x={axis.x} y={axis.y} muted />
      <Leader from={aws} to={{ x: 318, y: aws.y }} />
      <Callout x={326} y={aws.y} title="AWS" muted />

      <IsoHexRing cx={0} cy={20} cz={0} r={62} ox={ox} oy={oy} delay={0.12} />
      {hex.map((point, i) => (
        <Node key={`hex-${i}`} x={point.x} y={point.y} />
      ))}
      <Leader from={k8s} to={{ x: 318, y: k8s.y + 18 }} />
      <Callout x={326} y={k8s.y + 18} title="K8S" />

      <IsoCylinder x={0} y={8} z={0} r={20} h={34} ox={ox} oy={oy} delay={0.2} label="PG" />
      <Node x={core.x} y={core.y} />

      {pods.map((pod) => (
        <g key={pod.angle}>
          <IsoBox x={pod.bx} y={10} z={pod.bz} w={16} h={14} d={16} ox={ox} oy={oy} delay={0.28 + pod.index * 0.06} />
          <DrawLine x1={core.x} y1={core.y} x2={pod.p.x} y2={pod.p.y} stroke={ORANGE} strokeOpacity={0.55} delay={0.34 + pod.index * 0.05} />
          <Node x={pod.p.x} y={pod.p.y} />
        </g>
      ))}
      <Leader from={docker} to={{ x: 44, y: docker.y + 36 }} />
      <Callout x={20} y={docker.y + 36} title="DOCKER" />

      <IsoCylinder x={-86} y={6} z={-6} r={11} h={18} ox={ox} oy={oy} delay={0.46} />
      <DrawLine x1={redis.x} y1={redis.y} x2={core.x} y2={core.y} stroke={ORANGE} strokeOpacity={0.4} delay={0.48} />
      <Leader from={redis} to={{ x: 36, y: redis.y - 12 }} />
      <Callout x={20} y={redis.y - 12} title="REDIS" />
      <Node x={redis.x} y={redis.y} />

      <Probe x={78} y={18} z={-6} ox={ox} oy={oy} delay={0.52} />
      <Leader from={prom} to={{ x: 318, y: prom.y }} />
      <Callout x={326} y={prom.y} title="PROM" />
      <Node x={prom.x} y={prom.y} />
    </svg>
  );
}

function AgentSchematic() {
  const ox = 70;
  const oy = 128;
  const a = iso(12, 22, 0, ox, oy);
  const c = iso(96, 22, 0, ox, oy);
  const g1 = iso(158, 54, -46, ox, oy);
  const g2 = iso(158, 6, 46, ox, oy);
  const merge = iso(220, 28, 0, ox, oy);
  const smith = iso(118, -24, 84, ox, oy);

  return (
    <svg viewBox="0 0 420 300" className={SCHEMATIC} fill="none" aria-hidden>
      <IsoBox x={0} y={10} z={-10} w={22} h={22} d={22} ox={ox} oy={oy} delay={0.04} />
      <IsoBox x={42} y={10} z={-10} w={22} h={22} d={22} ox={ox} oy={oy} delay={0.1} />
      <IsoBox x={84} y={10} z={-10} w={22} h={22} d={22} ox={ox} oy={oy} delay={0.16} />
      <DrawPath d={`M${a.x} ${a.y} L${iso(54, 22, 0, ox, oy).x} ${iso(54, 22, 0, ox, oy).y} L${c.x} ${c.y}`} stroke={ORANGE} delay={0.2} />
      <Callout x={18} y={a.y - 42} title="CHAIN" />

      <DrawPath d={`M${c.x} ${c.y} L${g1.x} ${g1.y} L${merge.x} ${merge.y}`} stroke={ORANGE} delay={0.28} />
      <DrawPath d={`M${c.x} ${c.y} L${g2.x} ${g2.y} L${merge.x} ${merge.y}`} stroke={ORANGE} delay={0.34} />
      <IsoDiamond x={158} y={42} z={-46} s={18} ox={ox} oy={oy} delay={0.32} />
      <IsoDiamond x={158} y={-6} z={46} s={18} ox={ox} oy={oy} delay={0.38} />
      <IsoDiamond x={220} y={16} z={0} s={20} ox={ox} oy={oy} delay={0.44} />
      <Callout x={332} y={g1.y} title="GRAPH" />

      <IsoDiamond x={118} y={-40} z={84} s={24} ox={ox} oy={oy} delay={0.5} />
      <DrawPath d={`M${merge.x} ${merge.y} L${smith.x} ${smith.y}`} stroke={ORANGE} delay={0.54} />
      <DrawPath
        d={`M${smith.x} ${smith.y} C ${a.x - 8} ${Math.min(smith.y + 72, 286)}, ${a.x - 36} ${a.y + 56}, ${a.x} ${a.y}`}
        stroke={ORANGE}
        strokeDasharray="4 4"
        delay={0.62}
      />
      <Node x={a.x} y={a.y} />
      <Node x={c.x} y={c.y} />
      <Node x={g1.x} y={g1.y} />
      <Node x={g2.x} y={g2.y} />
      <Node x={merge.x} y={merge.y} />
      <Node x={smith.x} y={smith.y} />
      <Callout x={188} y={Math.min(smith.y + 22, 288)} title="SMITH" />
    </svg>
  );
}

function IconSlab({
  cx,
  cy,
  w,
  h,
  depth,
  delay,
  children,
}: {
  cx: number;
  cy: number;
  w: number;
  h: number;
  depth: number;
  delay: number;
  children?: ReactNode;
}) {
  const top = `${cx},${cy - h} ${cx + w},${cy} ${cx},${cy + h * 0.45} ${cx - w},${cy}`;
  const left = `${cx - w},${cy} ${cx},${cy + h * 0.45} ${cx},${cy + h * 0.45 + depth} ${cx - w},${cy + depth}`;
  const right = `${cx + w},${cy} ${cx},${cy + h * 0.45} ${cx},${cy + h * 0.45 + depth} ${cx + w},${cy + depth}`;

  return (
    <g>
      <FadePoly points={left} stroke={ORANGE} fill={ORANGE} fillOpacity={0.05} delay={delay} />
      <FadePoly points={right} stroke={ORANGE} fill={ORANGE} fillOpacity={0.1} delay={delay + 0.04} />
      <FadePoly points={top} stroke={ORANGE} fill={ORANGE} fillOpacity={0.16} delay={delay + 0.08} />
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 0.16 }}>
        {children}
      </motion.g>
    </g>
  );
}

function IsoBox({
  x,
  y,
  z,
  w,
  h,
  d,
  ox,
  oy,
  delay = 0,
  stroke = ORANGE,
  strokeOpacity = 1,
  fillOpacity = 0.14,
  dashed = false,
}: {
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
  d: number;
  ox: number;
  oy: number;
  delay?: number;
  stroke?: string;
  strokeOpacity?: number;
  fillOpacity?: number;
  dashed?: boolean;
}) {
  const p = (xx: number, yy: number, zz: number) => iso(xx, yy, zz, ox, oy);
  const top = [p(x, y + h, z), p(x + w, y + h, z), p(x + w, y + h, z + d), p(x, y + h, z + d)];
  const east = [p(x + w, y, z), p(x + w, y + h, z), p(x + w, y + h, z + d), p(x + w, y, z + d)];
  const south = [p(x, y, z + d), p(x + w, y, z + d), p(x + w, y + h, z + d), p(x, y + h, z + d)];

  return (
    <g>
      <FadePoly points={pts(south)} stroke={stroke} strokeOpacity={strokeOpacity} fill={stroke} fillOpacity={fillOpacity * 0.45} delay={delay} dashed={dashed} />
      <FadePoly points={pts(east)} stroke={stroke} strokeOpacity={strokeOpacity} fill={stroke} fillOpacity={fillOpacity * 0.8} delay={delay + 0.04} dashed={dashed} />
      <FadePoly points={pts(top)} stroke={stroke} strokeOpacity={strokeOpacity} fill={stroke} fillOpacity={fillOpacity * 1.2} delay={delay + 0.08} dashed={dashed} />
    </g>
  );
}

function IsoCylinder({
  x,
  y,
  z,
  r,
  h,
  ox,
  oy,
  delay,
  label,
}: {
  x: number;
  y: number;
  z: number;
  r: number;
  h: number;
  ox: number;
  oy: number;
  delay: number;
  label?: string;
}) {
  const top = iso(x, y + h, z, ox, oy);
  const bot = iso(x, y, z, ox, oy);
  const rx = r * IX;
  const ry = r * IZ;

  return (
    <g>
      <DrawPath d={`M${bot.x - rx} ${bot.y} A${rx} ${ry} 0 0 0 ${bot.x + rx} ${bot.y}`} stroke={ORANGE} delay={delay} />
      <DrawLine x1={bot.x - rx} y1={bot.y} x2={top.x - rx} y2={top.y} stroke={ORANGE} delay={delay + 0.06} />
      <DrawLine x1={bot.x + rx} y1={bot.y} x2={top.x + rx} y2={top.y} stroke={ORANGE} delay={delay + 0.08} />
      <motion.ellipse
        cx={top.x}
        cy={top.y}
        rx={rx}
        ry={ry}
        stroke={ORANGE}
        fill={ORANGE}
        fillOpacity={0.08}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.1 }}
      />
      {label ? (
        <Label x={top.x - 8} y={top.y + 4} fill={ORANGE}>
          {label}
        </Label>
      ) : null}
    </g>
  );
}

function IsoHexRing({
  cx,
  cy,
  cz,
  r,
  ox,
  oy,
  delay,
}: {
  cx: number;
  cy: number;
  cz: number;
  r: number;
  ox: number;
  oy: number;
  delay: number;
}) {
  const points = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return iso(cx + Math.cos(a) * r, cy, cz + Math.sin(a) * r, ox, oy);
  });
  return <FadePoly points={pts(points)} stroke={ORANGE} fill="none" delay={delay} />;
}

function IsoDiamond({
  x,
  y,
  z,
  s,
  ox,
  oy,
  delay,
}: {
  x: number;
  y: number;
  z: number;
  s: number;
  ox: number;
  oy: number;
  delay: number;
}) {
  const p = (xx: number, yy: number, zz: number) => iso(xx, yy, zz, ox, oy);
  const top = p(x, y + s, z);
  const east = p(x + s, y, z);
  const south = p(x, y, z + s);
  const west = p(x - s, y, z);
  const north = p(x, y, z - s);
  const bot = p(x, y - s, z);

  return (
    <g>
      <FadePoly points={pts([top, north, east])} stroke={ORANGE} fill={ORANGE} fillOpacity={0.1} delay={delay} />
      <FadePoly points={pts([top, east, south])} stroke={ORANGE} fill={ORANGE} fillOpacity={0.06} delay={delay + 0.04} />
      <FadePoly points={pts([bot, south, east])} stroke={ORANGE} fill="none" delay={delay + 0.08} />
      <FadePoly points={pts([top, south, west])} stroke={ORANGE} fill="none" delay={delay + 0.1} />
    </g>
  );
}

function Probe({
  x,
  y,
  z,
  ox,
  oy,
  delay,
}: {
  x: number;
  y: number;
  z: number;
  ox: number;
  oy: number;
  delay: number;
}) {
  const base = iso(x, y, z, ox, oy);
  const tip = iso(x, y + 28, z, ox, oy);
  const dish = iso(x + 10, y + 22, z, ox, oy);
  return (
    <g>
      <DrawLine x1={base.x} y1={base.y} x2={tip.x} y2={tip.y} stroke={ORANGE} delay={delay} />
      <motion.circle
        cx={dish.x}
        cy={dish.y}
        r={8}
        stroke={ORANGE}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.1 }}
      />
      <motion.circle cx={dish.x} cy={dish.y} r={2} fill={ORANGE} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 0.16 }} />
    </g>
  );
}

function Callout({ x, y, title, sub, muted = false }: { x: number; y: number; title: string; sub?: string; muted?: boolean }) {
  return (
    <g>
      <Label x={x} y={y} fill={muted ? "currentColor" : ORANGE} opacity={muted ? 0.5 : 1}>
        {title}
      </Label>
      {sub ? (
        <Label x={x} y={y + 12} opacity={0.45}>
          {sub}
        </Label>
      ) : null}
    </g>
  );
}

function Node({ x, y, muted = false }: { x: number; y: number; muted?: boolean }) {
  return <circle cx={x} cy={y} r={muted ? 1.6 : 2.15} fill={muted ? "currentColor" : ORANGE} fillOpacity={muted ? 0.45 : 1} />;
}

function Leader({ from, to }: { from: { x: number; y: number }; to: { x: number; y: number } }) {
  return (
    <g>
      <line x1={from.x} y1={from.y} x2={to.x - 8} y2={to.y} stroke={ORANGE} strokeOpacity="0.45" />
      <circle cx={to.x - 8} cy={to.y} r="1.8" fill={ORANGE} />
    </g>
  );
}

function Label({
  x,
  y,
  children,
  fill = "currentColor",
  opacity = 1,
}: {
  x: number | string;
  y: number | string;
  children: string;
  fill?: string;
  opacity?: number;
}) {
  return (
    <text x={x} y={y} fill={fill} fillOpacity={opacity} fontSize="9" letterSpacing="1.4" style={{ fontFamily: MONO }}>
      {children}
    </text>
  );
}

function FadePoly({
  delay = 0,
  dashed = false,
  ...props
}: ComponentProps<typeof motion.polygon> & { delay?: number; dashed?: boolean }) {
  return (
    <motion.polygon
      strokeWidth="1.1"
      strokeDasharray={dashed ? "4 4" : undefined}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    />
  );
}

function DrawPath({
  delay = 0,
  ...props
}: ComponentProps<typeof motion.path> & { delay?: number }) {
  return (
    <motion.path
      fill="none"
      strokeWidth="1.15"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    />
  );
}

function DrawLine({
  delay = 0,
  ...props
}: ComponentProps<typeof motion.line> & { delay?: number }) {
  return (
    <motion.line
      strokeWidth="1.15"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    />
  );
}
