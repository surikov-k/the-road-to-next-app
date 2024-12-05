import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import CardCompact from "@/components/card-compact";
import Heading from "@/components/Heading";
import Placeholder from "@/components/placeholder";
import Spinner from "@/components/spinner";
import { getAuth } from "@/features/auth/queries/get-auth";
import TicketList from "@/features/ticket/components/ticket-list";
import TicketUpsertForm from "@/features/ticket/components/ticket-upsert-form";

export default async function TicketsPage() {
  const { user } = await getAuth();

  return (
    <div className='flex flex-1 flex-col gap-y-8'>
      <Heading title='My Tickets' description='All your tickets at one place' />

      <CardCompact
        title='Create Ticket'
        description='Create a new ticket'
        content={<TicketUpsertForm />}
        className='w-full max-w-[420px] self-center'
      />

      <ErrorBoundary fallback={<Placeholder label='Failed to load tickets' />}>
        <Suspense fallback={<Spinner />}>
          <TicketList userId={user?.id} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
