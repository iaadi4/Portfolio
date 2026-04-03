"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import Link from "next/link";
import LeetCodeIcon from "./icons/LeetCodeIcon";
import CodeChefIcon from "./icons/CodeChefIcon";
import CodeforcesIcon from "./icons/CodeforcesIcon";

const SOCIALS = [
  { href: "https://github.com/iaadi4", label: "GitHub", Icon: Github },
  {
    href: "https://www.linkedin.com/in/adityasingh40675/",
    label: "LinkedIn",
    Icon: Linkedin,
  },
  { href: "https://x.com/iaadi8", label: "X", Icon: Twitter },
  {
    href: "https://leetcode.com/u/iaadi4/",
    label: "LeetCode",
    Icon: LeetCodeIcon,
  },
  {
    href: "https://www.codechef.com/users/iaadi7",
    label: "CodeChef",
    Icon: CodeChefIcon,
  },
  {
    href: "https://codeforces.com/profile/chineseremaindertheoram",
    label: "Codeforces",
    Icon: CodeforcesIcon,
  },
  { href: "mailto:adityasingh40675@gmail.com", label: "Email", Icon: Mail },
];

const STATS = [
  { value: "10+", label: "Projects" },
  { value: "2 YRS", label: "Experience" },
  { value: "TS", label: "Core Stack" },
];

