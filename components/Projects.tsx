"use client";

import { motion, useInView } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
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
}

const projects: Project[] = [
  {
    title: "InkLink",
    description: "Real-time collaborative workspace with Excalidraw-like features. Draw, plan, and brainstorm together using shared TypeScript interfaces, WebSockets, and background job processing.",
    tech: ["Next.js", "Express", "WebSockets", "BullMQ"],
    link: "https://github.com/iaadi4/inklink",
    year: "2025",
    status: "live",
    image: "/projects/inklink.png",
  },
  {
    title: "Ora",
    description: "Voice journaling app with AI transcription and emotion analysis. Features secure authentication via BetterAuth, cloud storage on AWS S3, and seamless audio playback.",
    tech: ["Next.js", "FastAPI", "OpenAI Whisper"],
    link: "https://github.com/iaadi4/ora",
    year: "2025",
    status: "live",
    image: "/projects/ora.png",
  },
  {
    title: "SEO Boost",
    description: "Instant technical SEO audit tool. Run a professional audit in seconds and get a beautiful, actionable report telling you exactly what to fix to rank higher on Google.",
    tech: ["Next.js", "TypeScript", "SEO", "Analytics"],
    link: "https://github.com/iaadi4/SeoBoost",
    year: "2025",
    status: "live",
    image: "/projects/seoboost.png",
  },
  {
    title: "FocusOS",
    description: "Master your digital life. Combines powerful site blocking, browsing analytics, and flow-state tools into one beautiful Firefox extension dashboard.",
    tech: ["TypeScript", "WebExtension", "Firefox"],
    link: "https://github.com/iaadi4/FocusOS",
    year: "2025",
    status: "live",
    image: "/projects/focusos.png",
  },
  {
    title: "Brutalist",
    description: "A brutalism archive documenting the raw, unfiltered architectural ethos — origins, global reach, India's scene, and its eventual downfall.",
    tech: ["Next.js", "Framer Motion", "Editorial Design"],
    link: "https://github.com/iaadi4/Brutalist",
    year: "2025",
    status: "live",
    image: "/projects/brutalist.png",
  },
  {
    title: "Promlite",
    description: "Lightweight, zero-dependency Prometheus client for TypeScript with 150+ npm downloads. Strict-typed Counter, Gauge, and Histogram primitives.",
    tech: ["TypeScript", "Monitoring", "npm"],
    link: "https://github.com/iaadi4/promlite",
    year: "2024",
    status: "live",
  },
  {
    title: "Anvil",
    description: "Powerful CLI tool for rapidly bootstrapping modern web applications with production-ready configurations and best-in-class tooling.",
    tech: ["TypeScript", "CLI", "Developer Tools"],
    link: "https://github.com/iaadi4/anvil",
    year: "2024",
    status: "archived",
  },
];

function ImageProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="flex flex-col group h-full"
    >
      <Link href={project.link} target="_blank" className="block h-full cursor-pointer">
        <div 
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="h-full flex flex-col transition-all duration-500 overflow-hidden rounded-md border border-white/5 bg-[#080808] hover:border-primary/40 relative"
        >
          {/* Cover Image */}
          <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-black flex-shrink-0">
            <Image
              src={project.image!}
              alt={project.title}
              fill
              className="object-cover object-top transition-transform duration-700 ease-out"
              style={{ transform: hovered ? "scale(1.05)" : "scale(1)", filter: hovered ? "grayscale(0%)" : "grayscale(100%)" }}
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 bg-black/50 p-2 rounded-full backdrop-blur-sm border border-white/10">
               <ArrowUpRight size={18} />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tech.map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] uppercase tracking-widest font-semibold text-gray-500 px-3 py-1 border border-white/10 rounded-full group-hover:border-primary/20 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function TextProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="flex flex-col group h-full"
    >
      <Link href={project.link} target="_blank" className="block h-full cursor-pointer">
        <div className="h-full p-6 flex flex-col transition-all duration-500 overflow-hidden rounded-md border border-white/5 bg-[#080808] hover:border-primary/40 relative">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-white leading-tight group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
            <ArrowUpRight size={20} className="text-gray-500 group-hover:text-primary transition-colors duration-300" />
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
             {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tech.map((tag, i) => (
              <span
                key={i}
                className="text-[10px] uppercase tracking-widest font-semibold text-gray-500 px-3 py-1 border border-white/10 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const imageProjects = projects.filter((p) => p.image);
  const textProjects  = projects.filter((p) => !p.image);

  return (
    <section ref={ref} className="w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
            Selected <span className="text-primary">Work.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 mb-10">
          {imageProjects.map((project, index) => (
            <ImageProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {textProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {textProjects.map((project, index) => (
              <TextProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}