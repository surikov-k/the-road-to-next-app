import { prisma } from "@/lib/prisma";

export async function getTickets(userId?: string) {
  return prisma.ticket.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
}
