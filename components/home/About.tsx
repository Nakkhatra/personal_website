import { siteConfig } from "@/lib/data/siteConfig";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function About() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading index="05" title="About Me" />
        <div className="max-w-3xl">
          <p className="text-text-secondary leading-relaxed text-lg">
            I build practical AI systems end-to-end — from data pipelines and
            retrieval to agents that ship in production. At{" "}
            <span className="text-text-primary font-medium">
              {siteConfig.role.split(", ")[1] ?? "Robi Axiata Ltd."}
            </span>
            , that means turning messy real-world problems into reliable
            models and workflows teams can trust.
          </p>
          <p className="text-text-secondary leading-relaxed mt-4">
            Outside work I explore art as a creative counterbalance — same
            attention to craft, different medium. Always open to thoughtful
            collaboration at the intersection of engineering and design.
          </p>
        </div>
      </Container>
    </section>
  );
}
