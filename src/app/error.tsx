"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="py-32">
      <Container>
        <div className="mx-auto max-w-[60ch] text-center">
          <p className="font-mono text-xs tracking-[0.18em] text-[var(--text-muted)] uppercase">
            500
          </p>
          <h1 className="mt-4 font-sans text-[44px] leading-[1.05] font-semibold tracking-[-0.015em] md:text-[64px]">
            Something broke on my end.
          </h1>
          <p className="mt-5 text-[17px] leading-[1.6] text-[var(--text-muted)]">
            Sorry about that. Try again, or drop me a line if it persists.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button onClick={reset} variant="primary">
              Try again
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
