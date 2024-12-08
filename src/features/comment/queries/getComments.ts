"use server";

import { getAuth } from "@/features/auth/queries/get-auth";
import isOwner from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";

export async function getComments(ticketId: string) {
  const { user } = await getAuth();
  const comments = await prisma.comment.findMany({
    where: {
      ticketId,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return comments.map((comment) => ({
    ...comment,
    isOwner: isOwner(user, comment),
  }));
}
