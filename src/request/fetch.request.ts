/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { fetcher } from '@/lib/http';
import ICampaign from '@/types/campaign';
import IInfluencer from '@/types/influencer';
import useSWRImmutable from 'swr/immutable';

const fetchRequest = {
  favorites: (fetch = false) => useSWRImmutable<IInfluencer[]>('/Brand/favorites', fetch ? fetcher : null),
  campaign: {
    available: () => useSWRImmutable<ICampaign[]>('/Campaigns', fetcher),
    currentBrand: (fetch = false) => useSWRImmutable<ICampaign[]>('/Brand/campaigns', fetch ? fetcher : null),
  },
};

export default fetchRequest;
