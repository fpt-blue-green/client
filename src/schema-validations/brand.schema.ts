import { z } from 'zod';

const isBrowser = typeof window !== 'undefined';

export const basicSchema = z
  .object({
    name: z.string().min(2, 'Vui lòng nhập ít nhất 2 kí tự'),
    address: z.string().min(1, 'Vui lòng chọn địa chỉ của bạn'),
    description: z.string().max(255, 'Không nhập quá 255 kí tự').optional(),
  })
  .strict();

export const socialSchema = z
  .object({
    websiteUrl: z.string().url('Vui lòng nhập một URL hợp lệ').optional(),
    facebookUrl: z.string().url('Vui lòng nhập một URL hợp lệ').optional(),
    tiktokUrl: z.string().url('Vui lòng nhập một URL hợp lệ').optional(),
    instagramUrl: z.string().url('Vui lòng nhập một URL hợp lệ').optional(),
    youtubeUrl: z.string().url('Vui lòng nhập một URL hợp lệ').optional(),
  })
  .strict();

export const imagesSchema = z
  .object({
    avatar: z.instanceof(isBrowser ? FileList : Array),
    cover: z.instanceof(isBrowser ? FileList : Array),
  })
  .strict()
  .refine(
    ({ avatar, cover }) =>
      isBrowser &&
      ((cover instanceof FileList && cover && cover.length > 0) ||
        (avatar instanceof FileList && avatar && avatar.length > 0)),
    { path: ['cover'], message: 'Vui lòng tải lên ảnh bìa hoặc ảnh đại diện' },
  );

export type BasicBodyType = z.infer<typeof basicSchema>;
export type SocialBodyType = z.infer<typeof socialSchema>;
export type ImagesBodyType = z.infer<typeof imagesSchema>;
