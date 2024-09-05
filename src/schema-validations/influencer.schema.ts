import { EGender, EPlatform } from '@/types/enum';
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

export const packageSchema = z.object({
  platform: z.nativeEnum(EPlatform, { required_error: 'Chọn nền tảng' }),
  quantity: z.number({ required_error: 'Nhập số lượng' }).int('Nhập giá trị nguyên').min(1, 'Nhập giá trị lớn hơn 0'),
  type: z.string({ required_error: 'Chọn loại nội dung' }),
  duration: z.number().int('Nhập giá trị nguyên').min(0, 'Nhập giá trị lớn hơn 0').optional(),
  timeUnit: z.enum(['s', 'm', 'h']).optional(),
  price: z
    .number({ required_error: 'Nhập giá tiền' })
    .int('Nhập giá trị nguyên')
    .min(50000, 'Nhập giá trị lớn hơn hoặc bằng 50.000'),
  description: z.string().optional(),
});

export const packagesSchema = z.object({
  packages: z.array(packageSchema),
});

export type GeneralBodyType = z.infer<typeof generalSchema>;
export type ChannelBodyType = z.infer<typeof channelSchema>;
export type PackagesBodyType = z.infer<typeof packagesSchema>;
