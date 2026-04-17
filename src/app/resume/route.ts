import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

export async function GET() {
  const file = path.join(process.cwd(), "public/resume/jagraj-singh-resume.pdf");
  try {
    const data = await fs.readFile(file);
    return new NextResponse(new Uint8Array(data), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="jagraj-singh-resume.pdf"',
        "Cache-Control": "public, max-age=86400, must-revalidate",
      },
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "Resume not yet uploaded. Place a PDF at public/resume/jagraj-singh-resume.pdf.",
      },
      { status: 404 },
    );
  }
}
