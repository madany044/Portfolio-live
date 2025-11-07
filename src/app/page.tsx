import { FloatingNav } from "@/components/navigation/floating-nav";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Certifications } from "@/components/sections/certifications";
import { ProjectShowcase } from "@/components/sections/projects";
import { SkillsShowcase } from "@/components/sections/skills";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip text-white">
      <div className="hidden md:block">
        <FloatingNav />
      </div>
      <main className="relative flex flex-col gap-10">
        <Hero />
        <SkillsShowcase />
        <ProjectShowcase />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-40">
        <div className="absolute left-1/2 top-14 h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,_rgba(129,140,248,0.45),_rgba(15,23,42,0))] blur-3xl" />
        <div className="absolute inset-y-0 right-[-20%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,_rgba(14,165,233,0.35),_rgba(15,23,42,0))] blur-3xl" />
      </div>
    </div>
  );
}
