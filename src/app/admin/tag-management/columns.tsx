'use client';

import { DataTableFilterField } from '@/components/custom/data-table/filter-type';
import { formats } from '@/lib/utils';
import ITag from '@/types/tag';
import { CheckIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import { FaTag } from 'react-icons/fa';

export const columns: ColumnDef<ITag, ITag>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Tên thẻ',
    cell: ({ row }) => (
      <div className="flex items-center gap-2 ">
        <FaTag size={10} className="text-muted-foreground" />
        {row.original.name}
      </div>
    ),
  },
  {
    id: 'isPremium',
    accessorKey: 'isPremium',
    header: 'Premium',
    enableSorting: false,
    cell: ({ row }) => <div>{row.original.isPremium ? <CheckIcon /> : <></>}</div>,
  },
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: 'Ngày tạo thẻ',
    enableSorting: true,
    cell: ({ row }) => formats.date(row.original.createdAt || '', true),
  },
  {
    id: 'modifiedAt',
    accessorKey: 'modifiedAt',
    header: 'Lần cập nhật gần nhất',
    enableSorting: false,
    cell: ({ row }) => formats.date(row.original.modifiedAt || '', true),
  },
];

export const filters: DataTableFilterField<ITag>[] = [
  {
    key: 'IsPremium',
    label: 'Loại',
    value: 'isPremium',
    multiple: false,
    options: [
      {
        key: 'false',
        label: 'Thường',
      },
      {
        key: 'true',
        label: 'Premium',
      },
    ],
  },
];
