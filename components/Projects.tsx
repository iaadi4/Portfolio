"use client";

import { motion } from "framer-motion";
import { Folder, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  year?: string;
}

const projects: Project[] = [
  {
    title: "InkLink",
    description:
      "Real-time collaborative workspace with Excalidraw-like features. Draw, plan, and brainstorm together using shared TypeScript interfaces, WebSockets, and background job processing.",
    tech: ["Next.js", "Express", "WebSockets", "BullMQ", "Redis"],
    link: "https://github.com/iaadi4/inklink",
    year: "2025",
  },
  {
    title: "Ora",
    description:
      "Voice journaling app with AI transcription and emotion analysis. Features secure authentication via BetterAuth, cloud storage on AWS S3, and seamless audio playback.",
    tech: ["Next.js", "FastAPI", "OpenAI Whisper", "AWS S3"],
    link: "https://github.com/iaadi4/ora",
    year: "2025",
  },
  {
    title: "Promlite",
    description:
      "Lightweight, zero-dependency Prometheus client for TypeScript. Strict-typed metric library with 150+ npm downloads featuring Counter, Gauge, and Histogram primitives.",
    tech: ["TypeScript", "Monitoring", "DevOps"],
    link: "https://github.com/iaadi4/promlite",
    year: "2024",
  },
  {
    title: "Anvil",
    description:
      "Powerful CLI tool built in TypeScript for rapidly bootstrapping modern web applications with production-ready configurations and best-in-class tooling.",
    tech: ["TypeScript", "CLI", "Developer Tools"],
    link: "https://github.com/iaadi4/anvil",
    year: "2024",
  },
];

export default function Projects() {
  return (
    <section className="py-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-500"></span>
          Projects
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <Link key={index} href={project.link} target="_blank">
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group h-full p-5 rounded-xl border border-border hover:border-amber-500/50 hover:bg-card transition-all bg-background border-l-2 border-l-transparent hover:border-l-amber-500"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <Folder
                      size={20}
                      className="text-muted-foreground group-hover:text-foreground transition-colors"
                    />
                    <span className="font-semibold text-base text-foreground">
                      {project.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {project.year && (
                      <span className="text-xs font-mono text-muted-foreground">
                        {project.year}
                      </span>
                    )}
                    <ExternalLink
                      size={14}
                      className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tag, i) => (
                    <span
                      key={i}
                      className="shrink-0 inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5 text-[10px] font-medium bg-muted/50 text-muted-foreground group-hover:bg-background border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
