import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  pageExtensions: ['ts', 'tsx', 'mdx'],
};

// Conditionally apply MDX if packages are installed
let config: NextConfig = nextConfig;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const createMDX = require('@next/mdx');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const remarkGfm = require('remark-gfm');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const rehypeHighlight = require('rehype-highlight');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const rehypeRaw = require('rehype-raw');

  const withMDX = createMDX({
    options: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight, rehypeRaw],
    },
  });

  config = withMDX(nextConfig);
} catch (error) {
  // MDX packages not installed yet - use basic config
  console.warn('MDX packages not found. Install dependencies to enable MDX support.');
}

export default config;
