'use client';

import Table, { TableRef } from '@/components/custom/data-table';
import { columns, filters } from './columns';
import { ColumnDef } from '@tanstack/react-table';
import { IPaymentManagement } from '@/types/payment';
import { Button } from '@/components/ui/button';
import { EPaymentStatus, EPaymentType } from '@/types/enum';
import { paymentRequest } from '@/request';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { useMemo, useRef, useState } from 'react';
import QRDialog from './qr-dialog';
import { emitter } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import RejectForm from './reject-form';

const PaymentTable = () => {
  const [payment, setPayment] = useState<IPaymentManagement>();
  const [qr, setQr] = useState<string>();
  const flag = useRef(true);
  const tableRef = useRef<TableRef>(null);

  const columnsWithActions: ColumnDef<IPaymentManagement, IPaymentManagement>[] = useMemo(
    () => [
      ...columns,
      {
        id: 'actions',
        cell: ({ row }) => {
          const payment = row.original;

          return (
            <>
              {payment.status === EPaymentStatus.Pending && payment.type === EPaymentType.WithDraw && (
                <div className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="flex flex-col gap-1">
                      <DropdownMenuItem onClick={() => handleWithdraw(payment, true)}>Thanh toán</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleWithdraw(payment, false)}>Từ chối</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleWithdraw = (payment: IPaymentManagement, isApprove: boolean) => {
    if (flag.current) {
      flag.current = false;
      if (isApprove) {
        paymentRequest
          .withdrawQr(payment.id)
          .then((res) => {
            if (res.data) {
              setPayment(payment);
              setQr(res.data);
            }
          })
          .catch((err) => err?.message)
          .finally(() => (flag.current = true));
      } else {
        setPayment(payment);
        flag.current = true;
      }
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      if (qr) {
        emitter.confirm({
          callback: () => {
            setPayment(undefined);
            setQr(undefined);
          },
          content: 'Bạn có chắc không thực hiện thanh toán sau khi tắt đi?',
        });
      } else {
        setPayment(undefined);
      }
    }
  };

  const handleWithdrawSuccess = () => {
    setPayment(undefined);
    setQr(undefined);
    tableRef.current?.reload();
  };

  return (
    <Dialog open={!!payment} onOpenChange={handleClose}>
      <Table
        url="/Payment"
        columns={columnsWithActions}
        filters={filters}
        ref={tableRef}
        defaultSorting={[{ id: 'createdAt', desc: true }]}
      />
      {payment && (
        <DialogContent className="max-w-xl" onInteractOutside={(e) => e.preventDefault()}>
          <DialogTitle>Yêu cẩu rút tiền của {payment.user.name}</DialogTitle>
          {qr ? (
            <>
              <DialogDescription>VUI LÒNG KHÔNG TẮT ĐI KHI ĐANG THỰC HIỆN THANH TOÁN</DialogDescription>
              <QRDialog payment={payment} qr={qr} onSuccess={handleWithdrawSuccess} />
            </>
          ) : (
            <>
              <DialogDescription></DialogDescription>
              <RejectForm payment={payment} onSuccess={handleWithdrawSuccess} />
            </>
          )}
        </DialogContent>
      )}
    </Dialog>
  );
};

export default PaymentTable;
