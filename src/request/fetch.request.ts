/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { fetcher } from '@/lib/http';
import ICampaign from '@/types/campaign';
import useSWRImmutable from 'swr/immutable';

const fetchRequest = {
  favorites: () => useSWRImmutable<any[]>('/Brand/favorites', fetcher),
  campaign: {
    currentBrand: (fetch = false) => useSWRImmutable<ICampaign[]>('/Brand/campaigns', fetch ? fetcher : null),
  },
};

export default fetchRequest;
