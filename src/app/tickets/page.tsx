import Link from 'next/link';
import {initialTickets} from '@/data';
import { ticketPath } from '@/paths';

export default function TicketsPage() {
  return (
    <div>
      <h2 className="text-2xl">Tickets</h2>
      {initialTickets.map((ticket) => (
        <div key={ticket.id}>
          <h2 className="text-lg">{ticket.title}</h2>
          <Link className="underline text-sm" href={ticketPath(ticket.id.toString())} >Go to ticket</Link>
        </div>
      ))}
    </div>
  );
}
