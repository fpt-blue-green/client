'use client';
import { ChangeEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Paper from '@/components/custom/paper';
import { ControllerRenderProps, useFieldArray, useForm } from 'react-hook-form';
import { PackagesBodyType, packagesSchema } from '@/schema-validations/influencer.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Cross2Icon, PlusCircledIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';
import clsx from 'clsx';
import { EPlatform, PlatformData } from '@/types/enum';
import { influencerRequest } from '@/request';
import { emitter, functions } from '@/lib/utils';
import PriceInput from '@/components/custom/price-input';
import { useAuthInfluencer } from '@/hooks';

const Packages = () => {
  const { profile, refreshProfile } = useAuthInfluencer();
  const [loading, setLoading] = useState(false);
  const form = useForm<PackagesBodyType>({
    resolver: zodResolver(packagesSchema),
    defaultValues: {
      packages: profile?.packages.map((p) => {
        let timeUnit: 's' | 'm' | 'h' = 's';
        let duration: number | undefined = undefined;
        if (p.duration) {
          const result = functions.convertSecondsToTime(p.duration);
          timeUnit = result.unit;
          duration = result.value;
        }
        const platform = Math.floor(p.contentType / 10);
        p.description = p.description || undefined;
        return { ...p, platform, timeUnit, duration };
      }),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'packages',
  });

  const handleChange =
    (field: ControllerRenderProps<PackagesBodyType>) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const addPackage = () => {
    append({ timeUnit: 's' });
  };

  const removePackage = (index: number) => () => {
    const values = form.getValues() || [];
    const packageId = values.packages[index]?.id;
    if (profile?.packages.some((item) => item.id === packageId)) {
      emitter.confirm({
        content: 'Bạn sẽ xoá gói mặc định của mình đấy',
        callback: () => {
          remove(index);
        },
      });
    } else {
      remove(index);
    }
  };

  const onSubmit = (values: PackagesBodyType) => {
    if (values.packages.length === 0) {
      toast.error('Bạn phải thêm ít nhất một gói');
      return;
    }

    const data: PackagesBodyType['packages'] = values.packages.map((p) => {
      const { duration, timeUnit, ...others } = p;
      const unit = timeUnit === 's' ? 1 : timeUnit === 'm' ? 60 : 3600;
      const finalDuration = duration ? duration * unit : undefined;
      return { ...others, duration: finalDuration };
    });

    setLoading(true);
    influencerRequest
      .updatePackages(data)
      .then(() => {
        refreshProfile().then(() => toast.success('Cập nhật các gói thành công'));
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };
  return (
    <Paper>
      <div>
        <h3 className="font-semibold text-xl mb-4">Quản Lý Các Gói</h3>
      </div>
      <Form {...form}>
        <form className="grid md:grid-cols-2 grid-cols-1 gap-6" onSubmit={form.handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <Paper key={field.id} className="relative grid grid-cols-3 gap-2 p-3 border-foreground overflow-visible">
              <FormField
                control={form.control}
                name={`packages.${index}.platform`}
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(+value);
                          setTimeout(
                            () => form.resetField(`packages.${index}.contentType`, { defaultValue: +value * 10 }),
                            500,
                          );
                        }}
                        value={field.value?.toString()}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Nền tảng" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(PlatformData)
                            .filter(([key]) =>
                              profile?.channels.some((c) => c.platform === (+key as unknown as EPlatform)),
                            )
                            .map(([key, { Icon, name }]) => (
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
                name={`packages.${index}.quantity`}
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
                name={`packages.${index}.contentType`}
                render={({ field }) => {
                  const platform = form.watch(`packages.${index}.platform`);
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
                name={`packages.${index}.duration`}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl>
                      <Input
                        type="number"
                        className="w-full"
                        placeholder="Thời lượng (tùy chọn)"
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
                name={`packages.${index}.timeUnit`}
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
              <FormField
                control={form.control}
                name={`packages.${index}.price`}
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormControl>
                      <PriceInput fullWidth placeholder="Giá" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`packages.${index}.description`}
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormControl>
                      <Textarea placeholder="Mô tả (tùy chọn)" {...field} onChange={handleChange(field)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full"
                onClick={removePackage(index)}
              >
                <Cross2Icon />
              </Button>
            </Paper>
          ))}
          <div
            className={clsx(
              'flex flex-col items-center justify-center gap-2 size-full min-h-64 border-2 border-foreground border-dashed rounded-lg cursor-pointer hover:opacity-60',
              { 'col-span-full': form.getValues('packages').length === 0 },
            )}
            onClick={addPackage}
          >
            <PlusCircledIcon className="size-6" />
            Thêm Gói
          </div>
          <Button
            type="submit"
            size="large"
            variant="gradient"
            fullWidth
            className="col-span-full h-12 text-md"
            loading={loading}
          >
            Lưu thay đổi
          </Button>
        </form>
      </Form>
    </Paper>
  );
};

export default Packages;
