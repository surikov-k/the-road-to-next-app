import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import Heading from "@/components/Heading";
import Placeholder from "@/components/placeholder";
import Spinner from "@/components/spinner";
import TicketList from "@/features/ticket/components/ticket-list";

export default function HomePage() {
  return (
    <div className='flex flex-1 flex-col gap-y-8'>
      <Heading title='Home' description='Tickets by everyone in one place' />

      <ErrorBoundary fallback={<Placeholder label='Failed to load tickets' />}>
        <Suspense fallback={<Spinner />}>
          <TicketList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
