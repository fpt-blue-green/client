import { z } from 'zod';

export const basicSchema = z
  .object({
    name: z.string().min(2, 'Vui lòng nhập ít nhất 2 kí tự'),
    address: z.string().min(1, 'Vui lòng chọn địa chỉ của bạn'),
    description: z.string().max(255, 'Không nhập quá 255 kí tự').optional(),
  })
  .strict();

export const socialSchema = z
  .object({
    websiteLink: z.string().optional(),
    facebookLink: z.string().optional(),
    tiktokLink: z.string().optional(),
    instagramLink: z.string().optional(),
    youtubeLink: z.string().optional(),
  })
  .strict();

export type BasicBodyType = z.infer<typeof basicSchema>;
export type SocialBodyType = z.infer<typeof socialSchema>;
