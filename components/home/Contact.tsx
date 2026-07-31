import { siteConfig } from "@/lib/data/siteConfig";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";

export default function Contact() {
  return (
    <section className="py-24 sm:py-28">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-mono text-caption tracking-widest uppercase text-accent mb-4">
            06 — Contact
          </p>
          <h2 className="text-display sm:text-4xl font-heading text-text-primary">
            Let&apos;s Work Together
          </h2>
          <div className="mx-auto mt-4 h-px w-12 bg-accent/50" aria-hidden />
          <p className="mt-5 text-text-secondary max-w-lg mx-auto leading-relaxed">
            Interested in collaborating or have a project in mind? I&apos;m always
            open to discussing new opportunities.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-5 mt-8">
            <Button href={`mailto:${siteConfig.email}`} external>
              Get in Touch
            </Button>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-text-secondary hover:text-accent transition-colors underline underline-offset-4 decoration-border hover:decoration-accent"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
