import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug, getReadingTime } from "@/lib/mdx";
import { mdxComponents } from "@/components/blogs/MDXComponents";
import Container from "@/components/layout/Container";
import Badge from "@/components/ui/Badge";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  try {
    const { frontmatter } = getPostBySlug(params.slug);
    return {
      title: `${frontmatter.title} — Shahrin Nakkhatra`,
      description: frontmatter.description,
    };
  } catch {
    return { title: "Post Not Found" };
  }
}

export default function BlogPostPage({ params }: Props) {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  const { frontmatter, content } = post;

  return (
    <section className="py-20">
      <Container>
        <article className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {frontmatter.tags?.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
              {frontmatter.title}
            </h1>
            <div className="flex items-center gap-3 mt-4 text-text-muted text-sm">
              <time>{frontmatter.date}</time>
              <span>&middot;</span>
              <span>{getReadingTime(content)}</span>
            </div>
          </header>

          {/* Content */}
          <div className="prose-custom">
            <MDXRemote
              source={content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [
                      rehypePrettyCode,
                      {
                        theme: "github-dark-dimmed",
                        keepBackground: false,
                      },
                    ],
                  ],
                },
              }}
            />
          </div>
        </article>
      </Container>
    </section>
  );
}
