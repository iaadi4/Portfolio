import Hero      from "@/components/Hero";
import Skills     from "@/components/Skills";
import Projects   from "@/components/Projects";
import Blogs      from "@/components/Blogs";
import Experience from "@/components/Experience";
import Activity   from "@/components/GitHubCalendar";
import Footer     from "@/components/Footer";
import Navbar     from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-black text-white w-full overflow-hidden flex flex-col">
        {/* Massive Hero Section */}
        <section className="relative w-full min-h-screen flex flex-col justify-center items-center pb-20">
          <Hero />
        </section>

        {/* Following Content */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex flex-col gap-24 py-20 z-10 relative bg-black">
          <section id="skills">    <Skills />     </section>
          <section id="experience"><Experience />  </section>
          <section id="projects">  <Projects />   </section>
          <section id="blogs">     <Blogs />      </section>
          <section id="activity">  <Activity />   </section>
        </div>

        <Footer />
      </main>
    </>
  );
}