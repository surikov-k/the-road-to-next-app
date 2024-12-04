import { cloneElement, ReactElement, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface UseConfirmDialogProps {
  action: () => Promise<void>;
  description?: string;
  title?: string;
  trigger: ReactElement;
}

export default function useConfirmDialog({
  action,
  description = "This action cannot be undone. Make sure you understand the consequences.",
  title = "Are you absolute sure?",
  trigger,
}: UseConfirmDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const dialogTrigger = cloneElement(trigger, {
    onClick: () => setIsOpen((state) => !state),
  });

  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <form action={action} className='px-0'>
              <Button type='submit' variant='destructive'>
                Confirm
              </Button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
  return [dialogTrigger, dialog];
}
