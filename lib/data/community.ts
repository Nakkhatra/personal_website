export type CommunityCategory =
  | "Workshop"
  | "Competition"
  | "Speaking"
  | "Community"
  | "AI";

export interface CommunityPost {
  title: string;
  description: string;
  date: string;
  categories: CommunityCategory[];
  type: "image" | "video";
  thumbnail: string | string[];
  linkedinUrl: string;
}

export const communityPosts: CommunityPost[] = [
  {
    title: "Early Achievement: Bangladeshi custom vehicle tracking and relative velocity measurement",
    description:
      "Developed a computer vision pipeline for the Omdena Bangladesh Chapter challenge using YOLOv4 for multi-class vehicle detection and DeepSORT for object tracking. The system detects 9 vehicle classes and visualizes relative vehicle velocity in real time (green for positive, red for negative motion). Despite limited time and an imbalanced dataset, the project demonstrated a strong proof of concept with scope for improved accuracy through future data collection and model refinement.",
    date: "Aug 2021",
    categories: ["AI", "Community"],
    type: "video",
    thumbnail: "/images/community/post1.mp4",
    linkedinUrl:
      "https://www.linkedin.com/feed/update/urn:li:activity:6832700348898140161/",
  },
  {
    title: "DLSprint @ BUET CSE Fest",
    description:
      "Served as a judge for DL Sprint 4.0, a Kaggle competition held during BUET CSE Fest, evaluating solutions for Bengali long-form speech recognition and speaker diarization. It was rewarding to return to my alma mater and see participants tackle challenging problems with innovative modeling techniques, system designs, and even newly created datasets for Bengali speaker diarization. Having also judged previous DL Sprint competitions as part of Bengali.AI, it was great to continue supporting the growth of Bangladesh's AI research community.",
    date: "Nov 2024",
    categories: ["Competition", "Community"],
    type: "image",
    thumbnail: [
      "/images/community/post2_1.jpg",
      "/images/community/post2_2.jpg",
      "/images/community/post2_3.jpg",
    ],
    linkedinUrl:
      "https://www.linkedin.com/posts/nakkhatra_dlsprint-buetcsefest-kaggle-activity-7435988622404874240-CilD",
  },
  {
    title: "AI-Native Share Session",
    description:
      "Conducted a Generative AI training session for the Strategic Planning & EPM team at Robi Axiata, covering Large Language Models (LLMs), prompt engineering, AI reasoning, hallucinations, and practical AI applications in business. The session focused on helping participants understand how to effectively leverage AI tools for productivity, research, strategic decision-making, and responsible AI adoption as part of Robi's AI-native transformation.",
    date: "Feb 2025",
    categories: ["Speaking", "AI"],
    type: "image",
    thumbnail: "/images/community/post3.jpg",
    linkedinUrl:
      "https://www.linkedin.com/posts/nakkhatra_good-time-nice-to-be-a-part-of-the-ai-native-share-7469439950971908096-_fev/",
  },
];
