"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

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
    <section className="w-full">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
            Latest <span className="text-primary">Thoughts.</span>
          </h2>
          <Link href="https://medium.com/@adityasingh40675" target="_blank" className="hidden md:flex items-center gap-2 text-gray-500 hover:text-white transition-colors uppercase tracking-widest text-sm font-semibold">
            All Articles <ArrowUpRight size={18} />
          </Link>
        </div>

        <div className="flex flex-col gap-6">
          {blogs.map((blog, i) => (
            <Link key={i} href={blog.link} target="_blank" className="block group">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 border border-white/10 rounded-md bg-[#0a0a0a] hover:border-primary/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden"
              >
                {/* Background Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex-1 z-10">
                  <div className="flex items-center gap-3 mb-3 text-sm font-semibold tracking-widest text-gray-500 uppercase">
                    <span>{blog.date}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-500" />
                    <span>{blog.readTime}</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-primary transition-colors leading-tight">
                    {blog.title}
                  </h3>
                  
                  <p className="text-gray-400 font-light leading-relaxed mb-6 md:mb-0 max-w-3xl">
                    {blog.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 z-10 flex-shrink-0">
                  <div className="flex gap-2 flex-wrap">
                     {blog.tags.map((t, ti) => (
                       <span key={ti} className="text-[10px] px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300 font-semibold tracking-widest uppercase">
                         {t}
                       </span>
                     ))}
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-primary group-hover:border-primary group-hover:text-black transition-all">
                     <ArrowUpRight size={20} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 md:hidden">
          <Link href="https://medium.com/@adityasingh40675" target="_blank" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors uppercase tracking-widest text-sm font-semibold justify-end">
            All Articles <ArrowUpRight size={18} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}