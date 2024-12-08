import Link from "next/link";

import Breadcrumbs from "@/components/breadcrumbs";
import Placeholder from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Comments from "@/features/comment/components/comments";
import { getComments } from "@/features/comment/queries/getComments";
import TicketItem from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { homePath, ticketsPath } from "@/paths";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

export default async function TicketPage({ params }: TicketPageProps) {
  const { ticketId } = await params;
  const ticketPromise = getTicket(ticketId);
  const commentsPromise = getComments(ticketId);

  const [ticket, comments] = await Promise.all([
    ticketPromise,
    commentsPromise,
  ]);

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
    <div className='flex flex-1 flex-col gap-y-8'>
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tickets", href: homePath() },
          { title: ticket.title },
        ]}
      />

      <Separator />

      <div className={"flex animate-fade-in-from-top justify-center"}>
        <TicketItem
          ticket={ticket}
          hasDetail
          // comments={comments}
          comments={<Comments ticketId={ticket.id} comments={comments} />}
        />
      </div>
    </div>
  );
}
