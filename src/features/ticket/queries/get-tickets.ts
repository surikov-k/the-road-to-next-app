import { ParsedSearchParams } from "@/features/ticket/search-params";
import { prisma } from "@/lib/prisma";

export async function getTickets(
  searchParams: ParsedSearchParams,
  userId?: string
) {
  const params = await searchParams;

  return prisma.ticket.findMany({
    where: {
      userId,
      title: {
        contains: params.search,
        mode: "insensitive",
      },
    },
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
}
