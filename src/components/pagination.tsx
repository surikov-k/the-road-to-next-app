"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaginatedData } from "@/types/pagination";

type PageAndSize = {
  page: number;
  size: number;
};
interface PaginationProps {
  pagination: PageAndSize;
  onPagination: (pageAndSize: PageAndSize) => void;
  paginationMetadata: PaginatedData<unknown>["metadata"];
}

export default function Pagination({
  pagination,
  onPagination,
  paginationMetadata: { count, hasNextPage },
}: PaginationProps) {
  const startOffset = pagination.page * pagination.size + 1;
  const endOffset = startOffset + pagination.size - 1;
  const actualEndOffset = Math.min(endOffset, count);

  const label = `${startOffset} - ${actualEndOffset} of ${count}`;

  const handlePreviousPage = () => {
    onPagination({
      ...pagination,
      page: pagination.page - 1,
    });
  };

  const handleNextPage = () => {
    onPagination({
      ...pagination,
      page: pagination.page + 1,
    });
  };

  function handleChangeSize(value: string) {
    onPagination({
      page: 0,
      size: parseInt(value),
    });
  }

  const previousButton = (
    <Button
      variant='outline'
      size='sm'
      disabled={pagination.page < 1}
      onClick={handlePreviousPage}
    >
      Previous
    </Button>
  );
  const nextButton = (
    <Button
      variant='outline'
      size='sm'
      disabled={!hasNextPage}
      onClick={handleNextPage}
    >
      Next
    </Button>
  );

  const sizeButton = (
    <Select
      defaultValue={pagination.size.toString()}
      onValueChange={handleChangeSize}
    >
      <SelectTrigger className='h-[36px]'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='2'>2</SelectItem>
        <SelectItem value='5'>5</SelectItem>
        <SelectItem value='10'>10</SelectItem>
        <SelectItem value='25'>25</SelectItem>
        <SelectItem value='100'>100</SelectItem>
      </SelectContent>
    </Select>
  );

  return (
    <div className='flex items-center justify-between'>
      <p className='text-sm text-muted-foreground'>{label}</p>
      <div className='flex gap-x-2'>
        {sizeButton}
        {previousButton}
        {nextButton}
      </div>
    </div>
  );
}
