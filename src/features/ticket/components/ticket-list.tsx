import React from "react";

import Placeholder from "@/components/placeholder";
import SearchInput from "@/components/search-input";
import SortSelect from "@/components/sort-select";
import TicketItem from "@/features/ticket/components/ticket-item";
import { getTickets } from "@/features/ticket/queries/get-tickets";
import { ParsedSearchParams } from "@/features/ticket/search-params";

interface TicketListProps {
  searchParams: ParsedSearchParams;
  userId?: string;
}

export default async function TicketList({
  userId,
  searchParams,
}: TicketListProps) {
  const tickets = await getTickets(searchParams, userId);

  return (
    <div className='flex flex-1 animate-fade-in-from-top flex-col items-center gap-y-4'>
      <div className='flex w-full max-w-[420px] gap-x-2'>
        <SearchInput placeholder='Search tickets...' />
        <SortSelect
          defaultValue={"newest"}
          options={[
            { label: "Newest", value: "newest" },
            { label: "Bounty", value: "bounty" },
          ]}
        />
      </div>
      {tickets.length ? (
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <Placeholder label='No tickets found' />
      )}
    </div>
  );
}
