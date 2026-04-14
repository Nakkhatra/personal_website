import Container from "@/components/layout/Container";
import InstagramFeed from "@/components/art/InstagramFeed";

export const metadata = {
  title: "Art — Shahrin Nakkhatra",
  description: "A collection of my artwork and creative explorations.",
};

export default function ArtPage() {
  return (
    <section className="py-20">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Art</h1>
          <p className="mt-3 text-text-secondary">
            Creative explorations as a counterbalance to engineering.
          </p>
        </div>
        <InstagramFeed username="n_artholic" />
      </Container>
    </section>
  );
}
