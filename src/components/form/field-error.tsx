import { ActionState } from "@/components/form/utils/to-action-state";

interface FieldErrorProps {
  actionState: ActionState;
  name: string;
}

export default function FieldError({ actionState, name }: FieldErrorProps) {
  const message = actionState.fieldErrors[name]?.[0];

  if (!message) {
    return null;
  }

  return <span className='text-sm text-orange-500'>{message}</span>;
}
