'use client';

import { Dispatch, FC, useState } from 'react';
import Badge from '@/components/custom/badge';
import Checkbox from '@/components/custom/checkbox';
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
import {
  ChevronDownIcon,
  ChevronUpIcon,
  Cross2Icon,
  MagnifyingGlassIcon,
  ReloadIcon,
  StarFilledIcon,
} from '@radix-ui/react-icons';
import { LuFilter } from 'react-icons/lu';
import { Slider } from '@/components/ui/slider';
import { formats } from '@/lib/utils';
import { Toggle } from '@/components/ui/toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FilterAction, FilterState } from './list';
import { useDebounce, useUpdateEffect } from '@/hooks';
import { EPlatform } from '@/types/enum';
import useSWR from 'swr';
import { fetcher } from '@/lib/http';
import ITag from '@/types/tag';

interface FilterProps {
  isChanged: boolean;
  data: FilterState;
  dispatch: Dispatch<FilterAction>;
}

const Filter: FC<FilterProps> = ({ isChanged, data, dispatch }) => {
  const { searchTerm, platforms, tags: categories, priceRange, rating, sortBy, isAscending } = data;
  const [sortOpen, setSortOpen] = useState(false);
  const [search, setSearch] = useState(searchTerm);
  const debouncedSearch = useDebounce(search, 500);

  const { data: tags } = useSWR<ITag[]>('/Tags', fetcher);

  const [price, setPrice] = useState(priceRange);
  const debouncedPrice = useDebounce(price, 500);

  useUpdateEffect(() => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: debouncedSearch });
  }, [debouncedSearch]);

  useUpdateEffect(() => {
    dispatch({ type: 'SET_PRICE_RANGE', payload: debouncedPrice });
  }, [debouncedPrice]);

  const handleReset = () => {
    dispatch({ type: 'RESET_FILTER' });
    setPrice([0, 10_000_000]);
  };

  const handleTogglePlatform = (value: EPlatform) => () => {
    dispatch({ type: 'TOGGLE_PLATFORM', payload: value });
  };

  const handleToggleCategory = (value: string) => () => {
    dispatch({ type: 'TOGGLE_TAG', payload: value });
  };

  const handleRangeChange = (value: [number, number]) => {
    setPrice(value);
  };

  const handleRatingChange = (value: string) => {
    dispatch({ type: 'SET_RATING', payload: +value });
  };

  const handleSortChange = (value: string) => {
    dispatch({ type: 'SET_SORT_BY', payload: value });
  };

  return (
    <div className="flex items-center justify-between gap-6 max-md:flex-col">
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
          <SheetContent hideCloseBtn>
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
                <h5 className="font-medium mb-2">Nền tảng</h5>
                <Checkbox
                  label="Instagram"
                  value={EPlatform.Instagram}
                  checked={platforms.includes(EPlatform.Instagram)}
                  onCheckedChange={handleTogglePlatform(EPlatform.Instagram)}
                />
                <Checkbox
                  label="TikTok"
                  value={EPlatform.TitTok}
                  checked={platforms.includes(EPlatform.TitTok)}
                  onCheckedChange={handleTogglePlatform(EPlatform.TitTok)}
                />
                <Checkbox
                  label="YouTube"
                  value={EPlatform.YouTube}
                  checked={platforms.includes(EPlatform.YouTube)}
                  onCheckedChange={handleTogglePlatform(EPlatform.YouTube)}
                />
              </div>
              <div className="space-y-3">
                <h5 className="font-medium mb-2">Danh mục</h5>
                <div className="flex flex-wrap gap-4 items-center">
                  {tags?.map((t) => (
                    <Toggle
                      key={t.id}
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
                  max={10_000_000}
                  step={250_000}
                />
                <div className="flex items-center gap-4 mt-6">
                  <Input className="h-10" inputClassName="text-right" value={formats.price(price[0])} readOnly />
                  -
                  <Input className="h-10" inputClassName="text-right" value={formats.price(price[1])} readOnly />
                </div>
              </div>
              <div>
                <h5 className="font-medium mb-2">Đánh giá</h5>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="large" variant="ghost" className="px-3" fullWidth>
                      {rating ? (
                        <span className="flex items-center gap-1">
                          {rating} <StarFilledIcon className="text-yellow-400" /> trở lên
                        </span>
                      ) : (
                        'Mặc định'
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-52">
                    <DropdownMenuRadioGroup value={rating.toString()} onValueChange={handleRatingChange}>
                      <DropdownMenuRadioItem value="0">Mặc định</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="5">
                        <span className="flex items-center gap-1">
                          5 <StarFilledIcon className="text-yellow-400" /> trở lên
                        </span>
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="4">
                        <span className="flex items-center gap-1">
                          4 <StarFilledIcon className="text-yellow-400" /> trở lên
                        </span>
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="3">
                        <span className="flex items-center gap-1">
                          3 <StarFilledIcon className="text-yellow-400" /> trở lên
                        </span>
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="2">
                        <span className="flex items-center gap-1">
                          2 <StarFilledIcon className="text-yellow-400" /> trở lên
                        </span>
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="1">
                        <span className="flex items-center gap-1">
                          1 <StarFilledIcon className="text-yellow-400" /> trở lên
                        </span>
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <DropdownMenu open={sortOpen} onOpenChange={setSortOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="px-3" endIcon={sortOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}>
              Sắp xếp theo: {sortItems.find((i) => i.value === (isAscending ? sortBy : `-${sortBy}`))?.text}
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
    text: 'Nổi bật',
  },
  {
    value: 'AveragePrice',
    text: 'Giá từ thấp đến cao',
  },
  {
    value: '-AveragePrice',
    text: 'Giá từ cao đến thấp',
  },
  {
    value: '-RateAverage',
    text: 'Đánh giá tốt nhất',
  },
];

export default Filter;
