import Link from "next/link";

import Placeholder from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { initialTickets } from "@/data";
import { ticketsPath } from "@/paths";

type TicketPageProps = {
  params: {
    ticketId: string;
  };
};
export default function TicketPage({ params }: TicketPageProps) {
  const { ticketId } = params;
  const ticket = initialTickets.find(
    (ticket) => ticket.id === Number(ticketId)
  );

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
    <div>
      <h2 className='text-2xl'>{ticket.title}</h2>
      {<p>{ticket.content}</p>}
      {<p>{ticket.status}</p>}
    </div>
  );
}
