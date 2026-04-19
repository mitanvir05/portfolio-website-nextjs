import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";

export default function Home() {
  return (
    <main className="flex flex-col w-full overflow-hidden">
      <Hero />
      <Skills />
      <Projects />
      <Experience />
    </main>
  );
}
