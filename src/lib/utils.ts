import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { EventEmitter } from 'fbemitter';
import { ConfirmBody } from '@/components/confirm-dialog';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const constants = {
  sthWentWrong: 'Đã có lỗi xảy ra',
  passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^.,])[A-Za-z\d@$!%*?&^.,]{8,}$/,
  phoneRegex: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
  otpRegex: /[0-9]{6}\b/g,
  slugRegex: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
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
};

// Emitter
export const eventEmitter = new EventEmitter();

export const emitter = {
  confirm: (body: ConfirmBody) => eventEmitter.emit('confirm', body),
};
