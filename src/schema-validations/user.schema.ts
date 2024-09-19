import { constants } from '@/lib/utils';
import { z } from 'zod';

const isBrowser = typeof window !== 'undefined';

export const avatarSchema = z.object({
  avatar: z.union([
    z
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
    z.string().optional(),
  ]),
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

export type AvatarBody = z.infer<typeof avatarSchema>;
export type ChangePasswordBodyType = z.infer<typeof changePasswordSchema>;
