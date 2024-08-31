import { constants } from '@/lib/utils';
import { z } from 'zod';

export const loginSchema = z
  .object({
    email: z.string().min(1, 'Vui lòng nhập email').email('Email không hợp lệ'),
    password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
  })
  .strict();

export const forgotPasswordSchema = z
  .object({
    email: z.string().min(1, 'Vui lòng nhập email').email('Email không hợp lệ'),
    newPassword: z
      .string()
      .min(1, 'Vui lòng nhập mật khẩu')
      .regex(
        constants.passwordRegex,
        'Mật khẩu ít nhất 8 kí tự bao gồm ít nhất một chữ hoa, một chữ thường, một chữ số và một kí tự đặt biệt',
      ),
  })
  .strict();

export const registerAsInfluencerSchema = z
  .object({
    fullName: z.string().min(1, 'Vui lòng nhập họ và tên của bạn'),
    email: z.string().min(1, 'Vui lòng nhập email').email('Email không hợp lệ'),
    password: z
      .string()
      .min(1, 'Vui lòng nhập mật khẩu')
      .regex(
        constants.passwordRegex,
        'Mật khẩu ít nhất 8 kí tự bao gồm ít nhất một chữ hoa, một chữ thường, một chữ số và một kí tự đặt biệt',
      ),
  })
  .strict();

export const registerAsBrandSchema = z
  .object({
    fullName: z.string().min(1, 'Vui lòng nhập họ và tên của bạn'),
    brandName: z.string().min(1, 'Vui lòng nhập tên thưong hiệu của bạn'),
    email: z.string().min(1, 'Vui lòng nhập email').email('Email không hợp lệ'),
    password: z
      .string()
      .min(1, 'Vui lòng nhập mật khẩu')
      .regex(
        constants.passwordRegex,
        'Mật khẩu ít nhất 8 kí tự bao gồm ít nhất một chữ hoa, một chữ thường, một chữ số và một kí tự đặt biệt',
      ),
  })
  .strict();

export type LoginBodyType = z.infer<typeof loginSchema>;
export type ForgotPasswordBodyType = z.infer<typeof forgotPasswordSchema>;
export type RegisterAsInfluencerType = z.infer<typeof registerAsInfluencerSchema>;
export type RegisterAsBrandType = z.infer<typeof registerAsBrandSchema>;
