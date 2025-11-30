import { compile } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { use } from 'react';

interface MDXContentProps {
  content: string;
}

// For now, render as HTML until MDX compilation is set up
// This requires @mdx-js/mdx to be installed
export async function MDXContent({ content }: MDXContentProps) {
  // Simple markdown to HTML conversion
  // In production, you'd want to use a proper MDX compiler
  // For now, we'll render the content as-is and note that
  // proper MDX rendering requires additional setup
  
  return (
    <div 
      className="prose prose-lg max-w-none dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
