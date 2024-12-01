import { constants } from '@/lib/utils';
import { z } from 'zod';

const isBrowser = typeof window !== 'undefined';

export const generalSchema = z
  .object({
    displayName: z.string().min(2, 'Vui lòng nhập tên ít nhất 2 kí tự'),
    email: z.string().min(1, 'Vui lòng nhập email'),
    role: z.number().min(1, 'Vui lòng cung cấp vai trò của bạn'),
    wallet: z.number().min(1, 'Vui lòng nạp tiền'),
  })
  .strict();

export const banSchema = z
  .object({
    reason: z.string().min(2, 'Vui lòng nhập lí do ít nhất 2 kí tự'),
    bannedTime: z.number().min(1, 'Vui lòng chọn thời hạn cấm'),
  })
  .strict();

export const avatarSchema = z.object({
  avatar: z
    .instanceof(isBrowser ? FileList : Array)
    .refine((files) => isBrowser && files instanceof FileList && files && files.length > 0, {
      message: 'Vui lòng tải ảnh lên',
    })
    .refine((files) => isBrowser && files instanceof FileList && files[0]?.type.startsWith('image/'), {
      message: 'Tệp tin không phải hình ảnh',
    })
    .refine((files) => isBrowser && files instanceof FileList && files[0]?.size <= 3 * 1024 * 1024, {
      message: 'Kích thước tệp lớn hơn 3MB',
    }),
});

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, 'Vui lòng nhập mật khẩu cũ'),
    newPassword: z
      .string()
      .min(1, 'Vui lòng nhập mật khẩu mới')
      .regex(
        constants.passwordRegex,
        'Mật khẩu ít nhất 8 kí tự bao gồm ít nhất một chữ hoa, một chữ thường, một chữ số và một kí tự đặc biệt',
      ),
    confirmPassword: z.string().min(1, 'Vui lòng xác nhận mật khẩu mới'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  })
  .refine((data) => data.newPassword !== data.oldPassword, {
    message: 'Mật khẩu mới phải khác mật khẩu cũ',
    path: ['newPassword'],
  });

export const depositSchema = z.object({ amount: z.number().min(10_000, 'Tối thiểu 10.000 ₫') }).strict();

export const withdrawSchema = z.object({
  amount: z
    .number()
    .min(10_000, 'Số tiền tối thiểu là 10.000 ₫')
    .max(50_000_000, 'Số tiền không vượt quá 50.000.000 ₫'),
  bankId: z.string({ required_error: 'Chọn ngân hàng của bạn' }),
  accountNo: z.string().regex(/^\d+$/, {
    message: 'Số tài khoản không hợp lệ.',
  }),
  accountName: z.string().optional(),
});

export type AvatarBody = z.infer<typeof avatarSchema>;
export type ChangePasswordBodyType = z.infer<typeof changePasswordSchema>;
export type GeneralBodyType = z.infer<typeof generalSchema>;
export type BanBodyType = z.infer<typeof banSchema>;
export type DepositBodyType = z.infer<typeof depositSchema>;
export type WithdrawBodyType = z.infer<typeof withdrawSchema>;
