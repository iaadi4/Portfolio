"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Terminal } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  year?: string;
  status?: "live" | "wip" | "archived";
  image?: string;
  accentColor?: string;
}

const projects: Project[] = [
  {
    title: "InkLink",
    description:
      "Real-time collaborative workspace with Excalidraw-like features. Draw, plan, and brainstorm together using shared TypeScript interfaces, WebSockets, and background job processing.",
    tech: ["Next.js", "Express", "WebSockets", "BullMQ", "Redis"],
    link: "https://github.com/iaadi4/inklink",
    year: "2025",
    status: "live",
    image: "/projects/inklink.png",
    accentColor: "#818cf8",
  },
  {
    title: "Ora",
    description:
      "Voice journaling app with AI transcription and emotion analysis. Features secure authentication via BetterAuth, cloud storage on AWS S3, and seamless audio playback.",
    tech: ["Next.js", "FastAPI", "OpenAI Whisper", "AWS S3"],
    link: "https://github.com/iaadi4/ora",
    year: "2025",
    status: "live",
    image: "/projects/ora.png",
    accentColor: "#c084fc",
  },
  {
    title: "SEO Boost",
    description:
      "Instant technical SEO audit tool. Run a professional audit in seconds and get a beautiful, actionable report telling you exactly what to fix to rank higher on Google.",
    tech: ["Next.js", "TypeScript", "SEO", "Analytics"],
    link: "https://github.com/iaadi4/SeoBoost",
    year: "2025",
    status: "live",
    image: "/projects/seoboost.png",
    accentColor: "#4ade80",
  },
  {
    title: "FocusOS",
    description:
      "Master your digital life. Combines powerful site blocking, browsing analytics, and flow-state tools into one beautiful Firefox extension dashboard.",
    tech: ["TypeScript", "WebExtension", "Firefox", "IndexedDB"],
    link: "https://github.com/iaadi4/FocusOS",
    year: "2025",
    status: "live",
    image: "/projects/focusos.png",
    accentColor: "#a78bfa",
  },
  {
    title: "Brutalist",
    description:
      "A brutalism archive documenting the raw, unfiltered architectural ethos — origins, global reach, India's scene, and its eventual downfall.",
    tech: ["Next.js", "Framer Motion", "Editorial Design"],
    link: "https://github.com/iaadi4/Brutalist",
    year: "2025",
    status: "live",
    image: "/projects/brutalist.png",
    accentColor: "#f59e0b",
  },
  {
    title: "Promlite",
    description:
      "Lightweight, zero-dependency Prometheus client for TypeScript with 150+ npm downloads. Strict-typed Counter, Gauge, and Histogram primitives.",
    tech: ["TypeScript", "Monitoring", "npm"],
    link: "https://github.com/iaadi4/promlite",
    year: "2024",
    status: "live",
    accentColor: "#fb923c",
  },
  {
    title: "Anvil",
    description:
      "Powerful CLI tool for rapidly bootstrapping modern web applications with production-ready configurations and best-in-class tooling.",
    tech: ["TypeScript", "CLI", "Developer Tools"],
    link: "https://github.com/iaadi4/anvil",
    year: "2024",
    status: "archived",
    accentColor: "#94a3b8",
  },
];

const STATUS_STYLES = {
  live:     { label: "LIVE",     color: "#4ade80", bg: "rgba(74,222,128,0.1)",   border: "rgba(74,222,128,0.3)" },
  wip:      { label: "WIP",      color: "#fbbf24", bg: "rgba(251,191,36,0.1)",   border: "rgba(251,191,36,0.3)" },
  archived: { label: "ARCHIVED", color: "#94a3b8", bg: "rgba(148,163,184,0.1)", border: "rgba(148,163,184,0.3)" },
};

