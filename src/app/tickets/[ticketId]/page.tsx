import { initialTickets } from '@/data';

type TicketPageProps = {
  params: {
    ticketId: string;
  };
}
export default function TicketPage({params}: TicketPageProps) {
  const {ticketId} = params;
  const ticket = initialTickets.find((ticket) => ticket.id === Number(ticketId));

  if (!ticket) {
    return (
      <div>
        <h2 className="text-2xl">Ticket not found</h2>
      </div>
    )
  }
  return (
    <div>
      <h2 className="text-2xl">{ticket.title}</h2>
      {(<p>{ticket.content}</p>)}
      {(<p>{ticket.status}</p>)}
    </div>
  )
}
