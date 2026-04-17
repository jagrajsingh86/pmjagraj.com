import type { MetricTile, SkillCategory } from "./types";

export const skills: SkillCategory[] = [
  {
    title: "AI & ML",
    items: [
      "RAG pipelines",
      "LLM fine-tuning",
      "Prompt engineering",
      "Semantic Kernel",
      "OpenAI APIs",
      "Azure AI Foundry",
      "Azure OpenAI",
      "Azure Cognitive Services",
      "Vector databases",
      "Embedding models",
      "AI guardrails & evaluation",
    ],
  },
  {
    title: "Cloud & Data",
    items: [
      "Azure (App Service, Functions, Logic Apps, Service Bus, Data Lake, DevOps)",
      "AWS",
      "GCP (BigQuery)",
      "Databricks",
      "Snowflake",
      "Terraform",
      "Microservices",
      "API Management",
      "ETL/ELT",
    ],
  },
  {
    title: "Delivery & Leadership",
    items: [
      "SAFe PI Planning",
      "Scrum",
      "Kanban",
      "Scrumban",
      "Scaled Agile",
      "Stakeholder Management",
      "Risk & Dependency Management",
      "Change Management",
      "RACI",
      "Release Management",
      "Hybrid delivery (waterfall + agile)",
    ],
  },
  {
    title: "Platforms & Enterprise",
    items: [
      "Salesforce (Sales Cloud, Marketing Cloud, CPQ, Admin)",
      "Stibo MDM",
      "SAP ABAP",
      "SAP HANA",
      "SAP NetWeaver",
      "SAP GRC",
      "Tableau",
      "Power BI",
    ],
  },
];

export const metrics: MetricTile[] = [
  { value: "14", label: "years\nexperience" },
  { value: "20+", label: "enterprise clients\ndelivered" },
  { value: "400+", label: "users\ntrained" },
];
