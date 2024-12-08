import { ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { CommentWithMetadata } from "@/features/comment/types";

interface CommentItemProps {
  comment: CommentWithMetadata;
  buttons: ReactNode[];
}

export default function CommentItem({ comment, buttons }: CommentItemProps) {
  return (
    <div className='flex w-full gap-x-2'>
      <Card className='flex w-full flex-col gap-y-2 p-4'>
        <div className='flex items-center justify-between'>
          <p className='text-sm text-muted-foreground'>
            {comment.user?.name ?? "Deleted user"}
          </p>
          <p className='text-sm text-muted-foreground'>
            {comment.createdAt.toLocaleString()}
          </p>
        </div>
        <p className='whitespace-pre-line'>{comment.content}</p>
      </Card>
      <div className='flex flex-col gap-y-1'>{buttons}</div>
    </div>
  );
}
