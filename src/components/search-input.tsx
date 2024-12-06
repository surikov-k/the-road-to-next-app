"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent } from "react";

import { Input } from "@/components/ui/input";

interface SearchInputProps {
  placeholder?: string;
}

export default function SearchInput({ placeholder }: SearchInputProps) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <Input
      className='w-full'
      placeholder={placeholder}
      onChange={handleSearch}
    />
  );
}
