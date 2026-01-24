import { getContentPage } from '@/lib/markdown'
import Aurora from '@/components/Aurora'
import { ImageWithFallback } from '@/components/image-with-fallback'
import { AnimatedPageContent } from '@/components/animated-page-content'
import { AnimatedPageHeader } from '@/components/animated-page-header'
import { AnimatedContentItem } from '@/components/animated-content-item'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import type { Metadata } from 'next'
import { getMetadata } from '@/lib/seo'

export const metadata: Metadata = getMetadata({
  title: "Certifications",
  description: "Professional certifications and credentials earned by Edward Diesta. View verified certifications, courses, and professional development achievements.",
  url: "/certifications",
  tags: ["certifications", "credentials", "professional development", "courses", "education"],
})

function formatDate(dateString: string): string {
  if (dateString.includes(' to ')) {
    const [start, end] = dateString.split(' to ')
    const startDate = new Date(start)
    const endDate = new Date(end)
    
    const startFormatted = startDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
    
    const endFormatted = endDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
    
    return `${startFormatted} - ${endFormatted}`
  }
  
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default async function CertificationsPage() {
  const content = await getContentPage('certifications')

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background Effects - Full Width, Top Only */}
      <div className="absolute top-0 left-0 right-0 h-[50vh] md:h-screen pointer-events-none z-0">
        <Aurora
          colorStops={["#0a1833", "#1a2647", "#4a5a8c"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.4}
        />
      </div>
      <AnimatedPageContent>
        <div className="max-w-6xl mx-auto px-4 sm:px-16 py-24 relative z-10">
          <AnimatedPageHeader
            title={content?.title || 'Certifications'}
            description={content?.description || 'Professional certifications and credentials'}
            backHref="/#about"
            backLabel="Back to about"
          />

          {content?.items && content.items.length > 0 ? (
            <div className="space-y-8">
              {content.items.map((item, index) => (
                <AnimatedContentItem key={index} index={index}>
                  <div className="relative flex flex-col sm:flex-row gap-6 group">
                    {item.credentialUrl && (
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        asChild
                        className="absolute top-0 right-0 z-20 text-neutral-400 hover:text-white"
                      >
                        <a
                          href={item.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    <div className="relative w-full sm:w-48 h-32 bg-gray-800 rounded-lg overflow-hidden shrink-0">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-xl font-semibold text-white">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {formatDate(item.date)}
                          </p>
                        </div>
                        {item.location && (
                          <p className="text-sm text-gray-500">
                            {item.location}
                          </p>
                        )}
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedContentItem>
              ))}
            </div>
          ) : (
            <AnimatedContentItem>
              <div className="text-center py-24">
                <p className="text-gray-400 text-lg">No entries yet. Check back soon!</p>
              </div>
            </AnimatedContentItem>
          )}
        </div>
      </AnimatedPageContent>
    </div>
  )
}
