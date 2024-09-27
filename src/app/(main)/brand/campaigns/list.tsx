'use client';

import NoData from '@/components/custom/no-data';
import { Skeleton } from '@/components/ui/skeleton';
import { fetcher } from '@/lib/http';
import ICampaign from '@/types/campaign';
import useSWRImmutable from 'swr/immutable';

const List = () => {
  const { data, isLoading } = useSWRImmutable<ICampaign[]>('/Campaigns/brand', fetcher);

  return (
    <div className="space-y-7">
      <h1 className="text-2xl font-semibold">Chiến dịch</h1>
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-x-6 gap-y-8">
        {isLoading ? (
          Array.from({ length: 12 }).map((_, index) => <Skeleton key={index} className="h-40" />)
        ) : data && data.length > 0 ? (
          data.map((campaign) => <div key={campaign.id}>{campaign.name}</div>)
        ) : (
          <NoData description="Không có chiến dịch" className="col-span-full" />
        )}
      </div>
    </div>
  );
};
export default List;
