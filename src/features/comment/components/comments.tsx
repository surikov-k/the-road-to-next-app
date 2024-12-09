"use client";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import CardCompact from "@/components/card-compact";
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
  const queryKey = ["comments", ticketId];
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) =>
        lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
      initialData: {
        pages: [paginatedComments],
        pageParams: [undefined],
      },
    });

  const comments = data.pages.flatMap((page) => page.list);

  const queryClient = useQueryClient();

  const handleDeleteComment = () => queryClient.invalidateQueries({ queryKey });

  const handleCreateComment = () => queryClient.invalidateQueries({ queryKey });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

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
      <div ref={ref}>
        {!hasNextPage && (
          <p className='text-right text-xs italic text-muted-foreground'>
            No more comments
          </p>
        )}
      </div>
    </>
  );
}
