import {
  ECampaignStatus,
  EJobStatus,
  EOfferStatus,
  EPaymentStatus,
  EPaymentType,
  EReportStatus,
  ERole,
} from '@/types/enum';
import { FaTimes } from 'react-icons/fa';
import { FaCheck, FaHourglassHalf } from 'react-icons/fa6';
import { IconType } from 'react-icons/lib';
import { MdMoneyOff } from 'react-icons/md';
import { TbClockX } from 'react-icons/tb';
import { GiPayMoney } from 'react-icons/gi';

interface EnumLabel {
  label: string;
  color: 'secondary' | 'warning' | 'info' | 'success' | 'destructive';
  backgroundColor?: 'bg-secondary' | 'bg-warning' | 'bg-info' | 'bg-success' | 'bg-destructive';
  textColor?: 'text-secondary' | 'text-warning' | 'text-info' | 'text-success' | 'text-destructive';
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
    backgroundColor: 'bg-warning',
  },
  [EJobStatus.Approved]: {
    label: 'Chấp thuận',
    color: 'success',
    backgroundColor: 'bg-success',
  },
  [EJobStatus.InProgress]: {
    label: 'Đang thực hiện',
    color: 'info',
    backgroundColor: 'bg-info',
  },
  [EJobStatus.Completed]: {
    label: 'Hoàn thành',
    color: 'success',
    backgroundColor: 'bg-success',
  },
  [EJobStatus.Failed]: {
    label: 'Không đạt',
    color: 'destructive',
    backgroundColor: 'bg-destructive',
  },
  [EJobStatus.NotCreated]: {
    label: 'Bị hủy bỏ',
    color: 'secondary',
    backgroundColor: 'bg-secondary',
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
    label: 'Chờ đặt cọc',
    color: 'info',
    Icon: GiPayMoney,
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
    label: 'Đã tham gia',
    color: 'success',
    Icon: FaCheck,
    description: 'Lời đề nghị hoàn tất và bạn đã tham gia vào chiến dịch',
  },
};
export const convertRoleTypeToText = (roleType: ERole): string => {
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
};

export const convertMetricTrendType = (value: string): string => {
  switch (value) {
    case 'Revenue':
      return 'Doanh Thu';
    case 'NewUsers':
      return 'Người dùng mới';
    case 'ActiveUsers':
      return 'Tài khoản đang hoạt động';
    case 'ActiveCampaigns':
      return 'Chiến dịch được tạo';
    default:
      return 'Khác';
  }
};

export const paymentStatus: { [key: string]: EnumLabel } = {
  [EPaymentStatus.Pending]: {
    label: 'Đang chờ',
    color: 'warning',
    textColor: 'text-warning',
  },
  [EPaymentStatus.Rejected]: {
    label: 'Từ chối',
    color: 'destructive',
    textColor: 'text-destructive',
  },
  [EPaymentStatus.Done]: {
    label: 'Thành công',
    color: 'success',
    textColor: 'text-success',
  },
  [EPaymentStatus.Error]: {
    label: 'Thất bại',
    color: 'destructive',
    textColor: 'text-destructive',
  },
};

export const paymentType: { [key: string]: EnumLabel } = {
  [EPaymentType.BrandPayment]: {
    label: 'Đặt cọc công việc',
    color: 'warning',
  },
  [EPaymentType.InfluencerPayment]: {
    label: 'Hoàn thành công việc',
    color: 'success',
  },
  [EPaymentType.Refund]: {
    label: 'Hoàn tiền đặt cọc',
    color: 'info',
  },
  [EPaymentType.WithDraw]: {
    label: 'Rút tiền',
    color: 'info',
  },
  [EPaymentType.Deposit]: {
    label: 'Nạp tiền',
    color: 'info',
  },
  [EPaymentType.BuyPremium]: {
    label: 'Nâng cấp Premium',
    color: 'info',
  },
};

export const reportStatus: { [key: string]: EnumLabel } = {
  [EReportStatus.Pending]: {
    label: 'Chờ phê duyệt',
    color: 'warning',
    textColor: 'text-warning',
  },
  [EReportStatus.Rejected]: {
    label: 'Bị từ chối',
    color: 'destructive',
    textColor: 'text-destructive',
  },
  [EReportStatus.Approved]: {
    label: 'Được chấp thuận',
    color: 'success',
    textColor: 'text-success',
  },
};

export const convertReportReason = (reason: number): string => {
  switch (reason) {
    case 0:
      return 'Lí do khác';
    case 1:
      return 'Nội dung không phù hợp';
    case 2:
      return 'Ngôn từ thù địch';
    case 3:
      return 'Gian lận';
    case 4:
      return 'Nội dung giảm mạo';
    case 5:
      return 'Không hoàn thành công việc';
    case 6:
      return 'Vi phạm điều khoản hợp đồng';
    default:
      return 'Khác';
  }
};
