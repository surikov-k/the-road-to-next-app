"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { setCookie } from "@/actions/cookies";
import { fromErrorToActionState } from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export async function deleteTicket(ticketId: string) {
  try {
    await prisma.ticket.delete({ where: { id: ticketId } });
  } catch (e) {
    return fromErrorToActionState(e);
  }

  revalidatePath(ticketsPath());

  await setCookie("toast", "Ticket deleted successfully");
  redirect(ticketsPath());
}
