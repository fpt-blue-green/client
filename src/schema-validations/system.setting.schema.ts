import { z } from 'zod';
export const basicSchema = z
  .object({
    keyName: z.string().min(2, 'Vui lòng nhập ít nhất 2 kí tự'),
    keyValue: z.string().min(2, 'Vui lòng nhập ít nhất 2 kí tự'),
    description: z.string().min(2, 'Vui lòng nhập ít nhất 2 kí tự'),
  })
  .strict();
export type BasicBodyType = z.infer<typeof basicSchema>;
