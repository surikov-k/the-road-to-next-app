export const homePath = () => "/";
export const ticketsPath = () => "/tickets";
export const ticketPath = (ticketId: string) => `${ticketsPath()}/${ticketId}`;
export const editTicketPath = (ticketId: string) =>
  `${ticketPath(ticketId)}/edit`;
