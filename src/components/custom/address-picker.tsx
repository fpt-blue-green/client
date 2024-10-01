'use client';

import { forwardRef, useState } from 'react';
import { Input, InputProps } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/lib/http';
import { useDebounce } from '@/hooks';
import { CheckIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { LuLoader2 } from 'react-icons/lu';
import NoData from '../no-data';

interface AddressPickerProps extends InputProps {
  value: string;
}

const AddressPicker = forwardRef<HTMLInputElement, AddressPickerProps>(({ value, onChange, ...props }, ref) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>(value);
  const [search, setSearch] = useState<string>(value?.split(',')[0] || '');
  const debouncedSearch = useDebounce(search, 200);
  const { data, isLoading } = useSWRImmutable<string[]>(
    `/Utility/location?keyName=${debouncedSearch}`,
    debouncedSearch.length >= 3 ? fetcher : null,
  );

  const handleSelect = (location: string) => {
    if (inputValue === location) {
      setInputValue('');
      onChange?.('' as any);
    } else {
      setInputValue(location);
      onChange?.(location as any);
    }
    setOpen(false);
  };

  const handleSearch = (search: string) => {
    if (!search.startsWith(' ')) {
      setSearch(search);
    }
  };

  const highlightMatch = (location: string) => {
    if (!search) return location;
    const matchIndex = location.toLowerCase().indexOf(search.toLowerCase());
    if (matchIndex === -1) return location; // No match found

    const beforeMatch = location.substring(0, matchIndex);
    const matchText = location.substring(matchIndex, matchIndex + search.length);
    const afterMatch = location.substring(matchIndex + search.length);

    return (
      <div className="flex items-center whitespace-pre">
        {beforeMatch}
        <span className="font-bold text-blue-600">{matchText}</span> {/* Highlight styling */}
        {afterMatch}
      </div>
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Input {...props} type="text" ref={ref} readOnly value={value || inputValue} />
      </PopoverTrigger>
      <PopoverContent style={{ width: 'calc(var(--radix-popover-trigger-width)' }} sideOffset={16}>
        <Command>
          <CommandInput
            placeholder="Tìm kiếm địa chỉ (Nhập ít nhất 3 ký tự)"
            value={search}
            onValueChange={handleSearch}
          />
          <CommandList>
            <CommandEmpty>
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  Đang tải <LuLoader2 className="animate-spin" />
                </span>
              ) : (
                <NoData description="Không tìm thấy địa chỉ" />
              )}
            </CommandEmpty>
            <CommandGroup>
              {data?.map((location) => (
                <CommandItem key={location} value={location} onSelect={handleSelect}>
                  <CheckIcon className={cn('mr-2 h-4 w-4', inputValue === location ? 'opacity-100' : 'opacity-0')} />
                  {highlightMatch(location)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
});

AddressPicker.displayName = 'AddressPicker';

export default AddressPicker;
