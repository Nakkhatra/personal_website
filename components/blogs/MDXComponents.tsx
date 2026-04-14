import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="text-3xl font-bold font-heading text-text-primary mt-10 mb-4"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="text-2xl font-bold font-heading text-text-primary mt-10 mb-4"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="text-xl font-semibold font-heading text-text-primary mt-8 mb-3"
      {...props}
    />
  ),
  h4: (props) => (
    <h4
      className="text-lg font-semibold font-heading text-text-primary mt-6 mb-2"
      {...props}
    />
  ),
  p: (props) => (
    <p className="text-text-secondary leading-relaxed mb-5" {...props} />
  ),
  a: (props) => (
    <a
      className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="list-disc list-inside space-y-1.5 text-text-secondary mb-5 ml-2" {...props} />
  ),
  ol: (props) => (
    <ol
      className="list-decimal list-inside space-y-1.5 text-text-secondary mb-5 ml-2"
      {...props}
    />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-2 border-accent pl-4 my-6 text-text-secondary italic"
      {...props}
    />
  ),
  code: (props) => {
    // Inline code (not inside pre)
    const isInline = typeof props.children === "string";
    if (isInline) {
      return (
        <code className="px-1.5 py-0.5 rounded bg-surface text-accent text-sm font-mono">
          {props.children}
        </code>
      );
    }
    return <code {...props} />;
  },
  pre: (props) => (
    <pre className="rounded-xl bg-surface border border-border p-4 overflow-x-auto mb-5 text-sm font-mono" {...props} />
  ),
  table: (props) => (
    <div className="overflow-x-auto mb-5">
      <table className="w-full text-sm text-text-secondary" {...props} />
    </div>
  ),
  thead: (props) => (
    <thead className="border-b border-border text-text-primary font-medium" {...props} />
  ),
  th: (props) => <th className="px-3 py-2 text-left" {...props} />,
  td: (props) => <td className="px-3 py-2 border-b border-border/50" {...props} />,
  strong: (props) => (
    <strong className="text-text-primary font-semibold" {...props} />
  ),
  hr: () => <hr className="border-border my-8" />,
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="rounded-xl my-6 max-w-full" alt="" {...props} />
  ),
};
