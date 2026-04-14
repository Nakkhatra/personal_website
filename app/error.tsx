"use client";

import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="py-32">
      <Container>
        <div className="text-center">
          <p className="text-accent text-lg font-mono font-medium">Error</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">
            Something went wrong
          </h1>
          <p className="mt-4 text-text-secondary max-w-md mx-auto">
            An unexpected error occurred. Please try again.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-medium bg-accent text-background hover:bg-accent-hover transition-colors"
            >
              Try Again
            </button>
            <Button href="/" variant="secondary">
              Go Home
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
