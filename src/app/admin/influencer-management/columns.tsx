'use client';

import IInfluencer from '@/types/influencer';
import { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<IInfluencer>[] = [
  {
    id: 'Tên',
    accessorKey: 'fullName',
    header: 'Tên',
  },
  {
    id: 'Địa chỉ',
    accessorKey: 'address',
    header: 'Địa chỉ',

    enableSorting: false,
  },
];

export default columns;
