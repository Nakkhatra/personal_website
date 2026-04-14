import { ExternalLink } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/data/siteConfig";
import { publications } from "@/lib/data/publications";

export default function Publications() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          title="Research & Publications"
          subtitle="Selected academic work"
          link={{ label: "View all", href: "/research" }}
        />
        <div className="space-y-4">
          {publications.map((pub) => (
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
        <div className="mt-8">
          <Button
            href={siteConfig.links.scholar}
            variant="secondary"
            external
          >
            View Google Scholar Profile
          </Button>
        </div>
      </Container>
    </section>
  );
}
