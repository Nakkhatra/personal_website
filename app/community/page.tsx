import Container from "@/components/layout/Container";
import CommunityGrid from "@/components/community/CommunityGrid";
import LinkedInIcon from "@/components/ui/LinkedInIcon";
import { communityPosts } from "@/lib/data/community";
import { siteConfig } from "@/lib/data/siteConfig";

export const metadata = {
  title: "Community & Impact — Shahrin Nakkhatra",
  description:
    "Workshops, competitions, talks, and milestones from my journey in AI and Data Science.",
};

export default function CommunityPage() {
  return (
    <section className="relative py-20">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 900px 600px at 50% 10%, rgba(var(--accent-rgb), 0.04) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />
      <Container>
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl font-bold tracking-tight">
              Community & Impact
            </h1>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors"
              aria-label="LinkedIn profile"
            >
              <LinkedInIcon size={22} />
            </a>
          </div>
          <p className="mt-1 text-text-secondary max-w-2xl">
            Workshops, competitions, talks, and milestones from my journey in AI
            and Data Science.
          </p>
        </div>

        <CommunityGrid posts={communityPosts} />
      </Container>
    </section>
  );
}
