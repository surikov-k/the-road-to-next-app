import Link from "next/link";

import Placeholder from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { initialTickets } from "@/data";
import TicketItem from "@/features/ticket/componets/ticket-item";
import { ticketsPath } from "@/paths";

type TicketPageProps = {
  params: {
    ticketId: string;
  };
};
export default function TicketPage({ params }: TicketPageProps) {
  const { ticketId } = params;
  const ticket = initialTickets.find((ticket) => ticket.id === ticketId);

  if (!ticket) {
    return (
      <Placeholder
        label='Ticket not found'
        button={
          <Button asChild variant='outline'>
            <Link href={ticketsPath()}>Go back to tickets</Link>
          </Button>
        }
      />
    );
  }
  return (
    <div className={"animate-fade-in-from-top flex justify-center"}>
      <TicketItem ticket={ticket} hasDetail />
    </div>
  );
}
