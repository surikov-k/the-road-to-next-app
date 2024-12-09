"use client";

import { LucideTrash } from "lucide-react";

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
    trigger: (
      <Button
        size='icon'
        variant='ghost'
        className='flex items-center justify-center'
      >
        <LucideTrash className='h-4 w-4' />
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
