/**
 * Generate /public/og-image.png from /public/og-image.svg using sharp.
 * Sharp isn't a runtime dep — install it on demand the first time we render.
 *
 *   pnpm dlx tsx scripts/og-image.ts
 *
 * Or just commit the SVG and let LinkedIn / Twitter render it directly
 * (most validators accept SVG these days, but PNG is safer).
 */
import { promises as fs } from "node:fs";
import path from "node:path";

async function run() {
  const root = process.cwd();
  const svgPath = path.join(root, "public", "og-image.svg");
  const pngPath = path.join(root, "public", "og-image.png");

  let sharp: typeof import("sharp").default;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.error(
      "[og-image] `sharp` is not installed. Run `pnpm add -D sharp` first.",
    );
    process.exit(1);
  }

  const svg = await fs.readFile(svgPath);
  await sharp(svg).resize(1200, 630).png({ quality: 90 }).toFile(pngPath);
  console.log(`[og-image] Wrote ${pngPath}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
