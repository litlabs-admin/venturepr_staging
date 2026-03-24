import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function MarkdownLink({ href, children, ...props }) {
  const isExternal = /^https?:\/\//i.test(href ?? "");

  return (
    <a
      {...props}
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

export function MarkdownContent({ markdown }) {
  return (
    <div className="blog-post-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
          a: MarkdownLink,
        }}
      >
        {String(markdown ?? "")}
      </ReactMarkdown>
    </div>
  );
}
