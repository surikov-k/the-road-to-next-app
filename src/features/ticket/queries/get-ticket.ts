import { getAuth } from "@/features/auth/queries/get-auth";
import isOwner from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";

export async function getTicket(ticketId: string) {
  const { user } = await getAuth();
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!ticket) {
    return null;
  }

  return {
    ...ticket,
    isOwner: isOwner(user, ticket),
  };
}
