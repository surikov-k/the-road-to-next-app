import CardCompact from "@/components/card-compact";
import { getAuth } from "@/features/auth/queries/get-auth";
import isOwner from "@/features/auth/utils/is-owner";
import CommentCreateForm from "@/features/comment/components/comment-create-form";
import CommentDeleteButton from "@/features/comment/components/comment-delet-button";
import CommentItem from "@/features/comment/components/comment-item";
import { getComments } from "@/features/comment/queries/getComments";

interface CommentsProps {
  ticketId: string;
}

export default async function Comments({ ticketId }: CommentsProps) {
  const comments = await getComments(ticketId);
  const { user } = await getAuth();

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
              ...(isOwner(user, comment)
                ? [<CommentDeleteButton key='0' commentId={comment.id} />]
                : []),
            ]}
          />
        ))}
      </div>
    </>
  );
}
