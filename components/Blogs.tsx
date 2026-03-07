"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import Link from "next/link";

interface BlogPost {
  title: string;
  description: string;
  link: string;
  date: string;
}

const blogs: BlogPost[] = [
  {
    title: "Stop Querying Your Database for Usernames: The Bouncer Pattern",
    description:
      "Learn how to optimize username checks and prevent unnecessary database queries using the Bouncer Pattern.",
    link: "https://medium.com/@adityasingh40675/stop-querying-your-database-for-usernames-the-bouncer-pattern-b06afcd1fe82",
    date: "Jan 2026",
  },
];

export default function Blogs() {
  return (
    <section className="py-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <h3 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
          Latest Articles
        </h3>
        <div className="grid gap-4">
          {blogs.map((blog, index) => (
            <Link
              key={index}
              href={blog.link}
              target="_blank"
              className="group block p-4 rounded-xl border border-border hover:border-muted hover:bg-card transition-colors bg-background"
            >
              <div className="flex items-center gap-2 mb-2">
                <BookOpen size={16} className="text-indigo-500" />
                <span className="font-medium text-foreground group-hover:underline">
                  {blog.title}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {blog.description}
              </p>
              <span className="text-xs text-muted-foreground font-mono">
                {blog.date}
              </span>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
