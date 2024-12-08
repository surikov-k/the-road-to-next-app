import { prisma } from "@/lib/prisma";

export async function getComments(ticketId: string) {
  console.log("comments", ticketId);
  await new Promise((resolve) => setTimeout(resolve, 2000));

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

  return comments;
}
