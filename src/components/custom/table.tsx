'use client';
import { ReactNode, useState } from 'react';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Table as LibraryTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FaPlus, FaTrash } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';
import useSWR from 'swr';
import { fetcher } from '@/lib/http';
import { Skeleton } from '../ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LuMoreHorizontal } from 'react-icons/lu';

interface IButton {
  text: string;
  onClick: () => void;
}
interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  searchable?: boolean;
  buttons?: IButton[];
  url: string;
}

const Table = <TData, TValue>({
  columns: paramsColumns,
  url,
  buttons,
  searchable = false,
}: TableProps<TData, TValue>) => {
  const { data = [], mutate, isValidating } = useSWR(url, fetcher);

  const combinedColumns = [
    ...paramsColumns,
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <LuMoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Thực hiện</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.original.id)}>
                Sao chép ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
              <DropdownMenuItem>Xoá</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const [columns] = useState(combinedColumns);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const renderActionIcon = (value: string): ReactNode => {
    switch (value) {
      case 'Thêm':
        return <FaPlus />;
      default:
        return '';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center">
          {buttons &&
            buttons.length > 0 &&
            buttons.map((item) => (
              <Button key={item.text} variant="ghost">
                {renderActionIcon(item.text)} {item.text}
              </Button>
            ))}
        </div>
        {searchable && (
          <Input
            placeholder="Tìm kiếm..."
            value={(table.getColumn('id')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('id')?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
        )}
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
