'use client';

import { forwardRef, useState } from 'react';
import { Calendar } from '../ui/calendar';
import { Input, InputProps } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon } from '@radix-ui/react-icons';
import { constants, formats } from '@/lib/utils';
import { DateRange } from 'react-day-picker';

interface DateRangePickerProps extends InputProps {
  defaultSelected?: [Date?, Date?];
  selected?: [Date?, Date?];
  minDate?: Date;
  maxDate?: Date;
  disableFuture?: boolean;
  disablePast?: boolean;
}

const DateRangePicker = forwardRef<HTMLInputElement, DateRangePickerProps>(
  (
    {
      defaultSelected,
      selected,
      minDate,
      maxDate,
      disableFuture,
      disablePast,
      onChange,
      placeholder = 'Chọn khoảng thời gian',
      ...props
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState<string>(selected ? formatDates(selected) : '');
    const [date, setDate] = useState<DateRange | undefined>({
      from: defaultSelected?.[0],
      to: defaultSelected?.[1],
    });

    const handleSelect = (value?: DateRange) => {
      const data = convertDatesArr(value);
      setDate(value);
      setInputValue(value ? formatDates(data) : '');
      onChange?.(data as any);
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
            value={selected ? formatDates(selected) : inputValue}
            readOnly
            startAdornment={<CalendarIcon className="h-4 w-4 opacity-50" />}
          />
        </PopoverTrigger>
        <PopoverContent className="w-auto" sideOffset={16}>
          <Calendar
            mode="range"
            numberOfMonths={2}
            selected={selected ? convertDatesObj(selected) : date}
            onSelect={handleSelect}
            disabled={disabledDate}
          />
        </PopoverContent>
      </Popover>
    );
  },
);

const formatDates = (dates: [Date?, Date?]) => {
  if (dates[0] && dates[1]) return `${formats.date(dates[0])} - ${formats.date(dates[1])}`;
  else if (dates[0]) return formats.date(dates[0]);
  else if (dates[1]) return formats.date(dates[1]);
  else return '';
};

const convertDatesArr = (value?: DateRange): [Date?, Date?] => {
  return [value?.from, value?.to];
};

const convertDatesObj = (value?: [Date?, Date?]): DateRange => {
  return { from: value?.[0], to: value?.[1] };
};

DateRangePicker.displayName = 'DateRangePicker';

export default DateRangePicker;
