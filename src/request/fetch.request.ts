/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { fetcher } from '@/lib/http';
import ICampaign from '@/types/campaign';
import { ECampaignStatus, EJobStatus, ERole } from '@/types/enum';
import IInfluencer from '@/types/influencer';
import IJob from '@/types/job';
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';

const fetchRequest = {
  favorites: (fetch = false) => useSWR<IInfluencer[]>(fetch ? '/Brand/favorites' : null, fetcher),
  campaign: {
    available: () => useSWRImmutable<ICampaign[]>('/Campaigns', fetcher),
    currentBrand: (fetch = false) => useSWRImmutable<ICampaign[]>(fetch ? '/Brand/campaigns' : null, fetcher),
  },
  influencer: {
    jobs: (page = 1, pageSize = 10, campaignStatus?: ECampaignStatus[], jobStatus?: EJobStatus[], from?: ERole) => {
      const searchParams = new URLSearchParams();
      searchParams.append('PageIndex', page.toString());
      searchParams.append('PageSize', pageSize.toString());
      campaignStatus?.forEach((status) => searchParams.append('CampaignStatuses', status.toString()));
      jobStatus?.forEach((status) => searchParams.append('JobStatuses', status.toString()));
      if (from) searchParams.append('From', from.toString());
      return useSWRImmutable<{ totalCount: number; jobs: IJob[] }>('/Influencer/jobs?' + searchParams, fetcher);
    },
  },
  job: {
    statistical: () => useSWRImmutable<{ jobStatus: EJobStatus; count: number }[]>('/Job/statistical', fetcher),
  },
};

export default fetchRequest;
