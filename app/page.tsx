import Hero      from "@/components/Hero";
import Skills     from "@/components/Skills";
import Projects   from "@/components/Projects";
import Blogs      from "@/components/Blogs";
import Experience from "@/components/Experience";
import Activity   from "@/components/GitHubCalendar";
import Footer     from "@/components/Footer";
import LofiPlayer from "@/components/LofiPlayer";
import Navbar     from "@/components/Navbar";

export default function Home() {
  return (
    <>
      {/* Subtle noise texture */}
      <div className="noise-overlay" aria-hidden />

      {/* Floating lofi player */}
      <LofiPlayer />

      <main className="min-h-screen">
        <Navbar />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 md:py-12 flex flex-col md:flex-row gap-10 md:gap-14">

          {/* ── Sticky left sidebar ── */}
          <aside className="flex-shrink-0 md:w-[260px] md:sticky md:top-12 md:self-start">
            <Hero />
          </aside>

          {/* ── Scrollable right content ── */}
          <div className="flex-1 min-w-0 space-y-14">
            <section id="skills">    <Skills />     </section>
            <section id="experience"><Experience />  </section>
            <section id="projects">  <Projects />   </section>
            <section id="blogs">     <Blogs />      </section>
            <section id="activity">  <Activity />   </section>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}