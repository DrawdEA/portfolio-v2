import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Generic content loader that works for any content type
export interface ContentItem {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  content: string;
  // Additional fields for projects
  image?: string;
  github?: string;
  live?: string;
  technologies?: string[];
  // Additional fields for talks (now part of blog)
  event?: string;
  location?: string;
  slides?: string;
  video?: string;
  type?: 'blog' | 'talk'; // To distinguish blog posts from talks
}

function getContentFromDirectory(
  directory: string,
  sortByDate: boolean = true
): ContentItem[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const files = fs.readdirSync(directory);
  const items = files
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(directory, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug: file.replace(/\.(mdx|md)$/, ''),
        title: data.title || '',
        date: data.date || '',
        excerpt: data.excerpt || '',
        tags: data.tags || [],
        content,
        // Project fields
        image: data.image,
        github: data.github,
        live: data.live,
        technologies: data.technologies || [],
        // Talk fields (for talks in blog)
        event: data.event,
        location: data.location,
        slides: data.slides,
        video: data.video,
        type: data.type || 'blog',
      };
    });

  if (sortByDate) {
    return items.sort((a, b) => (a.date > b.date ? -1 : 1));
  }

  return items;
}

function getContentBySlug(directory: string, slug: string): ContentItem | null {
  try {
    const mdxPath = path.join(directory, `${slug}.mdx`);
    const mdPath = path.join(directory, `${slug}.md`);

    let filePath: string;
    if (fs.existsSync(mdxPath)) {
      filePath = mdxPath;
    } else if (fs.existsSync(mdPath)) {
      filePath = mdPath;
    } else {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      excerpt: data.excerpt || '',
      tags: data.tags || [],
      content,
      image: data.image,
      github: data.github,
      live: data.live,
      technologies: data.technologies || [],
      event: data.event,
      location: data.location,
      slides: data.slides,
      video: data.video,
      type: data.type || 'blog',
    };
  } catch (error) {
    return null;
  }
}

// Blog posts (keep existing functions for backward compatibility)
const blogDirectory = path.join(process.cwd(), 'content', 'blog');

export function getAllPosts(): ContentItem[] {
  return getContentFromDirectory(blogDirectory);
}

export function getPostBySlug(slug: string): ContentItem | null {
  return getContentBySlug(blogDirectory, slug);
}

// Projects
const projectsDirectory = path.join(process.cwd(), 'content', 'projects');

export function getAllProjects(): ContentItem[] {
  return getContentFromDirectory(projectsDirectory);
}

export function getProjectBySlug(slug: string): ContentItem | null {
  return getContentBySlug(projectsDirectory, slug);
}

// Talks are now part of blog - use getAllPosts() and filter by type: 'talk'
export function getAllTalks(): ContentItem[] {
  return getAllPosts().filter((post) => post.type === 'talk');
}

