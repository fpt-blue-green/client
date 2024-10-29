'use client';

import IInfluencer from '@/types/influencer';
import { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<IInfluencer>[] = [
  {
    accessorKey: 'fullName',
    header: 'Tên',
  },
  {
    accessorKey: 'address',
    header: 'Địa chỉ',
    enableSorting: false,
  },
];

export default columns;
