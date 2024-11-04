import { DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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

interface ActionFormProps {
  item?: ITag;
  reload?: () => void;
  handleClose?: () => void;
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

  const handleSubmit = async (values: BasicBodyType) => {
    setLoading(true);
    try {
      const res = item ? await tagRequest.updateTag(item?.id || '', values) : await tagRequest.createTag(values);
      if (res.statusCode === 200) {
        reload?.();
        toast.success(item ? 'Cập nhật thẻ thành công.' : 'Tạo thẻ thành công.');
      } else {
        toast.error(item ? 'Cập nhật thẻ thất bại.' : 'Tạo thẻ thất bại.');
      }
      handleClose?.();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <DialogHeader>
          <DialogTitle>{item ? 'Chỉnh sửa thẻ' : 'Thêm thẻ'}</DialogTitle>
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
                <FormLabel>Hạng thẻ</FormLabel>
                <Select
                  onValueChange={(value) => {
                    let rs: boolean;
                    if (value === 'true') {
                      rs = true;
                    } else {
                      rs = false;
                    }
                    field.onChange(rs);
                  }}
                  defaultValue={field.value ? 'true' : 'false'}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn hạng thẻ" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="true">Đặc biệt</SelectItem>
                    <SelectItem value="false">Thông thường</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <Button type="submit" loading={loading}>
            Lưu
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ActionForm;
