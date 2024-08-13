import { z } from 'zod';

export const loginSchema = z
  .object({
    email: z.string().min(1, 'Vui lòng nhập địa chỉ  email'), //.email('Email không hợp lệ'),
    password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
  })
  .strict();

export const registerSchema = z
  .object({
    userName: z.string().min(1, 'Vui lòng nhập tên người dùng'),
    email: z.string().min(1, 'Vui lòng nhập địa chỉ email'),
    password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
  })
  .strict();

export type LoginBodyType = z.infer<typeof loginSchema>;
export type RegisterBodyType = z.infer<typeof registerSchema>;
