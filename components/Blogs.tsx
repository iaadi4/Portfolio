"use client";

import { motion } from "framer-motion";
import { BookOpen, ExternalLink } from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "./Skills";

const blogs = [
  {
    title: "Stop Querying Your Database for Usernames: The Bouncer Pattern",
    description: "Learn how to optimize username checks and prevent unnecessary database queries using the Bouncer Pattern.",
    link: "https://medium.com/@adityasingh40675/stop-querying-your-database-for-usernames-the-bouncer-pattern-b06afcd1fe82",
    date: "Jan 2026",
    readTime: "5 min",
    tags: ["Backend", "PostgreSQL", "Optimization"],
  },
];

export default function Blogs() {
  return (
    <section className="py-1">
      <motion.div
        initial={{ opacity:0, y:18 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }}
        transition={{ duration:0.45 }}
      >
        <SectionHeader dot="#818cf8" title="Latest Articles" right="BLOG.md" />

        <div className="space-y-3">
          {blogs.map((blog, i) => (
            <Link key={i} href={blog.link} target="_blank" className="block group">
              <motion.div
                whileHover={{ x:3, transition:{duration:0.15} }}
                className="p-4 border border-border"
                style={{
                  background:"hsl(var(--card))",
                  borderLeft:"3px solid hsl(var(--border))",
                  transition:"border-color 0.15s, box-shadow 0.15s",
                }}
                onMouseEnter={e=>{
                  (e.currentTarget as HTMLElement).style.borderLeftColor="#818cf8";
                  (e.currentTarget as HTMLElement).style.boxShadow="3px 3px 0 hsl(var(--foreground)/0.7)";
                }}
                onMouseLeave={e=>{
                  (e.currentTarget as HTMLElement).style.borderLeftColor="hsl(var(--border))";
                  (e.currentTarget as HTMLElement).style.boxShadow="none";
                }}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-start gap-2">
                    <BookOpen size={14} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                    <span
                      className="text-[13px] font-semibold text-foreground group-hover:text-indigo-400 transition-colors leading-snug"
                      style={{ fontFamily:"'Syne',sans-serif" }}
                    >
                      {blog.title}
                    </span>
                  </div>
                  <ExternalLink size={12} className="text-muted-foreground flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <p className="text-[12px] text-muted-foreground mb-3 leading-relaxed" style={{ fontFamily:"'IBM Plex Mono',monospace" }}>
                  {blog.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5 flex-wrap">
                    {blog.tags.map((t,ti)=>(
                      <span key={ti} className="text-[9px] px-1.5 py-0.5 border" style={{ fontFamily:"monospace", color:"#818cf8", background:"rgba(129,140,248,0.08)", borderColor:"rgba(129,140,248,0.25)" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] text-muted-foreground" style={{ fontFamily:"monospace" }}>
                    {blog.readTime} read · {blog.date}
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="mt-3 flex justify-end">
          <Link href="https://medium.com/@adityasingh40675" target="_blank"
            className="text-[11px] text-muted-foreground hover:text-indigo-400 transition-colors" style={{ fontFamily:"monospace" }}>
            more on medium ↗
          </Link>
        </div>
      </motion.div>
    </section>
  );
}