'use client';

import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input, InputProps } from '../ui/input';
import { forwardRef, useState } from 'react';
import { constants, formats } from '@/lib/utils';
import { CalendarIcon } from '@radix-ui/react-icons';

interface DatePickerProps extends InputProps {
  defaultSelected?: Date;
  selected?: Date;
  minDate?: Date;
  maxDate?: Date;
  disableFuture?: boolean;
  disablePast?: boolean;
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      onChange,
      defaultSelected,
      selected,
      minDate,
      maxDate,
      disableFuture,
      disablePast,
      placeholder = 'Chọn một ngày',
      ...props
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState<string>(selected ? formats.date(selected) : '');
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(defaultSelected);

    const handleSelect = (value?: Date) => {
      setSelectedDate(value);
      setInputValue(value ? formats.date(value) : '');
      onChange?.(value as any);
    };

    const disabledDate = (date: Date) => {
      if (maxDate && date > maxDate) return true;
      if (minDate && date < minDate) return true;
      if (disableFuture && date > new Date()) return true;
      if (disablePast && date < constants.yesterday) return true;
      return false;
    };

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Input
            {...props}
            type="text"
            placeholder={placeholder}
            ref={ref}
            value={selected ? formats.date(selected) : inputValue}
            readOnly
            startAdornment={<CalendarIcon className="h-4 w-4 opacity-50" />}
          />
        </PopoverTrigger>
        <PopoverContent sideOffset={16}>
          <Calendar
            mode="single"
            selected={selected || selectedDate}
            onSelect={handleSelect}
            disabled={disabledDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  },
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;
