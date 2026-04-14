import { siteConfig } from "./data/siteConfig";

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
}

export interface Project {
  name: string;
  description: string;
  url: string;
  homepage: string | null;
  stars: number;
  forks: number;
  language: string | null;
  topics: string[];
}

export async function getFilteredProjects(): Promise<Project[]> {
  try {
    const token = process.env.GITHUB_TOKEN;
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(
      `https://api.github.com/users/${siteConfig.githubUsername}/repos?per_page=100&sort=updated`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.error(`GitHub API error: ${res.status}`);
      return [];
    }

    const repos: GitHubRepo[] = await res.json();

    return repos
      .filter((repo) => (siteConfig.projectWhitelist as readonly string[]).includes(repo.name))
      .map((repo) => ({
        name: repo.name,
        description: repo.description || "No description provided.",
        url: repo.html_url,
        homepage: repo.homepage,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        topics: repo.topics || [],
      }))
      .sort((a, b) => b.stars - a.stars);
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    return [];
  }
}
