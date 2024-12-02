import { EContentType, EPlatform, ERole } from '@/types/enum';
import { z } from 'zod';

export const offerSchema = z
  .object({
    job: z.object({
      influencerId: z.string({ required_error: 'Lỗi thiếu influencer id' }),
      campaignId: z.string({ required_error: 'Vui lòng chọn chiến dịch' }),
    }),
    offer: z.object({
      platform: z.nativeEnum(EPlatform, { required_error: 'Chọn nền tảng' }),
      quantity: z
        .number({ required_error: 'Nhập số lượng' })
        .int('Nhập giá trị nguyên')
        .min(1, 'Nhập giá trị lớn hơn 0'),
      contentType: z.nativeEnum(EContentType, { required_error: 'Chọn nội dung' }),
      duration: z.number().int('Nhập giá trị nguyên').min(0, 'Nhập giá trị lớn hơn 0').nullable().optional(),
      timeUnit: z.enum(['s', 'm', 'h']).optional(),
      targetReaction: z
        .number({ required_error: 'Nhập số lượt tương tác' })
        .int('Nhập giá trị nguyên')
        .min(0, 'Nhập giá trị lớn hơn 0'),
      from: z.nativeEnum(ERole),
      price: z
        .number({ required_error: 'Nhập giá tiền' })
        .int('Nhập giá trị nguyên')
        .min(50000, 'Nhập giá trị lớn hơn hoặc bằng 50.000'),
      description: z.string().optional(),
    }),
  })
  .strict();

export const reofferSchema = z.object({
  quantity: z.number({ required_error: 'Nhập số lượng' }).int('Nhập giá trị nguyên').min(1, 'Nhập giá trị lớn hơn 0'),
  targetReaction: z
    .number({ required_error: 'Nhập số lượt tương tác' })
    .int('Nhập giá trị nguyên')
    .min(0, 'Nhập giá trị lớn hơn 0'),
  price: z
    .number({ required_error: 'Nhập giá tiền' })
    .int('Nhập giá trị nguyên')
    .min(50000, 'Nhập giá trị lớn hơn hoặc bằng 50.000'),
  duration: z.number().int('Nhập giá trị nguyên').min(0, 'Nhập giá trị lớn hơn 0').nullable().optional(),
  timeUnit: z.enum(['s', 'm', 'h']).optional(),
  description: z.string().optional(),
});

export const jobLinksSchema = z.object({
  links: z.array(
    z.object({
      link: z.string().url('Đường dẫn liên kết không hợp lệ'),
      isApprove: z.boolean().optional(),
    }),
  ),
});

export type OfferBodyType = z.infer<typeof offerSchema>;
export type ReofferBodyType = z.infer<typeof reofferSchema>;
export type JobLinksBodyType = z.infer<typeof jobLinksSchema>;
