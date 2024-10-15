'use client';

import { ChangeEvent, FC, ReactNode } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OfferBodyType, offerSchema } from '@/schema-validations/offer.schema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { PlatformData } from '@/types/enum';
import { Button } from './ui/button';
import { Input } from './ui/input';
import PriceInput from './custom/price-input';
import { Textarea } from './ui/textarea';

interface OfferDialogProps {
  children: ReactNode;
  title?: string;
  description?: string;
  asChild?: boolean;
}

const OfferDialog: FC<OfferDialogProps> = ({ children, title = 'Gửi một lời đề nghị', description, asChild }) => {
  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <OfferForm />
      </DialogContent>
    </Dialog>
  );
};

interface OfferFormProps {}

const OfferForm: FC<OfferFormProps> = () => {
  const form = useForm<OfferBodyType>({
    resolver: zodResolver(offerSchema),
  });

  const onSubmit = (values: OfferBodyType) => {
    console.log(values);
  };

  const handleChange =
    (field: ControllerRenderProps<OfferBodyType>) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="offer.platform"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel htmlFor="platform">Nền tảng</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(+value);
                    setTimeout(() => form.resetField('offer.contentType', { defaultValue: +value * 10 }), 500);
                  }}
                  value={field.value?.toString()}
                >
                  <SelectTrigger id="platform" className="w-full">
                    <SelectValue placeholder="Nền tảng" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(PlatformData).map(([key, { Icon, name }]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          <Icon />
                          {name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-3 gap-2">
          <FormLabel className="col-span-full">Nội dung</FormLabel>
          <FormField
            control={form.control}
            name="offer.quantity"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormControl>
                  <Input
                    type="number"
                    className="w-full"
                    placeholder="Số lượng"
                    value={field.value || ''}
                    onChange={handleChange(field)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="offer.contentType"
            render={({ field }) => {
              const platform = form.watch('offer.platform');
              return (
                <FormItem className="col-span-2">
                  <FormControl>
                    <Select onValueChange={(value) => field.onChange(+value)} value={field.value?.toString() || ''}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Loại" />
                      </SelectTrigger>
                      <SelectContent>
                        {PlatformData[platform] &&
                          Object.entries(PlatformData[platform].contentTypes).map(([key, value]) => (
                            <SelectItem key={key} value={key}>
                              {value}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <FormLabel className="col-span-full">Thời lượng (tùy chọn)</FormLabel>
          <FormField
            control={form.control}
            name="offer.duration"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormControl>
                  <Input
                    type="number"
                    className="w-full"
                    placeholder="Thời lượng"
                    {...field}
                    value={field.value || ''}
                    onChange={handleChange(field)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="offer.timeUnit"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormControl>
                  <Select onValueChange={(value) => field.onChange(value)} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Đơn vị thời gian" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="s">giây</SelectItem>
                      <SelectItem value="m">phút</SelectItem>
                      <SelectItem value="h">giờ</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="offer.price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giá</FormLabel>
              <FormControl>
                <PriceInput placeholder="Giá" {...field} fullWidth />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="offer.description"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Lời nhắn</FormLabel>
              <FormControl>
                <Textarea placeholder="Lời nhắn" {...field} onChange={handleChange(field)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Huỷ
            </Button>
          </DialogClose>
          <Button type="submit" variant="gradient">
            OK
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default OfferDialog;
