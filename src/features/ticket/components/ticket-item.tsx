import { Prisma } from "@prisma/client";
import { clsx } from "clsx";
import {
  LucideMoreVertical,
  LucidePencil,
  LucideSquareArrowOutUpRight,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuth } from "@/features/auth/queries/get-auth";
import { TICKET_ICONS } from "@/features/ticket/components/constants";
import TicketMoreMenu from "@/features/ticket/components/ticket-more-menu";
import { editTicketPath, ticketPath } from "@/paths";
import { toCurrencyFromCents } from "@/utils/currency";

interface TicketItemProps {
  ticket: Prisma.TicketGetPayload<{
    include: { user: { select: { name: true } } };
  }>;
  hasDetail?: boolean;
}

export default async function TicketItem({
  ticket,
  hasDetail,
}: TicketItemProps) {
  const { user } = await getAuth();
  const isTickerOwner = user?.id === ticket.userId;

  const detailButton = (
    <Button asChild size='icon' variant='ghost'>
      <Link prefetch href={ticketPath(ticket.id)}>
        <LucideSquareArrowOutUpRight size='16' />
      </Link>
    </Button>
  );

  const editButton = isTickerOwner ? (
    <Button asChild size='icon' variant='outline'>
      <Link prefetch href={editTicketPath(ticket.id)}>
        <LucidePencil className='h-4 w-4' />
      </Link>
    </Button>
  ) : null;

  const moreMenu = isTickerOwner ? (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant='outline' size='icon'>
          <LucideMoreVertical className='h-4 w-4' />
        </Button>
      }
    />
  ) : null;

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
        <CardFooter className='flex justify-between'>
          <p className='text-sm text-muted-foreground'>
            {ticket.deadline} by {ticket.user.name}
          </p>
          <p className='text-sm text-muted-foreground'>
            {toCurrencyFromCents(ticket.bounty)}
          </p>
        </CardFooter>
      </Card>
      <div className='flex flex-col'>
        {hasDetail ? (
          <>
            {editButton}
            {moreMenu}
          </>
        ) : (
          <>
            {detailButton}
            {editButton}
          </>
        )}
      </div>
    </div>
  );
}
