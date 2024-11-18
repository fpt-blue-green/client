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
import IUserManagement, { IBanUserManagement } from '@/types/user-management';
import { EBanDate, ERole } from '@/types/enum';
interface ActionFormProps {
  user?: IUserManagement;
  bannedUser?: IBanUserManagement;
  handleClose: () => void;
  reloadTable: () => void;
  isBanOrUnBanForm?: boolean;
  isGeneralTable?: boolean;
}
const ActionForm: FC<ActionFormProps> = ({ user, bannedUser, handleClose, reloadTable, isBanOrUnBanForm }) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<GeneralBodyType>({
    resolver: zodResolver(generalSchema),
    defaultValues: {
      displayName: user?.displayName || '',
      email: user?.email || '',
      wallet: user?.wallet || 0,
      role: user?.role || ERole.Influencer,
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
    const caller = user ? userRequest.updateUser(user?.id || '', values) : userRequest.addUser(values);
    toast.promise(caller, {
      loading: 'Đang tải',
      success: () => {
        reloadTable();
        handleClose();
        return user ? 'Cập nhật nhà sáng tạo thành công.' : 'Thêm nhà sáng tạo thành công.';
      },
      error: (err) => err?.message || constants.sthWentWrong,
      finally: () => setLoading(false),
    });
  };

  const handleBan = (values: BanBodyType) => {
    setLoading(true);
    const caller = bannedUser
      ? userRequest.unBan(bannedUser?.userId || '', values)
      : userRequest.ban(user?.id || '', values);
    toast.promise(caller, {
      loading: 'Đang tải',
      success: () => {
        reloadTable();
        handleClose();
        return bannedUser ? 'Đã huỷ lệnh cấm người dùng thành công.' : 'Đã cấm người dùng thành công.';
      },
      error: (err) => err?.message || constants.sthWentWrong,
      finally: () => setLoading(false),
    });
  };

  return isBanOrUnBanForm ? (
    <Form {...banForm}>
      <form onSubmit={banForm.handleSubmit(handleBan)}>
        <DialogHeader>
          <DialogTitle>{bannedUser ? 'Huỷ lệnh cấm người dùng' : 'Cấm người dùng'}</DialogTitle>
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
                <FormLabel>{bannedUser ? 'Đề nghị' : 'Cấm trong vòng'}</FormLabel>
                <Select
                  disabled={bannedUser ? true : false}
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  value={bannedUser ? EBanDate.None.toString() : field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn thời hạn cấm" />
                    </SelectTrigger>
                  </FormControl>
                  {bannedUser ? (
                    <SelectContent>
                      <SelectItem value={EBanDate.None.toString()}>Huỷ bỏ lệnh cấm</SelectItem>
                    </SelectContent>
                  ) : (
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
                  )}
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
          <DialogTitle>{user ? 'Cập nhật thông tin' : 'Thêm người dùng'}</DialogTitle>
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
