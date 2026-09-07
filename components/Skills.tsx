"use client";

import { SKILL_GROUPS } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/ui/FadeIn";

export function Skills() {
  return (
    <section id="skills" className="border-b border-line px-5 py-12 md:px-10">
      <FadeIn>
        <SectionLabel>Skills & tools</SectionLabel>
        <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
          {SKILL_GROUPS.map((group) => (
            <div key={group.title} className="bg-bg p-5">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                {group.title}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex min-h-8 items-center border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors hover:border-fg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
