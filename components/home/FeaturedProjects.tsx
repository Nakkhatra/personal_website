import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/layout/Container";

const featuredProjects = [
  {
    name: "RAG-Based Procurement Chatbot",
    description:
      "Built RAG chatbot using financial documents with vector embeddings for accurate context retrieval and query responses on procurement policies and procedures.",
    company: "Robi Axiata",
    topics: ["RAG", "LLM", "Vector Search"],
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

export default function FeaturedProjects() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          title="Featured Projects"
          subtitle="Major projects from professional work"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <Card key={project.name}>
              <h3 className="font-heading font-semibold text-lg text-text-primary mb-2">
                {project.name}
              </h3>
              <p className="text-xs text-accent mb-3">{project.company}</p>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.topics.map((topic) => (
                  <Badge key={topic}>{topic}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
