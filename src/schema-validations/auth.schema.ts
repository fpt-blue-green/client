import { z } from 'zod';

export const loginSchema = z
  .object({
    email: z.string().min(1, 'Vui lòng nhập email'), //.email('Email không hợp lệ'),
    password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
  })
  .strict();

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Vui lòng nhập email').email('Email không hợp lệ'),
});

export type LoginBodyType = z.infer<typeof loginSchema>;
export type ForgotPasswordBodyType = z.infer<typeof forgotPasswordSchema>;
