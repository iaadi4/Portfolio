"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Home as HomeIcon, Moon, Sun, Globe, ArrowUpRight, Code2, BookOpen } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Activity from "@/components/GitHubCalendar";
import CodeChefIcon from "@/components/icons/CodeChefIcon";
import CodeforcesIcon from "@/components/icons/CodeforcesIcon";
import LeetCodeIcon from "@/components/icons/LeetCodeIcon";

const DATA = {
  name: "Aditya Singh",
  bio: "Pre-final year @ IIIT Ranchi. Building high-perf web apps, backend architecture & cloud infrastructure. Currently deep in Devops & Agentic AI.",
  experience: [
    {
      company: "Draviya",
      role: "Founding Engineer (Full Stack)",
      date: "Dec 2025 - Present",
      logo: "/draviya.png"
    },
    {
      company: "House of Geeks, IIIT Ranchi",
      role: "Software Dev Wing Lead & Coordinator",
      date: "Mar 2025 - Present",
      logo: "/hog.png"
    }
  ],
  education: [
    {
      institution: "IIIT Ranchi",
      degree: "Bachelor of Technology in Electronics and Communication",
      date: "2023 - 2027",
      logo: "/iiit-ranchi.svg"
    }
  ],
  skills: [
    "Rust", "C++", "TypeScript", "JavaScript", "SQL", "Python",
    "React.js", "Next.js", "Express.js", "TailwindCSS", "FastAPI", "Hono",
    "AWS", "Docker", "PostgreSQL", "MongoDB", "Redis", "Kubernetes", "Prometheus", "Grafana", "BullMQ",
    "Langchain", "Langgraph", "Langsmith"
  ],
  projects: [
    {
      title: "InkLink",
      date: "2025",
      description: "Real-time collaborative workspace with Excalidraw-like features. Draw, plan, and brainstorm together using shared TypeScript interfaces.",
      tech: ["Next.js", "Express", "WebSockets", "BullMQ"],
      link: "https://github.com/iaadi4/inklink",
      image: "/projects/inklink.png",
    },
    {
      title: "Ora",
      date: "2025",
      description: "Voice journaling app with AI transcription and emotion analysis. Features secure authentication via BetterAuth, cloud storage on AWS S3.",
      tech: ["Next.js", "FastAPI", "OpenAI Whisper"],
      link: "https://github.com/iaadi4/ora",
      image: "/projects/ora.png",
    },
    {
      title: "SEO Boost",
      date: "2025",
      description: "Instant technical SEO audit tool. Run a professional audit in seconds and get a beautiful, actionable report.",
      tech: ["Next.js", "TypeScript", "SEO", "Analytics"],
      link: "https://github.com/iaadi4/SeoBoost",
      image: "/projects/seoboost.png",
    },
    {
      title: "FocusOS",
      date: "2025",
      description: "Master your digital life. Combines powerful site blocking, browsing analytics, and flow-state tools into one beautiful Firefox extension dashboard.",
      tech: ["TypeScript", "WebExtension", "Firefox"],
      link: "https://github.com/iaadi4/FocusOS",
      image: "/projects/focusos.png",
    }
  ],
  blog: {
    title: "Stop Querying Your Database for Usernames: The Bouncer Pattern",
    date: "Jan 2026",
    link: "https://medium.com/@adityasingh40675/stop-querying-your-database-for-usernames-the-bouncer-pattern-b06afcd1fe82",
    tags: ["Backend", "PostgreSQL", "Optimization"]
  }
};

const SOCIALS = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "https://github.com/iaadi4", label: "GitHub", icon: Github },
  { href: "https://www.linkedin.com/in/adityasingh40675/", label: "LinkedIn", icon: Linkedin },
  { href: "https://x.com/iaadi8", label: "X", icon: Twitter },
  { href: "https://leetcode.com/u/iaadi4/", label: "LeetCode", icon: LeetCodeIcon },
  { href: "https://www.codechef.com/users/iaadi7", label: "CodeChef", icon: CodeChefIcon },
  { href: "https://codeforces.com/profile/chineseremaindertheoram", label: "Codeforces", icon: CodeforcesIcon },
  { href: "mailto:adityasingh40675@gmail.com", label: "Email", icon: Mail },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  // This effect is intentionally used to avoid rendering theme-dependent UI during SSR.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <motion.button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative flex items-center justify-center p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
      layout
    >
      <motion.div layout>
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </motion.div>
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, width: 0, marginLeft: 0 }}
            animate={{ opacity: 1, width: "auto", marginLeft: 8 }}
            exit={{ opacity: 0, width: 0, marginLeft: 0 }}
            className="text-xs font-medium whitespace-nowrap overflow-hidden text-gray-700 dark:text-gray-300"
          >
            Theme
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

interface DockItemProps {
  href: string;
  label: string;
  icon: React.ComponentType<{ size: number }>;
}

