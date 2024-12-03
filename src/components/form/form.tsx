import React, { ReactNode } from "react";
import { toast } from "sonner";

import { useActionFeedback } from "@/components/form/hooks/use-action-feedback";
import { ActionState } from "@/components/form/utils/to-action-state";

interface FormProps {
  action: (payload: FormData) => void;
  actionState: ActionState;
  children: ReactNode;
}

export default function Form({ action, actionState, children }: FormProps) {
  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.success(actionState.message);
      }
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        toast.error(actionState.message);
      }
    },
  });

  return (
    <form action={action} className='flex flex-col gap-y-2'>
      {children}
    </form>
  );
}
