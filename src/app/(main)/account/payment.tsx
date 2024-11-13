'use client';

import Table from '@/components/custom/data-table';
import Paper from '@/components/custom/paper';
import { useAuthUser } from '@/hooks';
import { constants, formats } from '@/lib/utils';
import { fetchRequest } from '@/request';
import { EPaymentType, ERole } from '@/types/enum';
import { IPaymentHistory } from '@/types/payment';
import { ColumnDef } from '@tanstack/react-table';

const Payment = () => {
  const { session } = useAuthUser();
  const { data } = fetchRequest.user.payment(!!session);

  const columns: ColumnDef<IPaymentHistory>[] = [
    {
      accessorKey: 'created',
      header: 'Thời gian',
      cell: ({ row }) => formats.date(row.getValue('created'), true),
    },
    {
      accessorKey: 'type',
      header: 'Chi tiết',
      enableSorting: false,
      cell: ({ row }) => constants.paymentType[row.getValue('type') as string].label,
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
      cell: ({ row }) => {
        const plusType = [EPaymentType.Refund, EPaymentType.Deposit];
        if (session?.user.role === ERole.Influencer) {
          plusType.push(EPaymentType.InfluencerPayment);
        }
        const plus = plusType.includes(row.getValue('type') as EPaymentType) ? '+' : '-';
        return plus + formats.price(row.getValue('amount'));
      },
    },
  ];

  return (
    <Paper>
      <div className="flex items-stretch gap-2 mb-6">
        <div className="flex-1 px-4 border-r">
          <p className="text-muted-foreground">Số dư</p>
          <h6 className="text-xl font-semibold">{formats.price(data?.currentAmount || 0)}</h6>
        </div>
        <div className="flex-1 px-4">
          <p className="text-muted-foreground">Tổng {session?.user.role === ERole.Brand ? 'chi' : 'thu'}</p>
          <h6 className="text-xl font-semibold">{formats.price(data?.spendAmount || 0)}</h6>
        </div>
      </div>
      <Table url="/User/paymentHistory" columns={columns} defaultSorting={[{ id: 'created', desc: true }]} />
    </Paper>
  );
};

export default Payment;
