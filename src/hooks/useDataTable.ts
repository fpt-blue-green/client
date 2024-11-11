'use client';

import { DataTableFilterField } from '@/components/custom/data-table/filter-type';
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  RowSelectionState,
  SortingState,
  TableState,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import useDebounce from './useDebounce';

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
  filters?: DataTableFilterField<TData>[];
  onRowChecked?: (items: TData[]) => void;
}

const searchParams = new URLSearchParams();

const useDataTable = <TData, TValue>({
  columns,
  data,
  totalCount,
  state,
  filters,
  onRowChecked,
}: UseDataTableProps<TData, TValue>) => {
  const [queryString, setQueryString] = useState('');
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [pageCount, setPageCount] = useState(0);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { searchFields, optionFields } = useMemo(() => {
    return {
      searchFields: filters?.filter((field) => !field.options) || [],
      optionFields: filters?.filter((field) => field.options) || [],
    };
  }, [filters]);

  const debouncedSearchColumns = JSON.parse(
    useDebounce(
      JSON.stringify(
        columnFilters.filter((filter) => {
          return searchFields.some((column) => column.value === filter.id);
        }),
      ),
      500,
    ),
  ) as ColumnFiltersState;

  useEffect(() => {
    searchFields.forEach((field) => {
      const column = debouncedSearchColumns.find((col) => col.id === field.value);
      if (column) {
        searchParams.set(field.key, column.value as string);
      } else {
        searchParams.delete(field.key);
      }
    });
    setQueryString(searchParams.toString());
  }, [debouncedSearchColumns, searchFields]);

  useEffect(() => {
    searchParams.set('PageIndex', (pageIndex + 1).toString());
    searchParams.set('PageSize', pageSize.toString());
    setQueryString(searchParams.toString());
  }, [pageIndex, pageSize]);

  useEffect(() => {
    if (totalCount !== undefined) {
      setPageCount(Math.ceil(totalCount / pageSize));
    }
  }, [totalCount, pageSize]);

  useEffect(() => {
    handleRowSelection({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

  const handlePaginationChange: OnChangeFn<PaginationState> = (updater) => {
    setPagination((prevPagination) => {
      const newPagination = typeof updater === 'function' ? updater(prevPagination) : updater;

      if (newPagination.pageSize !== prevPagination.pageSize) {
        newPagination.pageIndex = 0;
      }
      searchParams.set('PageIndex', (newPagination.pageIndex + 1).toString());
      searchParams.set('PageSize', pageSize.toString());
      setQueryString(searchParams.toString());

      return newPagination;
    });
  };

  const handleSortingChange: OnChangeFn<SortingState> = (updater) => {
    setSorting((prevSorting) => {
      const newSorting = typeof updater === 'function' ? updater(prevSorting) : updater;
      const firstSorting = newSorting[0];
      if (firstSorting) {
        searchParams.set('SortBy', firstSorting.id);
        searchParams.set('IsAscending', String(!firstSorting.desc));
      } else {
        searchParams.delete('SortBy');
        searchParams.delete('IsAscending');
      }
      setQueryString(searchParams.toString());
      return newSorting;
    });
  };

  const handleRowSelection: OnChangeFn<RowSelectionState> = (updater) => {
    setRowSelection((prevRowSelection) => {
      const newRowSelection = typeof updater === 'function' ? updater(prevRowSelection) : updater;
      if (onRowChecked) {
        const items = Object.keys(newRowSelection).map((key) => data[+key]);
        onRowChecked(items);
      }
      return newRowSelection;
    });
  };

  const handleColumnFilters: OnChangeFn<ColumnFiltersState> = (updater) => {
    setColumnFilters((prevColumnFilter) => {
      const newColumnFilter = typeof updater === 'function' ? updater(prevColumnFilter) : updater;

      const optionColumnFields = newColumnFilter.filter((filter) => {
        return optionFields.some((column) => column.value === filter.id);
      });

      optionFields.forEach((field) => {
        const column = optionColumnFields.find((col) => col.id === field.value);
        searchParams.delete(field.key);

        if (column) {
          (column.value as string[]).forEach((value) => searchParams.append(field.key, value));
        } else {
          searchParams.delete(field.key);
        }
      });

      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
      setQueryString(searchParams.toString());
      return newColumnFilter;
    });
  };

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
      sorting,
      rowSelection,
      columnFilters,
    },
    onPaginationChange: handlePaginationChange,
    onRowSelectionChange: handleRowSelection,
    onColumnFiltersChange: handleColumnFilters,
    onSortingChange: handleSortingChange,
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
