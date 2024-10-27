import { Button } from '@/components/ui/button';
import ITag from '@/types/tag';
import { Checkbox } from '@radix-ui/react-checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { LuArrowUpDown } from 'react-icons/lu';

export const tagColumns: ColumnDef<ITag>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Tên Thẻ
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'isPremium',
    header: 'Thẻ Đặc Biệt',
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Ngày Tạo Thẻ
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'modifiedAt',
    header: 'Ngày Cập Nhật Thẻ',
  },
];
