"use client";

import { format } from "date-fns";
import { Calendar as LucideCalendar } from "lucide-react";
import { RefObject, useImperativeHandle, useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface ImperativeHandleFromDatePicker {
  reset: () => void;
}

interface DatePickerProps {
  id: string;
  name: string;
  defaultValue?: string;
  imperativeHandleRef?: RefObject<ImperativeHandleFromDatePicker>;
}

export function DatePicker({
  id,
  name,
  defaultValue,
  imperativeHandleRef,
}: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date()
  );

  useImperativeHandle(imperativeHandleRef, () => ({
    reset: () => {
      setDate(new Date());
    },
  }));

  const [open, setOpen] = useState(false);

  const formattedStringDate = date ? format(date, "yyyy-MM-dd") : "";

  const handleSelect = (date: Date | undefined) => {
    setDate(date);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger id={id} className='w-full' asChild>
        <Button
          variant={"outline"}
          className='justify-start text-left font-normal'
        >
          <LucideCalendar className='mr-2 h-4 w-4' />
          {formattedStringDate}
          <input type='hidden' name={name} value={formattedStringDate} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
