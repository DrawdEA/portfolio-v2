import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const contentDirectory = path.join(process.cwd(), 'content')

// Calculate read time in minutes (average reading speed: 200 words per minute)
function calculateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return Math.max(1, minutes) // Minimum 1 minute
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  image?: string
  tags?: string[]
  content: string
  contentHtml?: string
  readTime?: number
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
  readTime?: number
}

export interface WorkExperience {
  title: string
  company: string
  location: string
  period: string
  description: string
  technologies: string[]
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
        readTime: calculateReadTime(content),
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
    readTime: calculateReadTime(content),
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
        readTime: calculateReadTime(content),
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
    readTime: calculateReadTime(content),
  }
}

// Get all work experience entries
export function getWorkExperience(): WorkExperience[] {
  const experienceFile = path.join(contentDirectory, 'experience.md')
  
  if (!fs.existsSync(experienceFile)) {
    return []
  }
  
  const fileContents = fs.readFileSync(experienceFile, 'utf8')
  const { data } = matter(fileContents)
  
  // Expect an array of experiences in the frontmatter
  const experiences = (data.experiences || []).map((exp: any) => ({
    title: exp.title || '',
    company: exp.company || '',
    location: exp.location || '',
    period: exp.period || '',
    description: exp.description || '',
    technologies: exp.technologies || [],
  }))
    .filter((exp: WorkExperience) => exp.title && exp.company) // Filter out invalid entries
    .sort((a: WorkExperience, b: WorkExperience) => {
      // Sort by period (most recent first)
      // Extract end date or current date for sorting
      const getEndDate = (period: string): number => {
        if (!period) return 0
        if (period.includes('Present') || period.includes('Current')) {
          return new Date().getTime()
        }
        const parts = period.split(' - ')
        if (parts.length < 2) return 0
        const endYear = parts[1]?.trim().split(' ')[0]
        const year = endYear ? parseInt(endYear, 10) : 0
        return isNaN(year) ? 0 : year
      }
      return getEndDate(b.period) - getEndDate(a.period)
    })

  return experiences
}

export interface ContentPage {
  title: string
  description: string
  content: string
  contentHtml?: string
  items?: ContentItem[]
}

export interface ContentItem {
  date: string
  title: string
  location: string
  description: string
  image?: string
  icon?: string
  credentialUrl?: string
}

export interface TechStackCategory {
  name: string
  technologies: {
    name: string
    icon: string
  }[]
}

export interface TechStackPage {
  title: string
  description: string
  categories: TechStackCategory[]
}

// Get content page by filename (without .md extension)
export async function getContentPage(filename: string): Promise<ContentPage | null> {
  const contentFile = path.join(contentDirectory, `${filename}.md`)
  
  if (!fs.existsSync(contentFile)) {
    return null
  }
  
  const fileContents = fs.readFileSync(contentFile, 'utf8')
  const { data, content } = matter(fileContents)
  
  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()
  
  // Parse items if they exist in frontmatter
  const items = (data.items || []).map((item: any) => ({
    date: item.date || '',
    title: item.title || '',
    location: item.location || '',
    description: item.description || '',
    image: item.image,
    icon: item.icon,
    credentialUrl: item.credentialUrl,
  })).filter((item: ContentItem) => item.title && item.date)
    .sort((a: ContentItem, b: ContentItem) => {
      // Sort by date (most recent first)
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  
  return {
    title: data.title || '',
    description: data.description || '',
    content,
    contentHtml,
    items: items.length > 0 ? items : undefined,
  }
}

// Get tech stack page
export function getTechStack(): TechStackPage | null {
  const techStackFile = path.join(contentDirectory, 'tech-stack.md')
  
  if (!fs.existsSync(techStackFile)) {
    return null
  }
  
  const fileContents = fs.readFileSync(techStackFile, 'utf8')
  const { data } = matter(fileContents)
  
  const categories = (data.categories || []).map((cat: any) => ({
    name: cat.name || '',
    technologies: (cat.technologies || []).map((tech: any) => ({
      name: tech.name || '',
      icon: tech.icon || '',
    }))
  })).filter((cat: TechStackCategory) => cat.name && cat.technologies.length > 0)
  
  return {
    title: data.title || 'Tech Stack',
    description: data.description || 'Technologies and tools I work with',
    categories,
  }
}

