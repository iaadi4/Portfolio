import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Blogs from "@/components/Blogs";
import Experience from "@/components/Experience";
import Activity from "@/components/GitHubCalendar";

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-black text-white transition-colors duration-300">
        <div
          className="mx-auto bg-black border-x border-neutral-800 min-h-screen"
          style={{ maxWidth: "52.8rem" }}
        >
          <Hero />
          <Skills />
          <Experience />
          <Projects />
          <Blogs />
          <Activity />
        </div>
      </main>
    </>
  );
}
