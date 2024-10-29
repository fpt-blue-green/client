import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon } from '@radix-ui/react-icons';
import { Column } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const handleClick = () => {
    switch (column.getIsSorted()) {
      case 'asc':
        column.toggleSorting(true);
        break;
      case 'desc':
        column.toggleSorting();
        break;
      default:
        column.toggleSorting(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="small"
      onClick={handleClick}
      endIcon={
        column.getIsSorted() === 'desc' ? (
          <ArrowDownIcon className="h-4 w-4" />
        ) : column.getIsSorted() === 'asc' ? (
          <ArrowUpIcon className="h-4 w-4" />
        ) : (
          <CaretSortIcon className="h-4 w-4" />
        )
      }
    >
      <span className="text-sm">{title}</span>
    </Button>
  );
}
