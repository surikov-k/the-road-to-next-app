import { Ticket, TicketStatus } from "@prisma/client";
import { LucideTrash2 } from "lucide-react";
import { ReactNode } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TICKET_STATUS_LABELS } from "@/features/ticket/components/constants";

interface TicketMoreMenuProps {
  ticket: Ticket;
  trigger: ReactNode;
}

export default function TicketMoreMenu({
  ticket,
  trigger,
}: TicketMoreMenuProps) {
  const deleteButton = (
    <DropdownMenuItem>
      <LucideTrash2 className='mr-2 h-4 w-4' />
      <span>Delete</span>
    </DropdownMenuItem>
  );

  const ticketStatusRadioGroupItems = (
    <DropdownMenuRadioGroup value={ticket.status}>
      {(Object.keys(TICKET_STATUS_LABELS) as Array<TicketStatus>).map((key) => (
        <DropdownMenuRadioItem key={key} value={key}>
          {TICKET_STATUS_LABELS[key]}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' side='right'>
        {ticketStatusRadioGroupItems}
        <DropdownMenuSeparator />
        {deleteButton}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
