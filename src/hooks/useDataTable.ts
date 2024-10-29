'use client';

import {
  ColumnDef,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  TableState,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';

interface UseDataTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  totalCount?: number;
  state?: Omit<Partial<TableState>, 'sorting'> & {
    sorting?: {
      id: Extract<keyof TData, string>;
      desc: boolean;
    }[];
  };
}

const searchParams = new URLSearchParams();

const useDataTable = <TData, TValue>({ columns, data, totalCount, state }: UseDataTableProps<TData, TValue>) => {
  const [queryString, setQueryString] = useState('');
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 2 });
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    searchParams.set('PageIndex', (pageIndex + 1).toString());
    setQueryString(searchParams.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex]);

  useEffect(() => {
    searchParams.set('PageSize', pageSize.toString());
    setPagination({ pageSize, pageIndex: 0 });
    setQueryString(searchParams.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize]);

  useEffect(() => {
    if (totalCount !== undefined) {
      setPageCount(Math.ceil(totalCount / pageSize));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCount, pageSize]);

  const table = useReactTable({
    columns,
    data,
    pageCount,
    enableRowSelection: true,
    state: {
      ...state,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  });

  return { table, queryString };
};

export default useDataTable;
