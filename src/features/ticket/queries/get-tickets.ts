import { ParsedSearchParams } from "@/features/ticket/search-params";
import { prisma } from "@/lib/prisma";

export async function getTickets(
  searchParams: ParsedSearchParams,
  userId?: string
) {
  const params = await searchParams;

  const where = {
    userId,
    title: {
      contains: params.search,
      mode: "insensitive" as const,
    },
  };

  const skip = params.page * params.size;
  const take = params.size;

  const tickets = await prisma.ticket.findMany({
    where,
    skip,
    take,
    orderBy: {
      // createdAt: "desc",
      // ...(params?.sort === "newest" && { createdAt: "desc" }),
      // ...(params?.sort === "bounty" && { bounty: "desc" }),
      [params.sortKey]: params.sortValue,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  const count = await prisma.ticket.count({ where });

  return {
    list: tickets,
    metadata: { count, hasNextPage: skip + take < count },
  };
}
