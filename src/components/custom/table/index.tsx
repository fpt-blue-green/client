'use client';

import React, { forwardRef } from 'react';
import { DataTable } from './table';
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/lib/http';
import { DataTableColumnHeader } from './column-header';
import { DataTablePagination } from './pagination';

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  url: string;
}

// Sử dụng một hàm wrapper để khai báo generic và truyền vào `forwardRef`.
function TableComponent<TData, TValue>({ columns, url }: TableProps<TData, TValue>, ref: React.Ref<HTMLDivElement>) {
  const { data = [] } = useSWRImmutable<TData[]>(url, fetcher);

  const mColumns = columns.map((column) => {
    if (typeof column.header === 'string') {
      const title = column.header;
      return {
        ...column,
        header: ({ column }) => <DataTableColumnHeader column={column} title={title} />,
      } as ColumnDef<TData, TValue>;
    }
    return column;
  });

  const table = useReactTable({
    data,
    columns: mColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div ref={ref} className="space-y-4">
      <DataTable table={table} />
      <DataTablePagination table={table} />
    </div>
  );
}

// Sử dụng `forwardRef` với hàm `TableComponent`
const Table = forwardRef(TableComponent) as <TData, TValue>(
  props: TableProps<TData, TValue> & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;

export default Table;
