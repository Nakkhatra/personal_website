"use client";

import { motion, useReducedMotion } from "framer-motion";
import AnimatedProjectCard from "@/components/home/AnimatedProjectCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/layout/Container";

const featuredProjects = [
  {
    name: "Regulatory News Extraction Pipeline",
    description:
      "Autonomous regulatory intelligence system that searches, fetches, and extracts news across 60+ countries with AI-powered topic classification (25 categories), hierarchical reporting, and emoji-highlighted source credibility.",
    company: "Robi Axiata",
    topics: ["Claude AI", "NLP", "Data Engineering"],
    blogUrl: "/blogs/regulatory-news-pipeline",
  },
  {
    name: "Travel Claim Validation Pipeline",
    description:
      "Automated end-to-end pipeline that validates employee travel expense claims using Claude Sonnet for PDF receipt extraction, fuzzy name/amount matching, policy-based cap enforcement, and location plausibility checks.",
    company: "Professional",
    topics: ["Claude AI", "AWS Bedrock", "Python", "Docker"],
    blogUrl: "/blogs/travel-claim-validation-pipeline",
  },
  {
    name: "RAG-Based Procurement Chatbot",
    description:
      "Built RAG chatbot using financial documents with hybrid vector-BM25 retrieval, context-aware reranking, and multi-turn conversational memory. Supports Claude and Ollama backends.",
    company: "Robi Axiata",
    topics: ["RAG", "LLM", "Vector Search", "FAISS", "Claude AI"],
    blogUrl: "/blogs/rag-procurement-chatbot",
  },
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
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function FeaturedProjects() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          title="Featured Projects"
          subtitle="Major projects from professional work"
        />
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={shouldReduce ? {} : containerVariants}
          initial={shouldReduce ? false : "hidden"}
          whileInView={shouldReduce ? undefined : "show"}
          viewport={{ once: true, margin: "-80px" }}
        >
          {featuredProjects.map((project) => (
            <motion.div
              key={project.name}
              variants={shouldReduce ? {} : cardVariants}
            >
              <AnimatedProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
