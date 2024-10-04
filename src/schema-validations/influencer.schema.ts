import { constants } from '@/lib/utils';
import { EContentType, EGender, EPlatform } from '@/types/enum';
import { z } from 'zod';

export const generalSchema = z
  .object({
    fullName: z.string().min(2, 'Vui lòng nhập tên ít nhất 2 kí tự'),
    summarise: z.string().min(1, 'Vui lòng không để trống phần tóm tắt'),
    description: z.string().max(255, 'Không nhập quá 255 kí tự').optional(),
    slug: z.string().min(1, 'Vui lòng nhập tên người dùng').regex(constants.slugRegex, 'Tên người dùng không hợp lệ'),
    address: z.string().min(1, 'Vui lòng chọn địa chỉ của bạn'),
    gender: z.nativeEnum(EGender),
  })
  .strict();

const channelSchema = z
  .object({
    id: z.string().optional(),
    platform: z.nativeEnum(EPlatform),
    userName: z.string(),
    show: z.boolean(),
  })
  .strict()
  .refine(
    (data) => {
      if (data.show) {
        return data.userName.length > 0;
      }
      return true;
    },
    { message: 'Vui lòng nhập tên người dùng', path: ['userName'] },
  )
  .refine(
    ({ show, platform, userName }) => {
      if (show) {
        if (platform === EPlatform.YouTube) {
          return userName.startsWith('@');
        }
      }
      return true;
    },
    { message: 'Tên người dùng YouTube phải bắt đầu bằng @', path: ['userName'] },
  );

export const channelsSchema = z.object({
  channels: z
    .array(channelSchema)
    .refine((data) => data.filter((c) => c.show).length > 0, { message: 'Bạn phải có ít nhất 1 kênh mạng xã hội' }),
});

const packageSchema = z.object({
  id: z.string().optional(),
  platform: z.nativeEnum(EPlatform, { required_error: 'Chọn nền tảng' }),
  quantity: z.number({ required_error: 'Nhập số lượng' }).int('Nhập giá trị nguyên').min(1, 'Nhập giá trị lớn hơn 0'),
  contentType: z.nativeEnum(EContentType, { required_error: 'Chọn nội dung' }),
  duration: z.number().int('Nhập giá trị nguyên').min(0, 'Nhập giá trị lớn hơn 0').nullable().optional(),
  timeUnit: z.enum(['s', 'm', 'h']).optional(),
  price: z
    .number({ required_error: 'Nhập giá tiền' })
    .int('Nhập giá trị nguyên')
    .min(50000, 'Nhập giá trị lớn hơn hoặc bằng 50.000'),
  description: z.string().optional(),
});

export const packagesSchema = z
  .object({
    packages: z.array(packageSchema),
  })
  .refine(
    (data) => {
      const seen = new Map<string, number[]>(); // Dùng Map để lưu các vị trí của phần tử
      let hasDuplicates = false;
      data.packages.forEach((pkg, index) => {
        const key = `${pkg.platform}-${pkg.contentType}`; // Tạo key để kiểm tra trùng lặp

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
      path: ['packages'], // Đường dẫn chung, sẽ cập nhật chi tiết hơn bên dưới
    },
  )
  .superRefine((data, ctx) => {
    // Xử lý lỗi trùng lặp và thêm lỗi chi tiết vào context
    const seen = new Map<string, number[]>();

    data.packages.forEach((pkg, index) => {
      const key = `${pkg.platform}-${pkg.contentType}`;

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
            path: ['packages', i, 'contentType'], // Đường dẫn cụ thể đến lỗi
          });
        });
      }
    });
  });

export const phoneSchema = z.object({
  phone: z.string().regex(constants.phoneRegex, 'Số điện thoại không đúng định dạng'),
  otp: z.string().regex(constants.otpRegex, 'Vui lòng nhập mã OTP'),
});

export const reviewSchema = z.object({
  rating: z.number({ required_error: 'Vui lòng đánh giá sao' }).min(1, 'Vui lòng đánh giá sao').max(5),
  content: z.string().optional(),
});

export type GeneralBodyType = z.infer<typeof generalSchema>;
export type ChannelBodyType = z.infer<typeof channelSchema>;
export type ChannelsBodyType = z.infer<typeof channelsSchema>;
export type PackageBodyType = z.infer<typeof packageSchema>;
export type PackagesBodyType = z.infer<typeof packagesSchema>;
export type PhoneBodyType = z.infer<typeof phoneSchema>;
export type ReviewBodyType = z.infer<typeof reviewSchema>;
