"use server";

import { TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export async function updateTicketStatus(id: string, status: TicketStatus) {
  try {
    await prisma.ticket.update({
      where: { id },
      data: { status },
    });
  } catch (e) {
    return fromErrorToActionState(e);
  }

  revalidatePath(ticketsPath());

  return toActionState("SUCCESS", "Ticket status updated successfully");
}
