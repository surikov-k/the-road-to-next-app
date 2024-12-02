import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import Heading from "@/components/Heading";
import Placeholder from "@/components/placeholder";
import Spinner from "@/components/spinner";
import TicketList from "@/features/ticket/componets/ticket-list";

export const dynamic = "force-dynamic";

export default function TicketsPage() {
  return (
    <div className='flex flex-1 flex-col gap-y-8'>
      <Heading title='Tickets' description='All your tickets at one place' />

      <ErrorBoundary fallback={<Placeholder label='Failed to load tickets' />}>
        <Suspense fallback={<Spinner />}>
          <TicketList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
