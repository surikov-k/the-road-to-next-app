"use client";

import { LucideTrash } from "lucide-react";

import { Button } from "@/components/ui/button";
import useConfirmDialog from "@/components/use-confirm-dialog";
import { deleteComment } from "@/features/comment/actions/delete-comment";

interface CommentDeleteButtonProps {
  commentId: string;
}

export default function CommentDeleteButton({
  commentId,
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
  });

  return (
    <>
      {deleteButton}
      {deleteButtonDialog}
    </>
  );
}
