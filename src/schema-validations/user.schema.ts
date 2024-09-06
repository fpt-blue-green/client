import { constants } from '@/lib/utils';
import { z } from 'zod';

export const avatarSchema = z
  .object({
    avatar: z
      .instanceof(FileList)
      .refine((files) => files && files.length > 0, { message: 'Vui lòng tải ảnh lên' })
      .refine((files) => files[0]?.type.startsWith('image/'), {
        message: 'Tệp tin không phải hình ảnh',
      })
      .refine((files) => files[0]?.size <= 3 * 1024 * 1024, {
        message: 'Kích thước tệp lớn hơn 3MB',
      }),
  })
  .strict();

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

export const phoneSchema = z.object({
  phone: z.string().regex(constants.phoneRegex, 'Số điện thoại không đúng định dạng'),
  otp: z.string().regex(constants.otpRegex, 'Vui lòng nhập mã OTP'),
});

export type AvatarBody = z.infer<typeof avatarSchema>;
export type ChangePasswordBodyType = z.infer<typeof changePasswordSchema>;
export type PhoneBodyType = z.infer<typeof phoneSchema>;
