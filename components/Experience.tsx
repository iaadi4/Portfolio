"use client";

import { ArrowUpRight } from "lucide-react";
import { DATA } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/ui/FadeIn";

export function Experience() {
  return (
    <section id="experience" className="flex h-full flex-col">
      <FadeIn className="flex h-full flex-col">
        <div className="px-5 pt-10 md:px-10 md:pt-12">
          <SectionLabel>Experience</SectionLabel>
        </div>
        <div className="mt-10 grid flex-1 md:mt-8 md:grid-rows-4">
          {DATA.experience.map((exp, index) => {
            const title = (
              <h3 className="text-sm font-semibold tracking-tight md:text-base">{exp.company}</h3>
            );

            return (
              <div
                key={exp.company}
                className="flex items-center border-b border-line px-5 py-6 last:border-b-0 md:px-10 md:py-0"
              >
                <div className="grid w-full grid-cols-[auto_1fr] items-center gap-4">
                  <span className="font-mono text-[11px] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {"href" in exp && exp.href ? (
                    <a
                      href={exp.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-4"
                    >
                      <LogoMark src={exp.logo} alt={exp.company} />
                      <div className="flex min-w-0 flex-1 flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-1">
                        <div>
                          <span className="inline-flex items-center gap-1.5 transition-colors hover:text-orange">
                            {title}
                            <ArrowUpRight size={13} className="opacity-50" />
                          </span>
                          <p className="mt-1.5 text-sm text-muted md:mt-0.5">{exp.role}</p>
                        </div>
                        <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-muted md:text-right">
                          {exp.date}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4">
                      <LogoMark src={exp.logo} alt={exp.company} />
                      <div className="flex min-w-0 flex-1 flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-1">
                        <div>
                          {title}
                          <p className="mt-1.5 text-sm text-muted md:mt-0.5">{exp.role}</p>
                        </div>
                        <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-muted md:text-right">
                          {exp.date}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}

const LOCAL_LOGOS = new Set([
  "/iiit-ranchi.svg",
  "/iiit-ranchi.png",
  "/hog.png",
  "/tutedude.svg",
  "/hellohospital.svg",
  "/hellohospital.png",
  "/draviya.png",
]);

export function LogoMark({ src, alt }: { src: string; alt: string }) {
  const initials = alt
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden border border-line bg-white font-mono text-[11px] text-card-fg">
      {LOCAL_LOGOS.has(src) ? (
        // Brand marks stay on <img> so SVGs and mislabeled files still render.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src.includes("tutedude") ? "https://tutedude.com/apple-touch-icon.png" : src}
          alt={alt}
          className={src.includes("tutedude") ? "h-full w-full object-cover" : "h-full w-full object-contain p-1"}
        />
      ) : (
        initials
      )}
    </div>
  );
}
