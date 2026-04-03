"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-white/10 bg-black pt-16 pb-12 mt-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col md:flex-row items-center justify-between flex-wrap gap-6"
      >
        <div className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
          aditya<span className="text-primary text-4xl leading-[0]">.</span>
        </div>
        
        <p className="text-sm font-semibold tracking-widest uppercase text-gray-500">
          © {new Date().getFullYear()} Aditya Singh
        </p>
        
        <p className="text-sm text-gray-400 font-light text-center md:text-right max-w-sm">
          Built with precision, <span className="text-primary font-semibold">Rust</span> conceptually, and relentless iteration.
        </p>
      </motion.div>
    </footer>
  );
}