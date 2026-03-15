"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateInputProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  placeholder: string;
  minDate?: Date;
  maxDate?: Date;
}

export function DateInput({
  value,
  onChange,
  placeholder,
  minDate,
  maxDate,
}: DateInputProps) {
  return (
    <div className="relative w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-empty={!value}
            className="data-[empty=true]:text-muted-foreground justify-start font-normal text-left focus-visible:border-destructive h-12 w-full px-3 pr-9 py-1 rounded-none gap-2"
          >
            <CalendarIcon className="h-4 w-4 shrink-0" />
            {value ? format(value, "yyyy-MM-dd") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            disabled={(date) => {
              if (minDate && date < minDate) return true;
              if (maxDate && date > maxDate) return true;
              return false;
            }}
          />
        </PopoverContent>
      </Popover>

      {value && (
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onChange(undefined);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
