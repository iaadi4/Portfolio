"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// ── Shared section header ─────────────────────────────────────────────
export function SectionHeader({
  dot,
  title,
  right,
  animate = false,
}: {
  dot: string;
  title: string;
  right?: string;
  animate?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="relative flex h-2 w-2 flex-shrink-0">
        {animate && (
          <span
            className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping"
            style={{ background: dot }}
          />
        )}
        <span
          className="relative h-2 w-2 rounded-full"
          style={{ background: dot, boxShadow: `0 0 6px ${dot}80` }}
        />
      </span>
      <h3
        className="text-base font-bold text-foreground"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {title}
      </h3>
      <div className="flex-1 h-px bg-border" />
      {right && (
        <span
          className="text-[10px] text-muted-foreground tracking-widest"
          style={{ fontFamily: "monospace" }}
        >
          {right}
        </span>
      )}
    </div>
  );
}

// ── Skill data ────────────────────────────────────────────────────────
// Note: Next.js uses the wordmark SVG (white-friendly), Solana uses correct logo
type Skill = {
  name: string;
  logo: string;
  darkInvert?: boolean;
};

type SkillCategory = {
  title: string;
  accent: string;
  emoji: string;
  skills: Skill[];
};

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    accent: "#60a5fa",
    emoji: "⌨",
    skills: [
      { name: "Rust",       logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg",          darkInvert: true },
      { name: "C++",        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
      { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
      { name: "SQL",        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
      { name: "Python",     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
    ],
  },
  {
    title: "Frameworks",
    accent: "#4ade80",
    emoji: "🌿",
    skills: [
      { name: "React.js",
        // React original — accurate
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { name: "Next.js",
        // Use the plain wordmark that renders well on dark backgrounds
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-plain.svg",
        darkInvert: true },
      { name: "Express.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
        darkInvert: true },
      { name: "Axum (Rust)",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg",
        darkInvert: true },
      { name: "TailwindCSS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Shadcn UI",
        // No official devicon — use a neutral component icon
        logo: "https://avatars.githubusercontent.com/u/139895814?s=200&v=4" },
    ],
  },
  {
    title: "Cloud & Databases",
    accent: "#fbbf24",
    emoji: "☁",
    skills: [
      { name: "AWS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
        darkInvert: true },
      { name: "Docker",     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
      { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
      { name: "MongoDB",    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
      { name: "Redis",      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
      { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg" },
      { name: "Nginx",      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg" },
      { name: "Prometheus", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-original.svg" },
      { name: "Grafana",    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg" },
    ],
  },
  {
    title: "Web3",
    accent: "#c084fc",
    emoji: "⛓",
    skills: [
      { name: "Solana",
        // Correct Solana logo from official CDN
        logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png" },
      { name: "Web3.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
      { name: "Anchor",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg",
        darkInvert: true },
      { name: "Solidity",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/solidity/solidity-original.svg",
        darkInvert: true },
    ],
  },
];

export default function Skills() {
  return (
    <section className="py-1">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <SectionHeader dot="#4ade80" title="Skills" right="TECH_STACK.md" animate />

        <div className="space-y-6">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: ci * 0.07 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[13px]" aria-hidden>{cat.emoji}</span>
                <span
                  className="text-[10px] font-semibold tracking-widest uppercase"
                  style={{ fontFamily: "monospace", color: cat.accent }}
                >
                  {cat.title}
                </span>
                <div className="flex-1 h-px" style={{ background: `${cat.accent}22` }} />
                <span
                  className="text-[9px] w-5 h-5 flex items-center justify-center border font-semibold"
                  style={{
                    fontFamily: "monospace",
                    color: cat.accent,
                    borderColor: `${cat.accent}35`,
                    background: `${cat.accent}10`,
                  }}
                >
                  {cat.skills.length}
                </span>
              </div>

              {/* Chips */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, si) => (
                  <motion.span
                    key={si}
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2, delay: si * 0.03 }}
                    whileHover={{
                      y: -2,
                      borderColor: cat.accent,
                      color: cat.accent,
                      backgroundColor: `${cat.accent}0d`,
                      transition: { duration: 0.1 },
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 border border-border text-[12px] text-muted-foreground cursor-default select-none"
                    style={{
                      background: "hsl(var(--card))",
                      fontFamily: "'IBM Plex Mono', monospace",
                      transition: "all 0.15s",
                    }}
                  >
                    <Image
                      src={skill.logo}
                      alt={skill.name}
                      width={14}
                      height={14}
                      className={`w-3.5 h-3.5 object-contain ${
                        skill.darkInvert ? "dark:brightness-0 dark:invert" : ""
                      }`}
                    />
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}