import TicketItem from "@/features/ticket/components/ticket-item";
import { getTickets } from "@/features/ticket/queries/get-tickets";

interface TicketListProps {
  userId?: string;
}

export default async function TicketList({ userId }: TicketListProps) {
  const tickets = await getTickets(userId);
  return (
    <div className='flex flex-1 animate-fade-in-from-top flex-col items-center gap-y-4'>
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}
