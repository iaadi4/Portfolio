"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, FileText, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="pt-20 pb-12 max-w-2xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
          Aditya Singh
        </h1>
        <h2 className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-6 opacity-60">
          Full Stack, Devops & Web3 Developer
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
          I'm a Founding Engineer at{" "}
          <Link
            href="https://www.draviya.com"
            target="_blank"
            className="font-medium text-neutral-900 dark:text-white inline-flex items-center gap-1 hover:underline"
          >
            Draviya
            <ExternalLink size={14} className="inline" />
          </Link>{" "}
          and a pre-final year student at{" "}
          <strong className="font-medium text-neutral-900 dark:text-white">
            IIIT Ranchi
          </strong>
          . I build high performance and scalable web applications, specializing
          in backend architecture, DevOps, and cloud infrastructure. Currently
          exploring
          <span className="inline-block mx-1 px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-sm font-medium">
            Web3
          </span>{" "}
          and building with
          <span className="inline-block mx-1 px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-sm font-medium">
            Rust
          </span>{" "}
          and
          <span className="inline-block mx-1 px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded text-sm font-medium">
            Next.js
          </span>
          .
        </p>

        <div className="flex gap-5 items-center flex-wrap">
          <Link
            href="https://github.com/iaadi4"
            target="_blank"
            className="text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github size={22} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/adityasingh40675/"
            target="_blank"
            className="text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={22} />
          </Link>
          <Link
            href="https://x.com/iaadi8"
            target="_blank"
            className="text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
            aria-label="Twitter"
          >
            <Twitter size={22} />
          </Link>
          <Link
            href="mailto:adityasingh40675@gmail.com"
            className="text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail size={22} />
          </Link>
          <Link
            href="https://drive.google.com/file/d/1NpxFv6u-0WxuK_HD-bzUsEIuEKk8qmwF/view?usp=sharing"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white dark:bg-white dark:text-black rounded-full text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
          >
            <FileText size={16} />
            <span>Resume</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
