'use client';

import { DataTableFilterField } from '@/components/custom/data-table/filter-type';
import Tooltip from '@/components/custom/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formats, functions } from '@/lib/utils';
import IUserManagement, { IBanUserManagement } from '@/types/user-management';
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
    header: 'Email',
    enableSorting: false,
  },
  {
    id: 'wallet',
    accessorKey: 'wallet',
    header: 'Ví',
    enableSorting: true,
    cell: ({ row }) => <div className="pl-4">{formats.price(row.original.wallet)}</div>,
  },
  {
    id: 'role',
    accessorKey: 'role',
    header: 'Vai trò',
    cell: ({ row }) => <div className="pl-4">{functions.convertRoleTypeToText(row.original.role)}</div>,
  },
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: 'Ngày đăng kí',
    enableSorting: true,
    cell: ({ row }) => <div className="pl-4">{formats.date(row.original.createdAt)}</div>,
  },
  {
    id: 'modifiedAt',
    accessorKey: 'modifiedAt',
    header: 'Cập nhật gần đây',
    enableSorting: true,
    cell: ({ row }) => <div className="pl-4">{formats.date(row.original.modifiedAt)}</div>,
  },
];

export const banUserColumns: ColumnDef<IBanUserManagement, IBanUserManagement>[] = [
  {
    id: 'name',
    accessorKey: 'displayName',
    header: 'Tên',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={row.original.user.image} alt={`Ảnh đại diện của ${row.original.user.name}`} />
          <AvatarFallback>{row.original.user.name[0]}</AvatarFallback>
        </Avatar>
        <span>{row.original.user.name}</span>
      </div>
    ),
  },
  {
    id: 'role',
    accessorKey: 'role',
    header: 'Vai trò',
    cell: ({ row }) => <div className="pl-4">{functions.convertRoleTypeToText(row.original.user.role)}</div>,
  },
  {
    id: 'reason',
    accessorKey: 'reason',
    header: 'Lí do',
    cell: ({ row }) => (
      <Tooltip className="max-w-96" label={row.original.reason || ''}>
        <div className="pl-4 max-w-40 truncate">{row.original.reason}</div>
      </Tooltip>
    ),
  },
  {
    id: 'banDate',
    accessorKey: 'banDate',
    header: 'Ngày bị cấm',
    enableSorting: true,
    cell: ({ row }) => <div className="pl-4">{formats.date(row.original.banDate)}</div>,
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Người cấm',
    enableSorting: true,
    cell: ({ row }) => <div className="pl-4">{formats.date(row.original.bannedBy.name)}</div>,
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
