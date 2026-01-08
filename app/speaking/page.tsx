import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getContentPage } from '@/lib/markdown'
import { LightRays } from '@/components/ui/light-rays'
import { ImageWithFallback } from '@/components/image-with-fallback'

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

export default async function SpeakingPage() {
  const content = await getContentPage('speaking')

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background Effects - Full Width, Top Only */}
      <div className="absolute top-0 left-0 right-0 h-screen pointer-events-none z-0">
        <LightRays color="#07152E" length="50vh" speed={4} count={5} />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-16 py-24 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-[#4A7BC8] transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-medium mb-4 text-white">
            {content?.title || 'Speaking'}
          </h1>
          <p className="text-gray-400 text-lg">
            {content?.description || 'Talks, presentations, and conferences'}
          </p>
        </div>

        {content?.items && content.items.length > 0 ? (
          <div className="grid gap-8">
            {content.items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-6 group"
              >
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
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-gray-400 text-lg">No entries yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}

