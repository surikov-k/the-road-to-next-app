import clsx from "clsx";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { initialTickets } from "@/data";
import { ticketPath } from "@/paths";

const CheckIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className='size-6 text-green-400'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z'
    />
  </svg>
);

const PencilIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className='size-6'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125'
    />
  </svg>
);

const DocumentIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className='size-6'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'
    />
  </svg>
);

const TICKET_ICONS = {
  DONE: <CheckIcon />,
  IN_PROGRESS: <PencilIcon />,
  OPEN: <DocumentIcon />,
};

export default function TicketsPage() {
  return (
    <div className='flex flex-1 flex-col gap-y-8'>
      <div>
        <h2 className='text-3xl font-bold tracking-tight'>Tickets</h2>
        <p className='text-muted-foreground text-sm'>
          All your tickets at one place
        </p>
      </div>

      <Separator />

      <div className='animate-fade-in-from-top flex flex-1 flex-col items-center gap-y-4'>
        {initialTickets.map((ticket) => (
          <Card key={ticket.id} className='w-full max-w-[420px]'>
            <CardHeader>
              <CardTitle className='flex gap-x-2'>
                <span>{TICKET_ICONS[ticket.status]}</span>
                <span className='truncate'>{ticket.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='line-clamp-3 whitespace-break-spaces'>
                {ticket.content}
              </p>
            </CardContent>
            <Separator />
            <CardFooter>
              <Link
                className='pt-4 text-sm underline'
                href={ticketPath(ticket.id.toString())}
              >
                Go to ticket
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
