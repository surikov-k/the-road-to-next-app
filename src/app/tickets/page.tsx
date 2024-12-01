import { LucideCircleCheck, LucideFileText, LucidePencil } from "lucide-react";
import Link from "next/link";

import Heading from "@/components/Heading";
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

const TICKET_ICONS = {
  DONE: <LucideCircleCheck />,
  IN_PROGRESS: <LucidePencil />,
  OPEN: <LucideFileText />,
};

export default function TicketsPage() {
  return (
    <div className='flex flex-1 flex-col gap-y-8'>
      <Heading title='Tickets' description='All your tickets at one place' />

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
