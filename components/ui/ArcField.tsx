"use client";

import { useId } from "react";
import { motion } from "framer-motion";

const BASE = 148;
const END = 378;
const CREAM = "#e8e3d5";
const ORANGE = "#ff5f2e";

const ARCS = [
  { start: 16, peakX: 148, peakY: 8 },
  { start: 44, peakX: 174, peakY: 20 },
  { start: 72, peakX: 200, peakY: 32 },
  { start: 100, peakX: 226, peakY: 44 },
  { start: 128, peakX: 252, peakY: 56 },
  { start: 156, peakX: 278, peakY: 68 },
  { start: 184, peakX: 304, peakY: 80 },
  { start: 212, peakX: 326, peakY: 92 },
  { start: 240, peakX: 346, peakY: 104 },
  { start: 268, peakX: 362, peakY: 116 },
  { start: 296, peakX: 372, peakY: 128 },
];

export function ArcField({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const stipple = `arc-stipple-${uid}`;
  const wash = `arc-wash-${uid}`;

  return (
    <svg
      viewBox="0 0 400 188"
      className={`h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <pattern id={stipple} width="3.2" height="3.2" patternUnits="userSpaceOnUse">
          <circle cx="0.7" cy="0.7" r="0.55" fill={CREAM} fillOpacity="0.55" />
        </pattern>
        <linearGradient id={wash} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={CREAM} stopOpacity="0.22" />
          <stop offset="0.72" stopColor={CREAM} stopOpacity="0.08" />
          <stop offset="1" stopColor={ORANGE} stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {ARCS.map((arc, index) => {
        const curve = `M${arc.start} ${BASE} Q ${arc.peakX} ${arc.peakY} ${END} ${BASE}`;
        return (
          <g key={arc.start}>
            <path d={`${curve} L${arc.start} ${BASE} Z`} fill={`url(#${wash})`} fillOpacity={0.85 - index * 0.04} />
            <path d={`${curve} L${arc.start} ${BASE} Z`} fill={`url(#${stipple})`} />
          </g>
        );
      })}

      {ARCS.map((arc) => (
        <line
          key={`ray-${arc.start}`}
          x1={END}
          y1={BASE}
          x2={arc.peakX}
          y2={arc.peakY}
          stroke={CREAM}
          strokeOpacity="0.12"
          strokeWidth="0.6"
          strokeDasharray="2 3"
        />
      ))}

      <line x1="12" y1={BASE} x2={END} y2={BASE} stroke={CREAM} strokeOpacity="0.38" strokeWidth="0.8" />
      <line x1={END} y1="14" x2={END} y2={BASE} stroke={CREAM} strokeOpacity="0.22" strokeWidth="0.7" />
      <line x1="12" y1="14" x2="12" y2={BASE} stroke={CREAM} strokeOpacity="0.12" strokeWidth="0.6" />

      {ARCS.map((arc) => (
        <g key={`tick-${arc.start}`}>
          <line
            x1={arc.start}
            y1={BASE}
            x2={arc.start}
            y2={BASE + 6}
            stroke={CREAM}
            strokeOpacity="0.4"
            strokeWidth="0.7"
          />
          <circle cx={arc.peakX} cy={arc.peakY} r="1.15" fill={CREAM} fillOpacity="0.45" />
        </g>
      ))}

      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={`axis-${i}`}
          x1={END - 4}
          y1={22 + i * 26}
          x2={END + 4}
          y2={22 + i * 26}
          stroke={CREAM}
          strokeOpacity="0.2"
          strokeWidth="0.6"
        />
      ))}

      {ARCS.map((arc, index) => (
        <motion.path
          key={`stroke-${arc.start}`}
          d={`M${arc.start} ${BASE} Q ${arc.peakX} ${arc.peakY} ${END} ${BASE}`}
          fill="none"
          stroke={CREAM}
          strokeWidth="0.75"
          strokeOpacity={0.88}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.2, delay: 0.035 * index, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}

      <circle cx={END} cy={BASE} r="5.5" fill="none" stroke={ORANGE} strokeOpacity="0.45" strokeWidth="0.7" />
      <circle cx={END} cy={BASE} r="2.2" fill={ORANGE} />
    </svg>
  );
}
