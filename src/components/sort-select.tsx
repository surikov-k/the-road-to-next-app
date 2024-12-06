"use client";

import { useQueryStates } from "nuqs";
import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sortOptions, sortParser } from "@/features/ticket/search-params";

interface SortSelectProps {
  options: Option[];
}

type Option = {
  label: string;
  sortKey: string;
  sortValue: string;
};

export default function SortSelect({ options }: SortSelectProps) {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions);

  const handleSort = async (compositeKey: string) => {
    const [sortKey, sortValue] = compositeKey.split("_");

    await setSort({
      sortKey,
      sortValue,
    });
  };

  return (
    <Select
      defaultValue={sort.sortKey + "_" + sort.sortValue}
      onValueChange={handleSort}
    >
      <SelectTrigger className='w-[180px]'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem
              key={option.sortKey + "_" + option.sortValue}
              value={option.sortKey + "_" + option.sortValue}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
