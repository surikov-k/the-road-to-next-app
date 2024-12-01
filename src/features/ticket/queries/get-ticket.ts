import { initialTickets } from "@/data";
import { Ticket } from "@/features/ticket/types.";

export async function getTicket(ticketId: string): Promise<Ticket | null> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return new Promise((resolve) => {
    resolve(initialTickets.find((ticket) => ticket.id === ticketId) || null);
  });
}
