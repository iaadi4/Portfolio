"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Home as HomeIcon,
  Globe,
  ArrowUpRight,
  Code2,
  BookOpen,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Activity from "@/components/GitHubCalendar";
import CodeChefIcon from "@/components/icons/CodeChefIcon";
import CodeforcesIcon from "@/components/icons/CodeforcesIcon";
import LeetCodeIcon from "@/components/icons/LeetCodeIcon";
import { DATA } from "@/lib/data";

const DOCK_ITEMS = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "https://github.com/iaadi4", label: "GitHub", icon: Github },
  { href: "https://www.linkedin.com/in/adityasingh40675/", label: "LinkedIn", icon: Linkedin },
  { href: "https://x.com/iaadi8", label: "X", icon: Twitter },
  { href: "https://leetcode.com/u/iaadi4/", label: "LeetCode", icon: LeetCodeIcon },
  { href: "https://www.codechef.com/users/iaadi7", label: "CodeChef", icon: CodeChefIcon },
  { href: "https://codeforces.com/profile/chineseremaindertheoram", label: "Codeforces", icon: CodeforcesIcon },
  { href: "mailto:adityasingh40675@gmail.com", label: "Email", icon: Mail },
];

function DockItem({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      target={href === "/" ? "_self" : "_blank"}
      className="relative block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-label={label}
    >
      <motion.div
        className="relative flex items-center justify-center w-9 h-9 rounded-full hover:bg-zinc-100 text-zinc-600 hover:text-zinc-950 transition-colors"
        whileHover={{ scale: 1.15, y: -2 }}
        whileTap={{ scale: 0.92 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <Icon size={18} />
      </motion.div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 3, x: "-50%" }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute -top-9 left-1/2 px-2.5 py-1 rounded-md bg-zinc-900 text-white text-[11px] font-medium whitespace-nowrap shadow-lg pointer-events-none z-30 flex items-center justify-center"
          >
            {label}
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-zinc-900 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 pb-32 transition-colors duration-500 selection:bg-indigo-500/20 selection:text-indigo-950 relative z-0">
      {/* Subtle background grid pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(#00000012_1px,transparent_1px)] [background-size:20px_20px] [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)] -z-10 pointer-events-none" />

      <main className="max-w-4xl mx-auto px-6 pt-24 flex flex-col gap-20">
        {/* Hero Section */}
        <section className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-10">
          <FadeIn className="flex-1">
            <motion.h1
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-zinc-900"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              Hi, I&apos;m{" "}
              <span className="text-indigo-600">
                {DATA.name.split(" ")[0]}
              </span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-zinc-600 max-w-2xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {DATA.bio}
            </motion.p>
          </FadeIn>

          <motion.div
            className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden flex-shrink-0 shadow-xl relative bg-white border border-zinc-200"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <Image
              src="https://github.com/iaadi4.png"
              alt="Avatar"
              fill
              className="object-cover"
              unoptimized
              priority
            />
          </motion.div>
        </section>

        {/* Experience & Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <FadeIn delay={0.1}>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-zinc-900">
              <Code2 size={20} className="text-indigo-600" /> Work Experience
            </h2>
            <div className="flex flex-col gap-6">
              {DATA.experience.map((exp, i) => (
                <div key={i} className="flex gap-4 group items-center">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center font-bold text-lg shadow-sm border border-zinc-200 group-hover:border-indigo-500/50 transition-colors overflow-hidden shrink-0">
                    {exp.logo.startsWith("/") ? (
                      <Image
                        src={exp.logo}
                        width={48}
                        height={48}
                        alt={exp.company}
                        className="object-contain w-full h-full p-1.5"
                      />
                    ) : (
                      exp.logo
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-zinc-900 group-hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                      {exp.href ? (
                        <Link
                          href={exp.href}
                          target="_blank"
                          className="hover:underline flex items-center gap-1"
                        >
                          {exp.company}
                          <ArrowUpRight
                            size={13}
                            className="text-zinc-400 group-hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </Link>
                      ) : (
                        exp.company
                      )}
                    </h3>
                    <p className="text-sm text-zinc-500 mb-0.5 truncate">
                      {exp.role}
                    </p>
                    <p className="text-xs text-zinc-400 font-mono">{exp.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-zinc-900">
              <BookOpen size={20} className="text-indigo-600" /> Education
            </h2>
            <div className="flex flex-col gap-6">
              {DATA.education.map((edu, i) => (
                <div key={i} className="flex gap-4 group items-center">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center font-bold text-lg shadow-sm border border-zinc-200 group-hover:border-indigo-500/50 transition-colors overflow-hidden shrink-0">
                    {edu.logo.startsWith("/") ? (
                      <Image
                        src={edu.logo}
                        width={48}
                        height={48}
                        alt={edu.institution}
                        className="object-contain w-full h-full p-1.5"
                      />
                    ) : (
                      edu.logo
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-zinc-900 group-hover:text-indigo-600 transition-colors">
                      {edu.institution}
                    </h3>
                    <p className="text-sm text-zinc-500 mb-0.5">{edu.degree}</p>
                    <p className="text-xs text-zinc-400 font-mono">{edu.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Skills */}
        <FadeIn delay={0.3}>
          <h2 className="text-xl font-bold mb-6 text-zinc-900">Skills & Tools</h2>
          <div className="flex flex-wrap gap-2.5">
            {DATA.skills.map((skill, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-medium text-zinc-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* Projects */}
        <section>
          <FadeIn delay={0.4}>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-8 tracking-tight text-zinc-900">
              Featured Projects
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {DATA.projects.map((project, i) => (
              <FadeIn key={i} delay={0.1 * i} className="flex h-full">
                <motion.div className="flex flex-col w-full border border-zinc-200 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 bg-white group">
                  <div className="w-full aspect-[16/9] bg-zinc-100 relative overflow-hidden border-b border-zinc-200">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
                        No Image
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-xl mb-1 text-zinc-900 group-hover:text-indigo-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mb-4 font-mono">
                      {project.date}
                    </p>
                    <p className="text-sm text-zinc-600 mb-6 leading-relaxed flex-1">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                      {project.tech.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-zinc-100 text-zinc-700 px-2.5 py-1 rounded-md font-semibold tracking-wider uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Link
                        href={project.link}
                        target="_blank"
                        className="flex-1 flex items-center justify-center gap-2 text-xs bg-zinc-900 text-white py-2.5 rounded-lg font-bold hover:bg-zinc-800 transition-colors shadow-sm"
                      >
                        <Globe size={14} /> Website
                      </Link>
                      <Link
                        href={project.link}
                        target="_blank"
                        className="flex-1 flex items-center justify-center gap-2 text-xs border border-zinc-200 text-zinc-700 py-2.5 rounded-lg font-bold hover:bg-zinc-50 transition-colors"
                      >
                        <Github size={14} /> Source
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Medium Blog Post */}
        <FadeIn delay={0.2}>
          <h2 className="text-xl font-bold mb-6 text-zinc-900">Writing</h2>
          <Link href={DATA.blog.link} target="_blank" className="block group">
            <div className="p-6 md:p-8 bg-white border border-zinc-200 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="text-xs text-zinc-400 font-mono mb-2">
                  {DATA.blog.date}
                </p>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-zinc-900 group-hover:text-indigo-600 transition-colors">
                  {DATA.blog.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {DATA.blog.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-zinc-100 px-2.5 py-1 rounded-md font-semibold text-zinc-600 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center flex-shrink-0 text-zinc-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all shadow-sm">
                <ArrowUpRight size={20} />
              </div>
            </div>
          </Link>
        </FadeIn>

        {/* GitHub Contributions */}
        <div className="mb-10">
          <Activity />
        </div>
      </main>

      {/* Dynamic Island Dock */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none max-w-[95vw]">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="pointer-events-auto flex items-center gap-1 p-1.5 bg-white/90 backdrop-blur-xl border border-zinc-200/90 rounded-full shadow-2xl shadow-zinc-950/10"
        >
          {DOCK_ITEMS.map((social, i) => (
            <DockItem key={i} {...social} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
