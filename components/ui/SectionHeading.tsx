import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  link?: { label: string; href: string };
}

export default function SectionHeading({
  title,
  subtitle,
  link,
}: SectionHeadingProps) {
  return (
    <div className="flex items-end justify-between mb-10">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-text-secondary">{subtitle}</p>
        )}
      </div>
      {link && (
        <Link
          href={link.href}
          className="hidden sm:inline-flex items-center gap-1 text-sm text-accent hover:text-accent-hover transition-colors"
        >
          {link.label}
          <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}
