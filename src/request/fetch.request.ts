/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { fetcher } from '@/lib/http';
import ICampaign from '@/types/campaign';
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
    jobs: () => useSWRImmutable<{ totalCount: number; jobs: IJob[] }>('/Influencer/jobs', fetcher),
  },
};

export default fetchRequest;
