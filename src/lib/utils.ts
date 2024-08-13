import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const constants = {
  sthWentWrong: 'Đã có lỗi xảy ra',
  passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

const formats = {
  price: (price: number, discount = 0): string => {
    const finalPrice = price - price * discount * 100;
    return finalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  },
};

const estimateFollowers = (followers: number) => {
  let rs = '';
  switch (true) {
    case followers >= 1000 && followers <= 10000:
      rs = '1k-10k followers';
      break;
    case followers >= 10000 && followers <= 20000:
      rs = '10k-20k followers';
      break;
    default:
      rs = 'Out of range';
      break;
  }
  return rs;
};
export { cn, constants, formats, estimateFollowers };
