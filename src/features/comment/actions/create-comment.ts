"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";
import { ticketPath } from "@/paths";

const createCommentSchema = z.object({
  content: z.string().min(1).max(1024),
});

export async function createComment(
  ticketId: string,
  _actionState: ActionState,
  formData: FormData
) {
  const { user } = await getAuthOrRedirect();

  let comment;
  try {
    const data = createCommentSchema.parse(Object.fromEntries(formData));

    comment = await prisma.comment.create({
      data: {
        ...data,
        userId: user.id,
        ticketId,
      },
      include: { user: true },
    });
  } catch (e) {
    return fromErrorToActionState(e, formData);
  }

  revalidatePath(ticketPath(ticketId));

  return toActionState("SUCCESS", "Comment created successfully", undefined, {
    ...comment,
    isOwner: true,
  });
}
