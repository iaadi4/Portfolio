"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Github, Linkedin, Twitter, FileText, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import LeetCodeIcon     from "./icons/LeetCodeIcon";
import CodeChefIcon     from "./icons/CodeChefIcon";
import CodeforcesIcon   from "./icons/CodeforcesIcon";
const TYPING_STRINGS = [
  "Full Stack Developer",
  "Rust Enthusiast",
  "Web3 Builder",
  "DevOps Engineer",
  "Backend Architect",
];

function TypewriterText() {
  const [idx,     setIdx]   = useState(0);
  const [charIdx, setChar]  = useState(0);
  const [deleting, setDel]  = useState(false);
  const [display,  setDisp] = useState("");

  useEffect(() => {
    const cur = TYPING_STRINGS[idx];
    let t: NodeJS.Timeout;
    if (!deleting) {
      if (charIdx < cur.length) {
        t = setTimeout(() => { setDisp(cur.slice(0, charIdx + 1)); setChar(c => c + 1); }, 65 + Math.random() * 35);
      } else {
        t = setTimeout(() => setDel(true), 1800);
      }
    } else {
      if (charIdx > 0) {
        t = setTimeout(() => { setDisp(cur.slice(0, charIdx - 1)); setChar(c => c - 1); }, 32);
      } else {
        t = setTimeout(() => {
          setDel(false);
          setIdx(i => (i + 1) % TYPING_STRINGS.length);
        }, 32);
      }
    }
    return () => clearTimeout(t);
  }, [charIdx, deleting, idx]);

  return (
    <span className="text-primary">
      {display}
      <span className="cursor-blink inline-block w-px h-[1em] bg-primary align-middle ml-0.5" />
    </span>
  );
}

const SOCIALS = [
  { href: "https://github.com/iaadi4",                                   label: "GitHub",     Icon: Github },
  { href: "https://www.linkedin.com/in/adityasingh40675/",               label: "LinkedIn",   Icon: Linkedin },
  { href: "https://x.com/iaadi8",                                        label: "X / Twitter",Icon: Twitter },
  { href: "https://leetcode.com/u/iaadi4/",                              label: "LeetCode",   Icon: LeetCodeIcon },
  { href: "https://www.codechef.com/users/iaadi7",                       label: "CodeChef",   Icon: CodeChefIcon },
  { href: "https://codeforces.com/profile/chineseremaindertheoram",      label: "Codeforces", Icon: CodeforcesIcon },
  { href: "mailto:adityasingh40675@gmail.com",                           label: "Email",      Icon: Mail },
];

export default function Hero() {
  return (
    <section className="pb-8">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.15 }}
        className="pt-5"
      >
        {/* Avatar + name row */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-shrink-0">
            <Image
              src="https://avatars.githubusercontent.com/iaadi4"
              alt="Aditya Singh"
              width={64}
              height={64}
              className="w-16 h-16 block object-cover"
              style={{ border: "1px solid hsl(var(--border))" }}
            />
            {/* Online dot */}
            <span className="absolute bottom-0.5 right-0.5 flex items-center justify-center w-3 h-3">
              <span className="absolute inline-flex w-full h-full rounded-full bg-primary opacity-50 animate-ping" />
              <span className="relative w-2 h-2 rounded-full bg-primary border border-card" />
            </span>
          </div>

          <div className="min-w-0">
            <h1
              className="glitch-text text-[22px] font-extrabold tracking-tight text-foreground leading-tight"
              data-text="Aditya Singh"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Aditya Singh
            </h1>
            <div
              className="text-[12px] mt-0.5 leading-snug"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              <TypewriterText />
            </div>
          </div>
        </div>

        {/* Location chip */}
        <div
          className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground border border-border px-2 py-1 mb-4"
          style={{ fontFamily: "monospace" }}
        >
          <span className="text-primary">◈</span>
          IIIT Ranchi · India
        </div>

        {/* Bio — consistent green left border, no colored inline pills */}
        <p
          className="text-[13px] text-muted-foreground mb-5 leading-relaxed border-l-2 pl-3"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            borderLeftColor: "hsl(var(--primary))",
          }}
        >
          Pre-final year @{" "}
          <strong className="text-foreground font-semibold">IIIT Ranchi</strong>.{" "}
          Building high-perf web apps, backend architecture &amp; cloud infrastructure.
          Currently deep in{" "}
          <strong className="text-primary font-semibold">Web3</strong>,{" "}
          <strong className="text-primary font-semibold">Rust</strong> and{" "}
          <strong className="text-primary font-semibold">Next.js</strong>.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            { value: "10+",     label: "Projects" },
            { value: "2 YRS",   label: "Experience" },
            { value: "Rust+TS", label: "Core Stack" },
          ].map(s => (
            <div
              key={s.label}
              className="py-2 px-1 text-center border border-border"
              style={{ background: "hsl(var(--card))" }}
            >
              <div
                className="text-[15px] font-bold text-primary leading-none mb-0.5"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {s.value}
              </div>
              <div
                className="text-[9px] text-muted-foreground tracking-widest uppercase"
                style={{ fontFamily: "monospace" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Social icons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {SOCIALS.map(({ href, label, Icon }) => (
            <Link
              key={label}
              href={href}
              target={href.startsWith("mailto") ? "_self" : "_blank"}
              title={label}
              className="group flex items-center justify-center w-8 h-8 border border-border text-muted-foreground transition-all hover:border-primary hover:text-primary hover:bg-primary/8"
            >
              <Icon size={14} />
            </Link>
          ))}
        </div>

        {/* Resume button */}
        <Link
          href="https://drive.google.com/file/d/11i5VdNwoAH3aCR4YobdH1kvjh3x9lDIP/view?usp=drive_link"
          target="_blank"
          className="group flex items-center gap-2 w-full px-4 py-2.5 border border-border text-foreground text-[12px] font-semibold tracking-widest uppercase transition-all hover:border-primary hover:text-primary hover:bg-primary/8"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          <FileText size={13} />
          View Resume
          <span className="ml-auto opacity-40 group-hover:opacity-80 transition-opacity">↗</span>
        </Link>
      </motion.div>
    </section>
  );
}