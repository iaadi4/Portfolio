"use client";

import { SiteChrome } from "@/components/SiteChrome";
import { Hero } from "@/components/Hero";
import { GraphicPanel } from "@/components/GraphicPanel";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Writing } from "@/components/Writing";
import Activity from "@/components/GitHubCalendar";
import { Banner } from "@/components/Banner";
import { IntroProvider } from "@/components/IntroContext";

export default function Home() {
  return (
    <SiteChrome>
      <IntroProvider>
        <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
          <Hero />
          <GraphicPanel />
        </div>
      </IntroProvider>
      <div className="grid border-b border-line md:grid-cols-2 md:items-stretch">
        <div className="md:border-r md:border-line">
          <Experience />
        </div>
        <Education />
      </div>
      <Skills />
      <Projects />
      <Writing />
      <Activity />
      <Banner />
    </SiteChrome>
  );
}
