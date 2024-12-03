"use client";

import { Ticket } from "@prisma/client";
import { useActionState } from "react";

import FieldError from "@/components/form/field-error";
import Form from "@/components/form/form";
import SubmitButton from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "@/features/ticket/actions/upsert-ticket";
import { fromCent } from "@/utils/currency";

interface TicketUpsertFormProps {
  ticket?: Ticket;
}

export default function TicketUpsertForm({ ticket }: TicketUpsertFormProps) {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE
  );

  return (
    <Form action={action} actionState={actionState}>
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
        <FieldError actionState={actionState} name='title' />
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
        <FieldError actionState={actionState} name='content' />
      </div>

      <div className='mb-1 flex gap-x-2'>
        <div className='w-1/2'>
          <Label htmlFor='deadline'>Deadline</Label>
          <Input
            id='deadline'
            name='deadline'
            type='date'
            defaultValue={
              (actionState.payload?.get("deadline") as string) ??
              ticket?.deadline
            }
          />
          <FieldError actionState={actionState} name='deadline' />
        </div>
        <div className='w-1/2'>
          <Label htmlFor='bounty'>Bounty ($)</Label>
          <Input
            id='bounty'
            name='bounty'
            type='number'
            step='.01'
            defaultValue={
              (actionState.payload?.get("bounty") as string) ??
              (ticket?.bounty ? fromCent(ticket?.bounty) : "")
            }
          />
          <FieldError actionState={actionState} name='bounty' />
        </div>
      </div>

      <SubmitButton label={ticket ? "Update" : "Create"} />
    </Form>
  );
}
