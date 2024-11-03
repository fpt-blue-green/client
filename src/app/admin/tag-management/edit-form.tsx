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

interface EditFormProps {
  tag?: ITag;
  reload?: () => void;
  setShowDialog?: (value: boolean) => void;
}

const EditForm: FC<EditFormProps> = ({ tag, reload, setShowDialog }) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<BasicBodyType>({
    resolver: zodResolver(basicSchema),
    defaultValues: {
      name: tag?.name || '',
      isPremium: tag?.isPremium || false,
    },
  });
  const handleUpdateTag = async (values: BasicBodyType) => {
    setLoading(true);
    try {
      const res = await tagRequest.updateTag(tag?.id || '', values);
      reload && reload();
      setShowDialog && setShowDialog(false);
      toast.success('Cập nhật thẻ thành công.');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdateTag)}>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thẻ</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
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
            Lưu thay đổi
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default EditForm;
