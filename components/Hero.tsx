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
        <img
          src="https://avatars.githubusercontent.com/iaadi4"
          alt="Aditya Singh"
          className="w-24 h-24 rounded-full border border-border shadow-sm object-cover mb-4"
        />
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
          <div className="flex gap-4 items-center pl-1">
            {[
              { href: "https://github.com/iaadi4", label: "GitHub", Icon: Github, color: "text-[#181717] dark:text-[#F0F6FC]", target: "_blank" },
              { href: "https://www.linkedin.com/in/adityasingh40675/", label: "LinkedIn", Icon: Linkedin, color: "text-[#0A66C2]", target: "_blank" },
              { href: "https://x.com/iaadi8", label: "X (Twitter)", Icon: Twitter, color: "text-[#000000] dark:text-[#E7E9EA]", target: "_blank" },
              { href: "https://leetcode.com/u/iaadi4/", label: "LeetCode", Icon: LeetCodeIcon, color: "text-[#FFA116]", target: "_blank" },
              { href: "https://www.codechef.com/users/iaadi7", label: "CodeChef", Icon: CodeChefIcon, color: "text-[#5B4638] dark:text-[#EAE6DF]", target: "_blank" },
              { href: "https://codeforces.com/profile/chineseremaindertheoram", label: "Codeforces", Icon: CodeforcesIcon, color: "text-[#1F8ACB]", target: "_blank" },
              { href: "mailto:adityasingh40675@gmail.com", label: "Email", Icon: Mail, color: "text-[#ea4335]", target: "_self" },
            ].map((link) => (
              <div key={link.label} className="relative group">
                <Link
                  href={link.href}
                  target={link.target}
                  className={`${link.color} hover:opacity-80 transition-opacity p-1 -m-1 inline-flex`}
                  aria-label={link.label}
                >
                  <link.Icon size={20} />
                </Link>
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 opacity-0 rounded bg-popover px-2 py-1 text-xs font-medium text-popover-foreground shadow border border-border transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 dark:shadow-none z-10 whitespace-nowrap pointer-events-none origin-bottom">
                  {link.label}
                </span>
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-border scale-0 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 z-10 pointer-events-none origin-top"></span>
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-popover scale-0 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 z-10 pointer-events-none origin-top mt-[1px]"></span>
              </div>
            ))}
          </div>
          <Link
            href="https://drive.google.com/file/d/1NrWAPDCwGvzhtjTz2acgSd9F2PoCyvf5/view?usp=drive_link"
            target="_blank"
            className="flex items-center gap-2 px-4 py-1.5 bg-gray-200 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition-colors mt-2"
          >
            <FileText className="text-black" size={16} />
            <span className="text-black">Resume</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
