'use client';

import Badge from '@/components/custom/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Toggle } from '@/components/ui/toggle';
import { fetcher } from '@/lib/http';
import ITag from '@/types/tag';
import { ChevronDownIcon, ChevronUpIcon, Cross2Icon, MagnifyingGlassIcon, ReloadIcon } from '@radix-ui/react-icons';
import { LuFilter } from 'react-icons/lu';
import useSWRImmutable from 'swr/immutable';
import { FilterAction, FilterState } from './list';
import { Dispatch, FC, useState } from 'react';
import { useDebounce, useUpdateEffect } from '@/hooks';
import { Slider } from '@/components/ui/slider';
import PriceInput from '@/components/custom/price-input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface FilterProps {
  isChanged: boolean;
  data: FilterState;
  dispatch: Dispatch<FilterAction>;
}

const Filter: FC<FilterProps> = ({ data, isChanged, dispatch }) => {
  const { data: tags } = useSWRImmutable<ITag[]>('/Tags', fetcher);
  const { searchTerm, tags: categories, priceRange, sortBy, isAscending } = data;

  const [search, setSearch] = useState(searchTerm);
  const debouncedSearch = useDebounce(search, 500);

  const [price, setPrice] = useState(priceRange);
  const debouncedPrice = useDebounce(price, 500);
  const [sortOpen, setSortOpen] = useState(false);

  useUpdateEffect(() => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: debouncedSearch });
  }, [debouncedSearch]);

  useUpdateEffect(() => {
    dispatch({ type: 'SET_PRICE_RANGE', payload: debouncedPrice });
  }, [debouncedPrice]);

  const handleToggleCategory = (value: string) => () => {
    dispatch({ type: 'TOGGLE_TAG', payload: value });
  };

  const handleRangeChange = (value: [number, number]) => {
    setPrice(value);
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_FILTER' });
    setPrice([0, 10_000_000_000]);
  };

  const handleSortChange = (value: string) => {
    dispatch({ type: 'SET_SORT_BY', payload: value });
  };

  return (
    <div className="flex-1 flex items-center justify-between gap-6 max-md:flex-col">
      <Input
        startAdornment={<MagnifyingGlassIcon className="size-7 text-muted-foreground" />}
        placeholder="Tìm kiếm..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              endIcon={
                <Badge dot invisible={!isChanged}>
                  <LuFilter />
                </Badge>
              }
              variant="ghost"
              className="px-3"
            >
              Bộ lọc
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto" hideCloseBtn>
            <SheetHeader className="border-b">
              <SheetTitle className="flex items-center justify-between">
                Bộ lọc
                <div className="space-x-2">
                  <Button size="icon" variant="ghost" onClick={handleReset}>
                    <Badge dot invisible={!isChanged}>
                      <ReloadIcon />
                    </Badge>
                  </Button>
                  <SheetClose asChild>
                    <Button size="icon" variant="ghost">
                      <Cross2Icon />
                    </Button>
                  </SheetClose>
                </div>
              </SheetTitle>
              <SheetDescription />
            </SheetHeader>
            <div className="mt-4 space-y-8">
              <div className="space-y-3">
                <h5 className="font-medium mb-2">Danh mục</h5>
                <div className="flex flex-wrap gap-4 items-center">
                  {tags
                    ?.sort((a, b) => Number(a.isPremium) - Number(b.isPremium))
                    .map((t) => (
                      <Toggle
                        key={t.id}
                        size="small"
                        variant="primary"
                        pressed={categories.includes(t.id)}
                        onPressedChange={handleToggleCategory(t.id)}
                      >
                        {t.name}
                      </Toggle>
                    ))}
                </div>
              </div>
              <div>
                <h5 className="font-medium mb-2">Giá</h5>
                <Slider
                  className="mt-6"
                  value={price}
                  onValueChange={handleRangeChange}
                  max={10_000_000_000}
                  step={1_000_000}
                />
                <div className="flex items-center gap-4 mt-6">
                  <PriceInput value={price[0]} onChange={(v) => handleRangeChange([v, price[1]])} />
                  -
                  <PriceInput value={price[1]} onChange={(v) => handleRangeChange([price[0], v])} />
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <DropdownMenu open={sortOpen} onOpenChange={setSortOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="px-3" endIcon={sortOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}>
              {sortItems.find((i) => i.value === (isAscending ? sortBy : `-${sortBy}`))?.text}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value={isAscending ? sortBy : `-${sortBy}`} onValueChange={handleSortChange}>
              {sortItems.map((item) => (
                <DropdownMenuRadioItem key={item.value} value={item.value}>
                  {item.text}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

const sortItems = [
  {
    value: '',
    text: 'Mặc định',
  },
  {
    value: 'CreatedAt',
    text: 'Mới nhất',
  },
];

export default Filter;
