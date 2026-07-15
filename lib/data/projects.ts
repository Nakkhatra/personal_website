export interface CustomProject {
  name: string;
  description: string;
  company: string;
  topics: string[];
  blogUrl?: string;
}

export const customProjects: CustomProject[] = [
  {
    name: "Spectrum Data Research Pipeline",
    description:
      "Multi-source news aggregation pipeline discovering, fetching, and contextualizing news across 60+ countries using SerpAPI, Perplexity, and Tavily with BM25 ranking and Claude AI-driven analysis for regulatory intelligence.",
    company: "Professional",
    topics: ["Claude AI", "AWS Bedrock", "Python", "Research", "Data Engineering"],
    blogUrl: "/blogs/spectrum-research-pipeline",
  },
  {
    name: "Regulatory News Extraction Pipeline",
    description:
      "Autonomous regulatory intelligence system that autonomously searches, fetches, and extracts news across 60+ countries with AI-powered topic classification (25 categories), hierarchical reporting (country → topic → source tier), and emoji-highlighted source credibility.",
    company: "Robi Axiata",
    topics: ["Claude AI", "NLP", "Data Engineering", "Research"],
    blogUrl: "/blogs/regulatory-news-pipeline",
  },
  {
    name: "Travel Claim Validation Pipeline",
    description:
      "Automated end-to-end pipeline that validates employee travel expense claims using Claude Sonnet for PDF receipt extraction, fuzzy matching, policy-based cap enforcement, and location plausibility checks. Containerised with Docker and deployed on Ubuntu VM with nightly cron.",
    company: "Professional",
    topics: ["Claude AI", "AWS Bedrock", "Python", "Docker", "SQLite"],
    blogUrl: "/blogs/travel-claim-validation-pipeline",
  },
];
