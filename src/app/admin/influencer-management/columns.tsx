'use client';

import { DataTableFilterField } from '@/components/custom/data-table/filter-type';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formats } from '@/lib/utils';
import { PlatformData } from '@/types/enum';
import IInfluencer from '@/types/influencer';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<IInfluencer, IInfluencer>[] = [
  {
    id: 'fullName',
    accessorKey: 'fullName',
    header: 'Tên',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={row.original.avatar} alt={`Ảnh đại diện của ${row.original.fullName}`} />
          <AvatarFallback>{row.original.fullName}</AvatarFallback>
        </Avatar>
        <span>{row.original.fullName}</span>
      </div>
    ),
  },
  {
    id: 'address',
    accessorKey: 'address',
    header: 'Địa chỉ',
    enableSorting: false,
  },
  {
    id: 'channels',
    accessorKey: 'channels',
    header: 'Mạng xã hội',
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        {row.original.channels.map((channel) => {
          const { Icon } = PlatformData[channel.platform];
          return <Icon key={channel.id} />;
        })}
      </div>
    ),
    enableSorting: false,
  },
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: 'Ngày tham gia',
    cell: ({ row }) => formats.date(row.original.createdAt || ''),
  },
];

export const filters: DataTableFilterField<IInfluencer>[] = [
  {
    key: 'Search',
    label: 'Name',
    value: 'fullName',
    placeholder: 'Tìm kiếm theo tên',
  },
];
