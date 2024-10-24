'use client';

import PriceInput from '@/components/custom/price-input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn, constants, formats, functions } from '@/lib/utils';
import { fetchRequest, offerRequest } from '@/request';
import { ReofferBodyType, reofferSchema } from '@/schema-validations/offer.schema';
import ICampaign from '@/types/campaign';
import { EOfferStatus, ERole, PlatformData } from '@/types/enum';
import IOffer from '@/types/offer';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircledIcon, CrossCircledIcon, ResetIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { ChangeEvent, FC, ReactNode, useState } from 'react';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { RxFace } from 'react-icons/rx';
import { toast } from 'sonner';

interface JobOfferProps {
  offer: IOffer;
  campaign: ICampaign;
  children: ReactNode;
}

const JobOffer: FC<JobOfferProps> = ({ offer, campaign, children }) => {
  const [open, setOpen] = useState(false);
  const { Icon, color, label, description } = constants.offerStatus[offer.status];

  const styles = (isBigCircle = false) =>
    cn({
      'bg-success text-success-foreground': color === 'success',
      'bg-warning text-warning-foreground': color === 'warning',
      'bg-info text-info-foreground': color === 'info',
      'bg-destructive text-destructive-foreground': color === 'destructive',
      'bg-foreground text-background': color === 'secondary',
      'bg-success/20': isBigCircle && color === 'success',
      'bg-warning/20': isBigCircle && color === 'warning',
      'bg-info/20': isBigCircle && color === 'info',
      'bg-destructive/20': isBigCircle && color === 'destructive',
      'bg-foreground/20': isBigCircle && color === 'secondary',
    });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="sr-only">Lời đề nghị</DialogTitle>
          <DialogDescription className="sr-only">Lời đề nghị</DialogDescription>
        </DialogHeader>
        <div className="space-y-2 text-center">
          <div className={cn('inline-block mx-auto size-32 p-8 rounded-full', styles(true))}>
            <div className={cn('flex items-center justify-center size-full rounded-full', styles(false))}>
              <Icon className="size-6" />
            </div>
          </div>
          <h3 className="text-lg font-semibold">{label}</h3>
          <p className="text-sm">{description}</p>
        </div>
        <Separator className="my-6" />
        <ScrollArea className="max-h-96 overflow-auto">
          <div className="space-y-2 text-center mb-6">
            <h3 className="text-lg font-semibold">{campaign.title}</h3>
            <p className="text-sm text-muted-foreground">{campaign.description}</p>
          </div>
          <ReofferForm offer={offer} onClose={handleClose} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

const ReofferForm = ({ offer, onClose }: { offer: IOffer; onClose: () => void }) => {
  const [loading, setLoading] = useState(false);
  const { logo, name, contentTypes } = PlatformData[offer.platform];
  const { mutate } = fetchRequest.influencer.jobs();

  const time = () => {
    let timeUnit: 's' | 'm' | 'h' = 's';
    let duration: number | undefined = undefined;
    if (offer?.duration) {
      const result = functions.convertSecondsToTime(offer.duration);
      timeUnit = result.unit;
      duration = result.value;
    }
    return { timeUnit, duration };
  };

  const canReoffer = offer.status === EOfferStatus.Offering && offer.from === ERole.Brand;

  const form = useForm<ReofferBodyType>({
    resolver: zodResolver(reofferSchema),
    defaultValues: {
      price: offer.price,
      targetReaction: offer.targetReaction,
      quantity: offer.quantity,
      ...time,
    },
  });

  const handleChange =
    (field: ControllerRenderProps<ReofferBodyType>) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let value = undefined;
      if (e.target.value) {
        if (e.target.type === 'number') {
          // Convert value into number
          value = +e.target.value;
        } else {
          value = e.target.value;
        }
      }
      field.onChange(value);
    };

  const handleSubmit = (values: ReofferBodyType) => {
    setLoading(true);
    toast.promise(offerRequest.reoffer(offer.id, values), {
      loading: 'Đang tải',
      success: () => {
        mutate();
        onClose();
        return 'Đã gửi đề nghị của bạn thành công';
      },
      error: (err) => err?.message || constants.sthWentWrong,
      finally: () => setLoading(false),
    });
  };

  const handleApprove = () => {
    setLoading(true);
    toast.promise(offerRequest.approveOffer(offer.id), {
      loading: 'Đang tải',
      success: () => {
        mutate();
        onClose();
        return 'Đã chấp thuận lời đề nghị. Chờ nhãn hàng thanh toán tiền đặt cọc';
      },
      error: (err) => err?.message || constants.sthWentWrong,
      finally: () => setLoading(false),
    });
  };

  const handleReject = () => {
    setLoading(true);
    toast.promise(offerRequest.rejectOffer(offer.id), {
      loading: 'Đang tải',
      success: () => {
        mutate();
        onClose();
        return 'Đã từ chối lời đề nghị thành công';
      },
      error: (err) => err?.message || constants.sthWentWrong,
      finally: () => setLoading(false),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          <div className="flex flex-col justify-center items-center gap-2 p-4 border rounded-lg">
            <p>
              <Image src={logo} alt={name} width={40} height={40} className="size-6" />
            </p>
            <p className="text-sm capitalize">{contentTypes[offer.contentType]}</p>
            {canReoffer ? (
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input {...field} onChange={handleChange(field)} inputClassName="text-center" type="number" />
                    </FormControl>
                  </FormItem>
                )}
              />
            ) : (
              <p className="text-lg font-semibold">{offer.quantity}</p>
            )}
          </div>
          <div className="flex flex-col justify-center items-center gap-2 p-4 border rounded-lg">
            <p>
              <FaRegMoneyBillAlt className="text-2xl" />
            </p>
            <p>Giá đề nghị</p>
            {canReoffer ? (
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <PriceInput {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            ) : (
              <p className="text-lg font-semibold">{formats.price(offer.price)}</p>
            )}
          </div>
          <div className="flex flex-col justify-center items-center gap-2 p-4 border rounded-lg">
            <p>
              <RxFace className="text-2xl" />
            </p>
            <p>Lượt tương tác</p>
            {canReoffer ? (
              <FormField
                control={form.control}
                name="targetReaction"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input {...field} onChange={handleChange(field)} type="number" inputClassName="text-center" />
                    </FormControl>
                  </FormItem>
                )}
              />
            ) : (
              <p className="text-lg font-semibold">{offer.targetReaction}</p>
            )}
          </div>
          {canReoffer && (
            <>
              <Button variant="destructive" startIcon={<CrossCircledIcon />} loading={loading} onClick={handleReject}>
                Hủy đề nghị
              </Button>
              <Button type="submit" startIcon={<ResetIcon />} loading={loading}>
                Đề nghị lại
              </Button>
              <Button
                className="bg-success text-success-foreground hover:bg-success/80"
                startIcon={<CheckCircledIcon />}
                loading={loading}
                onClick={handleApprove}
              >
                Chấp thuận
              </Button>
            </>
          )}
        </div>
      </form>
    </Form>
  );
};

export default JobOffer;
