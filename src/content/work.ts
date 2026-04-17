import type { CompanyMark, WorkCard, WorkTag } from "./types";

export const work: WorkCard[] = [
  {
    slug: "philips-rag",
    client: "Philips",
    timeframe: "2023 – 2025",
    title: "Cutting 80% of code conversion work with a RAG pipeline",
    outcome:
      "An Azure AI Foundry RAG pipeline migrated thousands of QlikSense reports to PySpark — 80% less effort per conversion.",
    chips: ["Azure AI Foundry", "RAG", "Python"],
    tags: ["AI", "Data"],
    status: "live",
  },
  {
    slug: "volvo-salesforce",
    client: "Volvo Cars",
    timeframe: "2019 – 2021",
    title: "A Salesforce rollout that actually lifted sales 50%",
    outcome:
      "First-market Salesforce + CPQ rollout for Volvo Cars India: from low-probability go-live to +50% YoY sales volume.",
    chips: ["Salesforce", "CPQ", "Change Management"],
    tags: ["Salesforce", "Delivery"],
    status: "stub",
  },
  {
    slug: "pepsico-stibo-mdm",
    client: "PepsiCo",
    timeframe: "2022 – 2024",
    title: "Stibo MDM without the usual six-month data-cleanse tax",
    outcome:
      "Hybrid waterfall/agile MDM delivery: 30% fewer data inconsistencies and 30% faster go-to-market.",
    chips: ["Stibo MDM", "Data Governance", "Hybrid Delivery"],
    tags: ["Data", "Delivery"],
    status: "stub",
  },
  {
    slug: "security-weaver-sap",
    client: "Security Weaver",
    timeframe: "2013 – 2016",
    title: "Shipping SAP GRC to six Fortune-500 clients",
    outcome:
      "ABAP-on-HANA migration of the full GRC product suite, live to Siemens, Rolls-Royce, Airbus, Pratt & Whitney, NBC Universal, and Serco.",
    chips: ["SAP", "ABAP/HANA", "Release Management"],
    tags: ["SAP"],
    status: "stub",
  },
];

/** Filter chips shown above the Work grid, in display order. */
export const workTags: WorkTag[] = ["AI", "Data", "Salesforce", "SAP", "Delivery"];

export const companyMarks: CompanyMark[] = [
  { name: "Cognizant" },
  { name: "Philips" },
  { name: "Rio Tinto" },
  { name: "PepsiCo" },
  { name: "Pearson" },
  { name: "Capgemini" },
  { name: "Volvo Cars" },
  { name: "Netsmartz" },
  { name: "BLS International" },
  { name: "Security Weaver / Pathlock" },
  { name: "Siemens" },
  { name: "Rolls-Royce" },
  { name: "Airbus" },
  { name: "Pratt & Whitney" },
  { name: "NBC Universal" },
  { name: "Serco" },
];
