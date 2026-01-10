"use client";

import { motion } from "framer-motion";
import { ActivityCalendar } from "react-activity-calendar";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";

export default function Activity() {
  const { theme } = useTheme();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("https://github-contributions-api.jogruber.de/v4/iaadi4?y=last")
      .then((res) => res.json())
      .then((json) => {
        setData(json.contributions);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching github data", err);
        setLoading(false);
      });
  }, []);

  // Auto-scroll to latest contributions (rightmost)
  useEffect(() => {
    if (scrollRef.current && data) {
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }
      }, 100);
    }
  }, [data]);

  if (loading) {
    return (
      <section className="py-8 max-w-2xl mx-auto px-6 mb-20">
        <div className="animate-pulse h-40 bg-neutral-900 rounded-lg"></div>
      </section>
    );
  }

  if (!data) return null;

  return (
    <section className="py-8 max-w-2xl mx-auto px-6 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-xl font-semibold mb-6">Contributions</h3>
        <div ref={scrollRef} className="overflow-x-auto py-4 scroll-smooth">
          <div className="flex justify-start min-w-max">
            <ActivityCalendar
              data={data}
              theme={{
                light: ["#0a0a0a", "#404040", "#737373", "#b3b3b3", "#ffffff"],
                dark: ["#0a0a0a", "#2a2a2a", "#525252", "#909090", "#ffffff"],
              }}
              colorScheme={theme === "dark" ? "dark" : "light"}
              blockSize={12}
              blockRadius={2}
              blockMargin={4}
              fontSize={12}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
