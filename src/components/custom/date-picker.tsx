'use client';

import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input, InputProps } from '../ui/input';
import { forwardRef, useState } from 'react';
import { constants, formats } from '@/lib/utils';
import { CalendarIcon } from '@radix-ui/react-icons';
import TimeInput from './time-input';
import { Label } from '../ui/label';

interface DatePickerProps extends InputProps {
  defaultSelected?: Date;
  selected?: Date;
  minDate?: Date;
  maxDate?: Date;
  disableFuture?: boolean;
  disablePast?: boolean;
  hasTime?: boolean;
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
      hasTime,
      ...props
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState<string>(selected ? formats.date(selected, hasTime) : '');
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(defaultSelected);

    const handleSelect = (value?: Date) => {
      const date = selected || selectedDate;
      if (hasTime && date && value) {
        if (
          value.getFullYear() !== date.getFullYear() ||
          value.getMonth() !== date.getMonth() ||
          value.getDate() !== date.getDate()
        ) {
          // Giữ lại giờ, phút, giây từ `date`
          value.setHours(date.getHours());
          value.setMinutes(date.getMinutes());
          value.setSeconds(date.getSeconds());
        }
      }
      setSelectedDate(value);
      setInputValue(value ? formats.date(value, hasTime) : '');
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
            value={selected ? formats.date(selected, hasTime) : inputValue}
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
          {hasTime && (
            <div className="flex items-center gap-1">
              <Label className="mr-4">Thời gian</Label>
              <TimeInput picker="hours" date={selected || selectedDate} setDate={handleSelect} />
              <TimeInput picker="minutes" date={selected || selectedDate} setDate={handleSelect} />
              <TimeInput picker="seconds" date={selected || selectedDate} setDate={handleSelect} />
            </div>
          )}
        </PopoverContent>
      </Popover>
    );
  },
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;
