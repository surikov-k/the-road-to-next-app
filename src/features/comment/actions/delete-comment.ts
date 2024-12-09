"use server";

import { revalidatePath } from "next/cache";

import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import isOwner from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { ticketPath } from "@/paths";

export async function deleteComment(id: string) {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const { user } = await getAuthOrRedirect();

  const comment = await prisma.comment.findUnique({
    where: { id },
  });

  if (!comment || !isOwner(user, comment)) {
    return toActionState("ERROR", "Not authorized");
  }
  try {
    await prisma.comment.delete({ where: { id } });
  } catch (e) {
    return fromErrorToActionState(e);
  }

  revalidatePath(ticketPath(comment.ticketId));

  // await setCookie("toast", "Comment deleted successfully");
  return toActionState("SUCCESS", "Comment deleted successfully");
}
