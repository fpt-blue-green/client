'use client';

import { forwardRef, Ref, useImperativeHandle, useMemo, useState } from 'react';
import { DataTable } from './table';
import { ColumnDef } from '@tanstack/react-table';
import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/lib/http';
import { DataTableColumnHeader } from './column-header';
import { DataTablePagination } from './pagination';
import { DataTableToolbar } from './toolbar';
import { mutate } from 'swr';
import { useDataTable, useUpdateEffect } from '@/hooks';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableFilterField } from './filter-type';

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  url: string;
  filters?: DataTableFilterField<TData>[];
  onCheck?: (items: TData[]) => void;
}

interface TableRef {
  reload: () => Promise<void>;
}

// Sử dụng một hàm wrapper để khai báo generic và truyền vào `forwardRef`.
function TableComponent<TData, TValue>(
  { columns, url, filters, onCheck }: TableProps<TData, TValue>,
  ref: Ref<TableRef>,
) {
  const [urlQuery, setUrlQuery] = useState<string>();
  const { data } = useSWRImmutable<{ totalCount: number; influencers: TData[] }>(urlQuery, fetcher);

  const mColumns = useMemo(() => {
    const results = columns.map((column) => {
      if (typeof column.header === 'string') {
        const title = column.header;
        return {
          ...column,
          header: ({ column }) => <DataTableColumnHeader column={column} title={title} />,
        } as ColumnDef<TData, TValue>;
      }
      return column;
    });

    if (onCheck) {
      results.unshift({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      });
    }

    return results;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns]);

  const { table, queryString } = useDataTable({
    data: data?.influencers || [],
    columns: mColumns,
    totalCount: data?.totalCount,
    filters,
    onRowChecked: onCheck,
  });

  useUpdateEffect(() => {
    setUrlQuery(url + '?' + queryString);
  }, [url, queryString]);

  useImperativeHandle(ref, () => ({
    reload: async () => await mutate((key: string) => key.startsWith(url)),
  }));

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} filters={filters} />
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
