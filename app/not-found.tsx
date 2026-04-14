import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="py-32">
      <Container>
        <div className="text-center">
          <p className="text-accent text-lg font-mono font-medium">404</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">
            Page not found
          </h1>
          <p className="mt-4 text-text-secondary max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <div className="mt-8">
            <Button href="/">Go Home</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