/* ── Image card ─────────────────────────────────────────────────────── */
function ImageProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const status = STATUS_STYLES[project.status ?? "live"];
  const accent = project.accentColor ?? "#4ade80";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="flex flex-col"
    >
      <Link href={project.link} target="_blank" className="block group h-full">
        <motion.div
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          animate={hovered ? { y: -4, x: -3 } : { y: 0, x: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="border border-border overflow-hidden h-full flex flex-col"
          style={{
            background: "hsl(var(--card))",
            borderLeftWidth: 3,
            borderLeftColor: hovered ? accent : "hsl(var(--border))",
            boxShadow: hovered ? `4px 4px 0px ${accent}55` : "none",
            transition: "border-color 0.15s, box-shadow 0.15s",
          }}
        >
          {/* ── Screenshot ── */}
          <div className="relative overflow-hidden flex-shrink-0" style={{ height: 156, background: "#050a05" }}>
            <Image
              src={project.image!}
              alt={`${project.title} screenshot`}
              fill
              className="object-cover object-top"
              style={{
                transform: hovered ? "scale(1.06)" : "scale(1)",
                filter: hovered ? "brightness(1) saturate(1)" : "brightness(0.72) saturate(0.8)",
                transition: "transform 0.5s ease, filter 0.3s ease",
              }}
            />

            {/* CRT scanlines over image */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)",
              }}
            />

            {/* Fade into card body */}
            <div
              className="absolute bottom-0 left-0 right-0 h-14 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--card)))" }}
            />

            {/* Accent top strip */}
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: accent }} />

            {/* Badges */}
            {project.status && (
              <div
                className="absolute top-2 left-2 text-[9px] px-1.5 py-0.5 font-semibold tracking-widest"
                style={{
                  fontFamily: "monospace",
                  color: status.color,
                  background: "rgba(0,0,0,0.82)",
                  border: `1px solid ${status.border}`,
                }}
              >
                {status.label}
              </div>
            )}
            {project.year && (
              <div
                className="absolute top-2 right-2 text-[9px] px-1.5 py-0.5"
                style={{
                  fontFamily: "monospace",
                  background: "rgba(0,0,0,0.75)",
                  color: "#9ca3af",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {project.year}
              </div>
            )}

            {/* Hover overlay CTA */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: `${accent}12` }}
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-2 px-3 py-1.5 text-[11px] font-semibold"
                    style={{
                      fontFamily: "monospace",
                      background: "rgba(0,0,0,0.88)",
                      color: accent,
                      border: `1px solid ${accent}`,
                    }}
                  >
                    <Github size={12} /> view on github
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Card body */}
          <div className="p-4 flex flex-col flex-1">
            <div className="flex items-center justify-between mb-2">
              <span
                className="font-bold text-sm"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  color: hovered ? accent : "hsl(var(--foreground))",
                  transition: "color 0.15s",
                }}
              >
                {project.title}
              </span>
              <motion.div animate={{ opacity: hovered ? 1 : 0.25 }} transition={{ duration: 0.15 }}>
                <ExternalLink size={12} className="text-muted-foreground flex-shrink-0 ml-2" />
              </motion.div>
            </div>

            <p
              className="text-xs text-muted-foreground mb-3 leading-relaxed"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-auto">
              {project.tech.map((tag, i) => (
                <span
                  key={i}
                  className="text-[9px] px-2 py-0.5 border text-muted-foreground"
                  style={{
                    fontFamily: "monospace",
                    background: "hsl(var(--background))",
                    borderColor: hovered ? `${accent}45` : "hsl(var(--border))",
                    transition: "border-color 0.15s",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

/* ── Text-only card ─────────────────────────────────────────────────── */
function TextProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const status = STATUS_STYLES[project.status ?? "live"];
  const accent = project.accentColor ?? "#4ade80";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className="flex flex-col"
    >
      <Link href={project.link} target="_blank" className="block group h-full">
        <motion.div
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          animate={hovered ? { y: -4, x: -2 } : { y: 0, x: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="h-full p-4 border border-border flex flex-col"
          style={{
            background: "hsl(var(--card))",
            borderLeftWidth: 3,
            borderLeftColor: hovered ? accent : "hsl(var(--border))",
            boxShadow: hovered ? `4px 4px 0px ${accent}55` : "none",
            transition: "border-color 0.15s, box-shadow 0.15s",
          }}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Terminal
                size={14}
                className="flex-shrink-0 transition-colors"
                style={{ color: hovered ? accent : "hsl(var(--muted-foreground))", transition: "color 0.15s" }}
              />
              <span
                className="font-bold text-sm"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  color: hovered ? accent : "hsl(var(--foreground))",
                  transition: "color 0.15s",
                }}
              >
                {project.title}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {project.status && (
                <span
                  className="text-[9px] px-1.5 py-0.5 font-semibold tracking-widest"
                  style={{ fontFamily: "monospace", color: status.color, background: status.bg, border: `1px solid ${status.border}` }}
                >
                  {status.label}
                </span>
              )}
              {project.year && (
                <span className="text-[9px] text-muted-foreground" style={{ fontFamily: "monospace" }}>
                  {project.year}
                </span>
              )}
            </div>
          </div>

          <p
            className="text-xs text-muted-foreground mb-4 leading-relaxed"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((tag, i) => (
              <span
                key={i}
                className="text-[9px] px-2 py-0.5 border border-border text-muted-foreground"
                style={{ fontFamily: "monospace", background: "hsl(var(--background))" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

/* ── Section ────────────────────────────────────────────────────────── */
export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const imageProjects = projects.filter((p) => p.image);
  const textProjects  = projects.filter((p) => !p.image);

  return (
    <section ref={ref} className="py-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <span
            className="relative inline-flex h-2 w-2 rounded-full"
            style={{ background: "#fbbf24", boxShadow: "0 0 8px rgba(251,191,36,0.7)" }}
          />
          <h3
            className="text-lg font-bold text-foreground"
            style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-0.02em" }}
          >
            Projects
          </h3>
          <div className="flex-1 h-px bg-border" />
          <span className="text-[10px] text-muted-foreground tracking-widest" style={{ fontFamily: "monospace" }}>
            {projects.length} repos
          </span>
        </div>

        {/* Image cards – 2 col grid, equal height rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 auto-rows-fr">
          {imageProjects.map((project, index) => (
            <ImageProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Divider */}
        {textProjects.length > 0 && (
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[9px] text-muted-foreground tracking-widest px-2" style={{ fontFamily: "monospace" }}>
              MORE PROJECTS
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
        )}

        {/* Text-only cards — equal height */}
        {textProjects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-fr">
            {textProjects.map((project, index) => (
              <TextProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        )}

        {/* GitHub footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-5 flex justify-end"
        >
          <Link
            href="https://github.com/iaadi4"
            target="_blank"
            className="flex items-center gap-2 text-[10px] text-muted-foreground hover:text-primary transition-colors"
            style={{ fontFamily: "monospace" }}
          >
            <Github size={12} />
            more on github ↗
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}