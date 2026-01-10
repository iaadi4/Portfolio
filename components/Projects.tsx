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
    <section className="py-8 max-w-2xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="text-xl font-semibold mb-6">Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <Link key={index} href={project.link} target="_blank">
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group h-full p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-lg dark:hover:shadow-neutral-900/50 transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <Folder
                      size={20}
                      className="text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors"
                    />
                    <span className="font-semibold text-base">
                      {project.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {project.year && (
                      <span className="text-xs font-mono text-neutral-400">
                        {project.year}
                      </span>
                    )}
                    <ExternalLink
                      size={14}
                      className="text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>

                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-600 dark:text-neutral-400"
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
