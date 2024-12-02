import Link from "next/link";

import Placeholder from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import TicketItem from "@/features/ticket/componets/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { ticketsPath } from "@/paths";

type TicketPageProps = {
  params: {
    ticketId: string;
  };
};
export default async function TicketPage({ params }: TicketPageProps) {
  const { ticketId } = params;
  const ticket = await getTicket(ticketId);

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
    <div className={"flex animate-fade-in-from-top justify-center"}>
      <TicketItem ticket={ticket} hasDetail />
    </div>
  );
}
