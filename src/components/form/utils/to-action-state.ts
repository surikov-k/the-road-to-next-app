import { ZodError } from "zod";

export type ActionState = {
  payload?: FormData;
  fieldErrors: Record<string, string[] | undefined>;
  message: string;
};

export function fromErrorToActionState(
  error: unknown,
  formData: FormData
): ActionState {
  if (error instanceof ZodError) {
    return {
      message: "",
      fieldErrors: error.flatten().fieldErrors,
      payload: formData,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      fieldErrors: {},
      payload: formData,
    };
  }

  return {
    message: "An unknown error occurred",
    fieldErrors: {},
    payload: formData,
  };
}
