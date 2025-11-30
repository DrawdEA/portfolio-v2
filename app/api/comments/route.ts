import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { comments } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const postId = searchParams.get('postId');

  if (!postId) {
    return NextResponse.json(
      { error: 'postId is required' },
      { status: 400 }
    );
  }

  try {
    const allComments = await db
      .select()
      .from(comments)
      .where(eq(comments.postId, postId))
      .orderBy(comments.createdAt);

    // Filter to only approved comments
    const approvedComments = allComments.filter((c) => c.approved);

    return NextResponse.json(approvedComments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId, author, content, parentId } = body;

    if (!postId || !content) {
      return NextResponse.json(
        { error: 'postId and content are required' },
        { status: 400 }
      );
    }

    // Basic spam protection: check content length
    if (content.length > 5000) {
      return NextResponse.json(
        { error: 'Comment is too long' },
        { status: 400 }
      );
    }

    const newComment = {
      id: createId(),
      postId,
      author: author || null,
      content,
      parentId: parentId || null,
      approved: false, // Require moderation
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(comments).values(newComment);

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}

