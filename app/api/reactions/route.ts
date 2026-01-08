import { NextResponse } from 'next/server'

// In-memory storage (replace with database in production)
let reactions: Record<string, number> = {
  '❤️': 0,
}

export async function GET() {
  const reactionsArray = Object.entries(reactions).map(([emoji, count]) => ({
    emoji,
    label: getLabel(emoji),
    count,
  }))

  return NextResponse.json({ reactions: reactionsArray })
}

export async function POST(request: Request) {
  try {
    const { reaction } = await request.json()
    
    if (reaction && reactions.hasOwnProperty(reaction)) {
      reactions[reaction] = (reactions[reaction] || 0) + 1
    }

    const reactionsArray = Object.entries(reactions).map(([emoji, count]) => ({
      emoji,
      label: getLabel(emoji),
      count,
    }))

    return NextResponse.json({ reactions: reactionsArray })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update reaction' },
      { status: 500 }
    )
  }
}

function getLabel(emoji: string): string {
  const labels: Record<string, string> = {
    '❤️': 'Love',
  }
  return labels[emoji] || 'Unknown'
}

