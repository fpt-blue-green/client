/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { fetcher } from '@/lib/http';
import ICampaign from '@/types/campaign';
import { ICampaignOverview } from '@/types/campaign-tracking';
import IChat from '@/types/chat';
import { ECampaignStatus, EJobStatus, EOfferStatus, ERole } from '@/types/enum';
import { IFilterList } from '@/types/filter-list';
import IInfluencer from '@/types/influencer';
import IInfluencerJobs from '@/types/influencer-jobs';
import IJob from '@/types/job';
import useSWR, { mutate as mutateGlobal } from 'swr';
import useSWRImmutable from 'swr/immutable';

const fetchRequest = {
  favorites: (fetch = false) => useSWRImmutable<IInfluencer[]>(fetch ? '/Brand/favorites' : null, fetcher),
  campaign: {
    available: () => useSWRImmutable<IFilterList<ICampaign>>('/Campaigns', fetcher),
    getById: (id: string) => useSWRImmutable<ICampaign>(`/Campaigns/${id}`, fetcher),
    currentBrand: (fetch = false, statuses?: ECampaignStatus[], page = 1, pageSize = 12) => {
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
    trackingInfluencers: (
      id: string,
      jobStatuses?: EJobStatus[],
      offerStatuses?: EOfferStatus[],
      page = 1,
      pageSize = 12,
    ) => {
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
    trackingOverview: (id: string) => useSWR<ICampaignOverview>(`/Campaigns/${id}/jobDetailBase`, fetcher),
    statisticalChart: (id: string) =>
      useSWR<{ date: string; totalReaction: number }[]>(`/Campaigns/${id}/jobDetailStatistic`, fetcher),
  },
  influencer: {
    jobs: (page = 1, pageSize = 10, campaignStatus?: ECampaignStatus[], jobStatus?: EJobStatus[], from?: ERole) => {
      const searchParams = new URLSearchParams();
      searchParams.append('PageIndex', page.toString());
      searchParams.append('PageSize', pageSize.toString());
      campaignStatus?.forEach((status) => searchParams.append('CampaignStatuses', status.toString()));
      jobStatus?.forEach((status) => searchParams.append('JobStatuses', status.toString()));
      if (from) searchParams.append('From', from.toString());
      return useSWR<IFilterList<IJob>>('/Influencer/jobs?' + searchParams, fetcher);
    },
  },
  influencers: {
    list: (searchParams?: URLSearchParams) =>
      useSWRImmutable<IFilterList<IInfluencer>>(`/Influencers?${searchParams}`, fetcher),
  },
  job: {
    statistical: () => useSWR<{ jobStatus: EJobStatus; count: number }[]>('/Job/statistical', fetcher),
  },
  chat: {
    list: () => useSWRImmutable<IChat[]>('/Contact/chat/contacts', fetcher),
  },
};

export default fetchRequest;
