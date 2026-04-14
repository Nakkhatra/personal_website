import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import type { BlogPost } from "@/lib/mdx";
import { getReadingTime } from "@/lib/mdx";

interface BlogCardProps {
  post: BlogPost;
  content?: string;
}

export default function BlogCard({ post, content }: BlogCardProps) {
  return (
    <Link href={`/blogs/${post.slug}`}>
      <Card className="h-full">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.frontmatter.tags?.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <h3 className="font-heading font-semibold text-lg text-text-primary mb-2">
          {post.frontmatter.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-4">
          {post.frontmatter.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-text-muted text-xs">
            <time>{post.frontmatter.date}</time>
            {content && (
              <>
                <span>&middot;</span>
                <span>{getReadingTime(content)}</span>
              </>
            )}
          </div>
          <span className="text-accent text-sm flex items-center gap-1">
            Read more <ArrowRight size={14} />
          </span>
        </div>
      </Card>
    </Link>
  );
}
