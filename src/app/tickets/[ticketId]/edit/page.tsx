import { notFound } from "next/navigation";

import CardCompact from "@/components/card-compact";
import TicketUpsertForm from "@/features/ticket/componets/ticket-upsert-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";

interface EditTicketPageProps {
  params: Promise<{
    ticketId: string;
  }>;
}

export default async function EditTicketPage({ params }: EditTicketPageProps) {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  if (!ticket) {
    notFound();
  }

  return (
    <div className='flex flex-1 flex-col items-center justify-center'>
      <CardCompact
        title='Edit Ticket'
        description='Edit a ticket'
        content={<TicketUpsertForm ticket={ticket} />}
        className='w-full max-w-[420px] animate-fade-in-from-top'
      />
    </div>
  );
}
