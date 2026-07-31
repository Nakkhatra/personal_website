import { ExternalLink } from "lucide-react";
import { publications } from "@/lib/data/publications";
import { siteConfig } from "@/lib/data/siteConfig";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Research & Publications — Shahrin Nakkhatra",
  description: "Academic research and publications.",
};

export default function ResearchPage() {
  const [featured, ...rest] = publications;

  return (
    <section className="py-20">
      <Container>
        <div className="mb-12">
          <p className="font-mono text-caption tracking-widest uppercase text-accent mb-3">
            Research
          </p>
          <h1 className="text-display sm:text-4xl font-heading">
            Research & Publications
          </h1>
          <div className="mt-3 h-px w-12 bg-accent/50" aria-hidden />
          <p className="mt-4 text-text-secondary max-w-2xl">
            Co-led creation of the largest open-source Bengali speech dataset on Mozilla Common Voice platform.
          </p>
        </div>

        {featured && (
          <article className="relative overflow-hidden rounded-2xl border border-accent/30 bg-surface p-6 sm:p-8 max-w-3xl mb-6">
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
              <h2 className="font-heading font-semibold text-xl sm:text-2xl text-text-primary leading-snug">
                {featured.title}
              </h2>
              <p className="text-sm text-text-secondary mt-3 leading-relaxed">
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
              </div>
            </div>
          </article>
        )}

        {rest.length > 0 && (
          <div className="space-y-4 max-w-3xl">
            {rest.map((pub) => (
              <div
                key={pub.title}
                className="p-6 rounded-xl bg-surface border border-border hover:border-accent/20 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading font-semibold text-text-primary text-lg">
                      {pub.title}
                    </h3>
                    <p className="text-sm text-text-secondary mt-2">
                      {pub.authors}
                    </p>
                    <p className="text-sm text-text-muted mt-1">
                      {pub.venue} &middot; {pub.year}
                    </p>
                  </div>
                  {pub.url && (
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-accent transition-colors shrink-0 mt-1"
                      aria-label={`Read ${pub.title}`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10">
          <Button href={siteConfig.links.scholar} variant="secondary" external>
            View Google Scholar Profile
          </Button>
        </div>
      </Container>
    </section>
  );
}
