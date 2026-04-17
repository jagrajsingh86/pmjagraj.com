import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface CaseStudyMeta {
  slug: string;
  title: string;
  client: string;
  role: string;
  timeframe: string;
  stack: string[];
  outcome_headline: string;
  outcome_metrics?: { label: string; value: string }[];
  status: "live" | "stub";
}

export interface CaseStudy {
  meta: CaseStudyMeta;
  content: string;
}

const CONTENT_DIR = path.join(process.cwd(), "src/content/work");

export async function getAllCaseStudySlugs(): Promise<string[]> {
  const entries = await fs.readdir(CONTENT_DIR);
  return entries.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  const file = path.join(CONTENT_DIR, `${slug}.mdx`);
  try {
    const raw = await fs.readFile(file, "utf8");
    const { data, content } = matter(raw);
    return {
      meta: { slug, ...(data as Omit<CaseStudyMeta, "slug">) },
      content,
    };
  } catch {
    return null;
  }
}
