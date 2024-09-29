import { z } from 'zod';

export const basicSchema = z
  .object({
    name: z.string().min(1, 'Vui lòng nhập tên chiến dịch'),
    title: z.string().min(1, 'Vui lòng nhập tiêu đề chiến dịch'),
    description: z.string().min(50, 'Vui lòng ít nhất 50 kí tự'),
    dates: z
      .tuple([z.date().optional(), z.date().optional()])
      .refine((dates) => dates[0] && dates[1], { message: 'Vui lòng chọn ngày bắt đầu và kết thúc' })
      .refine((dates) => dates[0] && dates[1] && dates[0] <= dates[1], {
        message: 'Ngày kết thúc phải sau ngày bắt đầu',
      }),
    budget: z
      .number({ required_error: 'Vui lòng nhập ngân sách ước tính' })
      .min(50000, 'Vui lòng nhập giá trị lớn hơn 50.000'),
  })
  .strict();

export type BasicBodyType = z.infer<typeof basicSchema>;
