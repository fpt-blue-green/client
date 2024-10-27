'use client';

import { ChangeEvent, FC, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Paper from '@/components/custom/paper';
import { ControllerRenderProps, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Cross2Icon, PlusCircledIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';
import clsx from 'clsx';
import { PlatformData } from '@/types/enum';
import DetailStepProps from './props';
import { campaignsRequest } from '@/request';
import { useRouter } from 'next/navigation';
import config from '@/config';
import PriceInput from '@/components/custom/price-input';
import { ContentsBodyType, contentsSchema } from '@/schema-validations/campaign.schema';

const Step6: FC<DetailStepProps> = ({ id, campaign, mutate }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<ContentsBodyType>({
    resolver: zodResolver(contentsSchema),
    defaultValues: {
      contents: campaign?.contents || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'contents',
  });

  const handleChange =
    (field: ControllerRenderProps<ContentsBodyType>) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const addContent = () => {
    // ? Ignore error
    append({} as any);
  };

  const removeContent = (index: number) => () => {
    remove(index);
  };

  const onSubmit = (values: ContentsBodyType) => {
    if (values.contents.length === 0) {
      toast.error('Bạn phải thêm ít nhất một gói');
      return;
    }

    setLoading(true);
    campaignsRequest
      .createContents(id, values.contents)
      .then(() => {
        mutate().then(() => router.push(config.routes.brand.campaigns.base));
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <Form {...form}>
      <form className="grid md:grid-cols-2 grid-cols-1 gap-6" onSubmit={form.handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <Paper key={field.id} className="relative grid grid-cols-3 gap-2 p-3 border-foreground overflow-visible">
            <FormField
              control={form.control}
              name={`contents.${index}.platform`}
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(+value);
                        setTimeout(
                          () => form.resetField(`contents.${index}.contentType`, { defaultValue: +value * 10 }),
                          500,
                        );
                      }}
                      value={field.value?.toString()}
                    >
                      <SelectTrigger className="w-full">
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
            <FormField
              control={form.control}
              name={`contents.${index}.quantity`}
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
              name={`contents.${index}.contentType`}
              render={({ field }) => {
                const platform = form.watch(`contents.${index}.platform`);
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
            <FormField
              control={form.control}
              name={`contents.${index}.price`}
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormControl>
                    <PriceInput placeholder="Giá" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`contents.${index}.description`}
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormControl>
                    <Textarea
                      placeholder="Bạn muốn người sáng tạo nội dung làm gì? Có bất kỳ thông tin cụ thể nào về nội dung sẽ trông như thế nào không?"
                      {...field}
                      onChange={handleChange(field)}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full"
              onClick={removeContent(index)}
            >
              <Cross2Icon />
            </Button>
          </Paper>
        ))}
        <div
          className={clsx(
            'flex flex-col items-center justify-center gap-2 size-full min-h-64 border-2 border-foreground border-dashed rounded-lg cursor-pointer hover:opacity-60',
            { 'col-span-full': form.getValues('contents').length === 0 },
          )}
          onClick={addContent}
        >
          <PlusCircledIcon className="size-6" />
          Thêm yêu cầu
        </div>
        <Button type="submit" size="large" variant="gradient" fullWidth className="col-span-full" loading={loading}>
          Tiếp tục
        </Button>
      </form>
    </Form>
  );
};

export default Step6;
