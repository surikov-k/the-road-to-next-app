"use client";

import { useQueryState } from "nuqs";
import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sortParser } from "@/features/ticket/search-params";

interface SortSelectProps {
  options: Option[];
}

type Option = {
  label: string;
  value: string;
};

export default function SortSelect({ options }: SortSelectProps) {
  const [sort, setSort] = useQueryState("sort", sortParser);

  const handleSort = (value: string) => {
    setSort(value);
  };

  return (
    <Select defaultValue={sort} onValueChange={handleSort}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
