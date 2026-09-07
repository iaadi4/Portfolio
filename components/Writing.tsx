"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DATA } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/ui/FadeIn";

export function Writing() {
  return (
    <section id="writing" className="border-b border-line px-5 py-12 md:px-10">
      <FadeIn>
        <SectionLabel>Writing</SectionLabel>
        <Link href={DATA.blog.link} target="_blank" rel="noreferrer" className="group mt-8 block">
          <div className="flex flex-col justify-between gap-5 border border-line bg-card px-4 py-5 text-card-fg transition-colors hover:border-orange hover:bg-orange sm:px-6 sm:py-7 md:flex-row md:items-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] opacity-60">{DATA.blog.date}</p>
              <h3 className="mt-2 max-w-2xl text-lg font-bold tracking-tight sm:text-xl md:text-2xl">{DATA.blog.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {DATA.blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-current/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-current/30 transition-colors group-hover:bg-[#121212] group-hover:text-cream">
              <ArrowUpRight size={18} />
            </div>
          </div>
        </Link>
      </FadeIn>
    </section>
  );
}
