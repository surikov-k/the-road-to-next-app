import { getTickets } from "@/features/ticket/queries/get-tickets";
import { searchParamsCache } from "@/features/ticket/search-params";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const untypedSearchParams = Object.fromEntries(searchParams);

  const typedSearchParams = searchParamsCache.parse(untypedSearchParams);

  console.log(untypedSearchParams);
  console.log(typedSearchParams);

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