function DockItem({ href, label, icon: Icon }: DockItemProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href} target={href === "/" ? "_self" : "_blank"}>
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex items-center justify-center p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        whileHover={{ scale: 1.15, y: -2 }}
        whileTap={{ scale: 0.95 }}
        layout
      >
        <motion.div layout>
          <Icon size={18} />
        </motion.div>
        <AnimatePresence>
          {hovered && (
            <motion.span
              initial={{ opacity: 0, width: 0, marginLeft: 0 }}
              animate={{ opacity: 1, width: "auto", marginLeft: 8 }}
              exit={{ opacity: 0, width: 0, marginLeft: 0 }}
              className="text-xs font-medium whitespace-nowrap overflow-hidden text-gray-700 dark:text-gray-300"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
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
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-black dark:text-white pb-32 transition-colors duration-500 selection:bg-indigo-500/30 relative z-0">
      <div className="fixed inset-0 bg-[radial-gradient(#00000020_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff20_1px,transparent_1px)] [background-size:20px_20px] [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)] -z-10 pointer-events-none" />
      
      <main className="max-w-4xl mx-auto px-6 pt-24 flex flex-col gap-20">
        
        {/* Hero Section */}
        <section className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-10">
          <FadeIn className="flex-1">
            <motion.h1 
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              Hi, I&apos;m <span className="text-indigo-500">{DATA.name.split(" ")[0]}</span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {DATA.bio}
            </motion.p>
          </FadeIn>
          
          <motion.div 
            className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden flex-shrink-0 shadow-2xl relative bg-white dark:bg-black border border-gray-200 dark:border-gray-800"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
             <Image src="https://github.com/iaadi4.png" alt="Avatar" fill className="object-cover" unoptimized />
          </motion.div>
        </section>

        {/* Experience & Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <FadeIn delay={0.1}>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Code2 size={20} className="text-indigo-500"/> Work Experience</h2>
            <div className="flex flex-col gap-6">
              {DATA.experience.map((exp, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#111] flex items-center justify-center font-bold text-lg shadow-sm border border-gray-100 dark:border-gray-800 group-hover:border-indigo-500/50 transition-colors overflow-hidden">
                    {exp.logo.startsWith('/') ? <Image src={exp.logo} width={48} height={48} alt={exp.company} className="object-contain w-full h-full p-1" /> : exp.logo}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-500 transition-colors">{exp.company}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{exp.role}</p>
                    <p className="text-xs text-gray-400 font-mono">{exp.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><BookOpen size={20} className="text-indigo-500"/> Education</h2>
            <div className="flex flex-col gap-6">
              {DATA.education.map((edu, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#111] flex items-center justify-center font-bold text-lg shadow-sm border border-gray-100 dark:border-gray-800 group-hover:border-indigo-500/50 transition-colors overflow-hidden">
                    {edu.logo.startsWith('/') ? <Image src={edu.logo} width={48} height={48} alt={edu.institution} className="object-contain w-full h-full p-1" /> : edu.logo}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-500 transition-colors">{edu.institution}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{edu.degree}</p>
                    <p className="text-xs text-gray-400 font-mono">{edu.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Skills */}
        <FadeIn delay={0.3}>
          <h2 className="text-xl font-bold mb-6">Skills & Tools</h2>
          <div className="flex flex-wrap gap-2.5">
            {DATA.skills.map((skill, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-lg text-sm font-medium shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* Projects */}
        <section>
          <FadeIn delay={0.4}>
            <h2 className="text-4xl font-extrabold mb-8 tracking-tight">Featured Projects</h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {DATA.projects.map((project, i) => (
              <FadeIn key={i} delay={0.1 * i} className="flex h-full">
                <motion.div 
                  className="flex flex-col w-full border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 bg-white dark:bg-[#111] group"
                >
                  <div className="w-full aspect-[16/9] bg-gray-100 dark:bg-gray-900 relative overflow-hidden border-b border-gray-100 dark:border-gray-800">
                    {project.image ? (
                       <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">No Image</div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-xl mb-1 group-hover:text-indigo-500 transition-colors">{project.title}</h3>
                    <p className="text-xs text-gray-400 mb-4 font-mono">{project.date}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed flex-1">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                      {project.tech.map((tag, i) => (
                        <span key={i} className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-md font-semibold tracking-wider uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Link href={project.link} target="_blank" className="flex-1 flex items-center justify-center gap-2 text-xs bg-black text-white dark:bg-white dark:text-black py-2.5 rounded-lg font-bold hover:opacity-80 transition-opacity">
                        <Globe size={14} /> Website
                      </Link>
                      <Link href={project.link} target="_blank" className="flex-1 flex items-center justify-center gap-2 text-xs border border-gray-200 dark:border-gray-700 py-2.5 rounded-lg font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
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
          <h2 className="text-xl font-bold mb-6">Writing</h2>
          <Link href={DATA.blog.link} target="_blank" className="block group">
            <div 
              className="p-6 md:p-8 bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div>
                <p className="text-xs text-gray-400 font-mono mb-2">{DATA.blog.date}</p>
                <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-indigo-500 transition-colors">{DATA.blog.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {DATA.blog.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-md font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-500 transition-all">
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
      <motion.div 
        initial={{ y: 100, opacity: 0, x: "-50%" }}
        animate={{ y: 0, opacity: 1, x: "-50%" }}
        transition={{ type: "spring", bounce: 0.3, duration: 0.8, delay: 0.5 }}
        className="fixed bottom-6 left-1/2 z-50"
      >
        <motion.div 
          layout
          className="flex items-center gap-1.5 px-3 py-2 bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-full shadow-2xl"
        >
          {SOCIALS.map((social, i) => (
            <DockItem key={i} {...social} />
          ))}
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-800 mx-1"></div>
          <ThemeToggle />
        </motion.div>
      </motion.div>
    </div>
  );
}