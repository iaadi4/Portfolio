"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-[100] px-6 sm:px-12 py-6 flex justify-between items-center bg-transparent pointer-events-none"
    >
      {/* Left Logo */}
      <div className="pointer-events-auto flex items-center gap-2">
        <Link href="/" className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2 group">
          aditya<span className="text-primary text-3xl leading-[0] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">.</span>
        </Link>
      </div>

      {/* Right Menu - Creative Badge & Link */}
      <div className="pointer-events-auto flex items-center gap-4 md:gap-6">
        <div className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-[#1a1a1a]/80 backdrop-blur-md rounded-full border border-white/10 shadow-[0_0_10px_rgba(249,115,22,0.1)] cursor-default">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
          </span>
          <span className="text-xs font-bold text-gray-300 uppercase tracking-widest pl-1">Available for work</span>
        </div>

        <Link 
          href="mailto:adityasingh40675@gmail.com" 
          className="flex items-center gap-2 text-white hover:text-black bg-transparent hover:bg-white px-5 py-2 rounded-full border border-white/20 transition-all uppercase text-xs tracking-widest font-bold group"
        >
          Let's Talk
          <MoveUpRight size={14} className="group-hover:rotate-45 transition-transform" />
        </Link>
      </div>
    </motion.nav>
  );
}