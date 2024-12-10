'use client';

import CampaignCard from '@/components/campaign-card';
import Pagination from '@/components/custom/pagination';
import NoData from '@/components/no-data';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchRequest } from '@/request';
import { useLayoutEffect, useMemo, useReducer, useState } from 'react';
import Filter from './filter';

const PAGE_SIZE = 12;

export interface FilterState {
  page: number;
  pageSize: number;
  searchTerm: string;
  tags: string[];
  priceRange: [number, number];
  sortBy: string;
  isAscending: boolean;
}

const initialState: FilterState = {
  page: 1,
  pageSize: 24,
  searchTerm: '',
  tags: [],
  priceRange: [0, 10_000_000_000],
  sortBy: '',
  isAscending: true,
};

export type FilterAction =
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'TOGGLE_TAG'; payload: string }
  | { type: 'SET_PRICE_RANGE'; payload: [number, number] }
  | { type: 'SET_RATING'; payload: number }
  | { type: 'SET_SORT_BY'; payload: FilterState['sortBy'] }
  | { type: 'SET_TYPE' }
  | { type: 'RESET_FILTER' };

const filterReducer = (state: FilterState, action: FilterAction) => {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_SEARCH_TERM':
      return { ...state, page: 1, searchTerm: action.payload };
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
  const [pageCount, setPageCount] = useState(0);

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
    if (filter.sortBy) {
      searchParams.append('SortBy', filter.sortBy);
      if (!filter.isAscending) {
        searchParams.append('IsAscending', filter.isAscending ? 'true' : 'false');
      }
    }
    return searchParams;
  }, [filter]);

  const { data, isLoading } = fetchRequest.campaign.available(url);

  const isOptionsChange =
    filter.tags.length !== initialState.tags.length ||
    filter.priceRange[0] !== initialState.priceRange[0] ||
    filter.priceRange[1] !== initialState.priceRange[1] ;

  useLayoutEffect(() => {
    if (!isLoading) {
      setPageCount(data ? Math.ceil(data.totalCount / PAGE_SIZE) : 0);
    }
  }, [data, isLoading]);

  const handlePageChange = (value: number) => {
    dispatch({ type: 'SET_PAGE', payload: value });
  };

  return (
    <div className="space-y-7">
      <Filter data={filter} dispatch={dispatch} isChanged={isOptionsChange} />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-8">
        {isLoading ? (
          Array.from({ length: PAGE_SIZE }).map((_, index) => <Skeleton key={index} className="h-40" />)
        ) : data && data.items.length > 0 ? (
          data.items.map((campaign) => <CampaignCard key={campaign.id} data={campaign} />)
        ) : (
          <NoData description="Không có chiến dịch" className="col-span-full" />
        )}
      </div>
      {pageCount > 1 && (
        <Pagination count={pageCount} page={filter.page} boundaryCount={2} onPageChange={handlePageChange} />
      )}
    </div>
  );
};

export default List;
