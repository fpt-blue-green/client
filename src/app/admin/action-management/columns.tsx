'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formats } from '@/lib/utils';
import IAdminAction from '@/types/action';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<IAdminAction, IAdminAction>[] = [
  {
    id: 'actionType',
    accessorKey: 'actionType',
    header: 'Hoạt động',
    cell: ({ row }) => <div className="flex items-center gap-2 ">{row.original.actionType}</div>,
  },
  {
    id: 'actionDetails',
    accessorKey: 'actionDetails',
    header: 'Chi tiết hoạt động',
    enableSorting: false,
    cell: ({ row }) => <div>{row.original.actionDetails}</div>,
  },
  {
    id: 'actionDate',
    accessorKey: 'actionDate',
    header: 'Ngày thực hiện',
    enableSorting: true,
    cell: ({ row }) => formats.date(row.original.actionDate),
  },
  {
    id: 'user',
    accessorKey: 'user',
    header: 'Người thực hiện',
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={row.original.user.image} alt={`Ảnh đại diện của ${row.original.user.name}`} />
          <AvatarFallback>{row.original.user.name}</AvatarFallback>
        </Avatar>
        <span>{row.original.user.name}</span>
      </div>
    ),
  },
];
