"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { EMAIL, NAV_SECTIONS, PAGES, SOCIALS } from "@/lib/data";
import { DiamondMark } from "@/components/ui/DiamondMark";
import { NotchButton } from "@/components/ui/NotchButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SiteFooter } from "@/components/Banner";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState("intro");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible[0]?.target.id) return;
        const hash = window.location.hash.slice(1);
        const hashed = visible.find((entry) => entry.target.id === hash);
        if (
          hashed &&
          visible[1] &&
          Math.abs(visible[0].intersectionRatio - visible[1].intersectionRatio) < 0.12
        ) {
          setActive(hashed.target.id);
          return;
        }
        setActive(visible[0].target.id);
      },
      { rootMargin: "-28% 0px -55% 0px", threshold: [0, 0.2, 0.45] }
    );

    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onHash = () => {
      setOpen(false);
      const id = window.location.hash.slice(1);
      if (id) setActive(id);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-bg text-fg">
      <div className="flex">
        <aside className="sticky top-0 hidden h-screen w-[188px] shrink-0 flex-col border-r border-line lg:flex">
          <Link
            href="#intro"
            className="notch-tab mx-4 mt-4 flex h-14 items-center justify-center bg-orange text-[#121212]"
            aria-label="Home"
          >
            <DiamondMark size={14} className="border-[#121212] bg-[#121212]" />
          </Link>

          <nav className="mt-10 flex flex-1 flex-col gap-5 px-5" aria-label="Section">
            {NAV_SECTIONS.map((section) => {
              const isActive = active === section.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`relative flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                    isActive ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  <span
                    className={`absolute -left-5 top-0.5 h-[0.85em] w-px ${isActive ? "bg-orange" : "bg-transparent"}`}
                  />
                  <span className={isActive ? "text-orange" : "text-muted"}>{section.index}</span>
                  <span>{section.label}</span>
                </a>
              );
            })}
          </nav>

          <p className="px-5 pb-6 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Index / 08
          </p>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-4 border-b border-line bg-bg/90 px-4 backdrop-blur-md md:px-8">
            <div className="flex items-center gap-3 lg:hidden">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex h-11 w-11 items-center justify-center border border-line"
                aria-label="Open navigation"
              >
                <Menu size={16} />
              </button>
              <Link href="#intro" className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em]">
                <span className="flex h-7 w-7 items-center justify-center bg-orange text-[#121212]">
                  <DiamondMark size={8} className="border-[#121212] bg-[#121212]" />
                </span>
                AS
              </Link>
            </div>

            <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
              {PAGES.map((page) => (
                <a
                  key={page.href}
                  href={page.href}
                  className="relative font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-fg after:transition-[width] after:duration-200 hover:after:w-full"
                >
                  {page.label}
                </a>
              ))}
            </nav>

            <div className="ml-auto flex items-center gap-2">
              <ThemeToggle />
              <a
                href={EMAIL}
                className="flex h-11 w-11 items-center justify-center border border-line text-fg transition-colors hover:border-orange hover:text-orange sm:hidden"
                aria-label="Get in touch"
              >
                <Mail size={15} />
              </a>
              <NotchButton href={EMAIL} variant="orange" className="hidden px-5 py-2.5 sm:inline-flex">
                Get in touch
              </NotchButton>
            </div>
          </header>

          <main>{children}</main>

          <SiteFooter />
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-bg lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em]">Index</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center border border-line"
                aria-label="Close navigation"
              >
                <X size={16} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col overflow-y-auto px-6 py-6">
              {NAV_SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center gap-4 border-b border-line font-mono text-sm uppercase tracking-[0.16em]"
                >
                  <span className="text-orange">{section.index}</span>
                  {section.label}
                </a>
              ))}
            </nav>
            <div className="border-t border-line px-6 py-5">
              <NotchButton href={EMAIL} variant="orange" className="w-full px-5 py-3">
                Get in touch
              </NotchButton>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {SOCIALS.slice(0, 4).map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noreferrer"
                    className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
