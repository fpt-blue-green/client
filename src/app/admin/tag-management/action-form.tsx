'use client';

import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import ITag from '@/types/tag';
import { BasicBodyType, basicSchema } from '@/schema-validations/tag.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { tagRequest } from '@/request';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { constants } from '@/lib/utils';

interface ActionFormProps {
  item?: ITag;
  reload: () => Promise<void>;
  handleClose: () => void;
}

const ActionForm: FC<ActionFormProps> = ({ item, reload, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<BasicBodyType>({
    resolver: zodResolver(basicSchema),
    defaultValues: {
      name: item?.name || '',
      isPremium: item?.isPremium || false,
    },
  });

  const handleSubmit = (values: BasicBodyType) => {
    setLoading(true);
    const caller = item ? tagRequest.updateTag(item?.id || '', values) : tagRequest.createTag(values);
    toast.promise(caller, {
      loading: 'Đang tải',
      success: () => {
        reload();
        handleClose();
        return item ? 'Cập nhật thẻ thành công.' : 'Tạo thẻ thành công.';
      },
      error: (err) => err?.message || constants.sthWentWrong,
      finally: () => setLoading(false),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <DialogHeader>
          <DialogTitle>{item ? 'Chỉnh sửa thẻ' : 'Thêm thẻ'}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên thẻ</FormLabel>
                <FormControl className="w-full">
                  <Input id="name" placeholder="Tên thẻ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isPremium"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại thẻ</FormLabel>
                <Select onValueChange={(value) => field.onChange(Boolean(value))} value={String(field.value)}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn hạng thẻ" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="true">Premium</SelectItem>
                    <SelectItem value="false">Thông thường</SelectItem>
                  </SelectContent>
                </Select>
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
