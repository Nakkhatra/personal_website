import { siteConfig } from "@/lib/data/siteConfig";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function About() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading title="About Me" />
        <div className="max-w-3xl">
          <p className="text-text-secondary leading-relaxed text-lg">
            {siteConfig.bio}
          </p>
          <p className="text-text-secondary leading-relaxed mt-4">
            Currently working as a {siteConfig.role.split(",")[0]} at{" "}
            <span className="text-text-primary font-medium">
              {siteConfig.role.split(", ")[1]}
            </span>
            , where I build AI-powered solutions that drive real business impact.
          </p>
        </div>
      </Container>
    </section>
  );
}
