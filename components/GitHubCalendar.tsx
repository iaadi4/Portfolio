"use client";

import React from "react";
import { motion } from "framer-motion";
import { ActivityCalendar } from "react-activity-calendar";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";

export default function Activity() {
  const { theme } = useTheme();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [totalContributions, setTotalContributions] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("https://github-contributions-api.jogruber.de/v4/iaadi4?y=last")
      .then((res) => res.json())
      .then((json) => {
        setData(json.contributions);
        const total = json.contributions.reduce(
          (sum: number, day: any) => sum + day.count,
          0,
        );
        setTotalContributions(total);
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
      <section className="py-2 mb-20">
        <div className="animate-pulse h-40 bg-muted/50 rounded-lg"></div>
      </section>
    );
  }

  if (!data) return null;

  return (
    <section className="py-2 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold flex items-center gap-2 text-foreground">
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
            Contributions
          </h3>
          <span className="text-sm text-muted-foreground">
            <span className="font-semibold text-green-500">
              {totalContributions.toLocaleString()}
            </span>{" "}
            contributions in the last year
          </span>
        </div>
        <div ref={scrollRef} className="w-full overflow-x-auto py-4 scroll-smooth">
          <div className="w-max mx-auto">
            <ActivityCalendar
              data={data}
              theme={{
                light: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
              }}
              colorScheme={theme === "dark" ? "dark" : "light"}
              blockSize={12}
              blockRadius={2}
              blockMargin={4}
              fontSize={12}
              showWeekdayLabels={true}
              renderBlock={(block, activity) => (
                <g>
                  {React.cloneElement(block, {
                    children: (
                      <title>
                        {`${activity.count} contribution${activity.count !== 1 ? "s" : ""} on ${new Date(activity.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}
                      </title>
                    ),
                  })}
                </g>
              )}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
