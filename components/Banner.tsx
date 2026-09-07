"use client";

import { DATA, EMAIL, SOCIALS } from "@/lib/data";
import { DiamondMark } from "@/components/ui/DiamondMark";
import { NotchButton } from "@/components/ui/NotchButton";

export function Banner() {
  return (
    <section id="contact" className="bg-orange text-[#121212]">
      <div className="grid md:grid-cols-[88px_minmax(0,1fr)]">
        <div className="relative flex items-center justify-center border-b border-[#121212]/20 py-12 md:border-b-0 md:border-r md:border-[#121212]/20">
          <div className="notch-tab flex h-16 w-16 items-center justify-center bg-[#121212] text-cream">
            <DiamondMark size={15} className="border-current bg-current" />
          </div>
        </div>

        <div className="relative flex min-h-[28rem] flex-col justify-center px-5 py-16 md:min-h-[32rem] md:px-10 md:py-20">
          <div className="pointer-events-none absolute inset-0 bg-grain opacity-35" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(18,18,18,0.16) 1px, transparent 1px)",
              backgroundSize: "88px 100%",
            }}
          />

          <div className="relative grid gap-4 sm:grid-cols-3 sm:items-start">
            <p className="font-mono text-[10px] uppercase leading-5 tracking-[0.2em]">
              {String(DATA.experience.length).padStart(2, "0")} roles
              <span className="block text-[#121212]/55">Experience</span>
            </p>
            <p className="font-mono text-[10px] uppercase leading-5 tracking-[0.2em] sm:text-center">
              {String(DATA.projects.length).padStart(2, "0")} projects
              <span className="block text-[#121212]/55">Selected work</span>
            </p>
            <p className="font-mono text-[10px] uppercase leading-5 tracking-[0.2em] sm:text-right">
              ECE @ IIIT Ranchi
              <span className="block text-[#121212]/55">{DATA.education[0].date}</span>
            </p>
          </div>

          <h2 className="name-stipple relative mt-10 font-serif text-[clamp(3.4rem,14vw,9rem)] leading-none tracking-[-0.045em]">
            {DATA.name}
          </h2>

          <div className="relative mt-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <NotchButton
              href={EMAIL}
              variant="cream"
              className="bg-[#121212] px-7 py-3.5 text-cream hover:bg-[#1a1a1a] hover:text-cream dark:bg-[#121212] dark:text-cream dark:hover:bg-[#1a1a1a]"
            >
              Get in touch
            </NotchButton>
            <p className="max-w-xs font-mono text-[10px] uppercase leading-5 tracking-[0.16em] text-[#121212]/65">
              {DATA.pill}
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-[88px_minmax(0,1fr)]">
        <div className="hidden border-r border-[#121212]/20 md:block" />
        <div
          className="mx-5 h-4 md:mx-8"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(18,18,18,0.62) 1px, transparent 1.1px)",
            backgroundSize: "8px 8px",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "center",
          }}
          aria-hidden
        />
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer id="site-footer" className="border-t border-line">
      <div className="grid md:grid-cols-[88px_minmax(0,1fr)]">
        <div className="hidden min-h-12 border-r border-line md:block" />
        <div className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:gap-6 md:px-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            © {new Date().getFullYear()} Aditya Singh
          </p>
          <div className="divider-dots hidden min-w-0 flex-1 md:block" aria-hidden />
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2" aria-label="Social">
            {SOCIALS.slice(0, 4).map((social) => (
              <a
                key={social.id}
                href={social.href}
                target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-orange"
              >
                {social.label}
              </a>
            ))}
          </nav>
          <div className="divider-dots hidden w-16 shrink-0 md:block" aria-hidden />
          <DiamondMark size={7} className="hidden text-orange md:inline-block" />
        </div>
      </div>
    </footer>
  );
}
