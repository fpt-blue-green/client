'use client';

import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { DataTable } from './table';
import { ColumnDef } from '@tanstack/react-table';
import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/lib/http';
import { DataTableColumnHeader } from './column-header';
import { DataTablePagination } from './pagination';
import { mutate } from 'swr';
import { useDataTable, useUpdateEffect } from '@/hooks';

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  url: string;
}

interface TableRef {
  reload: () => Promise<void>;
}

// Sử dụng một hàm wrapper để khai báo generic và truyền vào `forwardRef`.
function TableComponent<TData, TValue>({ columns, url }: TableProps<TData, TValue>, ref: React.Ref<TableRef>) {
  const [urlQuery, setUrlQuery] = useState<string>();
  const { data } = useSWRImmutable<{ totalCount: number; influencers: TData[] }>(urlQuery, fetcher);

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

  const { table, queryString } = useDataTable({
    data: data?.influencers || [],
    columns: mColumns,
    totalCount: data?.totalCount,
  });

  useUpdateEffect(() => {
    setUrlQuery(url + '?' + queryString);
  }, [url, queryString]);

  useImperativeHandle(ref, () => ({
    reload: async () => await mutate((key: string) => key.startsWith(url)),
  }));

  return (
    <div className="space-y-4">
      <DataTable table={table} />
      <DataTablePagination table={table} />
    </div>
  );
}

// Sử dụng `forwardRef` với hàm `TableComponent`
const Table = forwardRef(TableComponent) as <TData, TValue>(
  props: TableProps<TData, TValue> & { ref?: React.Ref<TableRef> },
) => JSX.Element;

export default Table;
