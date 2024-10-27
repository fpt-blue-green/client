'use client';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table as LibraryTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { fetcher } from '@/lib/http';
import useSWR from 'swr';
import { LuMoreHorizontal } from 'react-icons/lu';
import React, { forwardRef, ReactNode, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { Skeleton } from '../ui/skeleton';
import Pagination from './pagination';

interface IButton {
  text: string;
  onClick: () => void;
}

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  searchable?: boolean;
  buttons?: IButton[];
  url: string;
  isCheckBoxVisibility?: boolean;
  pagination?: boolean;
}

export const Table = forwardRef<HTMLDivElement, TableProps<any, any>>(function Table(
  { columns: paramsColumns, url, buttons, searchable, isCheckBoxVisibility, pagination },
  ref,
) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [pageCount, setPageCount] = useState<number>(10);

  const { data = [], mutate, isValidating } = useSWR(`${url}?page=${currentPage}`, fetcher);

  useEffect(() => {
    setPageCount(Math.ceil(data.length / pageSize));
  }, [data, pageSize]);

  const combinedColumns = [
    ...paramsColumns,
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Các hành động</span>
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

  if (isCheckBoxVisibility) {
    combinedColumns.unshift({
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

  const [columns] = useState(combinedColumns);

  const renderActionIcon = (value: string): ReactNode => {
    switch (value) {
      case 'Thêm':
        return <FaPlus />;
      default:
        return '';
    }
  };

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handlePagination = (value: number) => {
    setCurrentPage(value);
  };

  return (
    <div ref={ref} className="w-full">
      <div className="flex items-center justify-between py-4">
        {searchable && (
          <Input
            placeholder="Tìm kiếm..."
            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
        )}
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Hiển thị <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          {buttons &&
            buttons.length > 0 &&
            buttons.map((item) => (
              <Button key={item.text} variant="ghost" className="ml-2">
                {renderActionIcon(item.text)} {item.text}
              </Button>
            ))}
        </>
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
                  Không có dữ liệu.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </LibraryTable>
      </div>
      {pagination && (
        <Pagination className="mt-8" page={currentPage} count={pageCount} onPageChange={handlePagination} />
      )}
    </div>
  );
});
