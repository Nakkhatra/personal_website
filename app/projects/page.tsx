import { getFilteredProjects } from "@/lib/github";
import ProjectCard from "@/components/projects/ProjectCard";
import Container from "@/components/layout/Container";

export const metadata = {
  title: "Projects — Shahrin Nakkhatra",
  description: "Selected open-source projects and repositories.",
};

export default async function ProjectsPage() {
  const projects = await getFilteredProjects();

  return (
    <section className="py-20">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
          <p className="mt-3 text-text-secondary">
            Selected repositories from my GitHub.
          </p>
        </div>
        {projects.length === 0 ? (
          <p className="text-text-muted">
            Unable to load projects. Please check back later.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
