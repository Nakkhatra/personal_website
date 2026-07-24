import Image from "next/image";
import { siteConfig } from "@/lib/data/siteConfig";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollHighlightText from "@/components/ui/ScrollHighlightText";

const fullBio = `${siteConfig.bio} Currently working as a ${siteConfig.role.split(",")[0]} at ${siteConfig.role.split(", ")[1]}, where I build AI-powered solutions that drive real business impact.`;

export default function About() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading title="About Me" />
        <div className="grid lg:grid-cols-[280px,1fr] gap-12 items-start">
          {/* Portrait */}
          <div className="mx-auto lg:mx-0">
            <div className="relative w-56 h-56 lg:w-64 lg:h-64">
              <div className="absolute inset-0 rounded-full opacity-20 blur-2xl animate-glow-pulse"
                style={{ background: "var(--accent)" }} />
              <div className="relative w-full h-full rounded-full overflow-hidden border-2"
                style={{ borderColor: "rgba(var(--accent-ch) / 0.3)", boxShadow: "0 0 30px rgba(var(--accent-rgb), 0.15)" }}>
                <Image
                  src="/portrait_arcane.png"
                  alt={siteConfig.shortName}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 224px, 256px"
                />
              </div>
            </div>
          </div>

          {/* Bio with scroll-highlight */}
          <div className="space-y-4">
            <ScrollHighlightText
              text={fullBio}
              className="text-lg leading-relaxed"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
