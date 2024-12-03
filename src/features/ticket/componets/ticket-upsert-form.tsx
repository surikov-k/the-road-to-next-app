"use client";

import { Ticket } from "@prisma/client";

import SubmitButton from "@/components/form/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "@/features/ticket/actions/upsert-ticket";

interface TicketUpsertFormProps {
  ticket?: Ticket;
}

export default function TicketUpsertForm({ ticket }: TicketUpsertFormProps) {
  return (
    <div>
      <form
        action={upsertTicket.bind(null, ticket?.id)}
        className='flex flex-col gap-y-2'
      >
        <Label htmlFor='title'>Title</Label>
        <Input
          type='text'
          id='title'
          name='title'
          defaultValue={ticket?.title}
        />
        <Label htmlFor='content'>Content</Label>
        <Textarea id='content' name='content' defaultValue={ticket?.content} />

        <SubmitButton label={ticket ? "Update" : "Create"} />
      </form>
    </div>
  );
}
