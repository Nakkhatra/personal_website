import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { CustomProject } from "@/lib/data/projects";

interface CustomProjectCardProps {
  project: CustomProject;
}

export default function CustomProjectCard({ project }: CustomProjectCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <div className="flex-1">
        <h3 className="font-heading font-semibold text-lg text-text-primary mb-2">
          {project.name}
        </h3>
        <p className="text-xs text-accent mb-3">{project.company}</p>
        <p className="text-text-secondary text-sm leading-relaxed mb-4">
          {project.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {project.topics.map((topic) => (
          <Badge key={topic}>{topic}</Badge>
        ))}
      </div>
      {project.blogUrl && (
        <Link
          href={project.blogUrl}
          className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent-hover transition-colors"
        >
          Read full journey →
        </Link>
      )}
    </Card>
  );
}
