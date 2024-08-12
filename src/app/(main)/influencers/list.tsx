'use client';

import InfluencerCard, { InfluencerCardSkeleton } from '@/components/influencer-card';
import { fetcher } from '@/lib/http';
import useSWRImmutable from 'swr/immutable';
import Filter from './filter';

const List = () => {
  const { data, isLoading } = useSWRImmutable('https://dummyjson.com/users', fetcher);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-7">Influencers</h1>
      <div className="mb-7">
        <Filter />
      </div>
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-8">
        {isLoading
          ? Array.from({ length: 30 }).map((_, index) => <InfluencerCardSkeleton key={index} />)
          : data.users?.map((_: any, index: number) => <InfluencerCard key={index} />)}
      </div>
    </div>
  );
};

export default List;
