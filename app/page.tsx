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

const Divider = () => (
  <div
    className="mx-auto my-0 pointer-events-none"
    style={{
      height: 1,
      maxWidth: "80%",
      background: "linear-gradient(90deg, transparent, rgba(var(--accent-rgb), 0.08), transparent)",
    }}
  />
);

export default function Home() {
  return (
    <>
      <Hero />
      <Divider />
      <FadeIn>
        <div className="relative">
          {sectionGlow}
          <FeaturedProjects />
        </div>
      </FadeIn>
      <Divider />
      <FadeIn>
        <div className="relative">
          {sectionGlow}
          <Publications />
        </div>
      </FadeIn>
      <Divider />
      <FadeIn>
        <BlogPreview />
      </FadeIn>
      <Divider />
      <FadeIn>
        <TechStack />
      </FadeIn>
      <Divider />
      <FadeIn>
        <About />
      </FadeIn>
      <Divider />
      <FadeIn>
        <Contact />
      </FadeIn>
    </>
  );
}
