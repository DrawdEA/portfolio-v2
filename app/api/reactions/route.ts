import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('reactions')
      .select('emoji, count')
      .order('emoji')

    if (error) {
      console.error('Error fetching reactions:', error)
      // Return default on error
      return NextResponse.json({
        reactions: [{ emoji: '❤️', label: 'Love', count: 0 }],
      })
    }

    const reactionsArray = (data || []).map((r) => ({
      emoji: r.emoji,
      label: getLabel(r.emoji),
      count: r.count || 0,
    }))

    // If no reactions exist, return default
    if (reactionsArray.length === 0) {
      return NextResponse.json({
        reactions: [{ emoji: '❤️', label: 'Love', count: 0 }],
      })
    }

    return NextResponse.json({ reactions: reactionsArray })
  } catch (error) {
    console.error('Error reading reactions:', error)
    // Return default on error
    return NextResponse.json({
      reactions: [{ emoji: '❤️', label: 'Love', count: 0 }],
    })
  }
}

export async function POST(request: Request) {
  try {
    const { reaction } = await request.json()
    
    if (!reaction) {
      return NextResponse.json(
        { error: 'Reaction emoji is required' },
        { status: 400 }
      )
    }

    // Try to use the RPC function first (if it exists)
    const { data: rpcResult, error: rpcError } = await supabase.rpc('increment_reaction', {
      emoji_param: reaction,
    })

    if (rpcError) {
      // Fall back to manual increment if RPC function doesn't exist
      const { data: existing } = await supabase
        .from('reactions')
        .select('count')
        .eq('emoji', reaction)
        .single()

      if (existing) {
        const newCount = (existing.count || 0) + 1
        const { error: updateError } = await supabase
          .from('reactions')
          .update({ count: newCount })
          .eq('emoji', reaction)

        if (updateError) {
          throw updateError
        }
      } else {
        // Insert new reaction if it doesn't exist
        const { error: insertError } = await supabase
          .from('reactions')
          .insert({ emoji: reaction, count: 1 })

        if (insertError) {
          throw insertError
        }
      }
    }

    // Fetch all reactions to return
    const { data: reactions, error: fetchError } = await supabase
      .from('reactions')
      .select('emoji, count')
      .order('emoji')

    if (fetchError) {
      throw fetchError
    }

    const reactionsArray = (reactions || []).map((r) => ({
      emoji: r.emoji,
      label: getLabel(r.emoji),
      count: r.count || 0,
    }))

    return NextResponse.json({ reactions: reactionsArray })
  } catch (error) {
    console.error('Error updating reaction:', error)
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

