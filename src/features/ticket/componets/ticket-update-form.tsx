import { Ticket } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateTicket } from "@/features/ticket/actions/update-ticket";

interface TicketUpdateFormProps {
  ticket: Ticket;
}

export default function TicketUpdateForm({ ticket }: TicketUpdateFormProps) {
  return (
    <form
      action={updateTicket.bind(null, ticket.id)}
      className='flex flex-col gap-y-2'
    >
      <Label htmlFor='title'>Title</Label>
      <Input type='text' id='title' name='title' defaultValue={ticket.title} />
      <Label htmlFor='content'>Content</Label>
      <Textarea id='content' name='content' defaultValue={ticket.content} />

      <Button className='mt-4' type='submit'>
        Update
      </Button>
    </form>
  );
}
