'use client';

import { useEffect, useState } from 'react';

interface Comment {
  id: string;
  postId: string;
  author: string | null;
  content: string;
  parentId: string | null;
  createdAt: string;
}

interface CommentListProps {
  postId: string;
}

export function CommentList({ postId }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?postId=${postId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      setComments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Organize comments into parent-child structure
  const topLevelComments = comments.filter((c) => !c.parentId);
  const repliesMap = new Map<string, Comment[]>();
  comments
    .filter((c) => c.parentId)
    .forEach((comment) => {
      const replies = repliesMap.get(comment.parentId!) || [];
      replies.push(comment);
      repliesMap.set(comment.parentId!, replies);
    });

  if (loading) {
    return <div className="text-muted-foreground">Loading comments...</div>;
  }

  if (error) {
    return (
      <div className="text-red-600 dark:text-red-400">
        Error loading comments: {error}
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-muted-foreground">
        No comments yet. Be the first to comment!
      </div>
    );
  }

  const renderComment = (comment: Comment, depth = 0) => {
    const replies = repliesMap.get(comment.id) || [];

    return (
      <div
        key={comment.id}
        className={`${depth > 0 ? 'ml-8 mt-4' : ''} border-l-2 pl-4 py-4`}
      >
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold">
                {comment.author || 'Anonymous'}
              </span>
              <span className="text-sm text-muted-foreground">
                {formatDate(comment.createdAt)}
              </span>
            </div>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {comment.content}
            </p>
          </div>
        </div>
        {replies.length > 0 && (
          <div className="mt-4">
            {replies.map((reply) => renderComment(reply, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold mb-6">Comments</h3>
      {topLevelComments.map((comment) => renderComment(comment))}
    </div>
  );
}

