"use client";

import React, { useEffect, useState, useRef } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { useTheme } from "next-themes";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/ui/FadeIn";

interface Contribution {
  date: string;
  count: number;
  level: number;
}

const ORANGE_THEME = {
  light: ["#e8e3d5", "#ffd4c2", "#ff9b73", "#ff5f2e", "#c43a12"],
  dark: ["#1c1c1c", "#5c2a16", "#b8441a", "#ff5f2e", "#ffb089"],
};

export default function Activity() {
  const [data, setData] = useState<Contribution[] | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoad] = useState(true);
  const [error, setError] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [blockSize, setBlockSize] = useState(13);

  // Avoid rendering theme-dependent calendar during SSR.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

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
    const el = boxRef.current;
    if (!el) return;

    const fit = () => {
      const width = el.clientWidth;
      const next = Math.max(10, Math.min(15, Math.floor((width - 48) / 53 - 3)));
      setBlockSize(next);
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(el);
    return () => observer.disconnect();
  }, [data]);

  useEffect(() => {
    if (scrollRef.current && data) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [data, blockSize]);

  return (
    <section id="work" className="border-b border-line px-5 py-12 md:px-10">
      <FadeIn>
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <SectionLabel>GitHub</SectionLabel>
          {!loading && !error && total > 0 && (
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted sm:text-[11px]">
              <span className="text-fg">{total.toLocaleString()}</span> contributions
            </p>
          )}
        </div>

        <div ref={boxRef} className="border-t border-line px-0 py-5">
          {loading && <div className="h-36 w-full animate-pulse bg-line/40" />}

          {error && (
            <div className="flex h-36 items-center justify-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              Could not load contribution data.
            </div>
          )}

          {data && mounted && (
            <div className="hide-scrollbar overflow-x-auto" ref={scrollRef}>
              <div className="github-calendar min-w-max">
                <ActivityCalendar
                  data={data}
                  theme={ORANGE_THEME}
                  colorScheme={resolvedTheme === "light" ? "light" : "dark"}
                  blockSize={blockSize}
                  blockRadius={0}
                  blockMargin={3}
                  fontSize={11}
                  hideTotalCount
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
      </FadeIn>
    </section>
  );
}
