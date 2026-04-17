import { MDXRemote as MDX } from "next-mdx-remote/rsc";

export function MDXRemote({ source }: { source: string }) {
  return <MDX source={source} />;
}
