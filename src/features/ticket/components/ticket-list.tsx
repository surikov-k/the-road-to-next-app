import React from "react";

import Placeholder from "@/components/placeholder";
import TicketItem from "@/features/ticket/components/ticket-item";
import TicketPagination from "@/features/ticket/components/ticket-pagination";
import TicketSearchInput from "@/features/ticket/components/ticket-search-input";
import TicketSortSelect from "@/features/ticket/components/ticket-sort-select";
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
  const { list: tickets, metadata: ticketsMetadata } = await getTickets(
    searchParams,
    userId
  );

  return (
    <div className='flex flex-1 animate-fade-in-from-top flex-col items-center gap-y-4'>
      <div className='flex w-full max-w-[420px] gap-x-2'>
        <TicketSearchInput placeholder='Search tickets...' />
        <TicketSortSelect
          options={[
            { sortKey: "createdAt", sortValue: "desc", label: "Newest" },
            { sortKey: "createdAt", sortValue: "asc", label: "Oldest" },
            { sortKey: "bounty", sortValue: "desc", label: "Bounty" },
          ]}
        />
      </div>
      {tickets.length ? (
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <Placeholder label='No tickets found' />
      )}
      <div className='w-full max-w-[420px]'>
        <TicketPagination paginationTicketMetadata={ticketsMetadata} />
      </div>
    </div>
  );
}
