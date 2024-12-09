import { ZodError } from "zod";

export type ActionState = {
  status?: "SUCCESS" | "ERROR";
  payload?: FormData;
  fieldErrors: Record<string, string[] | undefined>;
  message: string;
  timestamp: number;
  data?: unknown;
};

export const EMPTY_ACTION_STATE: ActionState = {
  fieldErrors: {},
  message: "",
  timestamp: Date.now(),
};

export function fromErrorToActionState(
  error: unknown,
  formData?: FormData
): ActionState {
  if (error instanceof ZodError) {
    return {
      timestamp: Date.now(),
      status: "ERROR",
      message: "",
      fieldErrors: error.flatten().fieldErrors,
      payload: formData,
    };
  }

  if (error instanceof Error) {
    return {
      timestamp: Date.now(),
      status: "ERROR",
      message: error.message,
      fieldErrors: {},
      payload: formData,
    };
  }

  return {
    timestamp: Date.now(),
    status: "ERROR",
    message: "An unknown error occurred",
    fieldErrors: {},
    payload: formData,
  };
}

export function toActionState(
  status: ActionState["status"],
  message: string,
  formData?: FormData,
  data?: unknown
): ActionState {
  return {
    status,
    message,
    payload: formData,
    fieldErrors: {},
    timestamp: Date.now(),
    data,
  };
}
