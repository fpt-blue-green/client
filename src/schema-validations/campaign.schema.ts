import { EContentType, EPlatform } from '@/types/enum';
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

const contentSchema = z.object({
  id: z.string().optional(),
  platform: z.nativeEnum(EPlatform, { required_error: 'Chọn nền tảng' }),
  quantity: z.number({ required_error: 'Nhập số lượng' }).int('Nhập giá trị nguyên').min(1, 'Nhập giá trị lớn hơn 0'),
  contentType: z.nativeEnum(EContentType, { required_error: 'Chọn nội dung' }),
  price: z
    .number({ required_error: 'Nhập giá tiền' })
    .int('Nhập giá trị nguyên')
    .min(50000, 'Nhập giá trị lớn hơn hoặc bằng 50.000'),
  description: z.string({ required_error: 'Vui lòng nhập mô tả chi tiết' }).min(1, 'Vui lòng nhập mô tả chi tiết'),
});

export const contentsSchema = z
  .object({
    contents: z.array(contentSchema),
  })
  .refine(
    (data) => {
      const seen = new Map<string, number[]>(); // Dùng Map để lưu các vị trí của phần tử
      let hasDuplicates = false;
      data.contents.forEach((content, index) => {
        const key = `${content.platform}-${content.contentType}`; // Tạo key để kiểm tra trùng lặp

        if (seen.has(key)) {
          // Nếu đã thấy key này, thêm vị trí (index) vào mảng
          seen.get(key)!.push(index);
          hasDuplicates = true;
        } else {
          seen.set(key, [index]);
        }
      });

      return !hasDuplicates; // Trả về true nếu không có trùng lặp
    },
    {
      message: 'Không được có các gói có cùng nền tảng và loại nội dung.',
      path: ['contents'], // Đường dẫn chung, sẽ cập nhật chi tiết hơn bên dưới
    },
  )
  .superRefine((data, ctx) => {
    // Xử lý lỗi trùng lặp và thêm lỗi chi tiết vào context
    const seen = new Map<string, number[]>();

    data.contents.forEach((content, index) => {
      const key = `${content.platform}-${content.contentType}`;

      if (seen.has(key)) {
        seen.get(key)!.push(index);
      } else {
        seen.set(key, [index]);
      }
    });

    // Thêm lỗi vào context nếu có trùng lặp
    seen.forEach((indexes) => {
      if (indexes.length > 1) {
        indexes.forEach((i) => {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Nội dung bị trùng lặp.',
            path: ['contents', i, 'contentType'], // Đường dẫn cụ thể đến lỗi
          });
        });
      }
    });
  });

export const meetingSchema = z
  .object({
    roomName: z
      .string()
      .min(1, 'Vui lòng nhập tên phòng')
      .regex(/^[A-Za-z0-9_-]+$/, 'Tên phòng chỉ được chứa chữ cái, chữ số, _, -'),
    startAt: z
      .date({ required_error: 'Vui lòng chọn thời gian bắt đầu' })
      .min(new Date(), 'Thời gian phải lớn hơn thời gian hiện tại'),
    endAt: z
      .date({ required_error: 'Vui lòng chọn thời gian kết thúc' })
      .min(new Date(), 'Thời gian phải lớn hơn thời gian hiện tại')
      .optional(),
    participators: z.array(z.string()).min(1, 'Phải có ít nhất một người tham gia'),
    description: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.endAt && data.startAt >= data.endAt) {
      ctx.addIssue({
        path: ['startAt'],
        code: 'custom',
        message: 'Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc',
      });
      ctx.addIssue({
        path: ['endAt'],
        code: 'custom',
        message: 'Thời gian kết thúc phải lớn hơn thời gian bắt đầu',
      });
    }
  });

export type BasicBodyType = z.infer<typeof basicSchema>;
export type ContentBodyType = z.infer<typeof contentSchema>;
export type ContentsBodyType = z.infer<typeof contentsSchema>;
export type MeetingBodyType = z.infer<typeof meetingSchema>;
