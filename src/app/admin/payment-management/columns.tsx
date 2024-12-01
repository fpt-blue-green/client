'use client';

import { DataTableFilterField } from '@/components/custom/data-table/filter-type';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { constants, formats } from '@/lib/utils';
import { IPaymentManagement } from '@/types/payment';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<IPaymentManagement, IPaymentManagement>[] = [
  {
    id: 'user',
    accessorKey: 'user',
    header: 'Người dùng',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={row.original.user.image} alt={`Ảnh đại diện của ${row.original.user.name}`} />
          <AvatarFallback>{row.original.user.name[0]}</AvatarFallback>
        </Avatar>
        <span>{row.original.user.name}</span>
      </div>
    ),
    enableSorting: false,
  },
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: 'Thời gian',
    cell: ({ row }) => formats.date(row.getValue('createdAt'), true),
  },
  {
    accessorKey: 'type',
    header: 'Chi tiết',
    enableSorting: false,
    cell: ({ row }) => constants.paymentType[row.getValue('type') as string]?.label,
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    enableSorting: false,
    cell: ({ row }) => {
      const status = constants.paymentStatus[row.getValue('status') as string];
      return <div className={status.textColor}>{status.label}</div>;
    },
  },
  {
    accessorKey: 'amount',
    header: 'Số tiền',
    enableSorting: false,
    cell: ({ row }) => <div className="text-right">{formats.price(row.getValue('amount'))}</div>,
  },
];

export const filters: DataTableFilterField<IPaymentManagement>[] = [
  {
    key: 'PaymentType',
    label: 'Loại',
    value: 'type',
    multiple: true,
    options: Object.entries(constants.paymentType).map(([key, value]) => ({
      key: key,
      label: value.label,
    })),
  },
  {
    key: 'PaymentStatus',
    label: 'Trạng thái',
    value: 'status',
    multiple: true,
    options: Object.entries(constants.paymentStatus).map(([key, value]) => ({
      key: key,
      label: value.label,
    })),
  },
];
