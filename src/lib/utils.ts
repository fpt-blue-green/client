import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
};

export const estimateFollowers = (followers: number): string => {
  if (followers >= 1000000000) {
    return (followers / 1000000000).toFixed(1) + 'b';
  } else if (followers >= 1000000) {
    return (followers / 1000000).toFixed(1) + 'm';
  } else if (followers >= 1000) {
    return (followers / 1000).toFixed(1) + 'k';
  } else {
    return followers.toString();
  }
};
