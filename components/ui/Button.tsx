import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-background hover:bg-accent-hover",
  secondary:
    "bg-surface border border-border text-text-primary hover:bg-surface-hover hover:border-accent/20",
  ghost:
    "text-text-secondary hover:text-accent",
};

export default function Button({
  children,
  href,
  variant = "primary",
  external = false,
  className = "",
}: ButtonProps) {
  const base = `inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${variants[variant]} ${className}`;

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={base}>
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return <button className={base}>{children}</button>;
}
