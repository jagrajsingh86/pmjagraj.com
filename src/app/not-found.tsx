import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";

export default function NotFound() {
  return (
    <section className="py-32">
      <Container>
        <div className="mx-auto max-w-[60ch] text-center">
          <p className="font-mono text-xs tracking-[0.18em] text-[var(--text-muted)] uppercase">
            404
          </p>
          <h1 className="mt-4 font-sans text-[44px] leading-[1.05] font-semibold tracking-[-0.015em] md:text-[64px]">
            That page isn&rsquo;t here.
          </h1>
          <p className="mt-5 text-[17px] leading-[1.6] text-[var(--text-muted)]">
            It might have moved, or never existed. Either way — head back home, or get
            in touch and I&rsquo;ll point you at what you&rsquo;re looking for.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button as={Link} href="/" variant="primary">
              Take me home
            </Button>
            <Button as={Link} href="/#contact" variant="secondary">
              Contact me
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
