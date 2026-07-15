import { getFilteredProjects } from "@/lib/github";
import { customProjects, otherProfessionalProjects } from "@/lib/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import CustomProjectCard from "@/components/projects/CustomProjectCard";
import Container from "@/components/layout/Container";

export const metadata = {
  title: "Projects — Shahrin Nakkhatra",
  description: "Selected open-source projects and professional work.",
};

export default async function ProjectsPage() {
  const githubProjects = await getFilteredProjects();

  return (
    <section className="py-20">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Projects</h1>
          <p className="mt-3 text-text-secondary">
            Professional work and selected repositories from my GitHub.
          </p>
        </div>

        {/* Featured Professional Projects (with blog links) */}
        {customProjects.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold tracking-tight mb-6">
              Featured Projects (with detailed write-ups)
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {customProjects.map((project) => (
                <CustomProjectCard key={project.name} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* Other Professional Projects */}
        {otherProfessionalProjects.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold tracking-tight mb-6">
              Professional Work
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {otherProfessionalProjects.map((project) => (
                <CustomProjectCard key={project.name} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* Open Source Projects */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            Open Source Projects
          </h2>
          {githubProjects.length === 0 ? (
            <p className="text-text-muted">
              Unable to load projects. Please check back later.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {githubProjects.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
