"use client";

import { CAPABILITIES } from "@/lib/data";
import { useIntro } from "@/components/IntroContext";
import { cn } from "@/lib/utils";

export function Capabilities() {
  const { active, setActive } = useIntro();

  return (
    <div className="mt-8 border-t border-line md:mt-10">
      {CAPABILITIES.map((item, index) => {
        const expanded = active === index;
        return (
          <div key={item.index} className="border-b border-line">
            <button
              type="button"
              onClick={() => setActive(index)}
              className="flex min-h-12 w-full items-center justify-between gap-4 py-3.5 text-left"
              aria-expanded={expanded}
            >
              <span className="flex items-baseline gap-4">
                <span className={cn("font-mono text-[11px]", expanded ? "text-orange" : "text-muted")}>
                  {item.index}
                </span>
                <span className="text-sm font-semibold tracking-tight md:text-base">{item.title}</span>
              </span>
              <span className="font-mono text-xs text-muted">{expanded ? "−" : "+"}</span>
            </button>

            <div
              className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
              aria-hidden={!expanded}
            >
              <div className="overflow-hidden">
                <ul className="pb-4">
                  {item.items.map((line, lineIndex) => (
                    <li
                      key={line}
                      className="flex gap-3 py-1 font-mono text-[12px] text-muted"
                      style={{
                        opacity: expanded ? 1 : 0,
                        transform: expanded ? "translateY(0)" : "translateY(-6px)",
                        transition: `opacity 240ms ${expanded ? 60 + lineIndex * 45 : 0}ms ease, transform 240ms ${expanded ? 60 + lineIndex * 45 : 0}ms ease`,
                      }}
                    >
                      <span className="text-orange">+</span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
