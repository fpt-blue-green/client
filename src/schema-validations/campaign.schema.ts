import { constants } from '@/lib/utils';
import { z } from 'zod';

export const basicSchema = z
  .object({
    name: z.string().min(1, 'Vui lòng nhập tên chiến dịch'),
    title: z.string().min(1, 'Vui lòng nhập tiêu đề chiến dịch'),
    description: z.string().min(50, 'Vui lòng ít nhất 50 kí tự'),
    startDate: z.date({ required_error: 'Vui lòng chọn ngày bắt đầu' }).min(constants.yesterday, 'Ngày không hợp lệ'),
    endDate: z.date({ required_error: 'Vui lòng chọn ngày kết thúc' }).min(constants.yesterday, 'Ngày không hợp lệ'),
    budget: z
      .number({ required_error: 'Vui lòng nhập ngân sách ước tính' })
      .min(50000, 'Vui lòng nhập giá trị lớn hơn 50.000'),
  })
  .strict();

export type BasicBodyType = z.infer<typeof basicSchema>;
