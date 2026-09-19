"use client";

import React, { useEffect, useState, useRef, useSyncExternalStore } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { motion } from "framer-motion";

interface Contribution {
  date: string;
  count: number;
  level: number;
}

const GITHUB_THEME = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
};

export default function Activity() {
  const [data, setData] = useState<Contribution[] | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoad] = useState(true);
  const [error, setError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    fetch("https://github-contributions-api.jogruber.de/v4/iaadi4?y=last")
      .then((r) => r.json())
      .then((json) => {
        const c = json.contributions ?? [];
        setData(c);
        setTotal(c.reduce((s: number, d: Contribution) => s + d.count, 0));
        setLoad(false);
      })
      .catch(() => {
        setError(true);
        setLoad(false);
      });
  }, []);

  useEffect(() => {
    if (scrollRef.current && data) {
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }
      }, 150);
    }
  }, [data]);

  return (
    <section className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900">
            GitHub Contributions
          </h2>
          {!loading && !error && total > 0 && (
            <p className="text-xs font-mono text-zinc-500">
              <span className="font-semibold text-zinc-900">{total.toLocaleString()}</span> contributions in the last year
            </p>
          )}
        </div>

        <div className="p-6 border border-zinc-200 rounded-2xl bg-white shadow-sm overflow-hidden flex flex-col items-center justify-center w-full">
          {loading && (
            <div className="h-32 w-full animate-pulse rounded-xl bg-zinc-100" />
          )}

          {error && (
            <div className="flex h-32 items-center justify-center font-mono text-xs uppercase tracking-wider text-zinc-400">
              Could not load contribution data.
            </div>
          )}

          {data && mounted && (
            <div className="w-full overflow-x-auto hide-scrollbar flex justify-center py-2" ref={scrollRef}>
              <div className="min-w-max">
                <ActivityCalendar
                  data={data}
                  theme={GITHUB_THEME}
                  colorScheme="light"
                  blockSize={13}
                  blockRadius={3}
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
