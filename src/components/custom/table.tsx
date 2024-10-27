'use client';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Table as LibraryTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FaPlus, FaTrash } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';
import useSWR from 'swr';
import { fetcher } from '@/lib/http';
import { Skeleton } from '../ui/skeleton';

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  isHideButtons?: boolean;
  url: string;
}

const Table = <TData, TValue>({ columns, url, isHideButtons = false }: TableProps<TData, TValue>) => {
  const { data = [], mutate, isValidating } = useSWR(url, fetcher);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        {!isHideButtons && (
          <div className="flex items-center">
            <Button variant="ghost">
              <FaPlus /> Thêm
            </Button>
            <Button variant="ghost">
              <FaEdit /> Chỉnh sửa
            </Button>
            <Button variant="ghost">
              <FaTrash /> Xoá
            </Button>
          </div>
        )}
        <Input
          placeholder="Tìm kiếm mã gói..."
          value={(table.getColumn('id')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('id')?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <LibraryTable>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) =>
                    isValidating ? (
                      <TableCell className="max-w-24 truncate" key={cell.id}>
                        <Skeleton className="w-full h-4 flex" />
                      </TableCell>
                    ) : (
                      <TableCell className="max-w-24 truncate" key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ),
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Không có gói nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </LibraryTable>
      </div>
    </div>
  );
};

export default Table;
