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

export const estimateFollowers = (followers: number): string => {
  if (followers >= 1000 && followers <= 10000) {
    return '1k-10k followers';
  }
  if (followers > 10000 && followers <= 20000) {
    return '10k-20k followers';
  }
  return 'Out of range';
};
