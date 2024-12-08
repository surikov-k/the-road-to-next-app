import { getAuth } from "@/features/auth/queries/get-auth";
import isOwner from "@/features/auth/utils/is-owner";
import { ParsedSearchParams } from "@/features/ticket/search-params";
import { prisma } from "@/lib/prisma";

export async function getTickets(
  searchParams: ParsedSearchParams,
  userId?: string
) {
  const params = await searchParams;
  const { user } = await getAuth();

  const where = {
    userId,
    title: {
      contains: params.search,
      mode: "insensitive" as const,
    },
  };

  const skip = params.page * params.size;
  const take = params.size;

  const [tickets, count] = await prisma.$transaction([
    prisma.ticket.findMany({
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
    }),
    prisma.ticket.count({ where }),
  ]);

  return {
    list: tickets.map((ticket) => ({
      ...ticket,
      isOwner: isOwner(user, ticket),
    })),
    metadata: { count, hasNextPage: skip + take < count },
  };
}
