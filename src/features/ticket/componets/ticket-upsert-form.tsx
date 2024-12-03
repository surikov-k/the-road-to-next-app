"use client";

import { Ticket } from "@prisma/client";
import { LucideLoaderCircle } from "lucide-react";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "@/features/ticket/actions/upsert-ticket";

interface TicketUpsertFormProps {
  ticket?: Ticket;
}

export default function TicketUpsertForm({ ticket }: TicketUpsertFormProps) {
  const [isPending, startTransition] = useTransition();

  const upsertTicketAction = async (formData: FormData) => {
    startTransition(async () => {
      await upsertTicket.bind(null, ticket?.id)(formData);
    });
  };
  return (
    <div>
      <form action={upsertTicketAction} className='flex flex-col gap-y-2'>
        <Label htmlFor='title'>Title</Label>
        <Input
          type='text'
          id='title'
          name='title'
          defaultValue={ticket?.title}
        />
        <Label htmlFor='content'>Content</Label>
        <Textarea id='content' name='content' defaultValue={ticket?.content} />

        <Button disabled={isPending} className='mt-4' type='submit'>
          {isPending && <LucideLoaderCircle className='h-4 w-4 animate-spin' />}
          {ticket ? "Update" : "Create"}
        </Button>
      </form>
    </div>
  );
}