export default function Hero() {
  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden flex flex-col">

      {/* ── Background Diagonal Marquees ── */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
        {/* Tape 1 — White */}
        <div className="absolute w-[160vw] bg-white transform -rotate-[10deg] py-2.5 flex overflow-hidden shadow-xl z-10 left-[-30vw] top-[40%] md:top-[66%]">
          <div className="animate-marquee flex items-center gap-10 text-black font-extrabold text-xl md:text-2xl tracking-widest uppercase">
            {Array.from({ length: 15 }).map((_, i) => (
              <span key={`mq1-${i}`} className="flex items-center gap-10 whitespace-nowrap">
                RUST &bull; NEXT.JS &bull; WEB3 &bull; DEVOPS
              </span>
            ))}
          </div>
        </div>

        {/* Tape 2 — Dark */}
        <div className="absolute w-[160vw] bg-[#111] border-y border-[#2a2a2a] transform rotate-[16deg] py-3 flex overflow-hidden shadow-2xl z-20 left-[-30vw] top-[48%] md:top-[52%]">
          <div
            className="animate-marquee flex items-center gap-6 text-white font-bold text-lg md:text-xl tracking-[0.2em] uppercase"
            style={{ animationDirection: "reverse", animationDuration: "28s" }}
          >
            {Array.from({ length: 15 }).map((_, i) => (
              <span key={`mq2-${i}`} className="flex items-center gap-6 whitespace-nowrap">
                SOFTWARE ENGINEER <span className="text-primary">•</span>{" "}
                FULL-STACK <span className="text-primary">•</span> ARCHITECTURE{" "}
                <span className="text-primary">•</span> BACKEND
              </span>
            ))}
          </div>
        </div>
      </div>


      {/* ── Hero Title — sits in the upper portion ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-30 w-full select-none pt-[20vh] md:pt-[15vh]"
      >
        <h1 className="w-full max-w-[1500px] mx-auto text-[clamp(2.5rem,11vw,12rem)] font-black leading-[0.85] tracking-tighter text-white uppercase flex flex-col drop-shadow-2xl">
          {/* Row 1: Like 'BRAND.' */}
          <div className="flex justify-start pl-[5vw] md:pl-[12%]">
            <span>
              Full-Stack<span className="text-primary text-[clamp(3rem,12vw,14rem)] leading-[0]">.</span>
            </span>
          </div>

          {/* Row 2: Like 'IN-HOUSE' */}
          <div className="flex justify-start pl-[5vw] md:pl-[48%] -mt-1 md:-mt-4">
            <span className="text-primary">
              Web3
            </span>
          </div>

          {/* Row 3: Like 'DEVELOPMENT' */}
          <div className="flex justify-start pl-[5vw] md:pl-[18%] -mt-1 md:-mt-4">
            <span>
              Developer
            </span>
          </div>
        </h1>
      </motion.div>

      {/* ── Description — sits below the animation zone ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        className="relative z-30 flex flex-col items-center px-6 mt-auto mb-8 md:mb-12"
      >
        <p className="text-gray-400 text-sm md:text-base tracking-wide leading-relaxed text-center max-w-md md:max-w-xl">
          Pre-final year @ IIIT Ranchi. Building high-perf web apps, backend
          architecture &amp; cloud infrastructure. Currently deep in Rust
          &amp; Web3.
        </p>
      </motion.div>

      {/* ── Bottom Bar: Socials | View Resume | Stats ── */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        className="relative z-30 w-full"
      >
        {/* Mobile layout */}
        <div className="flex flex-col items-center gap-5 px-4 pb-8 pt-6 lg:hidden">
          {/* View Resume */}
          <Link
            href="https://drive.google.com/file/d/11i5VdNwoAH3aCR4YobdH1kvjh3x9lDIP/view?usp=drive_link"
            target="_blank"
            className="group relative inline-flex items-center justify-center px-10 py-3.5 text-sm font-bold text-black bg-white rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
          >
            <span className="absolute inset-0 bg-primary -translate-x-[105%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            <span className="relative flex items-center gap-2 group-hover:text-white transition-colors">
              View Resume <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </Link>

          {/* Socials */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {SOCIALS.map(({ href, label, Icon }) => (
              <Link
                key={label}
                href={href}
                target={href.startsWith("mailto") ? "_self" : "_blank"}
                title={label}
                className="text-gray-400 hover:text-white transition-all p-2.5 border border-gray-800 bg-white/5 rounded-full hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_12px_var(--color-primary)]"
              >
                <Icon size={17} />
              </Link>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 text-[10px] font-bold tracking-[0.18em] text-gray-500 uppercase border-t border-white/10 pt-4 w-full justify-center">
            {STATS.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-0.5">
                <span className="text-white text-base font-black">{value}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop layout — single pill-bar */}
        <div className="hidden lg:flex items-center justify-between px-10 xl:px-16 py-5 border-t border-white/[0.07] bg-black/30 backdrop-blur-sm">
          {/* Left: socials */}
          <div className="flex items-center gap-2.5">
            {SOCIALS.map(({ href, label, Icon }) => (
              <Link
                key={label}
                href={href}
                target={href.startsWith("mailto") ? "_self" : "_blank"}
                title={label}
                className="text-gray-500 hover:text-white transition-all p-2.5 border border-transparent hover:border-primary/40 hover:bg-primary/10 hover:shadow-[0_0_12px_var(--color-primary)] rounded-full"
              >
                <Icon size={16} />
              </Link>
            ))}
          </div>

          {/* Center: CTA */}
          <Link
            href="https://drive.google.com/file/d/11i5VdNwoAH3aCR4YobdH1kvjh3x9lDIP/view?usp=drive_link"
            target="_blank"
            className="group relative inline-flex items-center justify-center px-9 py-3 text-sm font-bold text-black bg-white rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_24px_rgba(255,255,255,0.15)]"
          >
            <span className="absolute inset-0 bg-primary -translate-x-[105%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            <span className="relative flex items-center gap-2 group-hover:text-white transition-colors">
              View Resume <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </Link>

          {/* Right: stats */}
          <div className="flex items-center gap-8 text-[10px] font-bold tracking-[0.18em] text-gray-500 uppercase">
            {STATS.map(({ value, label }, i) => (
              <div key={label} className="flex items-center gap-8">
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-white text-xl font-black">{value}</span>
                  <span>{label}</span>
                </div>
                {i < STATS.length - 1 && (
                  <div className="w-px h-6 bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
