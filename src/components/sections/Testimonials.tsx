import { Section } from "@/components/primitives/Section";
import { testimonials } from "@/content/testimonials";
import { site } from "@/content/site";

export function Testimonials() {
  if (testimonials.length === 0) {
    return (
      <Section id="testimonials" eyebrow="Words from others" title="Coming soon.">
        <div className="mx-auto max-w-[60ch] rounded-lg border border-[var(--border)] bg-[var(--bg-elev-1)] p-8 text-center">
          <p className="font-serif text-[20px] leading-[1.5] text-[var(--text-muted)] italic">
            “Testimonials coming soon. In the meantime, see{" "}
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener"
              className="text-[var(--accent)] underline underline-offset-4"
            >
              LinkedIn recommendations
            </a>
            .”
          </p>
        </div>
      </Section>
    );
  }

  return (
    <Section id="testimonials" eyebrow="Words from others" title="What people say.">
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <li
            key={i}
            className="rounded-lg border border-[var(--border)] bg-[var(--bg-elev-1)] p-6"
          >
            <blockquote className="font-serif text-[18px] leading-[1.5] text-[var(--text)] italic">
              “{t.quote}”
            </blockquote>
            <footer className="mt-5 text-sm text-[var(--text-muted)]">
              <span className="font-medium text-[var(--text)]">{t.name}</span> ·{" "}
              {t.role}, {t.company}
            </footer>
          </li>
        ))}
      </ul>
    </Section>
  );
}
