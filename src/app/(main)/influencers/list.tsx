'use client';

import { useMemo, useReducer } from 'react';
import InfluencerCard, { InfluencerCardSkeleton } from '@/components/influencer-card';
import { fetcher } from '@/lib/http';
import useSWRImmutable from 'swr/immutable';
import Filter from './filter';
import { EPlatform } from '@/types/enum';
import IInfluencer from '@/types/influencer';
import Pagination from '@/components/custom/pagination';

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
  pageSize: 4,
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
      return { ...state, searchTerm: action.payload };
    case 'TOGGLE_PLATFORM':
      return {
        ...state,
        platforms: state.platforms.includes(action.payload)
          ? state.platforms.filter((p) => p !== action.payload)
          : [...state.platforms, action.payload],
      };
    case 'TOGGLE_TAG':
      return {
        ...state,
        tags: state.tags.includes(action.payload)
          ? state.tags.filter((c) => c !== action.payload)
          : [...state.tags, action.payload],
      };
    case 'SET_PRICE_RANGE':
      return { ...state, priceRange: action.payload };
    case 'SET_RATING':
      return { ...state, rating: action.payload };
    case 'SET_SORT_BY':
      const isAscending = !action.payload.startsWith('-');
      return { ...state, sortBy: action.payload.substring(isAscending ? 0 : 1), isAscending };
    case 'RESET_FILTER':
      return {
        ...state,
        platforms: initialState.platforms,
        tags: initialState.tags,
        priceRange: initialState.priceRange,
      };
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
    <div>
      <h1 className="text-2xl font-semibold mb-7">Influencers</h1>
      <div className="mb-7">
        <Filter data={filter} dispatch={dispatch} isChanged={isOptionsChange} />
      </div>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-8">
        {isLoading
          ? Array.from({ length: 30 }).map((_, index) => <InfluencerCardSkeleton key={index} />)
          : data?.influencers.map((i) => <InfluencerCard key={i.id} data={i} favorite={false} />)}
      </div>
      <Pagination
        className="mt-8"
        count={Math.ceil((data?.totalCount || 0) / filter.pageSize)}
        page={filter.page}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default List;
