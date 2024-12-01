import { clsx } from "clsx";
import { LucideSquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

import { TICKET_ICONS } from "@/app/tickets/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ticket } from "@/features/ticket/types.";
import { ticketPath } from "@/paths";

interface TicketItemProps {
  ticket: Ticket;
  hasDetail?: boolean;
}

export default function TicketItem({ ticket, hasDetail }: TicketItemProps) {
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
    <div
      className={clsx("flex w-full gap-x-2", {
        "max-w-[420px]": !hasDetail,
        "max-w-[580px]": hasDetail,
      })}
    >
      <Card key={ticket.id} className='w-full'>
        <CardHeader>
          <CardTitle className='flex gap-x-2'>
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span className={clsx({ truncate: !hasDetail })}>
              {ticket.title}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p
            className={clsx({
              "line-clamp-3 whitespace-break-spaces": !hasDetail,
            })}
          >
            {ticket.content}
          </p>
        </CardContent>
      </Card>
      {hasDetail ? null : <div className='flex flex-col'>{detailButton()}</div>}
    </div>
  );
}
