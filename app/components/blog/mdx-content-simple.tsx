// Simple markdown renderer - for now just displays content
// Full MDX support requires @mdx-js/mdx or next-mdx-remote
import React from 'react';

interface MDXContentProps {
  content: string;
}

export function MDXContent({ content }: MDXContentProps) {
  // Basic markdown rendering - replace with proper MDX renderer
  // when dependencies are installed
  const htmlContent = content
    .split('\n')
    .map((line, i) => {
      // Very basic markdown parsing
      if (line.startsWith('# ')) {
        return <h1 key={i} className="text-4xl font-bold mt-8 mb-4">{line.slice(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={i} className="text-3xl font-bold mt-6 mb-3">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={i} className="text-2xl font-semibold mt-4 mb-2">{line.slice(4)}</h3>;
      }
      if (line.trim() === '') {
        return <br key={i} />;
      }
      return <p key={i} className="mb-4">{line}</p>;
    });

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      {htmlContent}
    </div>
  );
}

