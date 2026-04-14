import { siteConfig } from "@/lib/data/siteConfig";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";

export default function Contact() {
  return (
    <section className="py-20">
      <Container>
        <div className="rounded-2xl bg-surface border border-border p-10 sm:p-14 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading text-text-primary">
            Let&apos;s Work Together
          </h2>
          <p className="mt-4 text-text-secondary max-w-lg mx-auto">
            Interested in collaborating or have a project in mind? I&apos;m always
            open to discussing new opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button href={`mailto:${siteConfig.email}`} external>
              Get in Touch
            </Button>
            <Button href={siteConfig.links.linkedin} variant="secondary" external>
              Connect on LinkedIn
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
