"use client";

import CommunityCard from "./CommunityCard";
import type { CommunityPost } from "@/lib/data/community";

export default function CommunityGrid({ posts }: { posts: CommunityPost[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => (
        <CommunityCard key={post.linkedinUrl} post={post} index={i} />
      ))}
    </div>
  );
}
