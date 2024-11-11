import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { EventEmitter } from 'fbemitter';
import { ConfirmBody } from '@/components/confirm-dialog';
import { campaignStatus, jobStatus, offerStatus } from './constants';
import { ERole } from '@/types/enum';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const constants = {
  sthWentWrong: 'Đã có lỗi xảy ra',
  passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^.,])[A-Za-z\d@$!%*?&^.,]{8,}$/,
  phoneRegex: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
  otpRegex: /[0-9]{6}\b/g,
  slugRegex: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  yesterday: new Date(new Date().setDate(new Date().getDate() - 1)),
  campaignStatus,
  jobStatus,
  offerStatus,
};

export const formats = {
  price: (price: number, discount = 0): string => {
    const finalPrice = price - price * discount * 100;
    return finalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  },
  bigNum: (value: number | string) => {
    if (value === '' || value === undefined || value === null) return '';
    const numberValue = typeof value === 'string' ? parseFloat(value) : value;
    return numberValue.toLocaleString('vi-VN'); // Định dạng số với dấu phân cách
  },
  estimate: (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + ' Tr';
    } else if (num >= 10000) {
      return (num / 1000).toFixed(1) + 'N';
    } else if (num >= 1000) {
      return num.toLocaleString('vi-VN');
    } else {
      return num.toString();
    }
  },
  date: (input: Date | string, showTime = false, options?: Intl.DateTimeFormatOptions): string => {
    // Chuyển đổi input thành Date nếu là string
    const date = typeof input === 'string' ? new Date(input) : input;

    // Kiểm tra xem date có hợp lệ hay không
    if (isNaN(date.getTime())) {
      return '';
    }
    const defaultDateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };

    const defaultTimeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };

    const dateFormatted = new Intl.DateTimeFormat('vi-VN', {
      ...defaultDateOptions,
      ...options,
    }).format(date);

    const timeFormatted = showTime
      ? new Intl.DateTimeFormat('vi-VN', {
          ...defaultTimeOptions,
          ...options,
        }).format(date)
      : '';

    return timeFormatted ? `${dateFormatted} ${timeFormatted}` : dateFormatted;
  },
  timeAgo: (date: Date | string) => {
    const result = formatDistanceToNow(date, { locale: vi });
    return result.replace(' trước', '').replace('khoảng ', '');
  },
};

export const functions = {
  convertSecondsToTime: (seconds: number): { value: number; unit: 'h' | 'm' | 's' } => {
    if (seconds % 3600 === 0) {
      return { value: seconds / 3600, unit: 'h' };
    } else if (seconds % 60 === 0) {
      return { value: seconds / 60, unit: 'm' };
    } else {
      return { value: seconds, unit: 's' };
    }
  },
  convertRoleTypeToText: (roleType: ERole): string => {
    switch (roleType) {
      case ERole.Admin:
        return 'Quản trị viên';
      case ERole.Influencer:
        return 'Nhà sáng tạo';
      case ERole.Brand:
        return 'Nhãn hàng';
      default:
        return 'Khác';
    }
  },
  convertMetricTrendType: (value: string): string => {
    switch (value) {
      case 'Revenue':
        return 'Doanh Thu';
      case 'NewUsers':
        return 'Người dùng mới';
      case 'ActiveUsers':
        return 'Tài khoản đang hoạt động';
      case 'ActiveCampaigns':
        return 'Chiến dịch đang hoạt động';
      default:
        return 'Khác';
    }
  },
};

// Emitter
export const eventEmitter = new EventEmitter();

export const emitter = {
  confirm: (body: ConfirmBody) => eventEmitter.emit('confirm', body),
};
