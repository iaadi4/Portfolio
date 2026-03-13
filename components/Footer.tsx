"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative border-t border-border overflow-hidden mt-16" style={{ background:"hsl(var(--card))" }}>
      <div className="footer-stamp absolute inset-0 flex items-center justify-center overflow-hidden" aria-hidden>
        ADITYA.DEV
      </div>
      <div className="absolute top-0 left-6 text-4xl opacity-10 pointer-events-none select-none" aria-hidden>🌿</div>
      <div className="absolute top-0 right-6 text-4xl opacity-10 pointer-events-none select-none" style={{transform:"scaleX(-1)"}} aria-hidden>🌿</div>

      <motion.div
        initial={{ opacity:0, y:10 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }}
        className="relative z-10 max-w-2xl mx-auto px-6 py-8 text-center"
      >
        <p className="text-[12px] text-muted-foreground mb-1" style={{ fontFamily:"'IBM Plex Mono',monospace" }}>
          © {new Date().getFullYear()} Aditya Singh — all rights reserved
        </p>
        <p className="text-[11px] text-muted-foreground/50" style={{ fontFamily:"'IBM Plex Mono',monospace" }}>
          Built with Next.js, Rust (spiritually), and Caffeine 🌿
        </p>
      </motion.div>
    </footer>
  );
}