import { techStack } from "@/lib/data/techStack";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/layout/Container";

export default function TechStack() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          index="04"
          title="Tech Stack"
          subtitle="Tools and technologies I work with"
        />
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {techStack.map((category) => (
            <div key={category.category}>
              <h3 className="font-mono text-caption tracking-widest uppercase text-accent mb-4">
                {category.category}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <li
                    key={item.name}
                    className="text-sm text-text-secondary px-2.5 py-1 rounded-md border border-border/80 bg-surface/40"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
