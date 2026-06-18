"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ActivityCalendar } from "react-activity-calendar";
import { useTheme } from "next-themes";

interface Contribution {
  date: string;
  count: number;
  level: number;
}

export default function Activity() {
  const [data, setData] = useState<Contribution[] | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoad]  = useState(true);
  const [error, setError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    fetch("https://github-contributions-api.jogruber.de/v4/iaadi4?y=last")
      .then(r => r.json())
      .then(json => {
        const c = json.contributions ?? [];
        setData(c);
        setTotal(c.reduce((s: number, d: Contribution) => s + d.count, 0));
        setLoad(false);
      })
      .catch(() => { setError(true); setLoad(false); });
  }, []);

  useEffect(() => {
    if (scrollRef.current && data) {
      setTimeout(() => {
        if (scrollRef.current)
          scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
      }, 200);
    }
  }, [data]);

  return (
    <section className="w-full">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl md:text-6xl font-black text-black dark:text-white uppercase tracking-tighter">
            Proof of <span className="text-indigo-500">Work.</span>
          </h2>
          {!loading && !error && total > 0 && (
            <div className="hidden md:flex text-gray-500 uppercase tracking-widest text-sm font-semibold">
              <span className="text-black dark:text-white mr-1">{total.toLocaleString()}</span> Contributions
            </div>
          )}
        </div>

        <div className="p-8 border border-gray-200 dark:border-white/10 rounded-md bg-white dark:bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center w-full">
          {loading && (
            <div className="animate-pulse rounded bg-white/5 h-32 w-full max-w-4xl" />
          )}

          {error && (
            <div className="flex items-center justify-center text-sm text-gray-500 h-32 uppercase tracking-widest">
              Could not load contribution data.
            </div>
          )}

          {data && (
            <div className="w-full max-w-full overflow-x-auto hide-scrollbar flex justify-center py-2" ref={scrollRef}>
              <div className="min-w-max">
                <ActivityCalendar
                  data={data}
                  theme={{
                    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
                    dark:  ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                  }}
                  colorScheme={theme === "dark" ? "dark" : "light"}
                  blockSize={14}
                  blockRadius={3}
                  blockMargin={4}
                  fontSize={12}
                  showWeekdayLabels
                  renderBlock={(block, activity) =>
                    React.cloneElement(block, {
                      children: (
                        <title>
                          {activity.count === 0
                            ? `No contributions on ${activity.date}`
                            : `${activity.count} contribution${activity.count !== 1 ? "s" : ""} on ${new Date(activity.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}
                        </title>
                      ),
                    })
                  }
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}