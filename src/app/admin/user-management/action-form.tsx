import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GeneralBodyType, generalSchema } from '@/schema-validations/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { constants } from '@/lib/utils';
import { userRequest } from '@/request';
import IUserManagement from '@/types/user-management';
import { ERole } from '@/types/enum';
interface ActionFormProps {
  item?: IUserManagement;
  handleClose: () => void;
  reloadTable: () => void;
}
const ActionForm: FC<ActionFormProps> = ({ item, handleClose, reloadTable }) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<GeneralBodyType>({
    resolver: zodResolver(generalSchema),
    defaultValues: {
      displayName: item?.displayName || '',
      email: item?.email || '',
      wallet: item?.wallet || 0,
      role: item?.role || ERole.Influencer,
    },
  });

  const handleSubmit = (values: GeneralBodyType) => {
    setLoading(true);
    const caller = item ? userRequest.updateUser(item?.id || '', values) : userRequest.addUser(values);
    toast.promise(caller, {
      loading: 'Đang tải',
      success: () => {
        reloadTable();
        handleClose();
        return item ? 'Cập nhật nhà sáng tạo thành công.' : 'Thêm nhà sáng tạo thành công.';
      },
      error: (err) => err?.message || constants.sthWentWrong,
      finally: () => setLoading(false),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <DialogHeader>
          <DialogTitle>{item ? 'Cập nhật thông tin' : 'Thêm người dùng'}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-6">
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên hiển thị</FormLabel>
                <FormControl className="w-full">
                  <Input id="displayName" placeholder="Nhập tên..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl className="w-full">
                  <Input id="email" placeholder="Nhập email..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="wallet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ví</FormLabel>
                <FormControl className="w-full">
                  <Input id="wallet" placeholder="Nhập số tiền..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vai trò</FormLabel>
                <Select onValueChange={(value) => field.onChange(value === 'true')} value={String(field.value)}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={ERole.Influencer.toString()}>Nhà sáng tạo</SelectItem>
                    <SelectItem value={ERole.Brand.toString()}>Nhãn hàng</SelectItem>
                    <SelectItem value={ERole.Admin.toString()}>Quản trị viên</SelectItem>
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
