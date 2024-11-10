'use client';

import { DataTableFilterField } from '@/components/custom/data-table/filter-type';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { functions } from '@/lib/utils';
import IUserManagement from '@/types/user-management';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<IUserManagement, IUserManagement>[] = [
  {
    id: 'displayName',
    accessorKey: 'displayName',
    header: 'Tên',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={row.original.avatar} alt={`Ảnh đại diện của ${row.original.displayName}`} />
          <AvatarFallback>{row.original.displayName[0]}</AvatarFallback>
        </Avatar>
        <span>{row.original.displayName}</span>
      </div>
    ),
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: 'email',
    enableSorting: false,
  },
  {
    id: 'role',
    accessorKey: 'role',
    header: 'Vai trò',
    cell: ({ row }) => <div className="pl-4">{functions.convertRoleTypeToText(row.original.role)}</div>,
  },
];

export const filters: DataTableFilterField<IUserManagement>[] = [
  {
    key: 'Search',
    label: 'DisplayName',
    value: 'displayName',
    placeholder: 'Tìm kiếm theo tên',
  },
];
