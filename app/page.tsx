import Hero from "@/components/home/Hero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Publications from "@/components/home/Publications";
import BlogPreview from "@/components/home/BlogPreview";
import TechStack from "@/components/home/TechStack";
import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import FadeIn from "@/components/ui/FadeIn";

const sectionGlow = (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background:
        "radial-gradient(ellipse 800px 500px at 50% 30%, rgba(var(--accent-rgb), 0.04) 0%, transparent 70%)",
      zIndex: 0,
    }}
  />
);

export default function Home() {
  return (
    <>
      <Hero />
      <FadeIn>
        <div className="relative">
          {sectionGlow}
          <FeaturedProjects />
        </div>
      </FadeIn>
      <FadeIn>
        <div className="relative">
          {sectionGlow}
          <Publications />
        </div>
      </FadeIn>
      <FadeIn>
        <BlogPreview />
      </FadeIn>
      <FadeIn>
        <TechStack />
      </FadeIn>
      <FadeIn>
        <About />
      </FadeIn>
      <FadeIn>
        <Contact />
      </FadeIn>
    </>
  );
}
