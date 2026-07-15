export interface CustomProject {
  name: string;
  description: string;
  company: string;
  topics: string[];
  blogUrl?: string;
}

// Projects with blog posts
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
  {
    name: "RAG-Based Procurement Chatbot",
    description:
      "Built RAG chatbot using financial documents with hybrid vector-BM25 retrieval, context-aware reranking, and multi-turn conversational memory. Supports Claude (AWS Bedrock) and Ollama backends with real-time document indexing and glossary-based abbreviation expansion.",
    company: "Robi Axiata",
    topics: ["RAG", "LLM", "Vector Search", "FAISS", "Claude AI"],
    blogUrl: "/blogs/rag-procurement-chatbot",
  },
];

// Professional work without blog posts
export const otherProfessionalProjects: CustomProject[] = [
  {
    name: "Customer Churn Prediction System",
    description:
      "End-to-end ML system with automated pipeline on AWS, monthly retraining, model selection, and deployment using Docker, Kubernetes, and Argo Workflows.",
    company: "Optimizely",
    topics: ["ML", "AWS", "Kubernetes"],
  },
  {
    name: "Social Media Sentiment Analysis",
    description:
      "Developed tool tracking sentiment, intent, emotion, and issues from Facebook comments across major telecom providers with live Tableau dashboard.",
    company: "Robi Axiata",
    topics: ["NLP", "Sentiment Analysis", "Tableau"],
  },
  {
    name: "Survello Surveillance Platform",
    description:
      "Enhanced multi-model platform with anomaly detection, loitering, object counting, mask detection, and motion tracking using multiprocessing.",
    company: "NybSys",
    topics: ["Computer Vision", "Real-time Processing"],
  },
  {
    name: "Fall Detection App",
    description:
      "Led end-to-end development of smartphone-based fall detection including data collection, synthetic data generation, and on-device ML model deployment.",
    company: "NybSys",
    topics: ["Mobile ML", "Edge Computing"],
  },
  {
    name: "My Robi User Profiling System",
    description:
      "Engineered inactive user profiling system to segment dormant users and deliver personalized re-engagement offers based on usage patterns.",
    company: "Robi Axiata",
    topics: ["ML", "Customer Analytics"],
  },
];
