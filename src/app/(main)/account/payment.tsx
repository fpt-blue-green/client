'use client';

import Table from '@/components/custom/data-table';
import Paper from '@/components/custom/paper';
import PriceInput from '@/components/custom/price-input';
import Tooltip from '@/components/custom/tooltip';
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
import { Skeleton } from '@/components/ui/skeleton';
import config from '@/config';
import { useAuthUser } from '@/hooks';
import { constants, emitter, formats, functions } from '@/lib/utils';
import { fetchRequest, paymentRequest } from '@/request';
import { DepositBodyType, depositSchema, WithdrawBodyType, withdrawSchema } from '@/schema-validations/user.schema';
import IBank from '@/types/bank';
import { EPaymentType, ERole } from '@/types/enum';
import { IPaymentHistory } from '@/types/payment';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuCheckSquare } from 'react-icons/lu';
import { toast } from 'sonner';

const Payment = () => {
  const { session } = useAuthUser();
  const { data } = fetchRequest.user.wallet(!!session);
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

  const buttons = useMemo(() => {
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
        buttons={buttons}
        hasRefresh
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
  const form = useForm<DepositBodyType>({
    resolver: zodResolver(depositSchema),
    defaultValues: { amount: 0 },
  });
  const router = useRouter();

  const handleDeposit = (values: DepositBodyType) => {
    paymentRequest
      .deposit(window.location.origin + config.routes.account + '?t=payment', values.amount)
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
  const { data: banks, isLoading } = fetchRequest.payments.banks();
  const { mutate } = fetchRequest.user.wallet();
  const [bank, setBank] = useState<IBank>();
  const [bankColor, setBankColor] = useState<string>();
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const form = useForm<WithdrawBodyType>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: {
      amount: 0,
      accountNo: '',
    },
  });

  const handleWithdraw = (values: WithdrawBodyType) => {
    const callback = () => {
      toast.promise(paymentRequest.withdraw(values), {
        loading: 'Đang tải',
        success: () => {
          mutate();
          return 'Tạo yêu cầu rút thành công. Bạn có thể nhận được tiền sau 2 - 3 ngày.';
        },
        error: (err) => err?.message,
      });
      onClose();
    };
    if (values.accountName) {
      callback();
    } else {
      emitter.confirm({
        callback,
        content: 'Bạn chưa kiểm tra tài khoản. Bạn có chắn chắn số tài khoản là của bạn?',
      });
    }
  };

  const handleChangeBank = (bank: IBank) => {
    setBank(bank);
    form.setValue('bankId', bank.bin.toString());
    form.setValue('accountName', '');
    setOpen(false);
    functions
      .getDominantColor(bank.logo_url || '')
      .then((color) => {
        setBankColor(color);
      })
      .catch(() => {});
  };

  const handleOpenBankList = (open: boolean) => {
    if (!open && !bank) {
      onClose();
    }
    setOpen(open);
  };

  const checkBank = () => {
    const { accountNo } = form.getValues();
    if (bank) {
      setLoading(true);
      paymentRequest
        .lookBank(bank.code, accountNo)
        .then((res) => {
          form.setValue('accountName', res.data?.data?.ownerName || '');
        })
        .catch(() => toast.error('Không tìm thấy tài khoản của ngân hàng'))
        .finally(() => setLoading(false));
    }
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
                      <Input
                        {...field}
                        onChange={(e) => {
                          form.setValue('accountName', '');
                          field.onChange(e);
                        }}
                        placeholder="Nhập số tài khoản"
                        fullWidth
                        endAdornment={
                          <Tooltip label="Kiểm tra tài khoản">
                            <Button variant="ghost" size="icon-sm" onClick={checkBank} loading={loading}>
                              <LuCheckSquare />
                            </Button>
                          </Tooltip>
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.getValues('accountName') && (
                <FormField
                  control={form.control}
                  name="accountName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên tài khoản</FormLabel>
                      <FormControl>
                        <Input {...field} fullWidth disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
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
          <Button type="submit" variant="gradient" fullWidth loading={loading}>
            Tiếp tục
          </Button>
        </form>
      )}

      {open && (
        <CommandDialog open={open} onOpenChange={handleOpenBankList} className="max-w-screen-md">
          <CommandInput placeholder="Tìm theo tên ngân hàng" />
          <CommandList>
            <CommandEmpty>
              {isLoading ? <Skeleton className="h-96" /> : <NoData description="Không có ngân hàng trong danh sách" />}
            </CommandEmpty>
            <CommandGroup heading={loading ? undefined : 'Ngân hàng'}>
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
