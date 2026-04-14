import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";

const BASE_URL = "https://nakkhatra.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const blogEntries = posts.map((post) => ({
    url: `${BASE_URL}/blogs/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
  }));

  const staticPages = [
    "",
    "/projects",
    "/blogs",
    "/art",
    "/research",
    "/resume",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...blogEntries];
}
