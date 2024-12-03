import { useEffect } from "react";

import { ActionState } from "@/components/form/utils/to-action-state";

type OnArgs = {
  actionState: ActionState;
};
interface UseActionFeedbackOptions {
  onSuccess?: (onArgs: OnArgs) => void;
  onError?: (onArgs: OnArgs) => void;
}

export function useActionFeedback(
  actionState: ActionState,
  options: UseActionFeedbackOptions
) {
  useEffect(() => {
    if (actionState.status === "SUCCESS") {
      options.onSuccess?.({ actionState });
    }
    if (actionState.status === "ERROR") {
      options.onError?.({ actionState });
    }
  }, [actionState, options]);
}
