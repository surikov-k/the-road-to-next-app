import { SearchParams } from "@/features/ticket/search-params";
import { prisma } from "@/lib/prisma";

export async function getTickets(
  searchParams: Promise<SearchParams>,
  userId: string
) {
  const params = await searchParams;

  return prisma.ticket.findMany({
    where: {
      userId,
      ...(typeof params?.search === "string" && {
        title: {
          contains: params.search,
          mode: "insensitive",
        },
      }),
    },
    orderBy: {
      // createdAt: "desc",
      ...(params?.sort === undefined && { createdAt: "desc" }),
      ...(params?.sort === "bounty" && { bounty: "desc" }),
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
