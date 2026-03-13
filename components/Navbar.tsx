"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Skills",     href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects" },
  { label: "Blogs",      href: "#blogs" },
  { label: "Activity",   href: "#activity" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-border"
      style={{
        background: scrolled
          ? "hsl(var(--background) / 0.96)"
          : "hsl(var(--background))",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "background 0.3s",
      }}
    >
      {/*
        Mirror the exact page layout:
        max-w-5xl px-4 sm:px-6  →  [260px sidebar]  [gap-14 = 56px]  [flex-1 content]
        Logo sits in the 260px block, nav links start at the content column.
      */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-11 flex items-center gap-14">

        {/* Logo — fixed 260px, same as aside width */}
        <Link
          href="/"
          className="flex items-center gap-2 text-[13px] font-semibold text-foreground hover:text-primary transition-colors flex-shrink-0"
          style={{ fontFamily: "'IBM Plex Mono', monospace", width: "260px" }}
        >
          <span className="text-primary font-bold">◈</span>
          aditya.dev
        </Link>

        {/* Right column: nav links + status — flex-1, same as content div */}
        <div className="flex items-center flex-1 min-w-0">
          {/* Nav links (hidden on mobile) */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="relative px-3 py-1.5 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors tracking-widest uppercase group"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {item.label}
                  <span className="absolute bottom-0.5 left-3 right-3 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Status — always pushed to far right */}
          <div
            className="ml-auto flex items-center gap-2 text-[11px] text-muted-foreground"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            <span
              className="w-2 h-2 rounded-full bg-primary flex-shrink-0"
              style={{ boxShadow: "0 0 6px hsl(var(--primary) / 0.8)" }}
            />
            <span className="hidden sm:inline">available for work</span>
          </div>
        </div>

      </div>
    </motion.nav>
  );
}