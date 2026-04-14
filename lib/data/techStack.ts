export interface TechItem {
  name: string;
}

export interface TechCategory {
  category: string;
  items: TechItem[];
}

export const techStack: TechCategory[] = [
  {
    category: "Languages",
    items: [
      { name: "Python" },
      { name: "MATLAB" },
      { name: "C" },
      { name: "C++" },
      { name: "Bash" },
      { name: "SQL" },
    ],
  },
  {
    category: "ML/DL Frameworks",
    items: [
      { name: "PyTorch" },
      { name: "TensorFlow" },
      { name: "Keras" },
    ],
  },
  {
    category: "MLOps & Cloud",
    items: [
      { name: "Docker" },
      { name: "Kubernetes" },
      { name: "GitHub CI/CD" },
      { name: "AWS (EC2, SageMaker)" },
      { name: "Snowflake" },
      { name: "DBT" },
    ],
  },
  {
    category: "Data Science",
    items: [
      { name: "Pandas" },
      { name: "PySpark" },
    ],
  },
  {
    category: "Visualization",
    items: [
      { name: "Matplotlib" },
      { name: "Plotly" },
      { name: "Seaborn" },
      { name: "Bokeh" },
    ],
  },
  {
    category: "Version Control",
    items: [
      { name: "Git" },
    ],
  },
  {
    category: "API",
    items: [
      { name: "Flask" },
    ],
  },
];
