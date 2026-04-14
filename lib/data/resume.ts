export interface ResumeExperience {
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface ResumeEducation {
  degree: string;
  institution: string;
  location: string;
  period: string;
  details?: string;
}

export interface ResumeSkillGroup {
  category: string;
  skills: string[];
}

export interface ResumeData {
  summary?: string;
  experience: ResumeExperience[];
  education: ResumeEducation[];
  skills: ResumeSkillGroup[];
  certifications?: string[];
}

export const resumeData: ResumeData = {
  summary:
    "Machine Learning Engineer with 5+ years of experience building and deploying end-to-end ML systems, managing data pipelines, and leading AI initiatives. Proven track record in customer analytics, computer vision, and NLP. Seeking tech leadership roles to drive innovation and build high-performing teams.",
  experience: [
    {
      title: "Associate Manager, AI & Data Science",
      company: "Robi Axiata Limited",
      location: "Dhaka, Bangladesh",
      period: "October 2024 — Present",
      bullets: [
        "Developed social media sentiment analysis tool tracking sentiment, intent, emotion, and issues from Facebook comments from Robi, Airtel, Banglalink, and Grameenphone Facebook pages - Built live tableau dashboard presenting insights",
        "Created automated SLT KPI monitoring app with database versioning, file-based KPI calculations, UI filtering, and monthly email reporting for senior leadership (Band A-C)",
        "Engineered My Robi app inactive user profiling system to segment dormant users and deliver personalized re-engagement offers based on usage patterns",
        "Built RAG-based procurement chatbot using financial documents (policies, LOAs, procedures) with vector embeddings for accurate context retrieval and query responses",
      ],
    },
    {
      title: "Machine Learning Data Engineer - Level 2",
      company: "Optimizely",
      location: "Remote (US/UK)",
      period: "June 2022 — September 2024",
      bullets: [
        "Built end-to-end customer churn prediction system using time series analysis on product usage data, addressing class imbalance and data quality challenges",
        "Architected automated ML pipeline on AWS with monthly retraining, model selection, and deployment using Docker, Kubernetes (Kustomize), and Argo Workflows",
        "Implemented CI/CD pipeline via GitHub Actions and managed three-tier data architecture (RAW/STAGING/REPORTING) in Snowflake with DBT transformations",
        "Integrated LIME for model explainability and delivered actionable insights to stakeholders through automated reporting dashboard",
      ],
    },
    {
      title: "Machine Learning Engineer",
      company: "NybSys",
      location: "Dhaka, Bangladesh",
      period: "October 2021 — May 2022",
      bullets: [
        "Enhanced multi-model surveillance platform (Survello) with anomaly detection, loitering, object counting, mask detection, and motion tracking using multiprocessing",
        "Developed real-time drowsiness detection system using facial landmarks and eye aspect ratio analysis with alert mechanisms",
        "Led end-to-end development of smartphone-based fall detection app including data collection, synthetic data generation, and on-device ML model deployment",
        "Maintained and migrated NybFace IoT-based face recognition API to edge devices for improved latency and offline capability",
      ],
    },
    {
      title: "Global Product Development Officer",
      company: "Avery Dennison",
      location: "Dhaka, Bangladesh",
      period: "March 2020 — September 2021",
      bullets: [
        "Managed product lifecycle from quotation to production setup in Oracle database, collaborating with supply chain for material sourcing and product re-engineering",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Mechanical Engineering",
      institution: "Bangladesh University of Engineering and Technology (BUET)",
      location: "Dhaka, Bangladesh",
      period: "July 2014 — April 2019",
    },
  ],
  skills: [
    {
      category: "Languages",
      skills: ["Python", "MATLAB", "C", "C++", "Bash", "SQL"],
    },
    {
      category: "ML/DL Frameworks",
      skills: ["PyTorch", "TensorFlow", "Keras"],
    },
    {
      category: "MLOps & Cloud",
      skills: ["Docker", "Kubernetes", "GitHub CI/CD", "AWS (EC2, SageMaker)", "Snowflake", "DBT"],
    },
    {
      category: "Data Science",
      skills: ["Pandas", "PySpark"],
    },
    {
      category: "Visualization",
      skills: ["Matplotlib", "Plotly", "Seaborn", "Bokeh"],
    },
    {
      category: "Version Control",
      skills: ["Git"],
    },
    {
      category: "API",
      skills: ["Flask"],
    },
  ],
  certifications: [
    "Machine Learning — Stanford University (Coursera): Foundations, algorithms, and mathematics",
    "Deep Learning Specialization — Stanford University (Coursera): Neural networks, hyperparameter tuning, optimization",
  ],
};
