import Image from "next/image";
import { Section } from "@/components/primitives/Section";
import { CompanyLogoRow } from "@/components/primitives/CompanyLogoRow";
import { companyMarks } from "@/content/work";
import { site } from "@/content/site";

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="14 years at the seam where strategy meets shipping."
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7">
          <div className="space-y-5 text-[17px] leading-[1.7] text-[var(--text-muted)] md:text-[18px]">
            <p>
              <span className="text-[var(--text)]">
                I&rsquo;ve spent the last 14 years at the seam where strategy meets
                shipping
              </span>{" "}
              — first as an SAP technical lead at Security Weaver (now Pathlock),
              delivering to Siemens, Rolls-Royce, Airbus, Pratt &amp; Whitney, NBC
              Universal, and Serco; then as a programme manager and solution architect
              at Capgemini and Cognizant, leading Salesforce, MDM, and cloud
              transformations for Volvo Cars, PepsiCo, Pearson, Rio Tinto, and Philips.
            </p>
            <p>
              Today my focus is{" "}
              <span className="text-[var(--text)]">
                Generative AI in regulated enterprise environments
              </span>
              : RAG pipelines, LLM fine-tuning, Azure AI Foundry, Semantic Kernel, and
              the Databricks / Snowflake data plumbing that makes any of it trustworthy.
              I led the Philips Qlik-to-PySpark RAG project that cut code conversion
              effort by 80% across thousands of reports and hundreds of dashboards.
            </p>
            <p>
              I hold PMP, PMI-ACP, and SAFe POPM certifications and an MBA in Business
              Analytics from the University of Illinois Urbana-Champaign. I live in{" "}
              {site.location.split(",")[0]} with my family, volunteer in child-education
              programmes, and — when the light is good — shoot on a Fujifilm X-series.
            </p>
          </div>
        </div>

        <div className="md:col-span-5">
          <figure className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-elev-1)]">
            <Image
              src="/about/jagraj.jpg"
              alt={`${site.name} — head-and-shoulders portrait`}
              width={600}
              height={600}
              priority
              unoptimized
              className="aspect-square w-full object-cover"
            />
          </figure>
        </div>
      </div>

      <CompanyLogoRow label="Worked with or delivered to:" marks={companyMarks} />
    </Section>
  );
}
