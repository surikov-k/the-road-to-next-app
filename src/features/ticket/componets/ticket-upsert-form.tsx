"use client";

import { Ticket } from "@prisma/client";
import { useActionState } from "react";

import SubmitButton from "@/components/form/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "@/features/ticket/actions/upsert-ticket";

interface TicketUpsertFormProps {
  ticket?: Ticket;
}

export default function TicketUpsertForm({ ticket }: TicketUpsertFormProps) {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    {
      message: "",
      fieldErrors: {},
    }
  );
  return (
    <div>
      <form action={action} className='flex flex-col gap-y-2'>
        <div>
          <Label htmlFor='title'>Title</Label>
          <Input
            type='text'
            id='title'
            name='title'
            defaultValue={
              (actionState.payload?.get("title") as string) ?? ticket?.title
            }
          />
          <span className='text-sm text-red-600'>
            {actionState.fieldErrors.title?.[0]}
          </span>
        </div>

        <div>
          <Label htmlFor='content'>Content</Label>
          <Textarea
            id='content'
            name='content'
            defaultValue={
              (actionState.payload?.get("content") as string) ?? ticket?.content
            }
          />
          <span className='text-sm text-red-600'>
            {actionState.fieldErrors.content?.[0]}
          </span>
        </div>

        <SubmitButton label={ticket ? "Update" : "Create"} />
        <span className='text-sm text-red-600'>{actionState.message}</span>
      </form>
    </div>
  );
}
