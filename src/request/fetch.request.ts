/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { fetcher } from '@/lib/http';
import IMetricTrend, { IPieChartDate } from '@/types/analytics';
import IBank from '@/types/bank';
import ICampaign from '@/types/campaign';
import { ICampaignOverview } from '@/types/campaign-tracking';
import IChat from '@/types/chat';
import { ECampaignStatus, EJobStatus, EOfferStatus, EPlatform, ERole } from '@/types/enum';
import { IFilterList } from '@/types/filter-list';
import IInfluencer from '@/types/influencer';
import IInfluencerJobs from '@/types/influencer-jobs';
import IJob from '@/types/job';
import IMeeting from '@/types/meeting';
import { IPaymentHistory } from '@/types/payment';
import { ISystemSetting } from '@/types/system-settings';
import IUser from '@/types/user';
import useSWR, { mutate as mutateGlobal } from 'swr';
import useSWRImmutable from 'swr/immutable';

const fetchRequest = {
  favorites: (fetch = false) => useSWRImmutable<IInfluencer[]>(fetch ? '/Brand/favorites' : null, fetcher),
  campaign: {
    available: (searchParams: URLSearchParams) => {
      const swr = useSWRImmutable<IFilterList<ICampaign>>('/Campaigns?' + searchParams, fetcher);
      const mutate = () => {
        mutateGlobal<IFilterList<ICampaign>>((key: string) => key.startsWith('/Campaigns'), undefined, {
          revalidate: true,
        });
      };
      return { ...swr, mutate };
    },
    getById: (id: string) => useSWRImmutable<ICampaign>(`/Campaigns/${id}`, fetcher),
    currentBrand: (fetch = false, statuses?: ECampaignStatus[], page = 1, pageSize = 50) => {
      const searchParams = new URLSearchParams();
      searchParams.append('PageIndex', page.toString());
      searchParams.append('PageSize', pageSize.toString());
      statuses?.forEach((status) => searchParams.append('CampaignStatus', String(status)));
      const swr = useSWRImmutable<IFilterList<ICampaign>>(fetch ? '/Brand/campaigns?' + searchParams : null, fetcher);
      const mutate = () =>
        mutateGlobal<IFilterList<ICampaign>>((key: string) => key.startsWith('/Brand/campaigns'), undefined, {
          revalidate: true,
        });
      return { ...swr, mutate };
    },
    members: (id: string, jobStatuses?: EJobStatus[], offerStatuses?: EOfferStatus[], page = 1, pageSize = 50) => {
      const searchParams = new URLSearchParams();
      searchParams.append('PageIndex', page.toString());
      searchParams.append('PageSize', pageSize.toString());
      jobStatuses?.forEach((status) => searchParams.append('JobStatuses', String(status)));
      offerStatuses?.forEach((status) => searchParams.append('OfferStatuses', String(status)));
      const swr = useSWR<IFilterList<IInfluencerJobs>>(`/Campaigns/${id}/Influencers?` + searchParams, fetcher);
      const mutate = () =>
        mutateGlobal<IFilterList<IInfluencerJobs>>(
          (key: string) => key.startsWith(`/Campaigns/${id}/Influencers`),
          undefined,
          { revalidate: true },
        );
      return { ...swr, mutate };
    },
    memberStatistical: (id: string) => useSWR<{ [key: number]: number }>(`/Campaigns/${id}/jobStatusCount`, fetcher),
    trackingOverview: (id: string) => useSWR<ICampaignOverview>(`/Campaigns/${id}/jobDetailBase`, fetcher),
    statisticalChart: (id: string) =>
      useSWR<{ date: string; totalReaction: number }[]>(`/Campaigns/${id}/jobDetailStatistic`, fetcher),
    statisticalPlatform: (id: string) =>
      useSWRImmutable<{ platform: EPlatform; value: number }[]>(`/Campaigns/${id}/jobDetailBasePlatform`, fetcher),
    participants: (id: string) => useSWR<IUser[]>(`/Campaigns/${id}/participant`, fetcher),
    meetings: (id: string) => useSWRImmutable<IFilterList<IMeeting>>(`/Campaigns/${id}/meetingRoom`, fetcher),
    listByBrand: (id: string) => useSWRImmutable<ICampaign[]>(`Brands/${id}/campaigns`, fetcher),
    recommendation: (fetch: boolean) =>
      useSWRImmutable<ICampaign[]>(fetch ? '/Campaigns/recommended' : undefined, fetcher),
  },
  influencer: {
    jobs: (
      campaignStatus?: ECampaignStatus[],
      jobStatus?: EJobStatus[],
      from?: ERole,
      campaignId?: string,
      page = 1,
      pageSize = 50,
    ) => {
      const searchParams = new URLSearchParams();
      searchParams.append('PageIndex', page.toString());
      searchParams.append('PageSize', pageSize.toString());
      if (campaignId) {
        searchParams.append('CampaignId', campaignId);
      }
      campaignStatus?.forEach((status) => searchParams.append('CampaignStatuses', status.toString()));
      jobStatus?.forEach((status) => searchParams.append('JobStatuses', status.toString()));
      if (from) searchParams.append('From', from.toString());
      return useSWR<IFilterList<IJob>>('/Influencer/jobs?' + searchParams, fetcher);
    },
  },
  influencers: {
    list: (searchParams?: URLSearchParams) =>
      useSWRImmutable<IFilterList<IInfluencer>>(`/Influencers?${searchParams}`, fetcher),
    isReported: (id: string) => useSWRImmutable<boolean>(`/Influencers/${id}/isReported`, fetcher),
    searchAI: (prompt: string, pageIndex = 1, pageSize = 50) => {
      const searchParams = new URLSearchParams();
      searchParams.append('prompt', prompt);
      searchParams.append('pageIndex', pageIndex.toString());
      searchParams.append('pageSize', pageSize.toString());
      return useSWRImmutable<IFilterList<IInfluencer>>(prompt ? `/Influencers/aiSearch?${searchParams}` : '', fetcher);
    },
  },
  job: {
    statistical: () => useSWR<{ jobStatus: EJobStatus; count: number }[]>('/Job/statistical', fetcher),
    links: (id: string) => useSWRImmutable<{ link: string; isApprove: boolean }[]>(`/Job/${id}/link`, fetcher),
    statisticalChart: (id?: string, link?: string) => {
      const searchParams = new URLSearchParams();
      if (link) {
        searchParams.append('link', link);
      }
      return useSWR<{ date: string; totalReaction: number }[]>(
        id ? `/Job/${id}/JobDetails?` + searchParams : null,
        fetcher,
      );
    },
    detailStatistical: (id?: string, link?: string) => {
      const searchParams = new URLSearchParams();
      if (link) {
        searchParams.append('link', link);
      }
      return useSWR<ICampaignOverview>(id ? `/Job/${id}/JobDetailBaseData?` + searchParams : null, fetcher);
    },
  },
  chat: {
    list: (search?: string) => {
      const searchParams = new URLSearchParams();
      if (search) {
        searchParams.append('searchValue', search);
      }
      return useSWR<IChat[]>(`/Contact/chat/contacts?${searchParams}`, fetcher);
    },
    details: (id: string) => useSWRImmutable<IChat>(`/Contact/chat/contacts/${id}`, fetcher),
    member: (campaignId?: string) =>
      useSWRImmutable<{ joinAt: string; user: IUser }[]>(campaignId ? `/Contact/member/${campaignId}` : null, fetcher),
  },
  user: {
    wallet: (fetch?: boolean) =>
      useSWR<{ currentAmount: number; spendAmount: number }>(fetch ? '/User/wallet' : null, fetcher),
    paymentHistory: () => useSWRImmutable<IPaymentHistory>('/User/paymentHistory', fetcher),
    loginHistory: () =>
      useSWRImmutable<
        {
          deviceOperatingSystem: string;
          browserName: string;
          deviceType: string;
          lastLoginTime: string;
        }[]
      >('/User/loginHistory', fetcher),
  },
  settings: () => useSWRImmutable<ISystemSetting[]>('/SystemSetting', fetcher),
  payments: {
    banks: () => useSWRImmutable<{ data: IBank[] }>('https://api.httzip.com/api/bank/list', fetcher),
  },
  metricTrends: () => useSWRImmutable<IMetricTrend[]>('/AdminStatistic/monthlyMetricsTrend', fetcher),
  revenue: () => useSWRImmutable<IPieChartDate[]>('/AdminStatistic/revenue', fetcher),
  campaigns: (brandId: string) => useSWRImmutable<ICampaign[]>(`/Brands/${brandId}/campaigns`, fetcher),
  fee: () => useSWRImmutable<number>('/Utility/withDrawFee', fetcher),
};

export default fetchRequest;
