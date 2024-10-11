'use client';

import { useLayoutEffect, useMemo, useReducer, useState } from 'react';
import InfluencerCard, { InfluencerCardSkeleton } from '@/components/influencer-card';
import { fetcher } from '@/lib/http';
import useSWRImmutable from 'swr/immutable';
import Filter from './filter';
import { EPlatform } from '@/types/enum';
import IInfluencer from '@/types/influencer';
import Pagination from '@/components/custom/pagination';
import NoData from '@/components/no-data';

export interface FilterState {
  page: number;
  pageSize: number;
  searchTerm: string;
  platforms: EPlatform[];
  tags: string[];
  priceRange: [number, number];
  rating: number;
  sortBy: string;
  isAscending: boolean;
}

const initialState: FilterState = {
  page: 1,
  pageSize: 24,
  searchTerm: '',
  platforms: [],
  tags: [],
  priceRange: [0, 10_000_000],
  rating: 0,
  sortBy: '',
  isAscending: true,
};

export type FilterAction =
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'TOGGLE_PLATFORM'; payload: EPlatform }
  | { type: 'TOGGLE_TAG'; payload: string }
  | { type: 'SET_PRICE_RANGE'; payload: [number, number] }
  | { type: 'SET_RATING'; payload: number }
  | { type: 'SET_SORT_BY'; payload: FilterState['sortBy'] }
  | { type: 'RESET_FILTER' };

const filterReducer = (state: FilterState, action: FilterAction) => {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_SEARCH_TERM':
      return { ...state, page: 1, searchTerm: action.payload };
    case 'TOGGLE_PLATFORM':
      return {
        ...state,
        page: 1,
        platforms: state.platforms.includes(action.payload)
          ? state.platforms.filter((p) => p !== action.payload)
          : [...state.platforms, action.payload],
      };
    case 'TOGGLE_TAG':
      return {
        ...state,
        page: 1,
        tags: state.tags.includes(action.payload)
          ? state.tags.filter((c) => c !== action.payload)
          : [...state.tags, action.payload],
      };
    case 'SET_PRICE_RANGE':
      return { ...state, page: 1, priceRange: action.payload };
    case 'SET_RATING':
      return { ...state, page: 1, rating: action.payload };
    case 'SET_SORT_BY':
      const isAscending = !action.payload.startsWith('-');
      return { ...state, sortBy: action.payload.substring(isAscending ? 0 : 1), isAscending };
    case 'RESET_FILTER':
      return initialState;
    default:
      return state;
  }
};

const List = () => {
  const [filter, dispatch] = useReducer(filterReducer, initialState);
  const url = useMemo(() => {
    const searchParams = new URLSearchParams();
    searchParams.append('PageIndex', filter.page.toString());
    searchParams.append('PageSize', filter.pageSize.toString());
    searchParams.append('PriceFrom', filter.priceRange[0].toString());
    searchParams.append('PriceTo', filter.priceRange[1].toString());
    if (filter.searchTerm) {
      searchParams.append('Search', filter.searchTerm);
    }
    filter.tags.forEach((tag) => searchParams.append('TagIds', tag));
    filter.platforms.forEach((p) => searchParams.append('Platforms', p.toString()));
    if (filter.rating) {
      searchParams.append('RateStart', filter.rating.toString());
    }
    if (filter.sortBy) {
      searchParams.append('SortBy', filter.sortBy);
      if (!filter.isAscending) {
        searchParams.append('IsAscending', filter.isAscending ? 'true' : 'false');
      }
    }
    return '/Influencers?' + searchParams.toString();
  }, [filter]);
  const { data, isLoading } = useSWRImmutable<{ totalCount: number; influencers: IInfluencer[] }>(url, fetcher);
  const [pageCount, setPageCount] = useState(0);

  useLayoutEffect(() => {
    if (!isLoading) {
      setPageCount(data ? Math.ceil(data.totalCount / filter.pageSize) : 0);
    }
  }, [data, isLoading, filter.pageSize]);

  const isOptionsChange =
    filter.platforms.length !== initialState.platforms.length ||
    filter.tags.length !== initialState.tags.length ||
    filter.priceRange[0] !== initialState.priceRange[0] ||
    filter.priceRange[1] !== initialState.priceRange[1] ||
    !!filter.rating;

  const handlePageChange = (value: number) => {
    dispatch({ type: 'SET_PAGE', payload: value });
  };

  return (
    <div className="space-y-7">
      <h1 className="text-2xl font-semibold">Influencers</h1>
      <div>
        <Filter data={filter} dispatch={dispatch} isChanged={isOptionsChange} />
      </div>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-8">
        {isLoading ? (
          Array.from({ length: filter.pageSize }).map((_, index) => <InfluencerCardSkeleton key={index} />)
        ) : data && data.influencers.length > 0 ? (
          data.influencers.map((i) => <InfluencerCard key={i.id} data={i} favorite={false} />)
        ) : (
          <NoData description="Không tìm thấy người sáng tạo" className="col-span-full" />
        )}
      </div>
      {pageCount > 1 && (
        <Pagination count={pageCount} page={filter.page} boundaryCount={2} onPageChange={handlePageChange} />
      )}
    </div>
  );
};

export default List;
