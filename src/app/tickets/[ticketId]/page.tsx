type TicketPageProps = {
  params: {
    ticketId: string;
  };
}
export default function TicketPage({params}: TicketPageProps) {
const {ticketId} =  params;
  return (
    <div>
      <h2 className="text-2xl">Ticket {ticketId}</h2>
    </div>
  );
}
