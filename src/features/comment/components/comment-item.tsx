import { Card } from "@/components/ui/card";
import { CommentWithMetadata } from "@/features/comment/types";

interface CommentItemProps {
  comment: CommentWithMetadata;
}

export default function CommentItem({ comment }: CommentItemProps) {
  return (
    <Card className='flex flex-col gap-y-2 p-4'>
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
  );
}
