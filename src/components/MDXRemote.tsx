import { MDXRemote as MDX } from "next-mdx-remote/rsc";
import { PhilipsRAGDiagram } from "@/components/diagrams/PhilipsRAGDiagram";

/**
 * Components that MDX case-study bodies can reference by name.
 * Add new diagrams / interactive embeds here.
 */
const components = {
  PhilipsRAGDiagram,
};

export function MDXRemote({ source }: { source: string }) {
  return <MDX source={source} components={components} />;
}
