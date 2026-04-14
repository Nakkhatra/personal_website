import { techStack } from "@/lib/data/techStack";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/layout/Container";

export default function TechStack() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          title="Tech Stack"
          subtitle="Tools and technologies I work with"
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {techStack.map((category) => (
            <div key={category.category}>
              <h3 className="text-sm font-medium text-accent uppercase tracking-wider mb-4">
                {category.category}
              </h3>
              <ul className="space-y-2.5">
                {category.items.map((item) => (
                  <li
                    key={item.name}
                    className="text-text-secondary text-sm flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/40" />
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
