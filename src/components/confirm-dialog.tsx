import { ReactElement } from "react";

import { ActionState } from "@/components/form/utils/to-action-state";

interface ConfirmDialogProps {
  action: () => Promise<ActionState>;
  trigger: ReactElement;
}

export default function ConfirmDialog({ action, trigger }: ConfirmDialogProps) {
  return <form>{trigger}</form>;
}
