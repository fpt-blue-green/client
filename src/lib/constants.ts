import { ECampaignStatus, EJobStatus } from '@/types/enum';

interface EnumToText {
  [key: string]: { label: string; color: 'secondary' | 'warning' | 'info' | 'success' | 'destructive' };
}

export const campaignStatus: EnumToText = {
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

export const jobStatus: EnumToText = {
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
