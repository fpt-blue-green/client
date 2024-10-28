'use client';

import ITag from '@/types/tag';
import { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<ITag>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'isPremium',
    header: 'Premium',
    enableSorting: false,
  },
];

export default columns;
