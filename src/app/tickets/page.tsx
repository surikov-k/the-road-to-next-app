import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import Heading from "@/components/Heading";
import Placeholder from "@/components/placeholder";
import Spinner from "@/components/spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TicketCreateForm from "@/features/ticket/componets/ticket-create-form";
import TicketList from "@/features/ticket/componets/ticket-list";

export default function TicketsPage() {
  return (
    <div className='flex flex-1 flex-col gap-y-8'>
      <Heading title='Tickets' description='All your tickets at one place' />

      <Card className='w-full max-w-[420px] self-center'>
        <CardHeader>
          <CardTitle>Create Ticket</CardTitle>
          <CardDescription>Create a new ticket</CardDescription>
        </CardHeader>

        <CardContent>
          <TicketCreateForm />
        </CardContent>
      </Card>

      <ErrorBoundary fallback={<Placeholder label='Failed to load tickets' />}>
        <Suspense fallback={<Spinner />}>
          <TicketList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
