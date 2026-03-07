"use client";

import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  FileText,
  Mail,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import LeetCodeIcon from "./icons/LeetCodeIcon";
import CodeChefIcon from "./icons/CodeChefIcon";
import CodeforcesIcon from "./icons/CodeforcesIcon";

export default function Hero() {
  return (
    <section className="pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-foreground">
          Aditya Singh
        </h1>
        <h2 className="text-base text-muted-foreground mb-6">
          Full Stack, Devops & Web3 Developer
        </h2>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          I'm a pre-final year student at{" "}
          <strong className="font-medium text-foreground">IIIT Ranchi</strong>.
          I build high performance and scalable web applications, specializing
          in backend architecture and cloud infrastructure. Currently exploring
          <span className="inline-block mx-1 shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
            Web3
          </span>{" "}
          and building with
          <span className="inline-block mx-1 shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">
            Rust
          </span>{" "}
          and
          <span className="inline-block mx-1 shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
            Next.js
          </span>
          .
        </p>

        <div className="flex flex-col gap-4 items-start mt-6">
          <div className="flex gap-4 items-center">
            <Link
              href="https://github.com/iaadi4"
              target="_blank"
              className="text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/adityasingh40675/"
              target="_blank"
              className="text-[#0A66C2] hover:opacity-80 transition-opacity"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </Link>
            <Link
              href="https://x.com/iaadi8"
              target="_blank"
              className="text-black dark:text-white hover:opacity-70 transition-opacity"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </Link>
            <Link
              href="https://leetcode.com/u/iaadi4/"
              target="_blank"
              className="text-[#f89a00] hover:opacity-80 transition-opacity"
              aria-label="LeetCode"
            >
              <LeetCodeIcon size={20} />
            </Link>
            <Link
              href="https://www.codechef.com/users/iaadi7"
              target="_blank"
              className="text-[#a1a839] hover:opacity-80 transition-opacity"
              aria-label="CodeChef"
            >
              <CodeChefIcon size={20} />
            </Link>
            <Link
              href="https://codeforces.com/profile/chineseremaindertheoram"
              target="_blank"
              className="text-[#1f8acb] hover:opacity-80 transition-opacity"
              aria-label="Codeforces"
            >
              <CodeforcesIcon size={20} />
            </Link>
            <Link
              href="mailto:adityasingh40675@gmail.com"
              className="text-[#D44638] hover:opacity-80 transition-opacity"
              aria-label="Email"
            >
              <Mail size={20} />
            </Link>
          </div>
          <Link
            href="https://drive.google.com/file/d/1NrWAPDCwGvzhtjTz2acgSd9F2PoCyvf5/view?usp=drive_link"
            target="_blank"
            className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition-colors"
          >
            <FileText size={16} />
            <span>Resume</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
