import { LucideSquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

import { TICKET_ICONS } from "@/app/tickets/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ticket } from "@/features/ticket/types.";
import { ticketPath } from "@/paths";

interface TicketItemProps {
  ticket: Ticket;
}

export default function TicketItem({ ticket }: TicketItemProps) {
  const detailButton = () => {
    return (
      <Button asChild size='icon' variant='ghost'>
        <Link href={ticketPath(ticket.id.toString())}>
          <LucideSquareArrowOutUpRight size='16' />
        </Link>
      </Button>
    );
  };

  return (
    <div className='flex w-full max-w-[420px] gap-x-2'>
      <Card key={ticket.id} className='w-full'>
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
      </Card>
      <div className='flex flex-col'>{detailButton()}</div>
    </div>
  );
}
