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
  return (
    <section className="py-20">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">
            Research & Publications
          </h1>
          <p className="mt-3 text-text-secondary">
            Co-led creation of the largest open-source Bengali speech dataset on Mozilla Common Voice platform.
          </p>
        </div>
        <div className="space-y-4 max-w-3xl">
          {publications.map((pub) => (
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
                  {pub.dataset && (
                    <a
                      href={pub.dataset}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-hover transition-colors mt-2"
                    >
                      <ExternalLink size={14} />
                      Dataset
                    </a>
                  )}
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
        <div className="mt-10">
          <Button href={siteConfig.links.scholar} variant="secondary" external>
            View Google Scholar Profile
          </Button>
        </div>
      </Container>
    </section>
  );
}
