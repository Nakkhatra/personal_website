import Container from "@/components/layout/Container";
import ArtGallery from "@/components/art/ArtGallery";
import FadeIn from "@/components/ui/FadeIn";

export const metadata = {
  title: "Art",
  description:
    "A curated collection of artwork spanning graphite sketches, digital paintings, color pencils, and acrylics.",
};

export default function ArtPage() {
  return (
    <section className="py-20">
      <Container>
        {/* Hero */}
        <FadeIn className="mb-14 max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight">Art</h1>
          <p className="mt-4 text-text-secondary leading-relaxed">
            Art has been my creative outlet long before I started building AI
            systems. I work across graphite sketches, digital paintings, color
            pencils, and acrylics. This collection showcases some of my favorite
            works created over the years.
          </p>
        </FadeIn>

        {/* Gallery */}
        <ArtGallery />
      </Container>
    </section>
  );
}
