'use client';

import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BasicBodyType, basicSchema } from '@/schema-validations/system.setting.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { constants } from '@/lib/utils';
import { ISystemSetting } from '@/types/system-settings';
import systemSettingRequest from '@/request/system.setting.request';
import { KeyedMutator } from 'swr';

interface ActionFormProps {
  item?: ISystemSetting;
  handleClose: () => void;
  mutate: KeyedMutator<ISystemSetting>;
}

const ActionForm: FC<ActionFormProps> = ({ item, handleClose, mutate }) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<BasicBodyType>({
    resolver: zodResolver(basicSchema),
    defaultValues: {
      keyName: item?.keyName || '',
      keyValue: item?.keyValue || '',
      description: item?.description || '',
    },
  });

  const handleSubmit = (values: BasicBodyType) => {
    setLoading(true);
    const caller = systemSettingRequest.configure(values);
    toast.promise(caller, {
      loading: 'Đang tải',
      success: () => {
        mutate();
        handleClose();
        return 'Cấu hình thành công.';
      },
      error: (err) => err?.message || constants.sthWentWrong,
      finally: () => setLoading(false),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <DialogHeader>
          <DialogTitle>Cấu hình</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-6">
          <FormField
            control={form.control}
            name="keyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên</FormLabel>
                <FormControl className="w-full">
                  <Input id="keyName" placeholder="Nhập tên..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="keyValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá trị</FormLabel>
                <FormControl className="w-full">
                  <Input id="keyValue" placeholder="Nhập giá trị..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả</FormLabel>
                <FormControl className="w-full">
                  <Input id="description" placeholder="Nhập mô tả..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button" loading={loading}>
              Hủy
            </Button>
          </DialogClose>
          <Button variant="gradient" type="submit" loading={loading}>
            Lưu
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ActionForm;
