"use client";

import { Ticket } from "@prisma/client";
import { clsx } from "clsx";
import { LucideSquareArrowOutUpRight, LucideTrash2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteTicket } from "@/features/ticket/actions/delete-ticket";
import { TICKET_ICONS } from "@/features/ticket/componets/constants";
import { ticketPath } from "@/paths";

interface TicketItemProps {
  ticket: Ticket;
  hasDetail?: boolean;
}

export default function TicketItem({ ticket, hasDetail }: TicketItemProps) {
  const detailButton = (
    <Button asChild size='icon' variant='ghost'>
      <Link href={ticketPath(ticket.id.toString())}>
        <LucideSquareArrowOutUpRight size='16' />
      </Link>
    </Button>
  );

  const handleDeleteTicket = async () => {
    await deleteTicket(ticket.id);
  };

  const deleteButton = (
    <Button variant='outline' size='icon' onClick={handleDeleteTicket}>
      <LucideTrash2 className='h-4 w-4' />
    </Button>
  );

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
      <div className='flex flex-col'>
        {hasDetail ? deleteButton : detailButton}
      </div>
    </div>
  );
}
