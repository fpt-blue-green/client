import { constants } from '@/lib/utils';
import { EGender } from '@/types/enum';
import { z } from 'zod';

export const generalSchema = z
  .object({
    avatar: z
      .instanceof(FileList)
      .refine((file) => file.length === 0 || file[0].type.startsWith('image/'), {
        message: 'Tệp tin không phải hình ảnh',
      })
      .refine((file) => file.length === 0 || file[0].size <= 3 * 1024 * 1024, { message: 'Kích thước tệp lớn hơn 3MB' })
      .optional(),
    phone: z.string().regex(constants.phoneRegex, 'Số điện thoại không đúng định dạng'),
    name: z.string().min(2, 'Vui lòng nhập tên ít nhất 2 kí tự'),
    summarize: z.string().min(1, 'Vui lòng không để trống phần tóm tắt'),
    description: z.string().max(255, 'Không nhập quá 255 kí tự').optional(),
    address: z.string(),
    gender: z.nativeEnum(EGender),
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
        'Mật khẩu ít nhất 8 kí tự bao gồm ít nhất một chữ hoa, một chữ thường, một chữ số và một kí tự số',
      ),
    confirmPassword: z.string().min(1, 'Vui lòng xác nhận mật khẩu mới'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

export type GeneralBodyType = z.infer<typeof generalSchema>;
export type ChangePasswordBodyType = z.infer<typeof changePasswordSchema>;
