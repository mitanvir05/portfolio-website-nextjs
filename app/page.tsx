import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import BackToTop from "@/components/BackToTop";
import QuickStats from "@/components/sections/QuickStats";
import CoreServices from "@/components/sections/CoreServices";
import Achievements from "@/components/sections/Achievements";

export const revalidate = 0; // Ensures the page fetches fresh data

export default async function Home() {
  // Fetch projects directly from the database
  await connectDB();
  const projectsData = await Project.find({ featured: true }).sort({
    order: 1,
    createdAt: -1,
  });

  // Convert MongoDB documents to plain JSON objects to pass as props
  const projects = JSON.parse(JSON.stringify(projectsData));

  return (
    <main className="flex flex-col w-full overflow-hidden">
      <Hero />
      <QuickStats/>
      <About />
      <CoreServices/>
      <Skills />
      {/* Pass the real database projects into the component */}
      <Projects projects={projects} />
      <Experience />
      <Achievements/>
      <Contact />
      <BackToTop />
    </main>
  );
}
