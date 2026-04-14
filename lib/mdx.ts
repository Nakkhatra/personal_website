import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOGS_DIR = path.join(process.cwd(), "content/blogs");

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  published?: boolean;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOGS_DIR)) return [];

  const files = fs.readdirSync(BLOGS_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const raw = fs.readFileSync(path.join(BLOGS_DIR, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        frontmatter: data as BlogFrontmatter,
      };
    })
    .filter((post) => post.frontmatter.published !== false)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );

  return posts;
}

export function getPostBySlug(slug: string) {
  const filePath = path.join(BLOGS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    frontmatter: data as BlogFrontmatter,
    content,
  };
}

export function getReadingTime(content: string): string {
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}
