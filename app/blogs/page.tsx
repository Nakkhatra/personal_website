import { getAllPosts } from "@/lib/mdx";
import BlogCard from "@/components/blogs/BlogCard";
import Container from "@/components/layout/Container";

export const metadata = {
  title: "Blog — Shahrin Nakkhatra",
  description: "Thoughts on AI, engineering, and more.",
};

export default function BlogsPage() {
  const posts = getAllPosts();

  return (
    <section className="py-20">
      <Container>
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
          <p className="mt-3 text-text-secondary">
            Thoughts on AI, engineering, and more.
          </p>
        </div>
        {posts.length === 0 ? (
          <p className="text-text-muted">No posts yet. Check back soon.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
