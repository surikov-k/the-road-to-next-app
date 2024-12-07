"use client";

import { Button } from "@/components/ui/button";

type PageAndSize = {
  page: number;
  size: number;
};
interface PaginationProps {
  pagination: PageAndSize;
  onPagination: (pageAndSize: PageAndSize) => void;
  paginationMetadata: {
    count: number;
    hasNextPage: boolean;
  };
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

  return (
    <div className='flex items-center justify-between'>
      <p className='text-sm text-muted-foreground'>{label}</p>
      <div className='flex gap-x-2'>
        {previousButton}
        {nextButton}
      </div>
    </div>
  );
}
