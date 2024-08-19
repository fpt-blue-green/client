'use client';

import { useReducer } from 'react';
import InfluencerCard, { InfluencerCardSkeleton } from '@/components/influencer-card';
import { fetcher } from '@/lib/http';
import useSWRImmutable from 'swr/immutable';
import Filter from './filter';
import { PlatformEnum } from '@/types/enum';

export interface FilterState {
  searchTerm: string;
  platforms: PlatformEnum[];
  categories: string[];
  priceRange: [number, number];
  sortBy: string;
}

const initialState: FilterState = {
  searchTerm: '',
  platforms: [],
  categories: [],
  priceRange: [0, 10_000_000],
  sortBy: '1',
};

export type FilterAction =
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'TOGGLE_PLATFORM'; payload: PlatformEnum }
  | { type: 'TOGGLE_CATEGORY'; payload: string }
  | { type: 'SET_PRICE_RANGE'; payload: [number, number] }
  | { type: 'SET_SORT_BY'; payload: FilterState['sortBy'] }
  | { type: 'RESET_FILTER' };

const filterReducer = (state: FilterState, action: FilterAction) => {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'TOGGLE_PLATFORM':
      return {
        ...state,
        platforms: state.platforms.includes(action.payload)
          ? state.platforms.filter((p) => p !== action.payload)
          : [...state.platforms, action.payload],
      };
    case 'TOGGLE_CATEGORY':
      return {
        ...state,
        categories: state.categories.includes(action.payload)
          ? state.categories.filter((c) => c !== action.payload)
          : [...state.categories, action.payload],
      };
    case 'SET_PRICE_RANGE':
      return { ...state, priceRange: action.payload };
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };
    case 'RESET_FILTER':
      return {
        ...state,
        platforms: initialState.platforms,
        categories: initialState.categories,
        priceRange: initialState.priceRange,
      };
    default:
      return state;
  }
};

const List = () => {
  const [filter, dispatch] = useReducer(filterReducer, initialState);
  const { data, isLoading } = useSWRImmutable('https://dummyjson.com/users', fetcher);

  const isOptionsChange =
    filter.platforms.length !== initialState.platforms.length ||
    filter.categories.length !== initialState.categories.length ||
    filter.priceRange[0] !== initialState.priceRange[0] ||
    filter.priceRange[1] !== initialState.priceRange[1];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-7">Influencers</h1>
      <div className="mb-7">
        <Filter data={filter} dispatch={dispatch} isChanged={isOptionsChange} />
      </div>
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-8">
        {isLoading
          ? Array.from({ length: 30 }).map((_, index) => <InfluencerCardSkeleton key={index} />)
          : data.users?.map((_: any, index: number) => <InfluencerCard key={index} favorite={false} />)}
      </div>
    </div>
  );
};

export default List;
