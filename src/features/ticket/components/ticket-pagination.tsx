"use client";

import { useQueryStates } from "nuqs";

import Pagination from "@/components/pagination";
import {
  paginationOptions,
  paginationParser,
} from "@/features/ticket/search-params";

interface TicketPaginationProps {
  prop?: any;
}

export default function TicketPagination({}: TicketPaginationProps) {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions
  );
  return <Pagination pagination={pagination} onPagination={setPagination} />;
}
