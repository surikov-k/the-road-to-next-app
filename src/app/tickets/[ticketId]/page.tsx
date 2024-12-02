import { notFound } from "next/navigation";

import TicketItem from "@/features/ticket/componets/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";

type TicketPageProps = {
  params: {
    ticketId: string;
  };
};
export default async function TicketPage({ params }: TicketPageProps) {
  const { ticketId } = params;
  const ticket = await getTicket(ticketId);

  if (!ticket) {
    notFound();
  }
  return (
    <div className={"flex animate-fade-in-from-top justify-center"}>
      <TicketItem ticket={ticket} hasDetail />
    </div>
  );
}
