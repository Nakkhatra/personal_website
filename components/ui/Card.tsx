interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = true,
}: CardProps) {
  return (
    <div
      className={`rounded-xl bg-surface border border-border p-6 ${
        hover ? "transition-colors hover:bg-surface-hover hover:border-accent/20" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
