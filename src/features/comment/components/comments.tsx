"use client";

import { useState } from "react";

import CardCompact from "@/components/card-compact";
import { Button } from "@/components/ui/button";
import CommentCreateForm from "@/features/comment/components/comment-create-form";
import CommentDeleteButton from "@/features/comment/components/comment-delet-button";
import CommentItem from "@/features/comment/components/comment-item";
import { getComments } from "@/features/comment/queries/getComments";
import { CommentWithMetadata } from "@/features/comment/types";

interface CommentsProps {
  ticketId: string;
  paginatedComments: {
    list: CommentWithMetadata[];
    metadata: {
      count: number;
      hasMore: boolean;
    };
  };
}

export default function Comments({
  ticketId,
  paginatedComments,
}: CommentsProps) {
  // const { user } = await getAuth();f

  const [comments, setComments] = useState(paginatedComments.list);
  const [metadata, setMetadata] = useState(paginatedComments.metadata);

  const handleMore = async () => {
    const morePaginatedComments = await getComments(ticketId, comments.length);
    const moreComments = morePaginatedComments.list;

    setComments([...comments, ...moreComments]);
    setMetadata(morePaginatedComments.metadata);
  };

  const handleDeleteComment = (commentId: string) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
  };

  const handleCreateComment = (comment: CommentWithMetadata | undefined) => {
    if (!comment) {
      return;
    }
    setComments((prevComments) => [comment, ...prevComments]);
  };

  return (
    <>
      <CardCompact
        title='Create Comment'
        description='A new comment will be created'
        content={
          <CommentCreateForm
            ticketId={ticketId}
            onCreateComment={handleCreateComment}
          />
        }
      />
      <div className='ml-8 flex flex-col gap-y-4'>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              // ...(isOwner(user, comment)
              ...(comment.isOwner
                ? [
                    <CommentDeleteButton
                      onDeleteComment={handleDeleteComment}
                      key='0'
                      commentId={comment.id}
                    />,
                  ]
                : []),
            ]}
          />
        ))}
      </div>

      <div className='ml-8 flex flex-col justify-center'>
        {metadata.hasMore && (
          <Button variant='ghost' onClick={handleMore}>
            More
          </Button>
        )}
      </div>
    </>
  );
}
