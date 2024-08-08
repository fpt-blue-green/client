import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const constants = {
  sthWentWrong: 'Đã có lỗi xảy ra',
  passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

export const formats = {
  price: (price: number, discount = 0): string => {
    const finalPrice = price - price * discount * 100;
    return finalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  },
};
