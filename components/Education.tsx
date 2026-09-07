"use client";

import { DATA } from "@/lib/data";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/ui/FadeIn";
import { CropFrame } from "@/components/ui/CropFrame";
import { ArcField } from "@/components/ui/ArcField";

export function Education() {
  const edu = DATA.education[0];

  return (
    <section id="education" className="flex h-full flex-col">
      <FadeIn delay={0.05} className="flex h-full min-h-0 flex-col">
        <div className="border-b border-line px-5 pt-10 pb-6 md:px-10 md:pt-12 md:pb-8">
          <SectionLabel>Education</SectionLabel>
          <div className="mt-8">
            <div className="notch-card border border-line bg-card p-4 text-card-fg md:p-5">
              <div className="flex items-start gap-3 md:gap-4">
                <CropFrame className="text-card-fg/35">
                  <div className="flex h-14 w-14 items-center justify-center bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={edu.logo} alt={edu.institution} className="h-10 w-10 object-contain" />
                  </div>
                </CropFrame>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold tracking-tight md:text-lg">{edu.institution}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed opacity-70">{edu.degree}</p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] opacity-55">
                    {edu.date}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-36 shrink-0 overflow-hidden md:h-40">
          <div className="absolute inset-0 bg-grain opacity-40" />
          <div className="absolute inset-x-3 inset-y-2">
            <ArcField className="h-full w-full" />
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
