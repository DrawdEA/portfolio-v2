import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const contentDirectory = path.join(process.cwd(), 'content')

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  image?: string
  tags?: string[]
  content: string
  contentHtml?: string
}

export interface Project {
  slug: string
  title: string
  date: string
  description: string
  image?: string
  tags?: string[]
  github?: string
  live?: string
  content: string
  contentHtml?: string
}

// Get all blog posts
export function getBlogPosts(): BlogPost[] {
  const blogDir = path.join(contentDirectory, 'blog')
  
  if (!fs.existsSync(blogDir)) {
    return []
  }
  
  const files = fs.readdirSync(blogDir)
  
  const posts = files
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(blogDir, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)
      
      return {
        slug: filename.replace('.md', ''),
        title: data.title || '',
        date: data.date || '',
        description: data.description || '',
        image: data.image,
        tags: data.tags || [],
        content,
      }
    })
    .filter((post) => post.title) // Filter out invalid posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

// Get a single blog post by slug
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const blogDir = path.join(contentDirectory, 'blog')
  const filePath = path.join(blogDir, `${slug}.md`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  
  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()
  
  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    description: data.description || '',
    image: data.image,
    tags: data.tags || [],
    content,
    contentHtml,
  }
}

// Get all projects
export function getProjects(): Project[] {
  const projectsDir = path.join(contentDirectory, 'projects')
  
  if (!fs.existsSync(projectsDir)) {
    return []
  }
  
  const files = fs.readdirSync(projectsDir)
  
  const projects = files
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(projectsDir, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)
      
      return {
        slug: filename.replace('.md', ''),
        title: data.title || '',
        date: data.date || '',
        description: data.description || '',
        image: data.image,
        tags: data.tags || [],
        github: data.github,
        live: data.live,
        content,
      }
    })
    .filter((project) => project.title) // Filter out invalid projects
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return projects
}

// Get a single project by slug
export async function getProject(slug: string): Promise<Project | null> {
  const projectsDir = path.join(contentDirectory, 'projects')
  const filePath = path.join(projectsDir, `${slug}.md`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  
  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()
  
  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    description: data.description || '',
    image: data.image,
    tags: data.tags || [],
    github: data.github,
    live: data.live,
    content,
    contentHtml,
  }
}

