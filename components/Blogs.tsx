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
    <section className="py-8 max-w-2xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <h3 className="text-xl font-semibold mb-6">Latest Articles</h3>
        <div className="grid gap-4">
          {blogs.map((blog, index) => (
            <Link
              key={index}
              href={blog.link}
              target="_blank"
              className="group block p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <BookOpen size={16} className="text-neutral-500" />
                <span className="font-medium group-hover:underline">
                  {blog.title}
                </span>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                {blog.description}
              </p>
              <span className="text-xs text-neutral-500">{blog.date}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
