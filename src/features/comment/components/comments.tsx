"use client";

import CardCompact from "@/components/card-compact";
import { Button } from "@/components/ui/button";
import CommentCreateForm from "@/features/comment/components/comment-create-form";
import CommentDeleteButton from "@/features/comment/components/comment-delet-button";
import CommentItem from "@/features/comment/components/comment-item";
import { getComments } from "@/features/comment/queries/getComments";
import { CommentWithMetadata } from "@/features/comment/types";

interface CommentsProps {
  ticketId: string;
  comments?: CommentWithMetadata[];
}

export default function Comments({ ticketId, comments = [] }: CommentsProps) {
  // const { user } = await getAuth();

  const handleMore = async () => {
    const result = await getComments(ticketId);
    console.log("More", result);
  };

  return (
    <>
      <CardCompact
        title='Create Comment'
        description='A new comment will be created'
        content={<CommentCreateForm ticketId={ticketId} />}
      />
      <div className='ml-8 flex flex-col gap-y-4'>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              // ...(isOwner(user, comment)
              ...(comment.isOwner
                ? [<CommentDeleteButton key='0' commentId={comment.id} />]
                : []),
            ]}
          />
        ))}
      </div>

      <div className='ml-8 flex flex-col justify-center'>
        <Button variant='ghost' onClick={handleMore}>
          More
        </Button>
      </div>
    </>
  );
}
