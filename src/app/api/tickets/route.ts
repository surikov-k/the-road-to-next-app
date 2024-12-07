import { getTickets } from "@/features/ticket/queries/get-tickets";
import { searchParamsCache } from "@/features/ticket/search-params";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const typedSearchParams = searchParamsCache.parse(
    Object.fromEntries(searchParams)
  );

  const { list, metadata } = await getTickets(
    Promise.resolve(typedSearchParams),
    undefined
  );
  return Response.json({ list, metadata });
}
