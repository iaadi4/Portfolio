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
  const { resolvedTheme }   = useTheme();
  const [data,    setData]  = useState<Contribution[] | null>(null);
  const [total,   setTotal] = useState(0);
  const [loading, setLoad]  = useState(true);
  const [error,   setError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  // Scroll to the most recent (rightmost) contributions
  useEffect(() => {
    if (scrollRef.current && data) {
      setTimeout(() => {
        if (scrollRef.current)
          scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
      }, 200);
    }
  }, [data]);

  return (
    <section className="py-1 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        {/* Header row with contribution count on the right */}
        <div className="flex items-center gap-3 mb-6">
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping" style={{ background: "#4ade80" }} />
            <span className="relative h-2 w-2 rounded-full" style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade8080" }} />
          </span>
          <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>
            Contributions
          </h3>
          <div className="flex-1 h-px bg-border" />
          {!loading && !error && total > 0 && (
            <span className="text-[11px] text-muted-foreground" style={{ fontFamily: "monospace" }}>
              <span className="font-semibold" style={{ color: "#4ade80" }}>{total.toLocaleString()}</span>
              {" "}in the last year
            </span>
          )}
        </div>

        {/* Calendar area — no terminal chrome, just the calendar */}
        <div
          className="border border-border p-4 overflow-hidden"
          style={{ background: "hsl(var(--card))" }}
        >
          {loading && (
            <div
              className="animate-pulse rounded"
              style={{ height: 112, background: "hsl(var(--muted))" }}
            />
          )}

          {error && (
            <div
              className="flex items-center justify-center text-[12px] text-muted-foreground"
              style={{ height: 112, fontFamily: "monospace" }}
            >
              Could not load contribution data.
            </div>
          )}

          {data && (
            <div
              ref={scrollRef}
              className="overflow-x-auto"
              style={{ scrollbarWidth: "thin" }}
            >
              <div className="w-max">
                <ActivityCalendar
                  data={data}
                  theme={{
                    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
                    dark:  ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                  }}
                  colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
                  blockSize={11}
                  blockRadius={2}
                  blockMargin={3}
                  fontSize={11}
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