"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

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
    <section className="w-full">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
            Career <span className="text-primary">Journey.</span>
          </h2>
        </div>

        <div className="flex flex-col relative before:absolute before:inset-0 before:top-2 before:bottom-2 before:left-[11px] before:w-px before:bg-white/10 ml-2">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative pl-10 mb-16 last:mb-0 group"
            >
              {/* Timeline marker */}
              <div className="absolute left-[7px] top-[7px] w-[9px] h-[9px] rounded-full bg-white group-hover:bg-primary group-hover:scale-150 transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.4)] group-hover:shadow-[0_0_15px_var(--color-primary)]" />
              
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors flex items-center gap-2">
                  {exp.link ? (
                    <Link href={exp.link} target="_blank" className="flex items-center gap-2 hover:underline decoration-primary underline-offset-4">
                      {exp.company}
                      <ExternalLink size={16} className="text-gray-500 hover:text-white" />
                    </Link>
                  ) : (
                    exp.company
                  )}
                </h3>
                <span className="text-sm font-light text-gray-500 uppercase tracking-widest mt-1 md:mt-0">
                  {exp.period}
                </span>
              </div>
              
              <p className="text-lg text-gray-300 font-medium mb-4">
                {exp.role}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {exp.tags.map((tag, ti) => (
                  <span
                    key={ti}
                    className="text-[10px] uppercase tracking-widest font-semibold text-gray-400 px-3 py-1 border border-white/10 rounded-full bg-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <ul className="space-y-3">
                {exp.description.map((desc, di) => (
                  <li key={di} className="flex gap-4 text-sm text-gray-400 leading-relaxed font-light">
                    <ArrowRight size={16} className="text-primary flex-shrink-0 mt-0.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                    {desc}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}