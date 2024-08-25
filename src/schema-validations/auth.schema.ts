import { z } from 'zod';

export const loginSchema = z
  .object({
    email: z.string().min(1, 'Vui lòng nhập email'), //.email('Email không hợp lệ'),
    password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
  })
  .strict();

export const registerAsInfluencerSchema = z
  .object({
    fullName: z.string().min(1, 'Vui lòng nhập họ và tên của bạn'),
    email: z.string().min(1, 'Vui lòng nhập email'), //.email('Email không hợp lệ'),
    password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
  })
  .strict();

export const verifyInfluencerEmailSchema = z
  .object({
    code: z.number().min(6, 'Vui lòng nhập mã 6 chữ số'),
  })
  .strict();

export const forgotSchema = z.object({
  email: z.string().min(1, 'Vui lòng nhập email').email('Email không hợp lệ'),
});

export type LoginBodyType = z.infer<typeof loginSchema>;
export type RegisterAsInfluencerType = z.infer<typeof registerAsInfluencerSchema>;
export type VerifyInfluencerEmailType = z.infer<typeof verifyInfluencerEmailSchema>;
export type ForgotBodyType = z.infer<typeof forgotSchema>;
