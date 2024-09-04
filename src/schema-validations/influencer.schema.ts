import { EGender } from '@/types/enum';
import { z } from 'zod';

export const generalSchema = z
  .object({
    name: z.string().min(2, 'Vui lòng nhập tên ít nhất 2 kí tự'),
    summarize: z.string().min(1, 'Vui lòng không để trống phần tóm tắt'),
    description: z.string().max(255, 'Không nhập quá 255 kí tự').optional(),
    address: z.string(),
    gender: z.nativeEnum(EGender),
  })
  .strict();

export const channelSchema = z
  .object({
    youtube: z.string(),
    instagram: z.string(),
    tiktok: z.string(),
  })
  .strict();

export type GeneralBodyType = z.infer<typeof generalSchema>;
export type ChannelBodyType = z.infer<typeof channelSchema>;
