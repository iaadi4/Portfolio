import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Blogs from "@/components/Blogs";
import Experience from "@/components/Experience";
import Activity from "@/components/GitHubCalendar";

export default function Home() {
  return (
    <main className="min-h-screen transition-colors duration-300">
      <div className="mx-auto min-h-screen max-w-5xl px-6 py-12 md:py-20 flex flex-col md:flex-row gap-12">
        <div className="shrink-0 md:sticky md:top-20 md:w-60 md:self-start">
          <Hero />
        </div>
        <div className="flex-1 min-w-0 space-y-12">
          <Skills />
          <Experience />
          <Projects />
          <Blogs />
          <Activity />
        </div>
      </div>
    </main>
  );
}
