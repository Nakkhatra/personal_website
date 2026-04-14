import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/layout/Container";
import { getAllPosts } from "@/lib/mdx";

export default function BlogPreview() {
  const posts = getAllPosts().slice(0, 2);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          title="Latest Blog Posts"
          subtitle="Thoughts on AI, engineering, and more"
          link={{ label: "View all posts", href: "/blogs" }}
        />
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blogs/${post.slug}`}>
              <Card className="h-full">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.frontmatter.tags.map((tag) => (
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
                  <time className="text-text-muted text-xs">{post.frontmatter.date}</time>
                  <span className="text-accent text-sm flex items-center gap-1">
                    Read more <ArrowRight size={14} />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
