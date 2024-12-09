"use client";

import { useQueryState, useQueryStates } from "nuqs";
import { useEffect, useRef } from "react";

import Pagination from "@/components/pagination";
import {
  paginationOptions,
  paginationParser,
  searchParser,
} from "@/features/ticket/search-params";
import { TicketWithMetadata } from "@/features/ticket/types";
import { PaginatedData } from "@/types/pagination";

interface TicketPaginationProps {
  paginationTicketMetadata: PaginatedData<TicketWithMetadata>["metadata"];
}

export default function TicketPagination({
  paginationTicketMetadata,
}: TicketPaginationProps) {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions
  );

  const [search] = useQueryState("search", searchParser);
  const prevSearch = useRef(search);

  useEffect(() => {
    if (search !== prevSearch.current) {
      prevSearch.current = search;
      setPagination({ ...pagination, page: 0 });
    }
    // add more reactive effects here once needed
  }, [pagination, search, setPagination]);

  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      paginationMetadata={paginationTicketMetadata}
    />
  );
}
