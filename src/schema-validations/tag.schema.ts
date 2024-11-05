import { z } from 'zod';
export const basicSchema = z
  .object({
    name: z.string().min(2, 'Vui lòng nhập ít nhất 2 kí tự'),
    isPremium: z.boolean(),
  })
  .strict();
export type BasicBodyType = z.infer<typeof basicSchema>;
