import { notFound } from "next/navigation";

import CardCompact from "@/components/card-compact";
import { getAuth } from "@/features/auth/queries/get-auth";
import isOwner from "@/features/auth/utils/is-owner";
import TicketUpsertForm from "@/features/ticket/components/ticket-upsert-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";

interface EditTicketPageProps {
  params: Promise<{
    ticketId: string;
  }>;
}

export default async function EditTicketPage({ params }: EditTicketPageProps) {
  const { user } = await getAuth();
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  const isTicketFound = !!ticket;
  const isTicketOwner = isOwner(user, ticket);

  if (!isTicketFound || !isTicketOwner) {
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
