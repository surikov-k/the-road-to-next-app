"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
});

export async function upsertTicket(
  id: string | undefined,
  _actionState: {
    payload: FormData;
    message: string;
  },
  formData: FormData
) {
  try {
    const data = upsertTicketSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
    });

    await prisma.ticket.upsert({
      where: {
        id: id || "",
      },
      update: data,
      create: data,
    });
  } catch (error) {
    return {
      message: "Something went wrong",
      payload: formData,
    };
  }

  revalidatePath(ticketsPath());
  if (id) {
    redirect(ticketsPath());
  }

  return {
    message: `Ticket ${id ? "updated" : "created"} successfully.`,
  };
}
