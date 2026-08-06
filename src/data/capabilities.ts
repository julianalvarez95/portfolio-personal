export type CapabilityItem = {
  label: string;
  icon?: string;
};

export type CapabilityGroup = {
  id: string;
  title: string;
  items: CapabilityItem[];
};

export const capabilityGroups: CapabilityGroup[] = [
  {
    id: "product",
    title: "Product",
    items: [
      { label: "Product Strategy & Roadmap" },
      { label: "Product Discovery & Delivery" },
      { label: "Agile — Scrum, Kanban, Scrumban" },
      { label: "Stakeholder Management" },
      { label: "Data-Driven Product Development" },
      { label: "Go-to-Market Strategy" },
      { label: "LATAM Digital Markets" },
    ],
  },
  {
    id: "data",
    title: "Data",
    items: [
      { label: "SQL" },
      { label: "BigQuery", icon: "googlebigquery" },
      { label: "MySQL", icon: "mysql" },
      { label: "Tableau", icon: "tableau" },
      { label: "Looker", icon: "looker" },
      { label: "Data Studio" },
      { label: "Google Cloud Platform", icon: "googlecloud" },
    ],
  },
  {
    id: "engineering",
    title: "Engineering",
    items: [
      { label: "TypeScript", icon: "typescript" },
      { label: "Next.js", icon: "nextdotjs" },
      { label: "Python", icon: "python" },
      { label: "Kubernetes", icon: "kubernetes" },
      { label: "ArgoCD", icon: "argo" },
      { label: "GitOps" },
      { label: "Docker", icon: "docker" },
    ],
  },
  {
    id: "ai-tooling",
    title: "AI Tooling",
    items: [
      { label: "OpenAI APIs", icon: "openai" },
      { label: "LangChain", icon: "langchain" },
      { label: "Claude Code", icon: "claude" },
      { label: "Cursor", icon: "cursor" },
      { label: "Openclaw" },
      { label: "V0 by Vercel", icon: "vercel" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    items: [
      { label: "Jira", icon: "jira" },
      { label: "Notion", icon: "notion" },
      { label: "Figma", icon: "figma" },
    ],
  },
];

export const languages = [
  { name: "Español", level: "Native or bilingual" },
  { name: "English", level: "Professional working — EF SET 56/100 (B2)" },
];
