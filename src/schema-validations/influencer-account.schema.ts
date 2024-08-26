import { constants } from '@/lib/utils';
import { z } from 'zod';

export const generalSchema = z
  .object({
    email: z.string(),
    phone: z.string().regex(constants.phoneRegex, 'Số điện thoại không đúng định dạng'),
    name: z.string().min(2, 'Vui lòng nhập tên ít nhất 2 kí tự'),
    summarize: z.string().min(1, ''),
    description: z.string(),
    address: z.string(),
    gender: z.number(),
  })
  .strict();

export type GeneralBodyType = z.infer<typeof generalSchema>;
