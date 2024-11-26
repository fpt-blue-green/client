'use client';

import Table from '@/components/custom/data-table';
import Paper from '@/components/custom/paper';
import PriceInput from '@/components/custom/price-input';
import NoData from '@/components/no-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import config from '@/config';
import { useAuthUser } from '@/hooks';
import { constants, formats, functions } from '@/lib/utils';
import { fetchRequest, userRequest } from '@/request';
import IBank from '@/types/bank';
import { EPaymentType, ERole } from '@/types/enum';
import { IPaymentHistory } from '@/types/payment';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const amountSchema = z.object({ amount: z.number().min(10_000, 'Tối thiểu 10.000 ₫') }).strict();

const withdrawSchema = amountSchema.extend({
  bankId: z.number({ required_error: 'Chọn ngân hàng của bạn' }),
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
  const [bank, setBank] = useState<IBank>();
  const [bankColor, setBankColor] = useState<string>();
  const [open, setOpen] = useState(true);
  const form = useForm<z.infer<typeof withdrawSchema>>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: { amount: 0, accountNo: '' },
  });

  const handleWithdraw = (values: z.infer<typeof withdrawSchema>) => {
    console.log(values);
    onClose();
  };

  const handleChangeBank = (bank: IBank) => {
    setBank(bank);
    form.setValue('bankId', bank.bin);
    setOpen(false);
    functions
      .getDominantColor(bank.logo_url || '')
      .then((color) => {
        setBankColor(color);
      })
      .catch(() => {});
  };

  return (
    <Form {...form}>
      {bank && (
        <form className="space-y-4" onSubmit={form.handleSubmit(handleWithdraw)}>
          <div className="rounded-lg overflow-hidden border" style={{ borderColor: bankColor }}>
            <div
              className="flex items-center justify-between gap-2 p-4 transition-opacity cursor-pointer hover:opacity-80"
              style={{ background: bankColor }}
              onClick={() => setOpen(true)}
            >
              <div className="flex items-center gap-2">
                <Avatar className="bg-white">
                  <AvatarImage src={bank.icon_url} alt={bank.short_name} />
                  <AvatarFallback>{bank.short_name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground">{`${bank.short_name} (${bank.code})`}</span>
                  <span className="text-xs">{bank.name}</span>
                </div>
              </div>
              <ChevronRightIcon className="justify-self-end" />
            </div>
            <div className="space-y-4 p-4">
              <FormField
                control={form.control}
                name="accountNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Số tài khoản</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nhập số tài khoản" fullWidth />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Số tiền</FormLabel>
                    <FormControl>
                      <PriceInput {...field} placeholder="Nhập số tiền muốn rút" fullWidth />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" variant="gradient" fullWidth>
            Tiếp tục
          </Button>
        </form>
      )}

      {open && (
        <CommandDialog open={open} onOpenChange={setOpen} className="max-w-screen-md">
          <CommandInput placeholder="Tìm theo tên ngân hàng" />
          <CommandList>
            <CommandEmpty>
              <NoData description="Không có ngân hàng trong danh sách" />
            </CommandEmpty>
            <CommandGroup heading="Ngân hàng">
              {banks?.data.map((bank) => (
                <CommandItem key={bank.bin} className="gap-2 cursor-pointer" onSelect={() => handleChangeBank(bank)}>
                  <Avatar className="border bg-white">
                    <AvatarImage src={bank.icon_url} alt={bank.short_name} />
                    <AvatarFallback>{bank.short_name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground">{`${bank.short_name} (${bank.code})`}</span>
                    <span className="text-xs text-muted-foreground">{bank.name}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      )}
    </Form>
  );
};

export default Payment;
