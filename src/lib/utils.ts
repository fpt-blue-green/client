import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { EventEmitter } from 'fbemitter';
import { ConfirmBody } from '@/components/confirm-dialog';
import { campaignStatus, jobStatus, offerStatus, paymentStatus, paymentType, reportStatus } from './constants';
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
  slugRegex: /^[a-z0-9]+(?:[-._][a-z0-9]+)*$/,
  yesterday: new Date(new Date().setDate(new Date().getDate() - 1)),
  campaignStatus,
  jobStatus,
  offerStatus,
  paymentStatus,
  paymentType,
  reportStatus,
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
    if (!date || isNaN(date.getTime())) {
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
  getDominantColor: (image: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = image;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject('Không thể tạo ngữ cảnh Canvas');
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        // Map lưu số lần xuất hiện của từng màu
        const colorMap = new Map<string, number>();

        for (let i = 0; i < pixels.length; i += 4) {
          const red = pixels[i];
          const green = pixels[i + 1];
          const blue = pixels[i + 2];
          const alpha = pixels[i + 3];

          if (alpha === 0) continue;
          if (red === 255 && green === 255 && blue === 255) continue;
          if (red === 0 && green === 0 && blue === 0) continue;

          const colorKey = `${red},${green},${blue}`;
          colorMap.set(colorKey, (colorMap.get(colorKey) || 0) + 1);
        }
        let mostFrequentColor: string | null = null;
        let maxCount = 0;

        // Sử dụng colorMap.entries()
        for (const [color, count] of Array.from(colorMap.entries())) {
          if (count > maxCount) {
            maxCount = count;
            mostFrequentColor = color;
          }
        }

        if (mostFrequentColor) {
          resolve(`rgb(${mostFrequentColor})`);
        } else {
          resolve('Không tìm thấy màu hợp lệ');
        }
      };

      img.onerror = () => reject('Không thể tải ảnh');
    });
  },
};

// Emitter
export const eventEmitter = new EventEmitter();

export const emitter = {
  confirm: (body: ConfirmBody) => eventEmitter.emit('confirm', body),
};
