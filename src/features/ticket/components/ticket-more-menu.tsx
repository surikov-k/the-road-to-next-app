import { Ticket } from "@prisma/client";
import { LucideTrash2 } from "lucide-react";
import { ReactNode } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' side='right'>
        {deleteButton}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
