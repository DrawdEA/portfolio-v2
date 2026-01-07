"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ContentPage } from "@/lib/markdown"
import { ContentTimeline } from "@/components/content-timeline"

interface ContentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  content: ContentPage | null
}

export function ContentDialog({ open, onOpenChange, content }: ContentDialogProps) {
  if (!content) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-black border-gray-800 custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">{content.title}</DialogTitle>
        </DialogHeader>
        {content.items && content.items.length > 0 ? (
          <div className="mt-6">
            <ContentTimeline items={content.items} />
          </div>
        ) : (
          <div 
            className="markdown-content mt-4"
            dangerouslySetInnerHTML={{ __html: content.contentHtml || '' }}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

