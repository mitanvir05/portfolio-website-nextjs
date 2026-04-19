import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";

export default function Home() {
  return (
    <main className="flex flex-col w-full overflow-hidden">
      <Hero />
      <Experience />
      
      {/* Placeholder for the next section */}
      <section id="projects" className="py-20 min-h-[50vh] flex items-center justify-center border-t border-white/10">
        <h2 className="text-2xl text-gray-500">Projects Section (Coming Next)</h2>
      </section>
    </main>
  );
}