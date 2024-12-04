"use server";
import { z } from "zod";

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1)
      .max(191)
      .refine(
        (value) => !value.includes(" "),
        "Username cannot contain spaces"
      ),
    email: z.string().min(1, { message: "Email is required" }).max(191).email(),
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });
export async function signUp(_actionState: ActionState, formData: FormData) {
  try {
    const { username, email, password } = signUpSchema.parse(
      Object.fromEntries(formData)
    );
    console.log(username, email, password);
    // TODO Store in database
  } catch (e) {
    return fromErrorToActionState(e, formData);
  }

  return toActionState("SUCCESS", "Sign up successful");
}
