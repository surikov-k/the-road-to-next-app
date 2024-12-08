// "use client";

import { Prisma } from "@prisma/client";
import { clsx } from "clsx";
import {
  LucideMoreVertical,
  LucidePencil,
  LucideSquareArrowOutUpRight,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TICKET_ICONS } from "@/features/ticket/components/constants";
import TicketMoreMenu from "@/features/ticket/components/ticket-more-menu";
import { editTicketPath, ticketPath } from "@/paths";
import { toCurrencyFromCents } from "@/utils/currency";

interface TicketItemProps {
  ticket: Prisma.TicketGetPayload<{
    include: { user: { select: { name: true } } };
  }> & {
    isOwner: boolean;
  };
  hasDetail?: boolean;
  // comments?: CommentWithMetadata[];
  comments?: ReactNode;
}

export default function TicketItem({
  ticket,
  hasDetail,
  comments,
}: TicketItemProps) {
  // const { user } = await getAuth();
  // const isTickerOwner = user?.id === ticket.userId;

  const detailButton = (
    <Button asChild size='icon' variant='ghost'>
      <Link prefetch href={ticketPath(ticket.id)}>
        <LucideSquareArrowOutUpRight size='16' />
      </Link>
    </Button>
  );

  const editButton = ticket.isOwner ? (
    <Button asChild size='icon' variant='outline'>
      <Link prefetch href={editTicketPath(ticket.id)}>
        <LucidePencil className='h-4 w-4' />
      </Link>
    </Button>
  ) : null;

  const moreMenu = ticket.isOwner ? (
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
      className={clsx("flex w-full flex-col gap-y-8", {
        "max-w-[420px]": !hasDetail,
        "max-w-[580px]": hasDetail,
      })}
    >
      <div className='flex gap-x-2'>
        <Card key={ticket.id} className='w-full'>
          <CardHeader>
            <CardTitle className='flex gap-x-2'>
              <span>{TICKET_ICONS[ticket.status]}</span>
              <span
                className={clsx({
                  "line-clamp-1 whitespace-break-spaces": !hasDetail,
                })}
              >
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
      {/*{hasDetail && <Comments ticketId={ticket.id} comments={comments} />}*/}
      {comments}
    </div>
  );
}
