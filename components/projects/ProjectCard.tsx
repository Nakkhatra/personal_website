import { ExternalLink, Star, GitFork } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import type { Project } from "@/lib/github";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card>
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-heading font-semibold text-lg text-text-primary">
          {project.name.replace(/[-_]/g, " ")}
        </h3>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-muted hover:text-accent transition-colors shrink-0 ml-2"
          aria-label={`View ${project.name} on GitHub`}
        >
          <ExternalLink size={16} />
        </a>
      </div>
      <p className="text-text-secondary text-sm leading-relaxed mb-4">
        {project.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {project.language && <Badge>{project.language}</Badge>}
          {project.topics.slice(0, 2).map((topic) => (
            <Badge key={topic}>{topic}</Badge>
          ))}
        </div>
        <div className="flex items-center gap-3 text-text-muted text-xs">
          <span className="flex items-center gap-1">
            <Star size={12} />
            {project.stars}
          </span>
          {project.forks > 0 && (
            <span className="flex items-center gap-1">
              <GitFork size={12} />
              {project.forks}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
