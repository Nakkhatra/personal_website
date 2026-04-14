import Hero from "@/components/home/Hero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Publications from "@/components/home/Publications";
import BlogPreview from "@/components/home/BlogPreview";
import TechStack from "@/components/home/TechStack";
import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import FadeIn from "@/components/ui/FadeIn";

export default function Home() {
  return (
    <>
      <Hero />
      <FadeIn>
        <FeaturedProjects />
      </FadeIn>
      <FadeIn>
        <Publications />
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
