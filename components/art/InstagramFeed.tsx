"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";
import { instagramPosts } from "@/lib/data/artworks";

interface InstagramFeedProps {
  username: string;
}

export default function InstagramFeed({ username }: InstagramFeedProps) {
  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Process embeds after script loads
    script.onload = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {instagramPosts.map((url) => (
          <blockquote
            key={url}
            className="instagram-media"
            data-instgrm-captioned
            data-instgrm-permalink={url}
            data-instgrm-version="14"
            style={{
              background: "#FFF",
              border: 0,
              borderRadius: "3px",
              boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
              margin: "1px",
              maxWidth: "540px",
              minWidth: "326px",
              padding: 0,
              width: "calc(100% - 2px)",
            }}
          />
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Button href={`https://www.instagram.com/${username}/`} external>
          View More on Instagram
        </Button>
      </div>
    </div>
  );
}

// Extend window interface for Instagram embed script
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}
