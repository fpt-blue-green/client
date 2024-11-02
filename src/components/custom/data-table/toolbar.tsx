import { Input } from '@/components/ui/input';
import { Cross2Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { DataTableViewOptions } from './column-toggle';
import { DataTableFilterField } from './filter-type';
import { useMemo } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filters?: DataTableFilterField<TData>[];
  buttons?: ButtonProps[];
}

export function DataTableToolbar<TData>({ table, filters, buttons }: DataTableToolbarProps<TData>) {
  const { searchFields, optionFields } = useMemo(() => {
    return {
      searchFields: filters?.filter((field) => !field.options) || [],
      optionFields: filters?.filter((field) => field.options) || [],
    };
  }, [filters]);
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {searchFields.length > 0 &&
          searchFields.map(
            (field) =>
              table.getColumn(field.value ? String(field.value) : '') && (
                <Input
                  startAdornment={<MagnifyingGlassIcon className="size-5" />}
                  key={String(field.value)}
                  placeholder={field.placeholder}
                  value={(table.getColumn(String(field.value))?.getFilterValue() as string) ?? ''}
                  onChange={(event) => table.getColumn(String(field.value))?.setFilterValue(event.target.value)}
                  className="h-8 w-40 lg:w-64"
                />
              ),
          )}
        {/* {optionFields.length > 0 &&
          optionFields.map(
            (column) =>
              table.getColumn(column.value ? String(column.value) : "") && (
                <DataTableFacetedFilter
                  key={String(column.value)}
                  column={table.getColumn(
                    column.value ? String(column.value) : ""
                  )}
                  title={column.label}
                  options={column.options ?? []}
                />
              )
          )} */}
        {isFiltered && (
          <Button
            aria-label="Đặt lại"
            variant="ghost"
            size="small"
            onClick={() => table.resetColumnFilters()}
            endIcon={<Cross2Icon className="size-4" aria-hidden="true" />}
          >
            Đặt lại
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        {buttons?.map((props, index) => (
          <Button key={index} size="small" variant="gradient" {...props} />
        ))}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
