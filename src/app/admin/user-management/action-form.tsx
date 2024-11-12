import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BanBodyType, banSchema, GeneralBodyType, generalSchema } from '@/schema-validations/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { constants } from '@/lib/utils';
import { userRequest } from '@/request';
import IUserManagement from '@/types/user-management';
import { EBanDate, ERole } from '@/types/enum';
interface ActionFormProps {
  item?: IUserManagement;
  handleClose: () => void;
  reloadTable: () => void;
  isBan?: boolean;
}
const ActionForm: FC<ActionFormProps> = ({ item, handleClose, reloadTable, isBan }) => {
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

  const banForm = useForm<BanBodyType>({
    resolver: zodResolver(banSchema),
    defaultValues: {
      reason: '',
      bannedTime: EBanDate.OneWeek,
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

  const handleBan = (values: BanBodyType) => {
    setLoading(true);
    const caller = userRequest.ban(item?.id || '', values);
    toast.promise(caller, {
      loading: 'Đang tải',
      success: () => {
        reloadTable();
        handleClose();
        return 'Đã cấm người dùng thành công.';
      },
      error: (err) => err?.message || constants.sthWentWrong,
      finally: () => setLoading(false),
    });
  };

  return isBan ? (
    <Form {...banForm}>
      <form onSubmit={banForm.handleSubmit(handleBan)}>
        <DialogHeader>
          <DialogTitle>Cấm người dùng</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-6">
          <FormField
            control={banForm.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lí do</FormLabel>
                <FormControl className="w-full">
                  <Input id="reason" placeholder="Nhập lí do..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={banForm.control}
            name="bannedTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cấm trong vòng</FormLabel>
                <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={EBanDate.OneWeek.toString()}>1 Tuần</SelectItem>
                    <SelectItem value={EBanDate.TwoWeeks.toString()}>2 Tuần</SelectItem>
                    <SelectItem value={EBanDate.OneMonth.toString()}>1 Tháng</SelectItem>
                    <SelectItem value={EBanDate.ThreeMonths.toString()}>3 Tháng</SelectItem>
                    <SelectItem value={EBanDate.SixMonths.toString()}>6 Tháng</SelectItem>
                    <SelectItem value={EBanDate.OneYear.toString()}>1 Năm</SelectItem>
                    <SelectItem value={EBanDate.TwoYears.toString()}>2 Năm</SelectItem>
                    <SelectItem value={EBanDate.indefinitely.toString()}>Vô thời hạn</SelectItem>
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
  ) : (
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
                <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value.toString()}>
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
