"use client";

import { motion } from "framer-motion";
import { DATA } from "@/lib/data";
import { Capabilities } from "@/components/Capabilities";

export function Hero() {
  return (
    <section
      id="intro"
      className="flex flex-col justify-between border-b border-line px-5 py-8 md:px-10 md:py-12 lg:min-h-[calc(100svh-3.5rem)]"
    >
      <div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 inline-flex items-stretch border border-line"
        >
          <span className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-orange" />
            {DATA.pill}
          </span>
          <span className="w-10 bg-hatch" aria-hidden />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="max-w-xl text-[2rem] font-bold leading-[1.08] tracking-tight text-fg sm:text-4xl md:text-6xl"
        >
          {DATA.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6 max-w-md text-sm leading-relaxed text-muted md:text-base"
        >
          {DATA.bio}
        </motion.p>
      </div>

      <Capabilities />
    </section>
  );
}
