/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { fetcher } from '@/lib/http';
import useSWRImmutable from 'swr/immutable';

const fetchRequest = {
  favorites: () => useSWRImmutable<any[]>('/Brand/favorites', fetcher),
};

export default fetchRequest;
