"use client";

import { useState } from "react";
import Link from "next/link";
import { DATA } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/ui/FadeIn";
import { CropFrame } from "@/components/ui/CropFrame";
import { cn } from "@/lib/utils";

type Diagram = "circles" | "pyramid" | "venn" | "hex";

export function Projects() {
  const [active, setActive] = useState(0);

  return (
    <section id="projects" className="border-b border-line px-5 py-12 md:px-10">
      <FadeIn>
        <div className="mb-8 flex items-end justify-between gap-4">
          <SectionLabel>Projects</SectionLabel>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-muted sm:block">
            {String(DATA.projects.length).padStart(2, "0")}
          </span>
        </div>
      </FadeIn>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {DATA.projects.map((project, index) => {
          const inverted = active === index;
          return (
            <FadeIn key={project.title} delay={index * 0.06}>
              <article
                onMouseEnter={() => setActive(index)}
                onClick={() => setActive(index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActive(index);
                  }
                }}
                tabIndex={0}
                className={cn(
                  "notch-card flex h-full cursor-pointer flex-col border transition-colors",
                  inverted
                    ? "border-orange bg-orange text-[#121212]"
                    : "border-line bg-card text-card-fg"
                )}
              >
                <div className="flex items-start justify-between px-5 pt-5">
                  <h3 className="text-lg font-bold tracking-tight">{project.title}</h3>
                  <span className="font-mono text-[11px] opacity-60">
                    {String(index + 1).padStart(3, "0")}
                  </span>
                </div>

                <div className="px-5 py-6">
                  <CropFrame className="text-cream/80">
                    <div className="relative flex h-36 items-center justify-center overflow-hidden bg-[#161616] text-cream">
                      <div className="absolute inset-0 bg-stipple-light" />
                      <span className="absolute inset-x-2 top-1/2 h-px bg-cream/20" />
                      <span className="absolute inset-y-2 left-1/2 w-px bg-cream/20" />
                      <span className="absolute inset-x-2 top-2 h-px bg-cream/10" />
                      <span className="absolute inset-x-2 bottom-2 h-px bg-cream/10" />
                      <span className="absolute inset-y-2 left-2 w-px bg-cream/10" />
                      <span className="absolute inset-y-2 right-2 w-px bg-cream/10" />
                      <div className="relative">
                        <ProjectDiagram type={project.diagram} />
                      </div>
                    </div>
                  </CropFrame>
                </div>

                <div className={cn("mx-5 h-px", inverted ? "bg-[#121212]/20" : "bg-line")} />

                <div className="relative flex flex-1 flex-col px-5 py-4">
                  <span
                    className="pointer-events-none absolute top-1 bottom-4 right-3 hidden w-px bg-[radial-gradient(circle,currentColor_0.7px,transparent_0.8px)] bg-size-[1px_7px] opacity-25 sm:block"
                    aria-hidden
                  />
                  <p className="text-xs leading-relaxed opacity-80">{project.description}</p>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] opacity-55">
                    {project.tech.join(" · ")}
                  </p>
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      "notch-cta mt-5 inline-flex min-h-10 items-center justify-center px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] transition-colors",
                      inverted
                        ? "bg-[#121212] text-cream hover:bg-[#1a1a1a]"
                        : "bg-[#121212] text-cream hover:bg-orange hover:text-[#121212] dark:bg-[#121212]"
                    )}
                  >
                    Source
                  </Link>
                </div>
              </article>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}

function ProjectDiagram({ type }: { type: Diagram }) {
  const common = {
    viewBox: "0 0 120 120",
    className: "h-24 w-24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.1,
  };

  if (type === "circles") {
    return (
      <svg {...common} aria-hidden>
        <line x1="10" y1="60" x2="110" y2="60" strokeOpacity="0.4" />
        <line x1="60" y1="10" x2="60" y2="110" strokeOpacity="0.4" />
        <circle cx="60" cy="60" r="36" />
        <circle cx="60" cy="60" r="24" />
        <circle cx="60" cy="60" r="12" />
        <circle cx="24" cy="60" r="1.6" fill="currentColor" />
        <circle cx="96" cy="60" r="1.6" fill="currentColor" />
        <circle cx="60" cy="24" r="1.6" fill="currentColor" />
        <circle cx="60" cy="96" r="1.6" fill="currentColor" />
        <circle cx="60" cy="60" r="2.2" fill="currentColor" />
      </svg>
    );
  }

  if (type === "pyramid") {
    return (
      <svg {...common} aria-hidden>
        <line x1="16" y1="92" x2="104" y2="92" strokeOpacity="0.35" />
        <line x1="60" y1="12" x2="60" y2="104" strokeOpacity="0.35" />
        <polygon points="60,18 96,92 24,92" />
        <line x1="60" y1="18" x2="60" y2="92" />
        <line x1="24" y1="92" x2="78" y2="48" />
        <line x1="96" y1="92" x2="42" y2="48" />
        <circle cx="60" cy="18" r="1.8" fill="currentColor" />
        <circle cx="24" cy="92" r="1.8" fill="currentColor" />
        <circle cx="96" cy="92" r="1.8" fill="currentColor" />
      </svg>
    );
  }

  if (type === "venn") {
    return (
      <svg {...common} aria-hidden>
        <line x1="16" y1="64" x2="104" y2="64" strokeOpacity="0.3" />
        <line x1="60" y1="16" x2="60" y2="104" strokeOpacity="0.3" />
        <circle cx="48" cy="58" r="26" />
        <circle cx="72" cy="58" r="26" />
        <circle cx="60" cy="78" r="26" />
        <circle cx="48" cy="58" r="1.7" fill="currentColor" />
        <circle cx="72" cy="58" r="1.7" fill="currentColor" />
        <circle cx="60" cy="78" r="1.7" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg {...common} aria-hidden>
      <line x1="16" y1="60" x2="104" y2="60" strokeOpacity="0.3" />
      <line x1="60" y1="12" x2="60" y2="108" strokeOpacity="0.3" />
      <polygon points="60,16 98,38 98,82 60,104 22,82 22,38" />
      <polygon points="60,34 82,47 82,73 60,86 38,73 38,47" />
      <line x1="60" y1="16" x2="60" y2="104" />
      <circle cx="60" cy="16" r="1.6" fill="currentColor" />
      <circle cx="98" cy="38" r="1.6" fill="currentColor" />
      <circle cx="22" cy="38" r="1.6" fill="currentColor" />
      <circle cx="60" cy="104" r="1.6" fill="currentColor" />
    </svg>
  );
}
