"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import CardCompact from "@/components/card-compact";
import { Button } from "@/components/ui/button";
import CommentCreateForm from "@/features/comment/components/comment-create-form";
import CommentDeleteButton from "@/features/comment/components/comment-delet-button";
import CommentItem from "@/features/comment/components/comment-item";
import { getComments } from "@/features/comment/queries/getComments";
import { CommentWithMetadata } from "@/features/comment/types";
import { PaginatedData } from "@/types/pagination";

interface CommentsProps {
  ticketId: string;
  paginatedComments: PaginatedData<CommentWithMetadata>;
}

export default function Comments({
  ticketId,
  paginatedComments,
}: CommentsProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["comments", ticketId],
      queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) =>
        lastPage.metadata.hasMore ? lastPage.metadata.cursor : undefined,
      initialData: {
        pages: [paginatedComments],
        pageParams: [undefined],
      },
    });

  const comments = data.pages.flatMap((page) => page.list);

  const handleMore = () => fetchNextPage();

  const handleDeleteComment = (commentId: string) => {
    // setComments((prevComments) =>
    //   prevComments.filter((comment) => comment.id !== commentId)
    // );
  };

  const handleCreateComment = (comment: CommentWithMetadata | undefined) => {
    // if (!comment) {
    //   return;
    // }
    // setComments((prevComments) => [comment, ...prevComments]);
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
        {hasNextPage && (
          <Button
            variant='ghost'
            onClick={handleMore}
            disabled={isFetchingNextPage}
          >
            More
          </Button>
        )}
      </div>
    </>
  );
}
