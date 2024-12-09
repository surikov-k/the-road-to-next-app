"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { setCookie } from "@/actions/cookies";
import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import isOwner from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export async function deleteTicket(ticketId: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const { user } = await getAuthOrRedirect();

  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket || !isOwner(user, ticket)) {
      return toActionState("ERROR", "Not authorized");
    }
    await prisma.ticket.delete({ where: { id: ticketId } });
  } catch (e) {
    return fromErrorToActionState(e);
  }

  revalidatePath(ticketsPath());

  await setCookie("toast", "Ticket deleted successfully");
  redirect(ticketsPath());
}
