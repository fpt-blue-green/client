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
import { Form, FormControl, FormDescription, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { cn, constants, formats, functions } from '@/lib/utils';
import { offerRequest } from '@/request';
import { ReofferBodyType, reofferSchema } from '@/schema-validations/offer.schema';
import { EOfferStatus, ERole, PlatformData } from '@/types/enum';
import IOffer from '@/types/offer';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { ChangeEvent, FC, ReactNode, useState } from 'react';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { RxChatBubble, RxFace } from 'react-icons/rx';
import { toast } from 'sonner';

interface JobOfferProps {
  offer: IOffer;
  children: ReactNode;
  reload: () => Promise<void>;
}

const JobOffer: FC<JobOfferProps> = ({ offer, children, reload }) => {
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

  const handleClose = async () => {
    setOpen(false);
    await reload();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
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
          <ReofferForm offer={offer} onClose={handleClose} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

const ReofferForm = ({ offer, onClose }: { offer: IOffer; onClose: () => void }) => {
  const [loading, setLoading] = useState(false);
  const { logo, name, contentTypes } = PlatformData[offer.platform];

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

  const canReoffer = offer.status === EOfferStatus.Offering && offer.from === ERole.Influencer;

  const form = useForm<ReofferBodyType>({
    resolver: zodResolver(reofferSchema),
    defaultValues: {
      price: offer.price,
      targetReaction: offer.targetReaction,
      quantity: offer.quantity,
      description: '',
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
        onClose();
        return 'Đã gửi đề nghị của bạn thành công';
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
          <div className="col-span-full flex flex-col justify-center items-center gap-2 p-4 border rounded-lg">
            <p>
              <RxChatBubble className="text-2xl" />
            </p>
            <p>Lời nhắn</p>
            {canReoffer ? (
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormDescription>
                      <span className="font-semibold text-foreground mr-2">Lời nhắn của đối phương:</span>
                      {offer.description}
                    </FormDescription>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            ) : (
              <p>{offer.description}</p>
            )}
          </div>
          {canReoffer && (
            <div className="col-span-full">
              <Button type="submit" startIcon={<ResetIcon />} loading={loading} fullWidth>
                Đề nghị lại
              </Button>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};

export default JobOffer;
