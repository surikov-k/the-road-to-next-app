import { SearchParams } from "@/features/ticket/search-params";
import { prisma } from "@/lib/prisma";

export async function getTickets(
  userId?: string,
  searchParams?: Promise<SearchParams>
) {
  const params = await searchParams;
  const search = params?.search || undefined;

  return prisma.ticket.findMany({
    where: {
      userId,
      title: {
        contains: search,
        mode: "insensitive",
      },
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
