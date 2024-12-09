"use client";

import { LucideLoaderCircle, LucideTrash } from "lucide-react";

import { Button } from "@/components/ui/button";
import useConfirmDialog from "@/components/use-confirm-dialog";
import { deleteComment } from "@/features/comment/actions/delete-comment";

interface CommentDeleteButtonProps {
  commentId: string;
  onDeleteComment?: (commentId: string) => void;
}

export default function CommentDeleteButton({
  commentId,
  onDeleteComment,
}: CommentDeleteButtonProps) {
  const [deleteButton, deleteButtonDialog] = useConfirmDialog({
    action: deleteComment.bind(null, commentId),
    trigger: (isPending) => (
      <Button
        size='icon'
        variant='ghost'
        className='flex items-center justify-center'
      >
        {isPending ? (
          <LucideLoaderCircle className='h-4 w-4 animate-spin' />
        ) : (
          <LucideTrash className='h-4 w-4' />
        )}
      </Button>
    ),
    onSuccess: () => onDeleteComment?.(commentId),
  });

  return (
    <>
      {deleteButton}
      {deleteButtonDialog}
    </>
  );
}
