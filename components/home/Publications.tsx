import { ExternalLink } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/data/siteConfig";
import { publications } from "@/lib/data/publications";

export default function Publications() {
  const [featured, ...rest] = publications;

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          index="02"
          title="Research & Publications"
          subtitle="Selected academic work"
          link={{ label: "View all", href: "/research" }}
        />

        {featured && (
          <article className="relative overflow-hidden rounded-2xl border border-accent/30 bg-surface p-6 sm:p-8 mb-4">
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse 70% 80% at 100% 0%, rgba(var(--accent-rgb), 0.14) 0%, transparent 60%)",
              }}
              aria-hidden
            />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="font-mono text-caption tracking-widest uppercase text-accent">
                  Google Scholar
                </span>
                <span className="text-text-muted text-xs">·</span>
                <span className="text-text-muted text-sm">
                  {featured.venue} · {featured.year}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-xl sm:text-2xl text-text-primary max-w-3xl leading-snug">
                {featured.title}
              </h3>
              <p className="text-sm text-text-secondary mt-3 max-w-3xl leading-relaxed">
                {featured.authors}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-6">
                {featured.url && (
                  <Button href={featured.url} external>
                    Read on arXiv
                  </Button>
                )}
                {featured.dataset && (
                  <a
                    href={featured.dataset}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors underline underline-offset-4 decoration-accent/30"
                  >
                    <ExternalLink size={14} />
                    Dataset
                  </a>
                )}
                <a
                  href={siteConfig.links.scholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  Scholar profile
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </article>
        )}

        {rest.length > 0 && (
          <div className="space-y-4">
            {rest.map((pub) => (
              <div
                key={pub.title}
                className="flex items-start justify-between gap-4 p-5 rounded-xl bg-surface border border-border hover:border-accent/20 transition-colors"
              >
                <div>
                  <h3 className="font-heading font-semibold text-text-primary">
                    {pub.title}
                  </h3>
                  <p className="text-sm text-text-secondary mt-1">
                    {pub.authors}
                  </p>
                  <p className="text-sm text-text-muted mt-0.5">
                    {pub.venue} &middot; {pub.year}
                  </p>
                </div>
                {pub.url && (
                  <a
                    href={pub.url}
                    className="text-text-muted hover:text-accent transition-colors shrink-0 mt-1"
                    aria-label={`Read ${pub.title}`}
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
