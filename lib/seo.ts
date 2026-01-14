import type { Metadata } from 'next'

export const siteConfig = {
  name: 'Edward Diesta',
  title: 'Edward Diesta | Portfolio',
  description: 'Portfolio of Edward Diesta - a 19-year old software developer studying in Ateneo de Manila University, showcasing projects, blog posts, and professional experience.',
  url: 'https://edwarddiesta.com',
  ogImage: '/og-image.png',
  links: {
    twitter: 'https://twitter.com/edwarddiesta',
    github: 'https://github.com/edwarddiesta',
    linkedin: 'https://linkedin.com/in/edwarddiesta',
  },
  keywords: [
    'Edward Diesta',
    'Software Developer',
    'Web Developer',
    'Portfolio',
    'Next.js',
    'React',
    'TypeScript',
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
  ],
}

export function getMetadata({
  title,
  description,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  tags,
}: {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  tags?: string[]
}): Metadata {
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.title
  const fullDescription = description || siteConfig.description
  const imageUrl = image
    ? image.startsWith('http')
      ? image
      : `${siteConfig.url}${image}`
    : `${siteConfig.url}${siteConfig.ogImage}`
  const fullUrl = url
    ? url.startsWith('http')
      ? url
      : `${siteConfig.url}${url}`
    : siteConfig.url

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: tags || siteConfig.keywords,
    authors: authors
      ? authors.map((name) => ({ name }))
      : [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      type,
      title: fullTitle,
      description: fullDescription,
      url: fullUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(tags && tags.length > 0 && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [imageUrl],
      creator: siteConfig.links.twitter,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    url: siteConfig.url,
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.twitter,
    ].filter(Boolean),
  }
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  }
}

export function generateArticleSchema({
  title,
  description,
  image,
  url,
  publishedTime,
  modifiedTime,
  author = siteConfig.name,
  tags,
}: {
  title: string
  description: string
  image?: string
  url: string
  publishedTime?: string
  modifiedTime?: string
  author?: string
  tags?: string[]
}) {
  const fullUrl = url.startsWith('http') ? url : `${siteConfig.url}${url}`
  const imageUrl = image
    ? image.startsWith('http')
      ? image
      : `${siteConfig.url}${image}`
    : `${siteConfig.url}${siteConfig.ogImage}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: imageUrl,
    url: fullUrl,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.name,
    },
    ...(tags && tags.length > 0 && {
      keywords: tags.join(', '),
    }),
  }
}

export function generateProjectSchema({
  title,
  description,
  image,
  url,
  datePublished,
  tags,
}: {
  title: string
  description: string
  image?: string
  url: string
  datePublished?: string
  tags?: string[]
}) {
  const fullUrl = url.startsWith('http') ? url : `${siteConfig.url}${url}`
  const imageUrl = image
    ? image.startsWith('http')
      ? image
      : `${siteConfig.url}${image}`
    : `${siteConfig.url}${siteConfig.ogImage}`

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description,
    image: imageUrl,
    url: fullUrl,
    datePublished,
    creator: {
      '@type': 'Person',
      name: siteConfig.name,
    },
    ...(tags && tags.length > 0 && {
      keywords: tags.join(', '),
    }),
  }
}
