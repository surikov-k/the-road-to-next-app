import { getTickets } from "@/features/ticket/queries/get-tickets";

export async function GET() {
  const { list, metadata } = await getTickets(
    {
      search: "",
      page: 0,
      size: 10,
      sortKey: "createdAt",
      sortValue: "desc",
    },
    undefined
  );
  return Response.json({ list, metadata });
}
