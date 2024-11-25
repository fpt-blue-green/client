'use client';

import Table from '@/components/custom/data-table';
import Paper from '@/components/custom/paper';
import PriceInput from '@/components/custom/price-input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import config from '@/config';
import { useAuthUser } from '@/hooks';
import { constants, formats } from '@/lib/utils';
import { fetchRequest, userRequest } from '@/request';
import { EPaymentType, ERole } from '@/types/enum';
import { IPaymentHistory } from '@/types/payment';
import { zodResolver } from '@hookform/resolvers/zod';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const amountSchema = z.object({ amount: z.number().min(10_000, 'Tối thiểu 10.000 ₫') }).strict();

const withdrawSchema = amountSchema.extend({
  bankId: z.string({ required_error: 'Chọn ngân hàng của bạn' }),
  accountNo: z.string().regex(/^\d+$/, {
    message: 'Số tài khoản không hợp lệ.',
  }),
});

const Payment = () => {
  const { session } = useAuthUser();
  const { data } = fetchRequest.user.payment(!!session);
  const [open, setOpen] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);

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

  const buttons = useCallback(() => {
    const data = [
      {
        children: 'Rút tiền',
        onClick: () => setOpenWithdraw(true),
      },
    ];
    if (session?.user.role === ERole.Brand) {
      data.push({
        children: 'Nạp tiền',
        onClick: () => setOpen(true),
      });
    }
    return data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setOpen(false);
    setOpenWithdraw(false);
  };

  return (
    <Paper className="space-y-6">
      <div className="flex items-stretch gap-2">
        <div className="flex-1 px-4 border-r">
          <p className="text-muted-foreground">Số dư</p>
          <h6 className="text-xl font-semibold">{formats.price(data?.currentAmount || 0)}</h6>
        </div>
        <div className="flex-1 px-4">
          <p className="text-muted-foreground">Tổng {session?.user.role === ERole.Brand ? 'chi' : 'thu'}</p>
          <h6 className="text-xl font-semibold">{formats.price(data?.spendAmount || 0)}</h6>
        </div>
      </div>
      <Table
        url="/User/paymentHistory"
        columns={columns}
        defaultSorting={[{ id: 'created', desc: true }]}
        buttons={buttons()}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Bạn muốn nạp bao nhiêu tiền?</DialogTitle>
          <DialogDescription />
          <DepositForm />
        </DialogContent>
      </Dialog>
      <Dialog open={openWithdraw} onOpenChange={setOpenWithdraw}>
        <DialogContent>
          <DialogTitle>Bạn muốn rút bao nhiêu tiền?</DialogTitle>
          <DialogDescription />
          <WithdrawForm onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </Paper>
  );
};

const DepositForm = () => {
  const form = useForm<z.infer<typeof amountSchema>>({
    resolver: zodResolver(amountSchema),
    defaultValues: { amount: 0 },
  });
  const router = useRouter();

  const handleDeposit = (values: z.infer<typeof amountSchema>) => {
    userRequest
      .deposit(window.location.origin + config.routes.account, values.amount)
      .then((res) => {
        if (res.data) router.push(res.data?.shortLink);
      })
      .catch((err) => toast.error(err?.message || constants.sthWentWrong));
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleDeposit)}>
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PriceInput {...field} fullWidth />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="gradient" fullWidth>
          Tiếp tục
        </Button>
      </form>
    </Form>
  );
};

const WithdrawForm = ({ onClose }: { onClose: () => void }) => {
  const { data: banks } = fetchRequest.payments.banks();

  const withdrawForm = useForm<z.infer<typeof withdrawSchema>>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: { amount: 0, accountNo: '' },
  });

  const handleWithdraw = (values: z.infer<typeof withdrawSchema>) => {
    console.log(values);
    onClose();
  };

  return (
    <Form {...withdrawForm}>
      <form className="space-y-4" onSubmit={withdrawForm.handleSubmit(handleWithdraw)}>
        <FormField
          control={withdrawForm.control}
          name="bankId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn ngân hàng" {...field} />
                  </SelectTrigger>
                  <SelectContent>
                    {banks?.data.map((bank) => (
                      <SelectItem key={bank.id} value={bank.bin}>
                        {bank.shortName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={withdrawForm.control}
          name="accountNo"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Nhập số tài khoản" fullWidth />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={withdrawForm.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PriceInput {...field} placeholder="Nhập số tiền muốn rút" fullWidth />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="gradient" fullWidth>
          Tiếp tục
        </Button>
      </form>
    </Form>
  );
};

export default Payment;
