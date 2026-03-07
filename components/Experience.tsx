"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string[];
  link?: string;
}

const experiences: ExperienceItem[] = [
  {
    company: "Draviya",
    role: "Founding Engineer (Full Stack)",
    period: "Dec 2025 – Present",
    description: [
      "Architecting a high throughput FinTech exchange, designing a hybrid ledger system using PostgreSQL and on-chain logic.",
      "Implementing core backend services in Rust to ensure type safety and low latency execution for financial settlements.",
      "Establishing KYC/AML compliance pipelines and secure authentication flows for the initial MVP release.",
    ],
    link: "https://draviya.com", // Placeholder or from resume if available (resume has icon but no visible link text, assuming placeholder or omit)
  },
  {
    company: "House of Geeks, IIIT Ranchi",
    role: "Software Development Wing Lead & Coordinator",
    period: "Mar 2025 – Present",
    description: [
      "Leading a team of 30+ developers, conducting code reviews and enforcing clean architecture standards.",
      "Organizing the Quasar 2.0 Hackathon, managing technical logistics for 50+ participating teams.",
    ],
  },
];

export default function Experience() {
  return (
    <section className="py-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-foreground">
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 bg-blue-500"></span>
          </span>
          Experience
        </h3>
        <div className="relative border-l border-border ml-3 space-y-10">
          {experiences.map((exp, index) => (
            <div key={index} className="ml-6 relative">
              <div className="absolute -left-[31px] top-1.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-background" />
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                <h4 className="font-medium text-lg text-foreground">
                  {exp.link ? (
                    <Link
                      href={exp.link}
                      target="_blank"
                      className="inline-flex items-center gap-1 hover:underline text-foreground"
                    >
                      {exp.company}
                      <ExternalLink
                        size={14}
                        className="inline text-muted-foreground"
                      />
                    </Link>
                  ) : (
                    exp.company
                  )}
                </h4>
                <span className="text-sm text-muted-foreground mt-1 sm:mt-0">
                  {exp.period}
                </span>
              </div>
              <p className="text-sm text-foreground mb-3 font-medium">
                {exp.role}
              </p>
              <ul className="list-disc list-outside ml-4 space-y-1.5 text-sm text-muted-foreground">
                {exp.description.map((desc, i) => (
                  <li key={i} className="leading-relaxed">
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
