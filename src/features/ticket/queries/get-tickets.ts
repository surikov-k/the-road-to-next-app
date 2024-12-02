import { initialTickets } from "@/data";
import { Ticket } from "@/features/ticket/types.";

export async function getTickets(): Promise<Ticket[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // throw new Error("Failed to get ticket");

  return new Promise((resolve) => {
    resolve(initialTickets);
  });
}
