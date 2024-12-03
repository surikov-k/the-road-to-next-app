import { useEffect, useRef } from "react";

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
  const prevTimestamp = useRef(actionState.timestamp);
  const isUpdate = prevTimestamp.current !== actionState.timestamp;

  useEffect(() => {
    if (!isUpdate) {
      return;
    }

    prevTimestamp.current = actionState.timestamp;

    if (actionState.status === "SUCCESS") {
      options.onSuccess?.({ actionState });
    }

    if (actionState.status === "ERROR") {
      options.onError?.({ actionState });
    }
    prevTimestamp.current = actionState.timestamp;
  }, [actionState, options, isUpdate]);
}
