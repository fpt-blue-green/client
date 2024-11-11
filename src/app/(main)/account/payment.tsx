'use client';

import Table from '@/components/custom/data-table';
import Paper from '@/components/custom/paper';
import { useAuthUser } from '@/hooks';
import { formats } from '@/lib/utils';
import { ERole } from '@/types/enum';
import { ColumnDef } from '@tanstack/react-table';

const Payment = () => {
  const { session } = useAuthUser();

  return (
    <Paper>
      <div className="flex items-stretch gap-2 mb-6">
        <div className="flex-1 px-4 border-r">
          <p className="text-muted-foreground">Số dư</p>
          <h6 className="text-xl font-semibold">{formats.price(240000)}</h6>
        </div>
        <div className="flex-1 px-4">
          <p className="text-muted-foreground">Tổng {session?.user.role === ERole.Brand ? 'chi' : 'thu'}</p>
          <h6 className="text-xl font-semibold">{formats.price(240000)}</h6>
        </div>
      </div>
      <Table url="/Tags" columns={columns} />
    </Paper>
  );
};

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'id',
    header: 'Thời gian',
    enableSorting: false,
  },
  {
    accessorKey: 'id',
    header: 'Chi tiết',
    enableSorting: false,
  },
  {
    accessorKey: 'id',
    header: 'Trạng thái',
    enableSorting: false,
  },
  {
    accessorKey: 'id',
    header: 'Số tiền',
    enableSorting: false,
  },
];

export default Payment;
