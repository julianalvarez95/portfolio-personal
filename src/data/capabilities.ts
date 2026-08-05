export type CapabilityGroup = {
  id: string;
  title: string;
  items: string[];
};

export const capabilityGroups: CapabilityGroup[] = [
  {
    id: "product",
    title: "Product",
    items: [
      "Product Strategy & Roadmap",
      "Product Discovery & Delivery",
      "Agile — Scrum, Kanban, Scrumban",
      "Stakeholder Management",
      "Data-Driven Product Development",
      "Go-to-Market Strategy",
      "LATAM Digital Markets",
    ],
  },
  {
    id: "data",
    title: "Data",
    items: [
      "SQL",
      "BigQuery",
      "MySQL",
      "Tableau",
      "Looker",
      "Data Studio",
      "Google Cloud Platform",
    ],
  },
  {
    id: "engineering",
    title: "Engineering",
    items: [
      "TypeScript & Next.js",
      "Python",
      "Kubernetes & ArgoCD — GitOps",
      "Docker",
    ],
  },
  {
    id: "ai-tooling",
    title: "AI Tooling",
    items: [
      "OpenAI APIs",
      "LangChain",
      "Claude Code",
      "Cursor",
      "Openclaw",
      "V0 by Vercel",
    ],
  },
  {
    id: "tools",
    title: "Tools",
    items: ["Jira", "Notion", "Figma"],
  },
];

export const languages = [
  { name: "Español", level: "Native or bilingual" },
  { name: "English", level: "Professional working — EF SET 56/100 (B2)" },
];
