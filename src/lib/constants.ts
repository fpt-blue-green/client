import { ECampaignStatus, EJobStatus, EOfferStatus } from '@/types/enum';
import { FaTimes } from 'react-icons/fa';
import { FaCheck, FaHourglassHalf } from 'react-icons/fa6';
import { IconType } from 'react-icons/lib';
import { MdMoneyOff } from 'react-icons/md';
import { TbClockX } from 'react-icons/tb';
import { GiPayMoney } from 'react-icons/gi';

interface EnumLabel {
  label: string;
  color: 'secondary' | 'warning' | 'info' | 'success' | 'destructive';
}

interface EnumLabelWithIcon extends EnumLabel {
  Icon: IconType;
  description?: string;
}

export const campaignStatus: { [key: string]: EnumLabel } = {
  [ECampaignStatus.Draft]: {
    label: 'Bản nháp',
    color: 'secondary',
  },
  [ECampaignStatus.Published]: {
    label: 'Công khai',
    color: 'info',
  },
  [ECampaignStatus.Active]: {
    label: 'Đang diễn ra',
    color: 'warning',
  },
  [ECampaignStatus.Completed]: {
    label: 'Hoàn thành',
    color: 'success',
  },
  [ECampaignStatus.Expired]: {
    label: 'Quá hạn',
    color: 'destructive',
  },
};

export const jobStatus: { [key: string]: EnumLabel } = {
  [EJobStatus.Pending]: {
    label: 'Chờ xác nhận',
    color: 'warning',
  },
  [EJobStatus.InProgress]: {
    label: 'Đang thực hiện',
    color: 'info',
  },
  [EJobStatus.Completed]: {
    label: 'Hoàn thành',
    color: 'success',
  },
  [EJobStatus.Failed]: {
    label: 'Không đạt',
    color: 'destructive',
  },
  [EJobStatus.NotCreated]: {
    label: 'Từ chối',
    color: 'secondary',
  },
};

export const offerStatus: { [key: string]: EnumLabelWithIcon } = {
  [EOfferStatus.Offering]: {
    label: 'Đang chờ xử lý',
    color: 'warning',
    Icon: FaHourglassHalf,
    description: 'Lời đề nghị đang chờ được xử lý',
  },
  [EOfferStatus.Rejected]: {
    label: 'Từ chối',
    color: 'destructive',
    Icon: FaTimes,
    description: 'Lời đề nghị đã bị từ chối',
  },
  [EOfferStatus.WaitingPayment]: {
    label: 'Chấp thuận',
    color: 'success',
    Icon: FaCheck,
    description: 'Lời đề nghị đã chấp nhận và đang đợi nhãn hàng thanh toán đặt cọc',
  },
  [EOfferStatus.Cancelled]: {
    label: 'Đã huỷ',
    color: 'destructive',
    Icon: MdMoneyOff,
    description: 'Lời đề nghị đã bị huỷ khi nhãn hàng từ chối thanh toán',
  },
  [EOfferStatus.Expired]: {
    label: 'Đã hết hạn',
    color: 'secondary',
    Icon: TbClockX,
    description: 'Lời để nghị đã hết hạn sau một thời gian không có phản hồi',
  },
  [EOfferStatus.Done]: {
    label: 'Đã thanh toán',
    color: 'success',
    Icon: GiPayMoney,
    description: 'Lời đề nghị hoàn tất và nhãn',
  },
};
