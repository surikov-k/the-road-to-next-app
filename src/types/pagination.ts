export type PaginatedData<T> = {
  list: T[];
  metadata: {
    count: number;
    hasMore: boolean;
    cursor?: string;
  };
};
