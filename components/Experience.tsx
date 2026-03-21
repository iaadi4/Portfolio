"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "./Skills";

const experiences = [
  {
    company: "Draviya",
    role: "Founding Engineer (Full Stack)",
    period: "Dec 2025 – Present",
    tags: ["Rust", "PostgreSQL", "FinTech"],
    description: [
      "Architecting a high throughput FinTech exchange with a hybrid ledger system using PostgreSQL and on-chain logic.",
      "Implementing core backend services in Rust for type safety and low latency financial settlements.",
      "Establishing KYC/AML compliance pipelines and secure authentication flows for the MVP.",
    ],
    link: "https://draviya.com",
  },
  {
    company: "House of Geeks, IIIT Ranchi",
    role: "Software Dev Wing Lead & Coordinator",
    period: "Mar 2025 – Present",
    tags: ["Leadership", "Hackathon", "Mentorship"],
    description: [
      "Leading 30+ developers, conducting code reviews and enforcing clean architecture standards.",
      "Organizing the Quasar 2.0 Hackathon — managing technical logistics for 50+ participating teams.",
    ],
  },
];

export default function Experience() {
  return (
    <section className="py-1">
      <motion.div
        initial={{ opacity:0, y:18 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }}
        transition={{ duration:0.45 }}
      >
        <SectionHeader dot="#4ade80" title="Experience" right="WORK_LOG.json" />

        <div className="relative">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity:0, x:-14 }}
              whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.35, delay:i*0.12 }}
              className="relative mb-6 last:mb-0"
            >
              {/* Card */}
              <div
                className="border border-border p-4 transition-colors"
                style={{
                  background:"hsl(var(--card))",
                  borderLeft:"3px solid hsl(var(--border))",
                  transition:"border-color 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={e=>{
                  (e.currentTarget as HTMLElement).style.borderLeftColor="#4ade80";
                  (e.currentTarget as HTMLElement).style.boxShadow="4px 4px 0px rgba(74,222,128,0.25)";
                }}
                onMouseLeave={e=>{
                  (e.currentTarget as HTMLElement).style.borderLeftColor="hsl(var(--border))";
                  (e.currentTarget as HTMLElement).style.boxShadow="none";
                }}
              >
                {/* Company + period */}
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <h4 className="font-bold text-[15px] text-foreground" style={{ fontFamily:"'Syne',sans-serif" }}>
                    {exp.link ? (
                      <Link href={exp.link} target="_blank" className="inline-flex items-center gap-1.5 hover:text-primary transition-colors">
                        {exp.company}
                        <ExternalLink size={13} className="text-muted-foreground" />
                      </Link>
                    ) : exp.company}
                  </h4>
                  <span
                    className="text-[11px] text-muted-foreground border border-border px-2 py-0.5 flex-shrink-0"
                    style={{ fontFamily:"monospace" }}
                  >
                    {exp.period}
                  </span>
                </div>

                {/* Role */}
                <p className="text-[12px] text-primary font-semibold mb-3" style={{ fontFamily:"monospace" }}>
                  ↳ {exp.role}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {exp.tags.map((tag, ti) => (
                    <span
                      key={ti}
                      className="text-[10px] px-2 py-0.5 font-medium"
                      style={{
                        fontFamily:"monospace",
                        background:"hsl(var(--primary) / 0.1)",
                        color:"hsl(var(--primary))",
                        border:"1px solid hsl(var(--primary) / 0.25)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bullets */}
                <ul className="space-y-1.5">
                  {exp.description.map((d, di) => (
                    <li key={di} className="flex gap-2 text-[12px] text-muted-foreground leading-relaxed" style={{ fontFamily:"'IBM Plex Mono',monospace" }}>
                      <span className="text-primary flex-shrink-0 mt-0.5 font-bold">›</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}